#!/usr/bin/env node
// Dependency-free smoke checks for the public atlas explorer.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const readJson = name => JSON.parse(read('data/' + name + '.json'));
const assert = (condition, text) => { if (!condition) throw new Error(text); };
const html = read('index.html');
const js = read('site/app.js');
const events = readJson('events'), cases = readJson('cases');
const entities = readJson('entities'), relationships = readJson('relationships');
const dominoes = readJson('dominoes');
const financial = readJson('financial_flows');
const ownership = readJson('ownership_overlap');
const comparisons = readJson('comparisons');
const archiveDocs = readJson('archival_documents');
const routes = readJson('information_routes');
const extracts = readJson('source_extracts');
const censusAudit = readJson('census_evidence_audit');
const ids = ['search', 'case-filter', 'year-from', 'year-to', 'timeline-list',
  'event-detail', 'rel-filter', 'entity-filter', 'verified-only', 'clear-focus',
  'graph', 'entity-detail', 'network-list', 'case-list', 'system-list', 'source-list', 'domino-list', 'domino-count', 'finance-list', 'finance-count', 'ownership-list', 'ownership-count', 'comparison-list', 'comparison-count', 'archive-list', 'archive-count', 'route-list', 'excerpt-list', 'excerpt-count', 'census-audit-list', 'census-audit-count'];
for (const id of ids) {
  assert(new RegExp('id="' + id + '"').test(html), 'Missing UI control or target: ' + id);
  assert(js.includes("'"+id+"'"), 'Explorer does not reference control: ' + id);
}
assert(html.includes('name="viewport"'), 'Missing mobile viewport');
assert(html.includes('href="#main"'), 'Missing skip navigation');
assert(html.includes('aria-live="polite"'), 'Missing screen reader announcements');
assert(js.includes("state.reviewedOnly") && js.includes("isDocumented(rel)"),
  'Do not remove source-review filtering');
assert(js.includes("sameCase(rel, state.caseId)"), 'Keep case-specific network containment');
assert(js.includes("typeCategory(rel)"), 'Keep relationship type filters');
assert(js.includes("caseEventIds()"), 'Keep timeline case filter');
assert(js.includes("scrollIntoView"), 'Cross-linked actor navigation missing');
const entityMap = new Map(entities.map(e => [e.id, e]));
const caseMap = new Map(cases.map(c => [c.id, c]));
for (const event of events) {
  const c = caseMap.get(event.case);
  assert(c, 'Unknown case: ' + event.case);
  for (const id of event.entities || []) {
    assert(entityMap.has(id), 'Unknown event entity: ' + id);
    assert(c.entities.includes(id), 'Cross-case entity for event: ' + event.id);
  }
}
const siblings = relationships.filter(r => r.type === 'sibling_of');
assert(siblings.length >= 1, 'Family-only explorer requires at least one sourced family link');
assert(siblings.every(r => r.status === 'documented' && r.verification === 'reviewed'),
  'Family demo cannot use unreviewed links');
