#!/usr/bin/env node
// V1.4: Cusachs/LHS collection-level provenance routes are not item-level custody.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const audit = load('louisiana_decree_custody_scope_audit');
const sources = new Map(load('sources').map(s => [s.id, s]));
const docs = new Map(load('archival_documents').map(d => [d.id, d]));
const expected = new Map([
 ['scope-lsm-rg23-lhs-papers',{record_group:'RG23',accession:'T025.2003.13',date_range:'1877-12-06–c.1939',extent:'6 linear feet',source_id:'src-lsm-collection-inventory-2020'}],
 ['scope-lsm-rg431-cusachs-loan',{record_group:'RG431',accession:'Various accession numbers 00108-7675',date_range:'1740-1925',extent:'1.5 linear feet; 1 oversize box',source_id:'src-lsm-collection-inventory-2020'}],
 ['scope-lsm-rg112-cusachs-estate',{record_group:'RG112',accession:'09894.2-.123 / 2017.001.06-.12.5',date_range:'1770-1904',extent:'2 boxes; 100 folders',source_id:'src-lsm-cusachs-estate-rg112-2025'}]
]);
assert.equal(audit.target_document,'doc-024');
assert.equal(audit.audit_date,'2026-11-25');
assert.equal(audit.records.length,3);
assert.equal(new Set(audit.records.map(x=>x.id)).size,3);
assert(docs.has(audit.target_document),'Target archival document must exist');
for(const r of audit.records){
 const e=expected.get(r.id);
 assert(e,'Unexpected scope-audit record '+r.id);
 for(const [k,v] of Object.entries(e)) assert.equal(r[k],v,r.id+': incorrect '+k);
 assert.equal(r.repository,'Louisiana State Museum Historical Center');
 assert.equal(r.inspection_level,'finding_aid_text_examined');
 assert.equal(r.inspected_on,'2026-11-25');
 assert.equal(r.item_level_match,'not_established');
 assert(r.collection_title && r.collection_description && r.scope_relevance && r.next_action);
 const s=sources.get(r.source_id);
 assert(s && s.reviewed===true && /^https:\/\//.test(s.url||'') && s.locator,'Reviewed source with exact locator required');
 for(const forbidden of ['current_owner','current_custody_verified','decree_text_examined','payment_verified','paid','transfer','liable']) assert(!(forbidden in r),r.id+': prohibited inference field '+forbidden);
}
const rg23=audit.records.find(x=>x.id==='scope-lsm-rg23-lhs-papers');
assert(/1903/.test(rg23.next_action) && /342/.test(rg23.next_action) && /345/.test(rg23.next_action),'RG23 request must target exhibit catalogue items 342 and 345');
const rg431=audit.records.find(x=>x.id==='scope-lsm-rg431-cusachs-loan');
assert(/not.*complete item-level inventory/i.test(rg431.scope_relevance),'RG431 summary cannot be treated as a complete inventory');
const rg112=audit.records.find(x=>x.id==='scope-lsm-rg112-cusachs-estate');
assert.equal(rg112.date_range_exception,'The finding aid lists a 1763 indenture (09894.117) despite its stated 1770–1904 range, so date range is not a strict lower bound and cannot be used to infer absence of earlier material.');
assert(/1763/.test(rg112.collection_description),'The 1763 item must remain in the scope record');
assert(/not.*strict lower bound/i.test(rg112.date_range_exception),'Date range must not be treated as evidence of absence');
assert(Array.isArray(rg112.related_items) && rg112.related_items.length===5,'Five catalogue-described exhibition invitations should be preserved as separate leads');
assert(rg112.related_items.some(x=>x.accession==='2017.001.07.1' && x.date==='1903' && /colonial museum/i.test(x.description)),'RG112 must retain the 1903 LHS colonial-museum invitation locator');
assert(rg112.related_items.some(x=>x.accession==='2017.001.08.2' && x.date==='1904-09-16'),'1904 reception invitation locator missing');
assert(rg112.related_items.some(x=>x.accession==='2017.001.08.3' && x.date==='1904-09-14'),'1904 Louisiana Day invitation locator missing');
assert(/do not.*link|not.*link/i.test(rg112.scope_relevance),'Invitations cannot be promoted to decree-custody evidence');
assert(Array.isArray(audit.limitations) && audit.limitations.length>=6);
assert(audit.limitations.some(x=>/no physical object|current custody/i.test(x)));
console.log('OK: three LSM custody-scope routes are precise; item-level match/current custody and decree text remain unverified');
