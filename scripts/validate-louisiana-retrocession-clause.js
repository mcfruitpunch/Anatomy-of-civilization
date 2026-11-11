#!/usr/bin/env node
// V1.4: a contemporary extract can document the Company's creditor-side rights
// without proving Company liabilities, Crown assumption, enforcement, or payment.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const sources = load('sources');
const extracts = load('source_extracts');
const documents = load('archival_documents');
const events = load('events');
const ledger = load('louisiana_liability_ledger');
const sourceIds = new Set(sources.map(s => s.id));
const extract = extracts.find(x => x.id === 'extract-008');
const document = documents.find(x => x.id === 'doc-022');
const debtDecree = documents.find(x => x.id === 'doc-024');
const event = events.find(x => x.id === 'evt-1731-louisiana-retrocession');

function verifyExtract(x) {
  assert(x && x.id === 'extract-008', 'Missing retrocession extract');
  assert.equal(x.date, '1731-01-23', 'Do not substitute the March periodical issue date');
  assert.equal(x.reading_level, 'contemporary_periodical_extract_ocr', 'Do not promote OCR extract to original decree');
  assert.equal(x.language_original, 'fr');
  assert.deepEqual(x.reported_numbers, [], 'This clause extract supplies no financial or population total');
  assert(x.sources.includes('src-mercure-1731-retrocession-extract'), 'Contemporary periodical source missing');
  assert(x.sources.includes('src-terrien-2020-dissertation'), 'Scholarly context missing');
  assert(x.sources.every(id => sourceIds.has(id)), 'Unknown source in extract');
  assert(/rights against its debtors/i.test(x.paraphrase), 'Company creditor-side clause must be stated precisely');
  assert(/not evidence of a Company liability/i.test(x.paraphrase), 'Creditor rights must be distinguished from Company liabilities');
  assert(/OCR/i.test(x.limitations) && /not.*original/i.test(x.limitations), 'OCR and unexamined-original limits must remain explicit');
  assert(/24 February 1731/i.test(x.limitations), 'Separate debt decree must remain distinct');
  assert(!/(?:^|[.;]\\s*)(?:the Crown assumed|the Crown paid|debt settled|payment (?:made|received))/i.test(x.paraphrase), 'Unsupported settlement/payment claim');
}
function verifyDocument(d) {
  assert.equal(d.id, 'doc-022');
  assert.equal(d.access_level, 'contemporary_periodical_extract');
  assert(d.sources.includes('src-mercure-1731-retrocession-extract'));
  assert(/rights against its debtors/i.test(d.established));
  assert(/not.*examined/i.test(d.limitations));
  assert(/not.*24 February/i.test(d.limitations));
}
verifyExtract(extract);
verifyDocument(document);
assert.equal(debtDecree.access_level, 'catalogue_metadata_only', '24 February debt decree must remain catalogue-only');
assert(event && /creditor claims\/receivables/i.test(event.summary), 'Retrocession event must preserve creditor/liability distinction');
for (const docId of ['doc-022', 'doc-024']) {
  const row = ledger.find(x => x.document === docId);
  assert(row, 'Liability ledger row missing: ' + docId);
  for (const field of ['paid', 'transfer', 'liable']) assert.equal(row[field], null, 'Unverified financial claim: ' + docId + ' ' + field);
}
assert.throws(() => verifyExtract({...extract, reading_level: 'original_decree_transcribed'}));
assert.throws(() => verifyExtract({...extract, paraphrase: 'The Crown assumed and paid all Company debts.'}));
assert.throws(() => verifyExtract({...extract, reported_numbers: [{value: 1000, unit: 'livres_tournois', meaning: 'invented'}]}));
assert.throws(() => verifyDocument({...document, access_level: 'original_text_examined'}));
console.log('OK: 23 January 1731 contemporary extract preserves Company creditor claims only; original decree and 24 February liabilities remain unverified');
