#!/usr/bin/env node
// Access routes are institutional finding-aid leads, never readings of original legal clauses.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const routes = load('louisiana_archive_access_routes');
const docs = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const expected = new Map([
  ['route-ull-329-reel580-f3-242', {document:'doc-022', act_date:'1731-01-23', reel:580, inventory_scope:'ANOM F3 242, Code Louisiane, Tome II, 1724–1746'}],
  ['route-ull-329-reel574-a23', {document:'doc-030', act_date:'1735-03-30', reel:574, inventory_scope:'ANOM A 23, Actes du pouvoir souverain, 1712–1746'}]
]);
const keys = ['id','document','act_date','original_archive_locator','microfilm_collection','reel','inventory_scope',
  'source_ids','access_level','document_on_reel_verified','specific_frame_verified','original_text_read',
  'potential_match_reason','limitation','next_action'].sort();
function verify(row) {
  assert(row && typeof row === 'object' && !Array.isArray(row), 'Invalid access route');
  assert.deepEqual(Object.keys(row).sort(), keys, 'Unknown access/financial assertion field');
  const exp = expected.get(row.id);
  assert(exp, 'Unreviewed access route');
  for (const [key,value] of Object.entries(exp)) assert.equal(row[key],value,'Wrong route/document/date/reel: '+key);
  assert.equal(docs.get(row.document)?.date, row.act_date, 'Route date disagrees with documented original');
  assert.equal(row.microfilm_collection,'University of Louisiana at Lafayette, Collection 329');
  assert.equal(row.access_level,'reel_inventory_only','Cannot promote catalogue to original examination');
  for (const k of ['document_on_reel_verified','specific_frame_verified','original_text_read']) {
    assert.equal(row[k],false,'No original reel/frame or clause has been examined: '+k);
  }
  assert(Array.isArray(row.source_ids) && row.source_ids.length >= 3,'Missing finding aid, access policy, or document locator');
  assert.equal(new Set(row.source_ids).size,row.source_ids.length,'Duplicate provenance source');
  assert(row.source_ids.includes('src-ull-collection-329-reel-inventory'),'Missing university reel inventory');
  assert(row.source_ids.includes('src-ull-special-collections-digitization-policy'),'Missing archive request policy');
  for (const id of row.source_ids) {
    const s = sources.get(id);
    assert(s && s.reviewed === true && /^https:\/\//.test(s.url) && s.locator,'Missing reviewed provenance '+id);
  }
  for (const field of ['original_archive_locator','potential_match_reason','limitation','next_action']) {
    assert(typeof row[field] === 'string' && row[field].trim(),'Missing access metadata: '+field);
  }
  assert(/not|unverified|NOT|never/i.test(row.limitation),'Missing explicit original-access limitation');
  assert(/ask|request/i.test(row.next_action),'Missing actionable targeted reproduction request');
  assert(!/payment verified|crown assumed|settlement proved/i.test(row.next_action),'No asserted liability or disbursement');
}
assert(Array.isArray(routes) && routes.length===expected.size,'Expected exactly two reviewed candidate microfilm routes');
assert.equal(new Set(routes.map(x=>x.id)).size,routes.length,'Duplicate access route');
routes.forEach(verify);
for (const row of routes) {
  for (const k of ['document_on_reel_verified','specific_frame_verified','original_text_read']) {
    assert.throws(()=>verify({...row,[k]:true}),'Uninspected material must not be promoted');
  }
  assert.throws(()=>verify({...row,paid_amount:1000}),'Unverified payments forbidden');
  assert.throws(()=>verify({...row,liable:'French Crown'}),'Unverified liabilities forbidden');
}
assert.throws(()=>verify({...routes[0],reel:574}),'Wrong reel must fail');
assert.throws(()=>verify({...routes[0],document:'doc-024'}),'February debt decree not proven on F3 242 reel');
assert.throws(()=>verify({...routes[1],source_ids:['src-ull-collection-329-reel-inventory']}),'Must cite original locator and access rules');
console.log('OK: two candidate microfilm routes; neither document nor payment promoted from finding aid to original reading');
