#!/usr/bin/env node
// Protect unresolved place-name identity and map-date conflicts from being silently promoted.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const audit = load('place_name_disambiguations');
const sources = new Map(load('sources').map(s => [s.id, s]));

function validate(a) {
  assert.deepEqual(Object.keys(a).sort(), ['comparisons','map_date_audits','records']);
  assert.equal(a.records.length, 2);
  const byId = new Map(a.records.map(r => [r.id, r]));
  const choctaw = byId.get('place-ref-choctaw-haiyowvni-youanis-post');
  const hnoc = byId.get('place-ref-hnoc-youanis-yazoo-1732');
  assert(choctaw && hnoc, 'Both separately sourced place references must remain present');
  for (const record of a.records) {
    assert.equal(record.original_archival_folios_examined, false, 'Cited original folios have not been read');
    assert(Array.isArray(record.source_ids) && record.source_ids.length, 'Each place reference needs source provenance');
    for (const id of record.source_ids) assert(sources.get(id)?.reviewed === true, 'Unknown or unreviewed source: ' + id);
    assert(Array.isArray(record.documentary_references) && record.documentary_references.length, 'Archival locators must be explicit');
    assert(!Object.hasOwn(record, 'coordinates') && !Object.hasOwn(record, 'latitude') && !Object.hasOwn(record, 'longitude'), 'Do not invent coordinates');
  }
  assert.equal(choctaw.evidence_level, 'scholarly_article_with_archival_footnotes');
  assert.deepEqual(choctaw.source_ids, ['src-musco-ellis-spring-2025']);
  assert(choctaw.documentary_references.some(x => x.reference === 'COL C13A, 1726, fol.159'));
  assert(choctaw.documentary_references.some(x => x.reference === 'COL C13A, 1729d, fols.31–31v'));
  assert(choctaw.documentary_references.some(x => x.reference === 'COL C13A, 1733, fol.202'));
  assert.equal(hnoc.evidence_level, 'archival_catalogue_abstract_only');
  assert.deepEqual(hnoc.source_ids, ['src-hnoc-salmon-possession-1732']);
  assert.equal(hnoc.identity_status, 'unresolved');
  assert(hnoc.documentary_references.some(x => x.reference === 'C13 15:31' && x.original_folio_examined === false));
  assert.equal(a.comparisons.length, 1);
  const comparison = a.comparisons[0];
  assert.equal(comparison.left_record, hnoc.id);
  assert.equal(comparison.right_record, choctaw.id);
  assert.equal(comparison.identity_status, 'unresolved', 'Shared spelling must not create an identity link');
  assert(comparison.prohibited_conclusions.includes('same_site'));
  assert(comparison.prohibited_conclusions.includes('asset_transfer'));
  assert.equal(a.map_date_audits.length, 1);
  const map = a.map_date_audits[0];
  assert.equal(map.archival_reference, 'CP/N/III/Louisiane/1/3 (old reference); AE/II/1768/BIS (current reference in Archives nationales caption)');
  assert.equal(map.resolved_date, null, 'Conflicting institutional and scholarly captions must remain unresolved');
  assert.equal(map.original_map_examined, false);
  assert.equal(map.same_map_identity, 'probable_not_confirmed_by_original');
  assert.deepEqual(map.assertions.map(x => x.date_assertion), ['1736','1746','after 1736']);
  for (const item of map.assertions) assert(sources.get(item.source_id)?.reviewed === true, 'Map date assertion needs a reviewed source');
  return true;
}
validate(audit);
const badIdentity=JSON.parse(JSON.stringify(audit));badIdentity.comparisons[0].identity_status='same_site';assert.throws(()=>validate(badIdentity));
const badMap=JSON.parse(JSON.stringify(audit));badMap.map_date_audits[0].resolved_date='1736';assert.throws(()=>validate(badMap));
const badFolios=JSON.parse(JSON.stringify(audit));badFolios.records[0].original_archival_folios_examined=true;assert.throws(()=>validate(badFolios));
const badCoordinates=JSON.parse(JSON.stringify(audit));badCoordinates.records[1].coordinates=[31.0,-90.0];assert.throws(()=>validate(badCoordinates));
console.log('OK: Youanis/Yazoo identity remains unresolved; Choctaw-post citations and Dumont map-date conflict retain provenance gates');
