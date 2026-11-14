#!/usr/bin/env node
// A later compilation is a retrieval lead, not a decree witness until its contents are read.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const leads = load('louisiana_decree_retrieval_leads').leads;
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const keys = ['id','target_document','lead_type','collection_title','publication_date','volume_designation',
  'gallica_ark','gallica_thumbnail_url','source_ids','target_act_presence','volume_contents_examined',
  'target_page_locator','access_attempts','next_action'].sort();
assert(Array.isArray(leads) && leads.length === 1, 'Expected one bounded BnF compilation retrieval lead');
const lead = leads[0];
assert.deepEqual(Object.keys(lead).sort(), keys, 'Unknown or witness-like retrieval-lead field');
assert.equal(lead.id, 'lead-bnf-recuel-volume1-1755-56');
assert.equal(lead.target_document, 'doc-024');
assert.equal(documents.get(lead.target_document)?.date, '1731-02-24', 'Target must remain the dated 1731 decree');
assert.equal(lead.lead_type, 'later_compilation_retrieval_route');
assert.equal(lead.publication_date, '1755-1756');
assert.equal(lead.volume_designation, 'T. 1 (identified by secondary bibliographic cross-reference)');
assert.equal(lead.gallica_ark, 'ark:/12148/bpt6k1102726');
assert.equal(lead.gallica_thumbnail_url, 'https://gallica.bnf.fr/ark%3A/12148/bpt6k1102726.thumbnail');
assert.equal(lead.target_act_presence, 'not_verified');
assert.equal(lead.volume_contents_examined, false);
assert.equal(lead.target_page_locator, null);
assert(Array.isArray(lead.source_ids) && lead.source_ids.length === 4, 'Expected BnF and bibliographic provenance');
assert.equal(new Set(lead.source_ids).size, lead.source_ids.length, 'Duplicate source ID');
for (const id of lead.source_ids) {
  const source = sources.get(id);
  assert(source && source.reviewed === true && /^https:\/\//.test(source.url) && source.locator,
    'Missing or unlocated retrieval provenance: ' + id);
}
assert(lead.source_ids.includes('src-bnf-company-indes-collection-context'));
assert(lead.source_ids.includes('src-bnf-recuel-volume1-gallica'));
assert(lead.source_ids.includes('src-editions-du-net-recuel-t1'));
assert(lead.source_ids.includes('src-french-books-india-recuel-1755-56'));
assert(Array.isArray(lead.access_attempts) && lead.access_attempts.length === 1);
const attempt = lead.access_attempts[0];
assert.deepEqual(Object.keys(attempt).sort(),
  ['attempted_on','institution','url','outcome','content_level','text_examined'].sort(),
  'Unknown access-attempt field');
assert.equal(attempt.attempted_on, '2026-11-14');
assert.equal(attempt.url, lead.gallica_thumbnail_url);
assert.equal(attempt.outcome, 'http_403_forbidden');
assert.equal(attempt.content_level, 'access_error_no_document_text');
assert.equal(attempt.text_examined, false);
assert(/obtain|request|search/i.test(lead.next_action));
assert(/do not add this compilation as a decree witness/i.test(lead.next_action));
assert(!/the decree is included|the decree appears in this volume|operative clauses read/i.test(lead.next_action));
for (const field of ['target_act_presence','volume_contents_examined','target_page_locator']) {
  assert.throws(() => {
    const bad = {...lead};
    if (field === 'target_act_presence') bad[field] = 'confirmed';
    else if (field === 'volume_contents_examined') bad[field] = true;
    else bad[field] = 'page 123';
    assert.deepEqual(Object.keys(bad).sort(), keys, 'Shape remains fixed');
    assert.equal(bad.target_act_presence, 'not_verified');
    assert.equal(bad.volume_contents_examined, false);
    assert.equal(bad.target_page_locator, null);
  }, 'Unverified compilation contents must not be promoted');
}
console.log('OK: BnF Recueil is a candidate retrieval route only; target act presence and pages remain unverified');
