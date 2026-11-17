#!/usr/bin/env node
// V1.4: legal act dates, edition years and source access are separate facts.
// A microform facsimile can support reading of a printed witness, but not
// examination of the physical copy, the cited manuscript folio, or a payment.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const witnesses = load('louisiana_decree_witnesses');
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const expected = new Map([
  ['witness-retrocession-1731-title', {document: 'doc-022', act_date: '1731-01-23', printing_year: 1731, witness_scope: 'full_printed_text_microform_facsimile', review_level: 'microform_facsimile_text_examined', operative_clauses_read: true}],
  ['witness-company-debt-1731-royal-print', {document: 'doc-024', act_date: '1731-02-24', printing_year: 1731, witness_scope: 'edition_catalogue', review_level: 'bibliographic_metadata_only', operative_clauses_read: false}],
  ['witness-company-debt-1733-saugrain-prault', {document: 'doc-024', act_date: '1731-02-24', printing_year: 1733, witness_scope: 'edition_catalogue', review_level: 'bibliographic_metadata_only', operative_clauses_read: false}],
]);
const keys = ['id', 'act_date', 'document', 'printing_year', 'witness_scope', 'review_level',
  'operative_clauses_read', 'legal_debtor_verified', 'payment_verified',
  'source_ids', 'locator', 'access_limitation', 'retrieval_identifiers', 'next_access_action', 'access_attempts'].sort();
