#!/usr/bin/env node
// V1.4: historical exhibition catalogues are custody leads, not present-day
// provenance, decree witnesses, liability assignments, or payment evidence.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const leads = load('louisiana_decree_custody_leads');
const sources = new Map(load('sources').map(s => [s.id, s]));
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const expected = new Map([
  ['custody-lead-company-debt-1903-exhibit', {target_document:'doc-024', source_id:'src-lhs-1903-cusachs-decree-exhibit', printed_page:17, pdf_page_index:18, item_number:345, item_level_owner_attribution:'Mr. Gaspar Cusachs', attribution_kind:'catalogue_owner_column', catalogue_date:'1903-12-20', catalogue_year:null}],
  ['custody-lead-retrocession-1903-exhibit', {target_document:'doc-022', source_id:'src-lhs-1903-cusachs-decree-exhibit', printed_page:17, pdf_page_index:18, item_number:342, item_level_owner_attribution:'Mr. Gaspar Cusachs', attribution_kind:'catalogue_owner_column', catalogue_date:'1903-12-20', catalogue_year:null}],
  ['catalogue-lead-company-debt-1904-exhibit', {target_document:'doc-024', source_id:'src-exposition-francaise-1904-catalogue', printed_page:21, pdf_page_index:24, item_number:72, item_level_owner_attribution:null, attribution_kind:'none', catalogue_date:null, catalogue_year:1904}]
]);
assert(Array.isArray(leads) && leads.length === expected.size, 'Expected exactly three historical catalogue leads');
assert.equal(new Set(leads.map(x=>x.id)).size, leads.length, 'Duplicate catalogue lead ID');
const keys = ['id','target_document','source_id','catalogue_date','catalogue_year','printed_page','pdf_page_index','item_number','item_title','item_level_owner_attribution','attribution_kind','inspection_level','inspection_date','established','not_established','preface_note','current_custody_verified','decree_text_examined','payment_verified'].sort();
function verify(x) {
  assert.deepEqual(Object.keys(x).sort(), keys, 'Unknown or missing custody-lead field: ' + x.id);
  const e = expected.get(x.id);
  assert(e, 'Unknown catalogue lead');
  for (const [k,v] of Object.entries(e)) assert.equal(x[k],v,'Incorrect catalogue locator or attribution: '+x.id+'.'+k);
  assert(documents.has(x.target_document),'Unknown target document');
  const s=sources.get(x.source_id);
  assert(s && s.reviewed===true && /^https:\/\//.test(s.url||'') && s.locator,'Catalogue lead needs reviewed, precisely located source');
  assert(Number.isInteger(x.printed_page) && x.printed_page>0,'Printed page required');
  assert(Number.isInteger(x.pdf_page_index) && x.pdf_page_index>=0,'PDF page index required');
  assert(Number.isInteger(x.item_number) && x.item_number>0,'Catalogue item number required');
  assert.equal(x.inspection_level,'page_image_visually_examined','Inspection level must reflect the actual catalogue page image');
  assert.equal(x.inspection_date,'2026-11-18','Inspection date must be explicit');
  assert(typeof x.item_title==='string' && x.item_title.length>30,'Catalogue title transcription missing');
  assert(Array.isArray(x.not_established) && x.not_established.length>=5,'Unresolved custody limits must be explicit');
  for (const term of ['present custody','operative','payment']) assert(x.not_established.some(v=>v.toLowerCase().includes(term)),'Missing limitation: '+term);
  assert.equal(x.current_custody_verified,false,'Historical exhibit catalogue cannot establish present custody');
  assert.equal(x.decree_text_examined,false,'Catalogue title is not decree-text examination');
  assert.equal(x.payment_verified,false,'Catalogue listing is not payment evidence');
  assert(!('payer' in x) && !('amount' in x) && !('liability' in x) && !('current_owner' in x),'No financial or present-custody inference fields permitted');
  if (x.id==='catalogue-lead-company-debt-1904-exhibit') {
    assert.equal(x.item_level_owner_attribution,null,'1904 item 72 has no item-level owner');
    assert.equal(x.attribution_kind,'none');
    assert(/does not assign item 72 to him/i.test(x.preface_note),'General preface acknowledgement must not be promoted to item-level ownership');
  } else {
    assert.equal(x.preface_note,null,'1903 catalogue has no 1904 preface note');
    assert.equal(x.item_level_owner_attribution,'Mr. Gaspar Cusachs');
    assert.equal(x.attribution_kind,'catalogue_owner_column');
  }
}
leads.forEach(verify);
const debt1903=leads.find(x=>x.id==='custody-lead-company-debt-1903-exhibit');
const retro1903=leads.find(x=>x.id==='custody-lead-retrocession-1903-exhibit');
const debt1904=leads.find(x=>x.id==='catalogue-lead-company-debt-1904-exhibit');
assert.equal(debt1903.target_document,debt1904.target_document,'Two catalogue references should point to the same dated act record');
assert.equal(retro1903.item_level_owner_attribution,'Mr. Gaspar Cusachs');
assert.throws(()=>verify({...debt1904,item_level_owner_attribution:'Mr. Gaspar Cusachs'}));
assert.throws(()=>verify({...debt1903,current_custody_verified:true}));
assert.throws(()=>verify({...debt1903,payment_verified:true}));
assert.throws(()=>verify({...debt1903,decree_text_examined:true}));
console.log('OK: 1903 and 1904 exhibition catalogue leads are precisely located; current custody, decree text and payment remain unverified');
