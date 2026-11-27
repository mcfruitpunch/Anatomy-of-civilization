#!/usr/bin/env node
// Negative scope check: a contents transcription is not a page-level decree witness.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const leads = load('louisiana_decree_retrieval_leads').leads;
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const extracts = load('source_extracts');
const witnesses = load('louisiana_decree_witnesses');
const leadKeys = [
  'id','target_document','lead_type','collection_title','publication_dates','publisher','volumes',
  'toc_scope_check','volume2_contents_examined','target_act_presence','volume_contents_examined',
  'target_page_locator','source_ids','next_action'
].sort();
const volumeKeys = ['volume','publication_year','page_count','commons_url','wikisource_url','source_id'].sort();
const tocKeys = [
  'volume','contents_locator','source_id','contents_text_examined','printed_toc_page','printed_page_image_examined',
  'target_title_listed','listed_louisiana_related_entries','scope_limit','wikisource_volume_label_conflict'
].sort();

const lead = leads.find(x => x.id === 'lead-commons-wikisource-1744-45-regulations-toc-check');
assert(lead, 'Missing 1744–45 colonial-regulations scope check');
assert.deepEqual(Object.keys(lead).sort(), leadKeys, 'Unknown or witness-like lead field');
assert.equal(lead.target_document, 'doc-024');
assert.equal(documents.get('doc-024')?.date, '1731-02-24');
assert.equal(lead.lead_type, 'later_compilation_scope_check');
assert.deepEqual(lead.publication_dates, ['1744','1745']);
assert.equal(lead.publisher, 'Paris: Libraires associés');
assert.equal(lead.volumes.length, 2);
const expectedVolumes = [
  ['Tome I',1744,218,'src-commons-regulations-tome1-1744'],
  ['Tome II',1745,373,'src-commons-regulations-tome2-1745']
];
lead.volumes.forEach((v,i) => {
  assert.deepEqual(Object.keys(v).sort(), volumeKeys, 'Unknown compilation-volume field');
  assert.deepEqual([v.volume,v.publication_year,v.page_count,v.source_id],expectedVolumes[i]);
  assert(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:Recueils_de_reglemens/.test(v.commons_url));
  assert(/^https:\/\/fr\.wikisource\.org\/wiki\/Livre:Recueils_de_reglemens/.test(v.wikisource_url));
  const source=sources.get(v.source_id);
  assert(source && source.reviewed===true && source.url===v.commons_url && source.locator,'Missing file metadata provenance');
});
assert.deepEqual(Object.keys(lead.toc_scope_check).sort(),tocKeys);
const toc=lead.toc_scope_check;
assert.equal(toc.volume,'Tome I');
assert.equal(toc.source_id,'src-wikisource-regulations-tome1-contents');
assert.equal(toc.contents_text_examined,true);
assert.equal(toc.printed_page_image_examined,false);
assert.equal(toc.printed_toc_page,211);
assert.equal(toc.target_title_listed,false);
assert.deepEqual(toc.listed_louisiana_related_entries,[
  '1724 Louisiana Code Noir (p. 135)',
  '1734 trade-certificate ordinance (p. 188)',
  '1736 manumission/baptism ordinance (p. 202)',
  '1738 slave-related declaration (p. 156)',
  '1742 trade exemption ordinance (p. 205)'
]);
assert(/not proof of absence from Tome II/i.test(toc.scope_limit));
assert(/labels I\.djvu as tome ii and II\.djvu as tome i/i.test(toc.wikisource_volume_label_conflict));
assert.equal(lead.volume2_contents_examined,false);
assert.equal(lead.target_act_presence,'not_listed_in_tome1_contents_only');
assert.equal(lead.volume_contents_examined,false);
assert.equal(lead.target_page_locator,null);
assert.deepEqual(lead.source_ids,[
  'src-commons-regulations-tome1-1744',
  'src-wikisource-regulations-tome1-contents',
  'src-commons-regulations-tome2-1745'
]);
lead.source_ids.forEach(id => {
  const source=sources.get(id);
  assert(source && source.reviewed===true && /^https:\/\//.test(source.url) && source.locator,'Missing source provenance '+id);
});
assert(/contents transcription/i.test(sources.get(toc.source_id).locator));
assert(/not.*examined/i.test(sources.get(toc.source_id).locator));
assert.equal(documents.get('doc-024').access_level,'catalogue_metadata_only','The new compilation is not a direct decree witness');
assert(!extracts.some(x=>x.document==='doc-024' && /1744|1745/.test(x.id)),'Do not create a source extract from a contents list');
assert(!witnesses.some(x=>x.id===lead.id),'A retrieval lead cannot be promoted to a printed witness');

// Negative fixtures prevent catalog/index evidence from becoming page-level or liability evidence.
const promote=mutate=>{const bad=structuredClone(lead);mutate(bad);return()=>validate(bad)};
function validate(x){
  assert.deepEqual(Object.keys(x).sort(),leadKeys);
  assert.deepEqual(x.volumes.map(v=>[v.volume,v.publication_year,v.page_count,v.source_id]),expectedVolumes);
  assert.deepEqual(x.source_ids,['src-commons-regulations-tome1-1744','src-wikisource-regulations-tome1-contents','src-commons-regulations-tome2-1745']);
  assert.deepEqual(Object.keys(x.toc_scope_check).sort(),tocKeys);
  assert.equal(x.target_act_presence,'not_listed_in_tome1_contents_only');
  assert.equal(x.volume_contents_examined,false);
  assert.equal(x.volume2_contents_examined,false);
  assert.equal(x.target_page_locator,null);
  assert.equal(x.toc_scope_check.target_title_listed,false);
  assert.equal(x.toc_scope_check.printed_page_image_examined,false);
  assert.equal(x.toc_scope_check.contents_text_examined,true);
  assert.equal(x.toc_scope_check.volume,'Tome I');
  assert.equal(documents.get(x.target_document)?.access_level,'catalogue_metadata_only');
  x.source_ids.forEach(id=>assert(sources.has(id)));
}
assert.throws(promote(x=>{x.toc_scope_check.target_title_listed=true;}));
assert.throws(promote(x=>{x.toc_scope_check.printed_page_image_examined=true;}));
assert.throws(promote(x=>{x.volume2_contents_examined=true;}));
assert.throws(promote(x=>{x.volume_contents_examined=true;}));
assert.throws(promote(x=>{x.target_act_presence='confirmed_in_compilation';}));
assert.throws(promote(x=>{x.target_page_locator='p. 42';}));
assert.throws(promote(x=>{x.source_ids.push('invented-source');}));
assert.throws(promote(x=>{x.volumes[0].publication_year=1745;}));
assert.throws(promote(x=>{x.toc_scope_check.volume='Tome II';}));
validate(lead);
console.log('OK: 1744–45 colonial-regulations collection is only a retrieval/scope lead; Tome I contents list does not include target decree, Tome II and page images remain unexamined');
