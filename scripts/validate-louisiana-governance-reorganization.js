#!/usr/bin/env node
// V1.4: keep the 22 May copy and 24 May archival reference distinct until both originals are read.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const sources = load('sources');
const documents = load('archival_documents');
const extracts = load('source_extracts');
const events = load('events');
const ledger = load('louisiana_liability_ledger');
const sourceMap = new Map(sources.map(s => [s.id, s]));
const doc = documents.find(x => x.id === 'doc-025');
const extract = extracts.find(x => x.id === 'extract-010');
const event = events.find(x => x.id === 'evt-1731-superior-council-reorganization');

function verifyExtract(x) {
  assert(x && x.id === 'extract-010', 'Missing 1731 governance extract');
  assert.equal(x.date, '1731-05-22', 'The event date is the 22 May copy cited at F3 242 fol.190');
  assert.equal(x.date_role, 'date_of_copy_cited_at_anom_f3_242_fol_190_not_directly_verified');
  assert.equal(x.reading_level, 'scholarly_synthesis_with_archival_footnotes_not_original_transcription');
  assert.equal(x.language_original, 'fr');
  assert.deepEqual(x.reported_numbers, [], 'This governance extract must not import financial amounts');
  assert(x.sources.includes('src-saadani-2003-fch'), 'Saadani 2003 source missing');
  assert(x.sources.includes('src-unilim-1731-retrocession'), 'Ribeaux 2026 source missing');
  assert(x.sources.includes('src-ull-collection-329-reel-inventory'), 'F3 242 microfilm retrieval route missing');
  assert(x.sources.includes('src-choctaw-fort-tombecbe-2023'), 'Community-authored context missing');
  assert(x.sources.every(id => sourceMap.has(id) && sourceMap.get(id).reviewed === true), 'Unknown or unreviewed source');
  assert(/Conseil de régie/.test(x.paraphrase), 'Company-representing governance council distinction missing');
  assert(/22 May 1731/.test(x.paraphrase) && /24 May 1731/.test(x.paraphrase), 'Both archival date references must be retained');
  assert(/unresolved/i.test(x.paraphrase), 'The date/instrument relationship must remain unresolved');
  assert(/Company directors/.test(x.paraphrase), 'The documented category-level exclusion must be retained');
  assert(/judges in distant places/.test(x.paraphrase), 'Remote-judge limitation must be retained');
  assert(/folios?.*not.*examined/i.test(x.limitations), 'Original-folio limitation missing');
  assert(/scholarly interpretation/i.test(x.limitations), 'Secondary interpretation must be labeled');
  assert(/not evidence of Indigenous consent/i.test(x.limitations), 'Indigenous sovereignty limitation missing');
  assert(/not imported/i.test(x.limitations), 'Saadani monetary claims must not be silently imported');
  assert(!/1,450,000|3,600,000|29,000/.test(x.paraphrase), 'Unverified monetary claim was imported');
}
function verifyDocument(d) {
  assert(d && d.id === 'doc-025', 'Missing Council reorganization document');
  assert.equal(d.date, '1731-05-22');
  assert.equal(d.access_level, 'scholarly_reference_only', 'Secondary citations are not catalogue inspection or original-text examination');
  assert(/F3 242 fol\. 190/.test(d.reference));
  assert(/A1-69 fol\. 20/.test(d.reference));
  assert(/24 May 1731/.test(d.reference));
  assert(/unresolved/i.test(d.established));
  assert(/not.*directly examined/i.test(d.limitations));
  assert(d.sources.includes('src-saadani-2003-fch') && d.sources.includes('src-unilim-1731-retrocession'));
}
function verifyEvent(e) {
  assert(e && e.id === 'evt-1731-superior-council-reorganization');
  assert.equal(e.date, '1731-05-22');
  assert(/24 May 1731/.test(e.summary) && /unresolved/i.test(e.summary));
  assert(e.sources.includes('src-saadani-2003-fch') && e.sources.includes('src-unilim-1731-retrocession'));
}
verifyExtract(extract);
verifyDocument(doc);
verifyEvent(event);
assert(!ledger.some(x => x.document === 'doc-025'), 'A governance reorganization is not a financial liability record');
for (const bad of [
  {...extract, date: '1731-05-24'},
  {...extract, reading_level: 'curated_modern_translation'},
  {...extract, reported_numbers: [{value: 1450000, unit: 'authorized_card_money_ceiling_livres_not_disbursed', meaning: 'unsupported Company indemnity'}]},
  {...extract, limitations: 'Original text was read and all directors were identified.'},
  {...extract, paraphrase: extract.paraphrase.replace('unresolved', 'confirmed identical')}
]) assert.throws(() => verifyExtract(bad), 'Unsupported date, evidence level, amount, or certainty must fail');
assert.throws(() => verifyDocument({...doc, access_level: 'original_text_examined'}));
assert.throws(() => verifyEvent({...event, date: '1731-05-24'}));
console.log('OK: 1731 Superior Council reorganization remains scholarly-reference-only; 22/24 May references remain unresolved and no financial claims are introduced');
