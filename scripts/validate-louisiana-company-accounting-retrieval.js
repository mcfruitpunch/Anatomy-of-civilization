#!/usr/bin/env node
// Keep LHC finding-aid leads distinct from examined originals, financial transactions and item-level legal conclusions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const register = load('louisiana_company_accounting_retrieval_leads');
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const extracts = new Map(load('source_extracts').map(x => [x.id, x]));
const events = new Map(load('events').map(x => [x.id, x]));
const cases = new Map(load('cases').map(x => [x.id, x]));
const flows = load('financial_flows');
const ledger = load('louisiana_liability_ledger');

function validate(data) {
  const ids = new Set(data.leads.map(x => x.id));
  assert.equal(data.target_document, 'doc-024');
  assert.equal(documents.get('doc-024')?.date, '1731-02-24');
  assert.equal(documents.get('doc-024')?.access_level, 'catalogue_metadata_only',
    'The 1731 debt decree must remain catalogue-only until its operative text is read');
  assert.equal(ids.size, data.leads.length, 'Duplicate lead IDs');
  assert.equal(data.leads.length, 10, 'Expected ten bounded LHC/LLMC retrieval leads');
  for (const lead of data.leads) {
    assert(Array.isArray(lead.source_ids) && lead.source_ids.length > 0, lead.id + ': source IDs required');
    for (const sourceId of lead.source_ids) {
      const source = sources.get(sourceId);
      assert(source && source.reviewed === true && /^https:\/\//.test(source.url) && source.locator,
        lead.id + ': source must be reviewed and precisely located: ' + sourceId);
    }
  }
  const get = id => {
    const lead = data.leads.find(x => x.id === id);
    assert(lead, 'Missing lead ' + id);
    return lead;
  };
  const unpaid = get('lead-rg3-1725-company-furnished-enslaved-people');
  assert.equal(unpaid.record_date, '1725-12-11');
  assert.equal(unpaid.accession, '1852.30');
  assert.equal(unpaid.pages, 4);
  assert.equal(unpaid.evidence_level, 'finding_aid_only');
  assert.equal(unpaid.original_text_examined, false);
  assert.equal(unpaid.individuals_identified, false);
  assert.equal(unpaid.amount_or_price_established, false);
  assert.equal(unpaid.payment_established, false);
  assert.equal(unpaid.connection_to_doc_024, 'unverified');
  assert.equal(unpaid.microfilmed, true);
  assert.equal(unpaid.microfilm_reel_identifier, 'not stated in the 2024 LSM guide');
  assert(/does not convey their voices/i.test(unpaid.human_context));

  const audit = get('lead-rg3-1726-company-account-audit-appointment');
  assert.equal(audit.record_date, '1726-10-14');
  assert.equal(audit.accession, '1852.36');
  assert.equal(audit.pages, 2);
  assert.equal(audit.company_named_in_finding_aid, 'generic_company_not_specified');
  assert.equal(audit.original_text_examined, false);
  assert.equal(audit.completed_audit_established, false);
  assert.equal(audit.audit_results_established, false);
  assert.equal(audit.microfilmed, true);
  assert.equal(audit.microfilm_reel_identifier, 'not stated in the 2024 LSM guide');

  const books = get('lead-rg377-1729-bookkeeper-instructions');
  assert.equal(books.record_date, '1729-02-15');
  assert.equal(books.record_id, '1729021501');
  assert.equal(books.series_reference, 'B43:846-864');
  assert.equal(books.sheets, 43);
  assert.equal(books.original_text_examined, false);
  assert.equal(books.balances_established, false);
  assert.equal(books.payments_established, false);
  assert.equal(books.identity_of_old_company, 'not_resolved');

  const inventory = get('lead-rg377-1731-decree-inventory-check');
  assert.equal(inventory.target_document, 'doc-024');
  assert.equal(inventory.accession, 'T025.2003.112');
  assert.equal(inventory.summary_extent, '4 linear feet; 9 boxes');
  assert.equal(inventory.published_contents_check.matching_entry_found, false);
  assert.equal(inventory.published_contents_check.summary_box_count, 9);
  assert.equal(inventory.published_contents_check.box_9_heading_found, false);
  assert.equal(inventory.published_contents_check.last_listed_item.id, '1731022801');
  assert.equal(inventory.published_contents_check.last_listed_item.date, '1731-02-28');
  assert.equal(inventory.published_contents_check.last_listed_item.box, 'Box 8');
  assert.equal(inventory.original_text_examined, false);
  assert.equal(inventory.absence_from_physical_collection_proven, false);
  assert(/Box 9/.test(inventory.next_action) && /unlisted|supplement/i.test(inventory.next_action));

  const rg1 = get('lead-rg1-creditor-and-manumission-records');
  assert.equal(rg1.record_group, 'RG1');
  assert.equal(rg1.date_range, '1714-1769');
  assert.equal(rg1.individual_cases_identified, false);
  assert.equal(rg1.original_records_examined, false);
  assert.equal(rg1.access_status, 'not_specified_in_guide');
  assert(/manumission/i.test(rg1.finding_aid_summary));

  const llmc = get('lead-llmc-1733-subscriber-access');
  assert.equal(llmc.llmc_record_id, 'LLMC1338688796');
  assert.equal(llmc.columbia_catalogue_record, '1505745');
  assert.equal(llmc.uw_access_status, 'authenticated_UW_route');
  assert.equal(llmc.item_availability_in_uw_instance, 'not_confirmed');
  assert.equal(llmc.public_access_established, false);
  assert.equal(llmc.original_text_examined, false);

  const doc35 = documents.get('doc-035');
  const doc36 = documents.get('doc-036');
  const doc37 = documents.get('doc-037');
  const doc38 = documents.get('doc-038');
  const doc39 = documents.get('doc-039');
  assert(doc35 && doc36 && doc37 && doc38 && doc39, 'All catalogue-level related documents must exist in archival_documents');
  for (const d of [doc35, doc36, doc37, doc38, doc39]) {
    assert.equal(d.access_level, 'archival_finding_aid_only');
    assert(/finding aid|finding-aid/i.test(d.limitations), d.id + ': original text limitation required');
  }
  assert(/not.*payment|payment.*not/i.test(doc35.limitations));
  assert(/old company.*not.*(?:identified|established)|identity.*old company/i.test(doc36.limitations));
  assert(/price term|not a monetary payment/i.test(doc37.limitations));
  assert(/company identity.*not established|not established.*company identity/i.test(doc38.limitations));
  assert(/possible relationship.*hypothesis|research hypothesis/i.test(doc39.limitations));

  const inKind = get('lead-rg377-1729-in-kind-supply-order');
  assert.equal(inKind.record_id, '1729081301');
  assert.equal(inKind.series_reference, 'B43:868-869');
  assert.equal(inKind.sheets, 2);
  assert.equal(inKind.original_text_examined, false);
  assert.equal(inKind.delivery_established, false);
  assert.equal(inKind.payment_established, false);
  assert.equal(inKind.price_term_is_not_payment, true);

  const balance = get('lead-rg377-1729-lorme-account-balancing-order');
  assert.equal(balance.record_id, '1729083001');
  assert.equal(balance.company_identity_in_abstract, 'not_specified');
  assert.equal(balance.completed_account_balancing_established, false);
  assert.equal(balance.results_established, false);

  const receipt = get('lead-lhc-1736-labbe-guillon-receipt');
  assert.equal(receipt.record_id, '1736-08-20-04');
  assert.equal(receipt.record_date, '1736-08-20');
  assert.equal(receipt.card_number, '#6022');
  assert.equal(receipt.displayed_pages, 3);
  assert.equal(receipt.evidence_level, 'index_card_transcribed_manuscript_images_previewed_not_transcribed');
  assert.equal(receipt.card_origin_verified, false);
  assert.equal(receipt.original_manuscript_transcribed, false);
  assert.equal(receipt.preservation_tiff_accessed, false);
  assert.equal(receipt.payment_established, false);
  assert.equal(receipt.debt_direction_verified, false);
  assert.equal(receipt.connection_to_doc_024, 'not_established');
  assert.equal(receipt.reported_debt_amount.value, 5845);
  assert.equal(receipt.reported_debt_amount.unit, 'livres');
  assert.equal(receipt.reported_debt_amount.verification, 'index_card_only_not_original_account');
  assert.equal(receipt.cited_periodical.volume, 8);
  assert.equal(receipt.cited_periodical.issue, 3);
  assert.equal(receipt.cited_periodical.month, 'July');
  assert.equal(receipt.cited_periodical.year, 1925);
  assert.equal(receipt.cited_periodical.page, 489);
  assert.equal(receipt.cited_periodical.printed_page_examined, false);
  assert.equal(receipt.manuscript_image_urls.length, 2);
  assert(/600 dpi TIFF/i.test(receipt.next_action));
  assert(/not.*payment|payment.*not/i.test(receipt.next_action));

  const doc27 = documents.get('doc-027');
  assert.equal(doc27?.access_level, 'index_card_transcribed_manuscript_images_previewed_not_transcribed');
  assert(/5,845-livre/.test(doc27?.established || ''));
  assert(/not.*payment|payment.*not/i.test(doc27?.limitations || ''));
  const extract = extracts.get('extract-013');
  assert.equal(extract?.reading_level, 'institutional_index_card_transcription_not_original_manuscript');
  assert.equal(extract?.date_role, 'archive_record_date_not_verified_transaction_date');
  assert((extract?.transcription || '').includes('Receipt to Jean Labbe'));
  assert((extract?.transcription || '').includes('5845 livres'));
  assert.equal(extract?.reported_numbers?.[0]?.unit, 'livres_index_card_reported_debt_not_verified');
  for (const field of ['card_origin_verified','original_manuscript_transcribed','legal_liability_verified','payment_verified','financial_ledger_entry_created']) assert.equal(extract?.[field], false);
  const event = events.get('evt-1736-guillon-labbe-receipt-index-card');
  assert.equal(event?.date, '1736-08-20');
  assert.equal(event?.date_role, 'archive_record_date_not_verified_transaction_date');
  assert(cases.get('retrocession1731')?.events.includes(event?.id));
  const row = ledger.find(x => x.document === 'doc-027');
  assert.equal(row?.review, 'index_card_transcribed_manuscript_unread');
  for (const field of ['paid','transfer','liable']) assert.equal(row?.[field], null);
  assert(!flows.some(f => (f.sources || []).includes('src-lcd-guillon-labbe-receipt-1736')),
    'An index card must not become a financial flow or verified payment');
  const debtDecree = documents.get('doc-024');
  assert.equal(debtDecree?.access_level, 'catalogue_metadata_only',
    'The 1736 receipt cannot promote the 1731 decree to text-examined status');

  const procedures = get('lead-rg377-1729-lorme-account-examination-procedures');
  assert.equal(procedures.record_id, '1729090601');
  assert.equal(procedures.series_reference, 'B43:872-877');
  assert.equal(procedures.sheets, 12);
  assert.equal(procedures.audit_completed_established, false);
  assert.equal(procedures.audit_results_established, false);
  assert.equal(procedures.relationship_to_1729_08_30_order, 'possible same-person/accounting sequence; not established');
  return true;
}

