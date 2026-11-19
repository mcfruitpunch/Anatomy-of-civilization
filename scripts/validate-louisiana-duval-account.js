#!/usr/bin/env node
// V1.4: the Duval card is an English index aid, not a transcription of the
// underlying French account. Its amount, dates and direction remain qualified.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const sources = load('sources'), docs = load('archival_documents'), extracts = load('source_extracts');
const events = load('events'), cases = load('cases'), flows = load('financial_flows'), ledger = load('louisiana_liability_ledger');
const source = sources.find(x => x.id === 'src-lcd-duval-account-1732');
const method = sources.find(x => x.id === 'src-lcd-indexing-method-and-wpa');
const doc = docs.find(x => x.id === 'doc-029');
const extract = extracts.find(x => x.id === 'extract-012');
const event = events.find(x => x.id === 'evt-1732-duval-account-index-card');
const study = cases.find(x => x.id === 'retrocession1731');
const row = ledger.find(x => x.document === 'doc-029');
const assets = ['125822','125818','125819','125820','125821'];
function verify(x) {
  assert(x && x.id === 'extract-012','Duval extract missing');
  assert.equal(x.reading_level,'institutional_index_card_transcription_not_original_manuscript');
  assert.equal(x.language_original,'en');
  assert.equal(x.date,'1732-07-15');
  assert.equal(x.date_role,'louisiana_historical_center_record_date_not_card_reported_account_close');
  assert(x.transcription.includes('STATEMENT OF ACCOUNTS DUE FROM THE IND. CO.'));
  assert(x.transcription.includes('as of 15 January 1736'));
  assert(x.transcription.includes('101,975 livres 6 sols 2 deniers'));
  assert(x.transcription.includes('On July 15, 1732, by Bruslé'));
  assert(x.transcription.includes('On January 15, 1736, by Prevost'));
  assert.equal(x.reported_amounts.length,1);
  assert.deepEqual(x.reported_amounts[0],{
    livres:101975,sols:6,deniers:2,wording:'101,975 livres 6 sols 2 deniers',
    account_as_of:'1736-01-15',
    direction_in_prose:'balance due the Company by the succession of Sr. Duval',
    heading_direction:'DUE FROM THE IND. CO.',
    direction_status:'heading_prose_conflict',
    verification:'index_card_only_not_original_account'
  });
  for (const field of ['card_origin_verified','original_manuscript_transcribed','legal_liability_verified','payment_verified','financial_ledger_entry_created']) assert.equal(x[field],false);
  assert(/author.*date.*not.*established/i.test(x.limitations));
  assert(/not.*payment/i.test(x.limitations));
  assert(/women.*enslaved/i.test(x.limitations));
  assert.equal(doc?.date,'1732-07-15');
  assert.equal(doc?.access_level,'index_card_transcribed_manuscript_images_previewed_not_transcribed');
  assert(/1736/.test(doc?.limitations||'') && /heading/i.test(doc?.limitations||''));
  assert(source?.reviewed===true && source.url==='https://lacolonialdocs.org/document/2148');
  assert(method?.reviewed===true && /1935.?1942/.test(method.locator));
  for(const id of assets) assert(source.locator.includes('doc-img-'+id+'.jpg'),'Missing observed image asset '+id);
  assert.equal(event?.date,'1732-07-15');
  assert.equal(event?.date_role,'archive_catalogue_date_not_resolved_account_close');
  assert(event?.summary.includes('101,975 livres 6 sols 2 deniers'));
  assert(event?.summary.includes('conflicts'));
  assert(study?.events.includes(event.id));
  assert.equal(row?.review,'index_card_transcribed_manuscript_unread');
  for(const field of ['paid','transfer','liable']) assert.equal(row[field],null);
  assert(!flows.some(f=>(f.sources||[]).includes('src-lcd-duval-account-1732')),'Index-card balance cannot become a financial flow');
}
verify(extract);
assert.throws(()=>verify({...extract,payment_verified:true}));
assert.throws(()=>verify({...extract,legal_liability_verified:true}));
assert.throws(()=>verify({...extract,card_origin_verified:true}));
assert.throws(()=>verify({...extract,original_manuscript_transcribed:true}));
assert.throws(()=>verify({...extract,reported_amounts:[{...extract.reported_amounts[0],direction_status:'company_receivable_verified'}]}));
assert.throws(()=>verify({...extract,date_role:'account_closing_date'}));
console.log('OK: Duval index card only; 1732/1736 chronology and heading/prose conflict retained; no verified liability or payment');
