#!/usr/bin/env node
// A later compilation is a retrieval lead, not a decree witness until its contents are read.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const leads = load('louisiana_decree_retrieval_leads').leads;
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const leadKeys = [
  'id','target_document','lead_type','collection_title','publication_date','publisher',
  'bnf_catalogue_ark','bnf_notice_number','bnf_catalogue_url','volumes','physical_microfilm_shelfmarks',
  'chronological_index','source_ids','target_act_presence','volume_contents_examined',
  'target_page_locator','access_attempts','next_action'
].sort();
const volumeKeys = ['volume','digital_record','gallica_ark','gallica_url'].sort();
const indexKeys = ['volume','catalogue_description','table_contents_examined','target_entry_found'].sort();
const attemptKeys = ['volume','attempted_on','institution','url','outcome','content_level','text_examined'].sort();

function validateLead(item) {
  assert.deepEqual(Object.keys(item).sort(), leadKeys, 'Unknown or witness-like retrieval-lead field');
  assert.equal(item.id, 'lead-bnf-recuel-volume1-1755-56');
  assert.equal(item.target_document, 'doc-024');
  assert.equal(documents.get(item.target_document)?.date, '1731-02-24', 'Target must remain the dated 1731 decree');
  assert.equal(item.lead_type, 'later_compilation_retrieval_route');
  assert.equal(item.publication_date, '1755-1756');
  assert.equal(item.publisher, 'Paris: impr. Boudet');
  assert.equal(item.bnf_catalogue_ark, 'ark:/12148/cb338513279');
  assert.equal(item.bnf_notice_number, 'FRBNF33851327');
  assert.equal(item.bnf_catalogue_url, 'https://catalogue.bnf.fr/ark:/12148/cb338513279');
  assert(Array.isArray(item.volumes) && item.volumes.length === 4, 'Expected four catalogued digital volumes');
  const expected = [
    ['T.1','NUMM-110272','ark:/12148/bpt6k1102726'],
    ['T.2','NUMM-110273','ark:/12148/bpt6k110273k'],
    ['T.3','NUMM-110274','ark:/12148/bpt6k110274z'],
    ['T.4','NUMM-110275','ark:/12148/bpt6k110275b']
  ];
  item.volumes.forEach((volume, i) => {
    assert.deepEqual(Object.keys(volume).sort(), volumeKeys, 'Unknown volume field');
    assert.deepEqual([volume.volume, volume.digital_record, volume.gallica_ark], expected[i]);
    assert(/^https:\/\/gallica\.bnf\.fr\/ark%3A\/12148\//.test(volume.gallica_url), 'Unverified Gallica URL');
  });
  assert.deepEqual(item.physical_microfilm_shelfmarks,
    ['MFILM V-13992','MFILM V-13993','MFILM V-13994','MFILM V-13995']);
  assert.deepEqual(Object.keys(item.chronological_index).sort(), indexKeys);
  assert.equal(item.chronological_index.volume, 'T.4');
  assert.equal(item.chronological_index.catalogue_description,
    'Table générale chronologique des pièces contenues dans les volumes de la collection des privilèges de la Compagnie des Indes');
  assert.equal(item.chronological_index.table_contents_examined, false);
  assert.equal(item.chronological_index.target_entry_found, false);
  assert.equal(item.target_act_presence, 'not_verified');
  assert.equal(item.volume_contents_examined, false);
  assert.equal(item.target_page_locator, null);
  assert(Array.isArray(item.source_ids) && item.source_ids.length === 5, 'Expected five catalogue/bibliographic provenance records');
  assert.equal(new Set(item.source_ids).size, item.source_ids.length, 'Duplicate source ID');
  for (const id of item.source_ids) {
    const source = sources.get(id);
    assert(source && source.reviewed === true && /^https:\/\//.test(source.url) && source.locator,
      'Missing or unlocated retrieval provenance: ' + id);
  }
  assert(item.source_ids.includes('src-bnf-recuel-collection-notice'));
  assert(item.source_ids.includes('src-bnf-company-indes-collection-context'));
  assert(item.source_ids.includes('src-bnf-recuel-volume1-gallica'));
  assert(item.source_ids.includes('src-editions-du-net-recuel-t1'));
  assert(item.source_ids.includes('src-french-books-india-recuel-1755-56'));
  assert(Array.isArray(item.access_attempts) && item.access_attempts.length === 4);
  item.access_attempts.forEach((attempt, i) => {
    assert.deepEqual(Object.keys(attempt).sort(), attemptKeys, 'Unknown access-attempt field');
    assert.equal(attempt.volume, expected[i][0]);
    assert.equal(attempt.attempted_on, '2026-11-15');
    assert.equal(attempt.institution, 'Bibliothèque nationale de France, Gallica');
    assert.equal(attempt.url, item.volumes[i].gallica_url);
    assert.equal(attempt.outcome, 'http_403_forbidden');
    assert.equal(attempt.content_level, 'access_error_no_document_text');
    assert.equal(attempt.text_examined, false);
  });
  assert(/T\.4/.test(item.next_action) && /Table générale chronologique/.test(item.next_action));
  assert(/do not promote this compilation to a decree witness/i.test(item.next_action));
  return true;
}

assert(Array.isArray(leads) && leads.length === 2, 'Expected the original BnF retrieval lead plus one separate 1744–45 scope check');
const bnfLead = leads.find(x => x.id === 'lead-bnf-recuel-volume1-1755-56');
assert(bnfLead, 'Missing original BnF retrieval lead');
validateLead(bnfLead);

// Regression guards: catalogue metadata must never be promoted to inspected content or a located act.
const promote = (mutate) => {
  const bad = structuredClone(bnfLead);
  mutate(bad);
  return () => validateLead(bad);
};
assert.throws(promote(x => { x.target_act_presence = 'confirmed'; }), 'Target presence cannot be promoted without page evidence');
assert.throws(promote(x => { x.volume_contents_examined = true; }), 'Unexamined volumes cannot be marked read');
assert.throws(promote(x => { x.target_page_locator = 'p. 123'; }), 'No page locator may be invented');
assert.throws(promote(x => { x.chronological_index.table_contents_examined = true; }), 'The T.4 table cannot be marked read');
assert.throws(promote(x => { x.chronological_index.target_entry_found = true; }), 'No target entry may be claimed without inspection');
console.log('OK: BnF four-volume Recueil is a catalogue-only retrieval route; T.4 index, target-act presence and pages remain unexamined');