assert(dominoes.length > 0, 'No event-to-event records');
assert(js.includes('renderDominoes()') && js.includes('goToEvent(id)'), 'Domino explorer controls missing');
assert(html.includes('href="#dominoes"'), 'Missing domino navigation');
const eventIds = new Set(events.map(e => e.id));
for (const d of dominoes) {
  assert(eventIds.has(d.from) && eventIds.has(d.to), 'Domino has unresolved event');
  assert(d.sources && d.sources.length, 'Domino missing citations');
}
assert(html.includes('href="#finance"'), 'Finance navigation link missing');
assert(js.includes('renderFinance()'), 'Finance cards are not rendered');
assert(financial.length >= 8, 'No financial traces provided');
assert(financial.some(f => f.value === null && f.flow_state === 'prospective_not_documented_paid'), 'Missing honest unknown-amount record');
assert(financial.some(f => f.unit === 'percent_of_sales' && f.flow_state === 'prospective_not_documented_paid'), 'Missing explicit conditional commission');
assert(financial.some(f => f.flow_state === 'documented_historical_loan' && f.value === 1200000), '1694 documented government loan missing');
assert(financial.some(f => f.flow_state === 'shareholding_not_cash_transfer' && f.value === 315000), '1698 recorded equity holding incorrectly characterized');
assert(financial.some(f => f.flow_state === 'agreement_not_disbursement' && f.value === 4200000), '1722 agreement should not be called a payment');
const financesById = new Set(financial.map(f => f.id));
assert(financesById.size === financial.length, 'Duplicate financial IDs');
for (const f of financial) {
  assert(caseMap.has(f.case), 'Finance case missing: ' + f.id);
  assert(entityMap.has(f.from), 'Unknown financier: ' + f.id);
  assert(f.to.every(id => entityMap.has(id)), 'Unknown financial recipient: ' + f.id);
  assert(f.sources.length > 0, 'Financial record missing citations: ' + f.id);
}
assert(ownership.length >= 2, 'Historic ownership overlap dataset absent');
assert(ownership.every(o => o.distinct_individuals_verified === false), 'Aggregate accounts must not be converted to people');
assert(ownership.some(o=>o.year === 1719 && o.matched_accounts_approx === 700), '1719 ledger comparison missing');
assert(ownership.some(o=>o.year === 1721 && o.matched_accounts_approx === 760), '1721 ledger comparison missing');
assert(financial.some(f=>f.flow_state === 'authorized_no_transfer' && f.value === null), 'Missing explicit unexecuted 1721 transfer');
assert(js.includes('renderOwnership()'), 'Ownership overlap interface missing');
assert(html.includes('href="#comparison"') && js.includes('renderComparisons()'), 'Country comparison interface missing');
assert(comparisons.length >= 4, 'Country comparison records missing');
assert(comparisons.every(c => c.sources?.length && c.france_case !== c.britain_case), 'Invalid comparative research evidence');
assert(financial.some(f => f.flow_state === 'policy_target_not_cash_flow' && f.unit === 'livres_tournois'), 'France monetary target not distinguished');
assert(financial.some(f=>f.id === 'fin-011' && f.value === 20 && f.unit === 'shares' && f.flow_state === 'archival_share_receipt_no_cash_value'), 'Specific 1719 twenty-share receipt not preserved correctly');
assert(archiveDocs.some(d=>d.id === 'doc-012' && d.reference.includes('2010.0158.20')), 'Original 1719 manuscript archival ID missing');
assert(!comparisons.some(c=>/joint secret organization|centralized family conspiracy/i.test(c.interpretation)), 'Cross-border hypothesis overstatement');
assert(html.includes('href="#archives"') && js.includes('renderArchives()'), 'Archive explorer not hooked up');
assert(archiveDocs.length >= 13 && routes.length >= 3,'Insufficient documentary records/routes');
const archiveIds = new Set(archiveDocs.map(d=>d.id));
for (const d of archiveDocs) {
  assert(d.reference && d.limitations && d.sources?.length,'Archival item lacks provenance/limitations '+d.id);
}
for (const r of routes) {
  assert(r.named_correspondent_verified === false,'Do not invent personal international correspondence');
  assert(r.documents.every(id=>archiveIds.has(id)),'Route contains broken archive link');
  assert(r.sources?.length,'Cross-border route requires a cited source');
}
assert(html.includes('href="#excerpts"') && js.includes('renderExcerpts()'), 'Source readings are not publicly navigable');
assert(extracts.length >= 5,'No historically attributed source readings');
assert(extracts.every(x=>x.sources?.length && x.limitations && x.event),'Readings need event, locator and caveats');
assert(extracts.every(x=>!x.reading_level.includes('original_folio_verified')),'No unverified direct archival transcription');
assert(extracts.some(x=>x.date_role === 'london_dispatch_date_not_dutch_print_date'),'News dateline qualification missing');
assert(extracts.some(x=>x.reported_numbers.some(n=>n.unit === 'forecast_not_transaction')),'Speculation must not appear as settled trade');
assert(extracts.some(x=>x.reported_numbers.some(n=>n.unit === 'people_reported_by_deiler')),'Historian census categories absent');
assert(routes.some(x=>x.from==='Paris'&&x.to==='Leiden')&&routes.some(x=>x.from==='London'&&x.to==='Leiden'),'Dated Dutch public news channels missing');
assert(html.includes('href="#census-audit"') && js.includes('renderCensusAudit()'), 'Census audit not integrated into explorer');
assert(censusAudit.length>=5,'Insufficient conflicting census source versions');
assert(censusAudit.filter(x=>x.access_level==='catalogue_only_original_images_not_audited').length>=2,'Original census variants not distinguished');
assert(censusAudit.some(x=>x.total_reported===470)&&censusAudit.some(x=>x.total_reported===472),'Historic discrepancy lost');
assert(censusAudit.every(x=>x.limit.includes('original') || x.limit.includes('folio') || x.limit.includes('archive') || x.limit.includes('manuscript')),'Missing census caveats');
assert(censusAudit.some(x=>x.source_label.includes('Vidal')&&x.access_level.includes('not_checked')),'Modern tabulation may not be promoted to inspected print without review');
assert(events.some(e=>e.id==='evt-1721-choctaw-trade-request')&&events.some(e=>e.id==='evt-1730-youanis-built'),'Choctaw initiative and post construction not linked');
console.log('OK: V1.1 Indigenous trade sovereignty, census version audit, research provenance and historical explorer');
