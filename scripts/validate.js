#!/usr/bin/env node
// Historical evidence gate: schema, links, review status, and date precision.
const fs = require('fs');
const path = require('path');
const load = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', n + '.json'), 'utf8'));
const sources = load('sources'), events = load('events'), entities = load('entities');
const rels = load('relationships'), cases = load('cases'), systems = load('systems'), dominoes = load('dominoes'), financial = load('financial_flows'), ownership = load('ownership_overlap'), comparisons = load('comparisons'), documents = load('archival_documents'), routes = load('information_routes'), extracts = load('source_extracts'), censusVersions = load('census_evidence_audit');
const STATUS = ['documented', 'interpretation', 'supported interpretation', 'unresolved', 'speculation'];
const errors = [];
const ids = (arr, name) => {
  const s = new Set();
  arr.forEach((x) => { if (!x.id) errors.push(name + ': missing id'); else if (s.has(x.id)) errors.push(name + ': duplicate ' + x.id); s.add(x.id); });
  return s;
};
const S = ids(sources, 'sources'), E = ids(events, 'events'), N = ids(entities, 'entities');
const C = ids(cases, 'cases'); ids(rels, 'relationships'); ids(systems, 'systems'); ids(dominoes, 'dominoes'); ids(financial, 'financial'); ids(ownership, 'ownership_overlap'); ids(comparisons, 'comparisons'); ids(documents, 'archival_documents'); ids(routes, 'information_routes'); ids(extracts, 'source_extracts'); ids(censusVersions, 'census_evidence_audit');
const bySource = Object.fromEntries(sources.map(s => [s.id, s]));
const need = (list, set, ctx) => (list || []).forEach(i => { if (!set.has(i)) errors.push(ctx + ': unknown reference ' + i); });
const validStatus = (obj, ctx) => { if (!STATUS.includes(obj.status)) errors.push(ctx + ': bad/missing status ' + obj.status); };
const cite = (obj, ctx, requireReviewed) => {
  if (!Array.isArray(obj.sources) || !obj.sources.length) errors.push(ctx + ': no source citations');
  need(obj.sources, S, ctx);
  if (requireReviewed && !(obj.sources || []).some(id => {
    const s = bySource[id];
    return s && s.reviewed === true && /^https:\/\//.test(s.url || '') && (s.locator || '').trim();
  })) errors.push(ctx + ': documented claim requires at least one reviewed online source with a specific locator');
};
const validDate = (date, id) => {
  if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(date || '')) return errors.push(id + ': invalid or falsely encoded date');
  const [year, month, day] = date.split('-').map(Number);
  if (month !== undefined && (month < 1 || month > 12)) errors.push(id + ': bad month');
  if (day !== undefined) {
    const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (day < 1 || day > last) errors.push(id + ': bad calendar day');
  }
};
sources.forEach(s => {
  if (s.reviewed === true && (!/^https:\/\//.test(s.url || '') || !(s.locator || '').trim()))
    errors.push(s.id + ': reviewed sources must have URL + locator');
});
events.forEach(e => {
  validDate(e.date, e.id); need([e.case], C, e.id);
  if (!Array.isArray(e.entities) || !e.entities.length) errors.push(e.id + ': no event-linked entities');
  need(e.entities, N, e.id);
  const matchCase = cases.find(record => record.id === e.case);
  if (matchCase) (e.entities || []).forEach(entityId => {
    if (!matchCase.entities.includes(entityId)) errors.push(e.id + ': linked entity outside case: ' + entityId);
  });
  validStatus(e, e.id); cite(e, e.id, e.status === 'documented');
  if (e.status === 'documented' && e.verification !== 'reviewed') errors.push(e.id + ': requires review');
});
entities.forEach(e => { cite(e, e.id, false); });
rels.forEach(r => {
  need([r.from, r.to], N, r.id); validStatus(r, r.id);
  cite(r, r.id, r.status === 'documented');
  if (r.status === 'documented' && r.verification !== 'reviewed') errors.push(r.id + ': requires review');
  if (r.date) validDate(r.date, r.id);
});
cases.forEach(c => {
  need(c.events, E, c.id); need(c.entities, N, c.id);
  for (const field of ['summary_sources','decision_sources','consequences_sources']) {
    const cit = {sources:c[field]};
    cite(cit,c.id + '.' + field,true);
  }
  c.interpretations.forEach((i,k) => { cite(i, c.id + '.interpretation['+k+']',false); validStatus(i,c.id); });
});
systems.forEach(s => { need(s.cases, C, s.id); cite(s,s.id,false); validStatus(s,s.id); });
const yearOf = date => date ? Number(date.slice(0,4)) : NaN;
dominoes.forEach(d => {
  need([d.from, d.to], E, d.id);
  if (d.from === d.to) errors.push(d.id + ': self-link not allowed');
  const first = events.find(e => e.id === d.from);
  const second = events.find(e => e.id === d.to);
  if (first && second && yearOf(first.date) > yearOf(second.date))
    errors.push(d.id + ': event chain reverses known year order');
  if (!d.mechanism || !d.claim || !d.kind) errors.push(d.id + ': missing mechanism/claim/kind');
  validStatus(d, d.id);
  cite(d, d.id, d.status === 'documented');
  if (d.status === 'documented' && d.verification !== 'reviewed')
    errors.push(d.id + ': documented link requires review');
});
const acceptableUnits = new Set(['GBP', 'percent_of_sales', 'not_recorded', 'livres_tournois', 'shares']);
const acceptableStates = new Set(['existing_credit_extension', 'historical_account_not_transaction_ledger', 'prospective_not_documented_paid', 'documented_historical_loan', 'scheme_subscription_not_disbursement', 'shareholding_not_cash_transfer', 'agreement_not_disbursement', 'authorized_no_transfer', 'policy_target_not_cash_flow', 'archival_share_receipt_no_cash_value', 'legal_award_not_disbursement']);
financial.forEach(f => {
  validDate(f.date, f.id);
  if (!f.title || !f.kind || !f.description || !f.flow_state) errors.push(f.id + ': missing financial metadata');
  if (!acceptableStates.has(f.flow_state)) errors.push(f.id + ': unknown money status (review before asserting payment)');
  if (!acceptableUnits.has(f.unit)) errors.push(f.id + ': unknown currency or measure');
  if (f.value !== null && (!Number.isFinite(f.value) || f.value < 0)) errors.push(f.id + ': amount must be a nonnegative number or null');
  if (f.unit === 'not_recorded' && f.value !== null) errors.push(f.id + ': unknown amounts must not be invented');
  if (f.unit !== 'not_recorded' && f.value === null) errors.push(f.id + ': stated currency or rate requires a number');
  if (f.unit === 'percent_of_sales' && f.value > 100) errors.push(f.id + ': invalid commission percentage');
  if (!Array.isArray(f.to) || !f.to.length) errors.push(f.id + ': no recipients');
  need([f.from, ...(f.to || [])], N, f.id);
  need([f.case], C, f.id);
  const c = cases.find(record => record.id === f.case);
  if (c) [f.from, ...(f.to || [])].forEach(id => {
    if (!c.entities.includes(id)) errors.push(f.id + ': financial actor not in case: ' + id);
  });
  cite(f, f.id, true);
  if (f.verification !== 'reviewed') errors.push(f.id + ': financial record must label review status');
});
ownership.forEach(o => {
  if (!Number.isInteger(o.year) || o.year < 1600 || o.year > 2026) errors.push(o.id + ': invalid researched year');
  if (!Number.isInteger(o.matched_accounts_approx) || o.matched_accounts_approx < 0) errors.push(o.id + ': missing account estimate');
  if (!Array.isArray(o.company_ids) || o.company_ids.length !== 2) errors.push(o.id + ': expected a pair of companies');
  need(o.company_ids, N, o.id);
  if (o.distinct_individuals_verified !== false) errors.push(o.id + ': aggregate research must not claim distinct individuals identified');
  if (!o.measurement || !o.methods) errors.push(o.id + ': missing measurement/method details');
  cite(o, o.id, true);
  if (o.verification !== 'reviewed') errors.push(o.id + ': source review missing');
});
financial.filter(f=>f.flow_state==='legal_award_not_disbursement').forEach(f=>{
  if(f.unit!=='livres_tournois'||!Number.isFinite(f.value)||f.value<1) errors.push(f.id+': compensation award must retain exact historical livres');
  if(!/not proof|not.*cash|not.*paid|disburs/i.test(f.description)) errors.push(f.id+': compensation must never be presented as verified disbursement');
  if(f.from !== 'ent-french-superior-council-la') errors.push(f.id+': award issuer must be Council, not guessed payer');
});
financial.filter(f=>f.flow_state === 'archival_share_receipt_no_cash_value').forEach(f=>{
  if (f.unit !== 'shares' || !Number.isInteger(f.value) || f.value < 1) errors.push(f.id + ': share receipt needs recorded share units');
  if (!/no cash|NOT a cash|not.*cash|cash.*not|price/i.test(f.description)) errors.push(f.id + ': share receipt needs no-cash-price warning');
});
financial.filter(f=>f.flow_state === 'authorized_no_transfer').forEach(f=>{
  if (f.value !== null || f.unit !== 'not_recorded') errors.push(f.id + ': unauthorized invented non-transfer amount');
  if (!/not (executed|implemented)|never (executed|carried out)|neither .* (assumed|engrafted)/i.test(f.description)) errors.push(f.id + ': unexecuted transfer must be explicit');
});
const fieldList = ['dimension','france','britain','interpretation','france_case','britain_case','epistemic_status'];
comparisons.forEach(c => {
  for (const field of fieldList) if (!c[field]) errors.push(c.id + ': missing ' + field);
  need([c.france_case,c.britain_case], C, c.id);
  if (c.france_case === c.britain_case) errors.push(c.id + ': comparison needs two distinct cases');
  if (!STATUS.includes(c.epistemic_status)) errors.push(c.id + ': invalid epistemic status');
  cite(c,c.id,true);
});
financial.filter(f=>f.flow_state==='policy_target_not_cash_flow').forEach(f=>{
  if (f.unit!=='livres_tournois') errors.push(f.id+': state finance target must preserve original livre unit');
  if (!/not evidence|NOT evidence|not a payment|not proof/i.test(f.description))
    errors.push(f.id+': fiscal target needs explicit nonpayment warning');
});
const archiveLevels = new Set(['curator_summary_with_images','bibliographic_record_only','museum_catalogue_description','indexed_issues_not_transcribed','ledger_series_index_only','catalogue_metadata_only','archival_finding_aid_only']);
documents.forEach(d => {
  validDate(d.date,d.id);
  if (!d.title || !d.place || !d.document_kind || !d.reference || !d.established || !d.limitations) errors.push(d.id + ': missing archive metadata');
  if (!archiveLevels.has(d.access_level)) errors.push(d.id + ': unsupported archive inspection status');
  if (!Array.isArray(d.entities) || !d.entities.length) errors.push(d.id + ': no explicitly linked subjects');
  need(d.entities,N,d.id); cite(d,d.id,true);
});
const archiveIds = new Set(documents.map(d=>d.id));
routes.forEach(r => {
  validDate(r.date,r.id);
  if (!r.from || !r.to || r.from===r.to || !r.channel || !r.interpretation || !r.evidence_kind || !r.confidence) errors.push(r.id + ': route missing provenance');
  if (r.named_correspondent_verified !== false) errors.push(r.id + ': cannot invent verified personal correspondence');
  if (!Array.isArray(r.documents)) errors.push(r.id + ': related-document array missing');
  else r.documents.forEach(id=>{if(!archiveIds.has(id)) errors.push(r.id+': unknown document '+id)});
  validStatus(r,r.id); cite(r,r.id,r.status==='documented');
});
const readingLevels = new Set(['curated_modern_translation','curated_modern_translation_and_image','historical_secondary_transcription_not_verified_against_original']);
const allowedNumUnits = new Set(['quotation_unspecified','forecast_not_transaction','schemes_reportedly_identified','people_reported_by_deiler','people_reported_by_villiers']);
extracts.forEach(x => {
  validDate(x.date,x.id);
  if (!x.title || !x.date_role || !x.place || !x.record_kind || !x.paraphrase || !x.limitations || !x.language_original) errors.push(x.id + ': incomplete source reading');
  if (!readingLevels.has(x.reading_level)) errors.push(x.id + ': do not promote mediated material to direct original transcription');
  if (!['nl','fr'].includes(x.language_original)) errors.push(x.id + ': unidentified original language');
  need([x.event],E,x.id);
  need([x.case],C,x.id);
  const event = events.find(e => e.id===x.event);
  const study = cases.find(c => c.id===x.case);
  if (event && event.case !== x.case) errors.push(x.id + ': linked event must belong to case');
  if (study && !study.events.includes(x.event)) errors.push(x.id + ': event not listed in case');
  if (!Array.isArray(x.reported_numbers)) errors.push(x.id + ': reported numbers array missing');
  else x.reported_numbers.forEach(n => {
    if (!Number.isFinite(n.value) || n.value < 0 || !n.meaning || !allowedNumUnits.has(n.unit)) errors.push(x.id + ': unsupported numeric claim without interpretation');
  });
  cite(x,x.id,true);
  if (x.reading_level === 'historical_secondary_transcription_not_verified_against_original' && !/original|folio/i.test(x.limitations)) errors.push(x.id + ': state explicit primary-folio limitation');
  if (x.date_role === 'london_dispatch_date_not_dutch_print_date' && !/not.*publication|not.*printing|not.*issue|not.*date/i.test(x.limitations)) errors.push(x.id + ': do not equate dispatch and newspaper publication');
});
const censusEvidenceLevels = new Set(['catalogue_only_original_images_not_audited','digitized_historical_secondary_edition','indexed_table_excerpt_not_checked_against_publisher_original']);
const censusScopes = new Set(['enslaved_people_of_african_descent','enslaved_indigenous_people','european_indentured_workers','europeans_as_author_defined','whites_as_historian_tabulated']);
censusVersions.forEach(c=>{
  validDate(c.date,c.id);
  if (!c.source_label || !c.source_type || !c.scope || !c.provenance || !c.limit) errors.push(c.id+': incomplete census edition provenance');
  if (!censusEvidenceLevels.has(c.access_level)) errors.push(c.id+': invalid or overstated census review level');
  if (!Array.isArray(c.figures)) errors.push(c.id+': missing census figure array');
  else c.figures.forEach(x=>{
    if (!censusScopes.has(x.category) || !Number.isInteger(x.value) || x.value<0) errors.push(c.id+': invalid census category or number');
  });
  if (c.total_reported!==null && (!Number.isInteger(c.total_reported) || c.total_reported<0)) errors.push(c.id+': total must be null or reported integer');
  if (c.access_level==='catalogue_only_original_images_not_audited' && ((c.figures||[]).length || c.total_reported!==null)) errors.push(c.id+': original catalogues cannot assert counted census values');
  if (!/original|folio|archiv|manuscript/i.test(c.limit)) errors.push(c.id+': explicit original-document caution required');
  cite(c,c.id,true);
});
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('OK: ' + sources.length + ' sources, ' + events.length + ' events, ' + entities.length + ' entities, ' + rels.length + ' relationships, ' + cases.length + ' cases, ' + systems.length + ' systems, ' + dominoes.length + ' dominoes, ' + financial.length + ' financial records, ' + ownership.length + ' ownership aggregates, ' + comparisons.length + ' country comparisons, ' + documents.length + ' original records, ' + routes.length + ' information channels, ' + extracts.length + ' attributed readings, ' + censusVersions.length + ' census source versions');
