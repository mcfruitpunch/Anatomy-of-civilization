#!/usr/bin/env node
// V1.4: legal act dates, edition years and source access are separate facts.
// A catalogue or title page cannot authorize claims about operative clauses or payments.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const witnesses = load('louisiana_decree_witnesses');
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const expected = new Map([
  ['witness-retrocession-1731-title', {document: 'doc-022', act_date: '1731-01-23', printing_year: 1731, witness_scope: 'printed_title_page', review_level: 'original_title_page_only'}],
  ['witness-company-debt-1731-royal-print', {document: 'doc-024', act_date: '1731-02-24', printing_year: 1731, witness_scope: 'edition_catalogue', review_level: 'bibliographic_metadata_only'}],
  ['witness-company-debt-1733-saugrain-prault', {document: 'doc-024', act_date: '1731-02-24', printing_year: 1733, witness_scope: 'edition_catalogue', review_level: 'bibliographic_metadata_only'}],
]);
const keys = ['id', 'act_date', 'document', 'printing_year', 'witness_scope', 'review_level',
  'operative_clauses_read', 'legal_debtor_verified', 'payment_verified',
  'source_ids', 'locator', 'access_limitation'].sort();
function verify(w) {
  assert(w && typeof w === 'object' && !Array.isArray(w), 'Witness must be an object');
  assert.deepEqual(Object.keys(w).sort(), keys, 'Unknown evidence field');
  const e = expected.get(w.id);
  assert(e, 'Unknown witness or undocumented printing');
  for (const [field, value] of Object.entries(e)) {
    assert.equal(w[field], value, 'Incorrect act date, printing year or evidence level: ' + field);
  }
  assert.equal(documents.get(w.document)?.date, w.act_date, 'Legal act date must match archival record');
  assert(Number.isInteger(w.printing_year) && w.printing_year >= Number(w.act_date.slice(0,4)), 'Invalid edition year');
  assert(Array.isArray(w.source_ids) && w.source_ids.length > 0, 'Missing provenance');
  assert.equal(new Set(w.source_ids).size, w.source_ids.length, 'Duplicate source');
  for (const id of w.source_ids) {
    const source = sources.get(id);
    assert(source && source.reviewed === true && /^https:\/\//.test(source.url) && source.locator,
      'Unknown or unlocated source: ' + id);
  }
  assert(typeof w.locator === 'string' && w.locator.trim(), 'Missing page/catalogue locator');
  assert(typeof w.access_limitation === 'string' && w.access_limitation.trim(), 'Missing access limitation');
  for (const field of ['operative_clauses_read', 'legal_debtor_verified', 'payment_verified']) {
    assert.equal(w[field], false, field + ' requires a new, directly inspected and cited original');
  }
}
assert(Array.isArray(witnesses) && witnesses.length === expected.size, 'Expected three audited print witnesses');
assert.equal(new Set(witnesses.map(w => w.id)).size, witnesses.length, 'Duplicate witness ID');
witnesses.forEach(verify);
const debt = witnesses.filter(w => w.document === 'doc-024');
assert.deepEqual(debt.map(w => w.printing_year).sort(), [1731, 1733], 'Two printings of one 1731 debt act');
assert(debt.every(w => w.act_date === '1731-02-24'), '1733 printing must not become a 1733 law');
for (const field of ['operative_clauses_read', 'legal_debtor_verified', 'payment_verified']) {
  assert.throws(() => verify({...debt[0], [field]: true}), 'Unsupported clause or financial claim must fail');
}
assert.throws(() => verify({...debt[1], act_date: '1733-02-24'}));
assert.throws(() => verify({...debt[1], review_level: 'original_clauses_transcribed'}));
assert.throws(() => verify({...debt[1], payer: 'French Crown'}));
assert.throws(() => verify({...debt[1], payment_amount: 29000}));
assert.throws(() => verify({...debt[0], source_ids: ['nonexistent-source']}));
console.log('OK: three dated decree witnesses, two editions of one 1731 debt act, no unverified clauses or payments');