function verify(w) {
  assert(w && typeof w === 'object' && !Array.isArray(w), 'Witness must be an object');
  assert.deepEqual(Object.keys(w).sort(), keys, 'Unknown evidence field');
  const e = expected.get(w.id);
  assert(e, 'Unknown witness or undocumented printing');
  for (const [field, value] of Object.entries(e)) assert.equal(w[field], value, 'Incorrect date, printing year or evidence level: ' + field);
  assert.equal(documents.get(w.document)?.date, w.act_date, 'Legal act date must match archival record');
  assert(Number.isInteger(w.printing_year) && w.printing_year >= Number(w.act_date.slice(0,4)), 'Invalid edition year');
  assert(Array.isArray(w.source_ids) && w.source_ids.length > 0, 'Missing provenance');
  assert.equal(new Set(w.source_ids).size, w.source_ids.length, 'Duplicate source');
  for (const id of w.source_ids) {
    const source = sources.get(id);
    assert(source && source.reviewed === true && /^https:\/\//.test(source.url) && source.locator, 'Unknown or unlocated source: ' + id);
  }
  assert(typeof w.locator === 'string' && w.locator.trim(), 'Missing page/catalogue locator');
  assert(typeof w.access_limitation === 'string' && w.access_limitation.trim(), 'Missing access limitation');
  assert(Array.isArray(w.retrieval_identifiers) && w.retrieval_identifiers.length >= 2, 'Missing exact reproduction identifiers');
  assert(w.retrieval_identifiers.every(id => typeof id === 'string' && id.trim()), 'Empty reproduction identifier');
  assert.equal(new Set(w.retrieval_identifiers).size, w.retrieval_identifiers.length, 'Duplicate reproduction identifier');
  assert(typeof w.next_access_action === 'string' && /request|obtain|resolve/i.test(w.next_access_action), 'Missing actionable original-page retrieval step');
  assert(Array.isArray(w.access_attempts), 'Missing dated access-attempt history');
  const attemptKeys = ['attempted_on', 'institution', 'url', 'outcome', 'content_level', 'text_examined'].sort();
  const allowedOutcomes = new Set([
    'catalogue_result_observed_no_stable_item_permalink',
    'collection_page_opened_item_linked_to_gallica_ark',
    'http_403_forbidden',
    'search_result_metadata_observed_direct_page_open_502',
    'microform_facsimile_opened_and_three_printed_pages_visually_examined'
  ]);
  const allowedLevels = new Set(['catalogue_metadata_only', 'access_error_no_document_text', 'primary_print_facsimile_text_examined']);
  for (const a of w.access_attempts) {
    assert(a && typeof a === 'object' && !Array.isArray(a), 'Access attempt must be an object');
    assert.deepEqual(Object.keys(a).sort(), attemptKeys, 'Unknown access-attempt field');
    assert(/^\d{4}-\d{2}-\d{2}$/.test(a.attempted_on), 'Access attempt needs exact date');
    assert(a.institution && a.institution.trim(), 'Access attempt needs institution');
    assert(/^https:\/\//.test(a.url), 'Access attempt needs a verified HTTPS URL');
    assert(allowedOutcomes.has(a.outcome), 'Unrecognized access outcome');
    assert(allowedLevels.has(a.content_level), 'Unrecognized access evidence level');
    if (a.content_level === 'primary_print_facsimile_text_examined' || a.outcome === 'microform_facsimile_opened_and_three_printed_pages_visually_examined') {
      assert.equal(w.id, 'witness-retrocession-1731-title', 'Only the separately identified January retrocession facsimile was read');
      assert.equal(a.text_examined, true, 'A facsimile-text access level requires an actual examination flag');
      assert.equal(a.outcome, 'microform_facsimile_opened_and_three_printed_pages_visually_examined');
      assert.equal(a.content_level, 'primary_print_facsimile_text_examined');
      assert(w.source_ids.includes('src-cihm-1731-retrocession-microfiche'));
    } else assert.equal(a.text_examined, false, 'Unexamined catalogue/access errors cannot be promoted');
    assert(w.source_ids.some(id => sources.get(id)?.url === a.url), 'Access attempt URL must be represented by a source record');
  }
  assert(!/payment (made|received|verified)|crown assumed|debt settled/i.test(w.next_access_action), 'Unverified outcome in access action');
  assert.equal(w.legal_debtor_verified, false, 'No named legal debtor established by this decree reading');
  assert.equal(w.payment_verified, false, 'A legal decree is not a payment receipt');
  if (w.document === 'doc-024') assert.equal(w.operative_clauses_read, false, 'The separate February debt decree remains unread');
}
assert(Array.isArray(witnesses) && witnesses.length === expected.size, 'Expected three audited print witnesses');
assert.equal(new Set(witnesses.map(w => w.id)).size, witnesses.length, 'Duplicate witness ID');
witnesses.forEach(verify);
const retro = witnesses.find(w => w.document === 'doc-022');
assert(retro.source_ids.includes('src-cihm-1731-retrocession-microfiche'), 'Full-text facsimile provenance missing');
assert(retro.access_attempts.length === 1 && retro.access_attempts[0].text_examined === true, 'Three-page facsimile examination must be dated');
assert(/1985/.test(retro.access_limitation) && /physical 1731 copy.*not examined/i.test(retro.access_limitation), 'Microfiche must not be conflated with physical original');
assert(/ANOM COL F3 242 fol\.187.*unexamined/i.test(retro.access_limitation), 'Manuscript folio limitation missing');
const debt = witnesses.filter(w => w.document === 'doc-024');
assert.deepEqual(debt.map(w => w.printing_year).sort(), [1731, 1733], 'Two printings of one 1731 debt act');
assert(debt.every(w => w.act_date === '1731-02-24'), '1733 printing must not become a 1733 law');
assert(debt.every(w => w.access_attempts.length > 0), 'Both debt-decree witnesses need dated access-attempt records');
assert(debt.every(w => !w.operative_clauses_read && !w.legal_debtor_verified && !w.payment_verified), 'Debt decree must remain unread and financially unassigned');
assert(debt[1].source_ids.includes('src-bnf-company-indes-collection-context'), 'BnF curated access route missing from 1733 witness provenance');
for (const field of ['operative_clauses_read', 'legal_debtor_verified', 'payment_verified']) assert.throws(() => verify({...debt[0], [field]: true}));
assert.throws(() => verify({...debt[1], act_date: '1733-02-24'}));
assert.throws(() => verify({...debt[1], review_level: 'original_clauses_transcribed'}));
assert.throws(() => verify({...debt[1], payer: 'French Crown'}));
assert.throws(() => verify({...debt[1], payment_amount: 29000}));
assert.throws(() => verify({...debt[0], source_ids: ['nonexistent-source']}));
assert.throws(() => verify({...debt[0], retrieval_identifiers: []}));
assert.throws(() => verify({...debt[1], retrieval_identifiers: ['LLMC1338688796', 'LLMC1338688796']}));
assert.throws(() => verify({...debt[1], next_access_action: 'Crown assumed the debt'}));
const validAttempt = debt[1].access_attempts[0];
assert.throws(() => verify({...debt[1], access_attempts: [{...validAttempt, text_examined: true}]}));
assert.throws(() => verify({...debt[1], access_attempts: [{...validAttempt, url: 'http://example.org'}]}));
assert.throws(() => verify({...debt[1], access_attempts: [{...validAttempt, content_level: 'primary_print_facsimile_text_examined'}]}));
assert.throws(() => verify({...debt[1], access_attempts: [{...validAttempt, outcome: 'microform_facsimile_opened_and_three_printed_pages_visually_examined'}]}));
assert.throws(() => verify({...retro, operative_clauses_read: false}));
assert.throws(() => verify({...retro, payment_verified: true}));
assert.throws(() => verify({...retro, access_attempts: [{...retro.access_attempts[0], text_examined: false}]}));
assert(retro.retrieval_identifiers.some(x => x.includes('cihm_50701')), 'CIHM reproduction key must remain tracked');
assert(debt[1].retrieval_identifiers.includes('LLMC1338688796'), 'LLMC reproduction key must remain tracked');
assert(debt[1].retrieval_identifiers.includes('OCLC 27416388'), 'Print-copy search key must remain tracked');
assert(debt[1].retrieval_identifiers.includes('Gallica ark:/12148/btv1b8602624n'), 'Digitized witness key must remain tracked');
console.log('OK: January retrocession printed text examined from a 1985 microfiche facsimile; both February debt-decree editions remain catalogue-only');
