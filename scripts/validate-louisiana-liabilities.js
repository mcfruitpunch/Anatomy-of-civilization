#!/usr/bin/env node
// V1.4 evidence gate: a catalogue entry or judicial award is not a payment receipt.
// Any future claim of a debtor, transfer or cash payment requires an explicit
// source-verified schema change, not a silently added ledger field.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const data = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const rows = data('louisiana_liability_ledger');
const documents = data('archival_documents');
const sources = data('sources');
const byDocument = new Map(documents.map(doc => [doc.id, doc]));
const sourceIds = new Set(sources.map(source => source.id));
const reviewByDocument = new Map([
  ['doc-022', 'title_page'], // Jan 23 royal decree: original title only
  ['doc-021', 'catalogue'],  // Jan 24 local council dossier
  ['doc-024', 'catalogue'],  // Feb 24 debt decree: edition catalogues only
  ['doc-023', 'abstract'],   // Jan 19 1732 Salmon letter
  ['doc-020', 'scholarship'],// Diron award: modern reading of folios
  ['doc-019', 'abstract'],   // Sep 2 1732 ministerial letter
]);
const allowedKeys = ['date', 'document', 'review', 'paid', 'transfer', 'liable'].sort();

function verify(row) {
  assert(row && typeof row === 'object' && !Array.isArray(row), 'Ledger row must be an object');
  assert(reviewByDocument.has(row.document), 'Unknown or unapproved liability document');
  assert.deepEqual(Object.keys(row).sort(), allowedKeys, 'Unreviewed ledger field (including payment/creditor claims)');
  const document = byDocument.get(row.document);
  assert(document, 'Unknown archival record');
  assert.equal(row.date, document.date, 'Ledger date differs from archival record');
  assert.equal(row.review, reviewByDocument.get(row.document), 'Review level overstated or changed without audit');
  assert(Array.isArray(document.sources) && document.sources.length > 0, 'Document has no provenance');
  assert(document.sources.every(id => sourceIds.has(id)), 'Document cites unknown source');
  for (const field of ['paid', 'transfer', 'liable']) {
    assert.equal(row[field], null, field + ' requires original, claim-specific evidence');
  }
}

assert(Array.isArray(rows), 'Liability ledger must be an array');
assert.equal(rows.length, reviewByDocument.size, 'All six audited leads must be present');
assert.equal(new Set(rows.map(row => row.document)).size, rows.length, 'Duplicate archival item');
rows.forEach(verify);

// Negative fixtures protect against invented transfer arrows, amounts, payer
// names, hidden new fields, and inflated claims of original-document review.
for (const field of ['paid', 'transfer', 'liable']) {
  for (const badValue of [0, false, 'French Crown', {}, []]) {
    assert.throws(() => verify({...rows[0], [field]: badValue}));
  }
}
assert.throws(() => verify({...rows[0], payer: 'French Crown'}));
assert.throws(() => verify({...rows[0], payment_amount: 29000}));
assert.throws(() => verify({...rows[0], review: 'original_decree_transcribed'}));
assert.throws(() => verify({...rows[2], review: 'title_page'}));
console.log('OK: six Louisiana archival leads, exact review levels and negative payment fixtures');
