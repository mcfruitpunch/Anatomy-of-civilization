#!/usr/bin/env node
// V1.4: validate the 23 January 1731 printed retrocession decree from a
// 1985 microfiche facsimile, without promoting it to the physical original
// or to the separate 24 February 1731 Company-debt decree.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const sources = load('sources');
const extracts = load('source_extracts');
const documents = load('archival_documents');
const events = load('events');
const witnesses = load('louisiana_decree_witnesses');
const ledger = load('louisiana_liability_ledger');
const sourceMap = new Map(sources.map(s=>[s.id,s]));
const source = sourceMap.get('src-cihm-1731-retrocession-microfiche');
const peoria = sourceMap.get('src-peoria-tribe-history');
const extract = extracts.find(x=>x.id==='extract-011');
const doc = documents.find(x=>x.id==='doc-022');
const debt = documents.find(x=>x.id==='doc-024');
const event = events.find(x=>x.id==='evt-1731-louisiana-retrocession');
const witness = witnesses.find(x=>x.id==='witness-retrocession-1731-title');
function verifyExtract(x) {
  assert(x && x.id==='extract-011');
  assert.equal(x.date,'1731-01-23');
  assert.equal(x.date_role,'underlying_royal_act_date_not_1985_microfiche_reproduction_date');
  assert.equal(x.reading_level,'primary_print_microform_facsimile_transcription');
  assert.equal(x.language_original,'fr');
  assert.deepEqual(x.reported_numbers,[]);
  assert(x.sources.includes('src-cihm-1731-retrocession-microfiche'));
  assert(x.sources.includes('src-peoria-tribe-history'));
  assert(x.sources.includes('src-mercure-1731-retrocession-extract'));
  assert(Array.isArray(x.transcription_pages) && x.transcription_pages.length===3);
  assert.deepEqual(x.transcription_pages.map(p=>p.pdf_page_index),[4,5,6]);
  assert.deepEqual(x.transcription_pages.map(p=>p.printed_page_label),['unnumbered title / first text page','2','3']);
  const t=x.transcription_pages.map(p=>p.text).join('\n');
  for(const phrase of ['Du 23. Janvier 1731','pour, & au nom de ladite Compagnie','Places, Forts, Bastimens, Artillerie','commerce de la Louisiane libre à tous ses Sujets','droits qu’elle a contre ses debiteurs de ladite Province','PHELYPEAUX','DE L’IMPRIMERIE ROYALE']) assert(t.includes(phrase),'Missing transcription phrase: '+phrase);
  assert(/1985/.test(x.limitations)&&/22X/.test(x.limitations)&&/microfiche/i.test(x.limitations));
  assert(/physical 1731 copy.*not examined/i.test(x.limitations));
  assert(/ANOM COL F3 242 fol\. 187.*not examined/i.test(x.limitations));
  assert(/24 February 1731/i.test(x.limitations));
  assert(/not.*Indigenous consent/i.test(x.limitations));
  assert(/enslaved people/i.test(x.limitations));
  assert(/no debtor.*amount.*payment/i.test(x.limitations));
}
assert(source && source.reviewed===true && source.url==='https://upload.wikimedia.org/wikipedia/commons/7/7f/Arrest_du_Conseil_d%27Estat_du_roy%2C_concernant_la_retrocession_faite_%C3%A0_Sa_Majest%C3%A9_par_la_Compagnie_des_Indes_%28IA_cihm_50701%29.pdf');
assert(/1985/.test(source.locator)&&/22X/.test(source.locator)&&/Seminary of Quebec Library/.test(source.locator));
assert(peoria && peoria.reviewed===true && peoria.author==='Peoria Tribe of Indians of Oklahoma');
assert(/sovereign nation/i.test(peoria.locator)&&/homelands/i.test(peoria.locator));
verifyExtract(extract);
assert(doc && doc.access_level==='microform_facsimile_text_examined');
assert(doc.sources.includes(source.id)&&doc.sources.includes(peoria.id));
assert(/rights against its debtors/i.test(doc.established));
assert(/physical 1731 copy.*not examined/i.test(doc.limitations));
assert(debt && debt.date==='1731-02-24' && debt.access_level==='catalogue_metadata_only');
assert(event && /rights against its debtors/i.test(event.summary)&&/not evidence of Indigenous consent/i.test(event.summary));
assert(witness && witness.operative_clauses_read===true&&witness.legal_debtor_verified===false&&witness.payment_verified===false);
assert(witness.access_attempts.some(a=>a.attempted_on==='2026-11-17'&&a.text_examined===true&&a.url===source.url));
const jan=ledger.find(x=>x.document==='doc-022'),feb=ledger.find(x=>x.document==='doc-024');
assert(jan&&jan.review==='facsimile_text'&&jan.paid===null&&jan.transfer===null&&jan.liable===null);
assert(feb&&feb.review==='catalogue'&&feb.paid===null&&feb.transfer===null&&feb.liable===null);
for(const bad of [
 {...extract,date:'1731-02-24'},
 {...extract,transcription_pages:extract.transcription_pages.slice(0,2)},
 {...extract,limitations:'Physical original and ANOM folio examined; payment verified.'},
 {...extract,reading_level:'original_physical_copy_transcribed'}
]) assert.throws(()=>verifyExtract(bad),'Date, page count, access or evidence level must not be overstated');
assert.throws(()=>verifyExtract({...extract,sources:['unknown-source']}));
console.log('OK: 23 January 1731 printed decree transcribed from three 1985 microfiche-facsimile frames; physical original and 24 February debt decree remain unread');