validate(register);

// Negative fixtures exercise the same validator used for the committed register.
const rejectMutation = (id, mutate) => {
  const bad = structuredClone(register);
  const lead = bad.leads.find(x => x.id === id);
  assert(lead, 'Missing negative-test lead ' + id);
  mutate(lead);
  assert.throws(() => validate(bad));
};
rejectMutation('lead-rg377-1731-decree-inventory-check', x => { x.absence_from_physical_collection_proven = true; });
rejectMutation('lead-rg377-1731-decree-inventory-check', x => { x.original_text_examined = true; });
rejectMutation('lead-rg3-1726-company-account-audit-appointment', x => { x.completed_audit_established = true; });
rejectMutation('lead-rg377-1729-bookkeeper-instructions', x => { x.payments_established = true; });
rejectMutation('lead-rg377-1729-in-kind-supply-order', x => { x.payment_established = true; });
rejectMutation('lead-rg377-1729-lorme-account-balancing-order', x => { x.completed_account_balancing_established = true; });
rejectMutation('lead-rg377-1729-lorme-account-examination-procedures', x => { x.audit_completed_established = true; });
rejectMutation('lead-llmc-1733-subscriber-access', x => { x.public_access_established = true; });
rejectMutation('lead-llmc-1733-subscriber-access', x => { x.item_availability_in_uw_instance = 'confirmed'; });
rejectMutation('lead-lhc-1736-labbe-guillon-receipt', x => { x.payment_established = true; });
rejectMutation('lead-lhc-1736-labbe-guillon-receipt', x => { x.original_manuscript_transcribed = true; });
rejectMutation('lead-lhc-1736-labbe-guillon-receipt', x => { x.connection_to_doc_024 = 'established'; });
rejectMutation('lead-lhc-1736-labbe-guillon-receipt', x => { x.debt_direction_verified = true; });
rejectMutation('lead-lhc-1736-labbe-guillon-receipt', x => { x.reported_debt_amount.verification = 'original_text_transcribed'; });


console.log('OK: LHC RG3/RG377/RG1 and LLMC leads remain finding-aid or authenticated-access metadata; no decree text, audit result, verified payment or item-level absence is claimed; the 1736 Labbé/Guillon receipt remains index-card-level');
