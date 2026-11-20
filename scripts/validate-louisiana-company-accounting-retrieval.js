#!/usr/bin/env node
// Keep LHC finding-aid leads distinct from examined originals, financial transactions and item-level legal conclusions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const register = load('louisiana_company_accounting_retrieval_leads');
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const ids = new Set(register.leads.map(x => x.id));
assert.equal(register.target_document, 'doc-024');
assert.equal(documents.get('doc-024')?.date, '1731-02-24');
assert.equal(documents.get('doc-024')?.access_level, 'catalogue_metadata_only',
  'The 1731 debt decree must remain catalogue-only until its operative text is read');
assert.equal(ids.size, register.leads.length, 'Duplicate lead IDs');
assert.equal(register.leads.length, 6, 'Expected six bounded LHC/LLMC retrieval leads');

for (const lead of register.leads) {
  assert(Array.isArray(lead.source_ids) && lead.source_ids.length > 0, lead.id + ': source IDs required');
  for (const sourceId of lead.source_ids) {
    const source = sources.get(sourceId);
    assert(source && source.reviewed === true && /^https:\/\//.test(source.url) && source.locator,
      lead.id + ': source must be reviewed and precisely located: ' + sourceId);
  }
}
const get = id => {
  const lead = register.leads.find(x => x.id === id);
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
assert(/not.*their voices|does not convey their voices/i.test(unpaid.human_context));

const audit = get('lead-rg3-1726-company-account-audit-appointment');
assert.equal(audit.record_date, '1726-10-14');
assert.equal(audit.accession, '1852.36');
assert.equal(audit.pages, 2);
assert.equal(audit.company_named_in_finding_aid, 'generic_company_not_specified');
assert.equal(audit.original_text_examined, false);
assert.equal(audit.completed_audit_established, false);
assert.equal(audit.audit_results_established, false);

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
assert.equal(llmc.columbia_record, '1505745');
assert.equal(llmc.uw_access_status, 'authenticated_UW_route');
assert.equal(llmc.item_availability_in_uw_instance, 'not_confirmed');
assert.equal(llmc.public_access_established, false);
assert.equal(llmc.original_text_examined, false);

const doc35 = documents.get('doc-035');
const doc36 = documents.get('doc-036');
assert(doc35 && doc36, 'Both catalogue-level related documents must exist in archival_documents');
for (const d of [doc35, doc36]) {
  assert.equal(d.access_level, 'archival_finding_aid_only');
  assert(/finding aid|finding-aid/i.test(d.limitations), d.id + ': original text limitation required');
}
assert(/not.*payment|payment.*not/i.test(doc35.limitations));
assert(/old company.*not.*identified|not.*identified.*old company/i.test(doc36.limitations));

// Regression guards: do not promote the catalogue or subscriber routes into primary-text examination.
for (const [id, field, value] of [
  ['lead-rg377-1731-decree-inventory-check','absence_from_physical_collection_proven',true],
  ['lead-rg377-1731-decree-inventory-check','original_text_examined',true],
  ['lead-rg3-1726-company-account-audit-appointment','completed_audit_established',true],
  ['lead-rg377-1729-bookkeeper-instructions','payments_established',true],
  ['lead-llmc-1733-subscriber-access','public_access_established',true],
  ['lead-llmc-1733-subscriber-access','item_availability_in_uw_instance','confirmed']
]) {
  const bad = structuredClone(get(id));
  bad[field] = value;
  const original = register.leads.find(x => x.id === id);
  register.leads[register.leads.findIndex(x => x.id === id)] = bad;
  assert.throws(() => {
    if (id === 'lead-rg377-1731-decree-inventory-check') {
      assert.equal(bad.absence_from_physical_collection_proven, false);
      assert.equal(bad.original_text_examined, false);
    } else if (id === 'lead-rg3-1726-company-account-audit-appointment') {
      assert.equal(bad.completed_audit_established, false);
    } else if (id === 'lead-rg377-1729-bookkeeper-instructions') {
      assert.equal(bad.payments_established, false);
    } else {
      assert.equal(bad.public_access_established, false);
      assert.equal(bad.item_availability_in_uw_instance, 'not_confirmed');
    }
  });
  register.leads[register.leads.findIndex(x => x.id === id)] = original;
}
console.log('OK: LHC RG3/RG377/RG1 and LLMC leads remain finding-aid or authenticated-access metadata; no decree text, audit result, payment or item-level absence is claimed');
