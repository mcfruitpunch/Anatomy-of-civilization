#!/usr/bin/env node
// V1.4: distinguish the 23 January royal retrocession text from the separate
// 24 February Company-debt decree, and distinguish a microfiche facsimile from
// the physical original and from a contemporary periodical OCR extract.
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
const primary = extracts.find(x => x.id === 'extract-011');
const document = documents.find(x => x.id === 'doc-022');
const debtDecree = documents.find(x => x.id === 'doc-024');
const event = events.find(x => x.id === 'evt-1731-louisiana-retrocession');
function verifyPeriodical(x) {
  assert(x && x.id === 'extract-008', 'Missing contemporary periodical extract');
  assert.equal(x.date, '1731-01-23', 'Do not substitute the March periodical issue date');
  assert.equal(x.reading_level, 'contemporary_periodical_extract_ocr', 'Do not promote OCR extract to original decree');
  assert.equal(x.language_original, 'fr');
  assert.deepEqual(x.reported_numbers, [], 'This clause extract supplies no financial or population total');
  assert(x.sources.includes('src-mercure-1731-retrocession-extract'), 'Contemporary periodical source missing');
  assert(x.sources.every(id => sourceIds.has(id)), 'Unknown source in periodical extract');
  assert(/rights against its debtors/i.test(x.paraphrase), 'Company creditor-side clause must be stated precisely');
  assert(/not evidence of a Company liability/i.test(x.paraphrase), 'Creditor rights must be distinguished from Company liabilities');
  assert(/OCR/i.test(x.limitations) && /not.*original/i.test(x.limitations), 'OCR and unexamined-original limits must remain explicit');
  assert(/24 February 1731/i.test(x.limitations), 'Separate debt decree must remain distinct');
}
function verifyPrimary(x) {
  assert(x && x.id === 'extract-011', 'Missing full primary-print transcription');
  assert.equal(x.date, '1731-01-23');
  assert.equal(x.date_role, 'underlying_royal_act_date_not_1985_microfiche_reproduction_date');
  assert.equal(x.reading_level, 'primary_print_microform_facsimile_transcription');
  assert.equal(x.language_original, 'fr');
  assert.deepEqual(x.reported_numbers, []);
  assert(x.sources.includes('src-cihm-1731-retrocession-microfiche'));
  assert(x.sources.includes('src-peoria-tribe-history'), 'Community-authored Illinois/Illini perspective missing');
  assert(x.sources.includes('src-mercure-1731-retrocession-extract'), 'Contemporary periodical cross-check missing');
  assert(x.sources.every(id => sourceIds.has(id)), 'Unknown source in primary transcription');
  assert(Array.isArray(x.transcription_pages) && x.transcription_pages.length === 3, 'All three printed pages must be transcribed');
  assert.deepEqual(x.transcription_pages.map(p => p.pdf_page_index), [4,5,6], 'Exact facsimile page indices required');
  assert.deepEqual(x.transcription_pages.map(p => p.printed_page_label), ['unnumbered title / first text page','2','3']);
  const text = x.transcription_pages.map(p => p.text).join('\n');
  for (const phrase of ['Du 23. Janvier 1731','pour, & au nom de ladite Compagnie','Places, Forts, Bastimens, Artillerie','commerce de la Louisiane libre à tous ses Sujets','droits qu’elle a contre ses debiteurs de ladite Province','PHELYPEAUX','DE L’IMPRIMERIE ROYALE']) assert(text.includes(phrase), 'Transcription missing printed wording: '+phrase);
  assert(/1985/.test(x.limitations) && /22X/.test(x.limitations) && /microfiche/i.test(x.limitations), 'Reproduction details missing');
  assert(/physical 1731 copy.*not examined/i.test(x.limitations), 'Do not claim the physical original was examined');
  assert(/ANOM COL F3 242 fol\. 187.*not examined/i.test(x.limitations), 'Manuscript folio limitation missing');
  assert(/24 February 1731/i.test(x.limitations), 'Separate debt decree limitation missing');
  assert(/not.*Indigenous consent/i.test(x.limitations), 'Indigenous sovereignty limitation missing');
  assert(/enslaved people/i.test(x.limitations), 'Human consequences and archival omissions limitation missing');
  assert(/no debtor.*amount.*payment/i.test(x.limitations), 'Financial non-claims missing');
}
function verifyDocument(d) {
  assert.equal(d.id, 'doc-022');
  assert.equal(d.access_level, 'microform_facsimile_text_examined');
  assert(d.sources.includes('src-cihm-1731-retrocession-microfiche'));
  assert(d.sources.includes('src-peoria-tribe-history'));
  assert(/rights against its debtors/i.test(d.established));
  assert(/1985.*22X.*microfiche/i.test(d.limitations));
  assert(/physical 1731 copy.*not examined/i.test(d.limitations));
  assert(/not.*24 February/i.test(d.limitations));
}
verifyPeriodical(extract);
verifyPrimary(primary);
verifyDocument(document);
assert.equal(debtDecree.access_level, 'catalogue_metadata_only', '24 February debt decree must remain catalogue-only');
assert(event && /rights against its debtors/i.test(event.summary), 'Retrocession event must preserve creditor/liability distinction');
assert(/not evidence of Indigenous consent/i.test(event.summary), 'Event must not imply Indigenous consent');
for (const docId of ['doc-022','doc-024']) {
  const row = ledger.find(x => x.document === docId);
  assert(row, 'Liability ledger row missing: '+docId);
  for (const field of ['paid','transfer','liable']) assert.equal(row[field],null,'Unverified financial claim: '+docId+' '+field);
}
assert.equal(ledger.find(x=>x.document==='doc-022').review,'facsimile_text');
assert.equal(ledger.find(x=>x.document==='doc-024').review,'catalogue');
assert.throws(()=>verifyPrimary({...primary,date:'1731-02-24'}));
assert.throws(()=>verifyPrimary({...primary,transcription_pages:primary.transcription_pages.slice(0,2)}));
assert.throws(()=>verifyPrimary({...primary,limitations:'Physical original and ANOM folio examined; payment verified.'}));
assert.throws(()=>verifyDocument({...document,access_level:'original_physical_copy_examined'}));
assert.throws(()=>verifyDocument({...document,established:'The Crown paid all Company debts.'}));
console.log('OK: January 23 decree transcribed from three-page microfiche facsimile; February 24 debt decree and all payment/liability fields remain unverified');
