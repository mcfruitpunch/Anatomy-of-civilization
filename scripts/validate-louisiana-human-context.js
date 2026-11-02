#!/usr/bin/env node
// V1.4: mediated counts about captive people must never become audited population
// totals, Crown property transfers, deaths, or verified financial transactions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = n => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', n + '.json'), 'utf8'));
const evidence = load('louisiana_human_context_evidence');
const sources = new Map(load('sources').map(s => [s.id, s]));
const cases = new Map(load('cases').map(c => [c.id, c]));
const fields = ['id','case','date','vessel','review_level','source_ids','underlying_book_pages_examined',
  'original_voyage_records_examined','reported_counts','reported_counts_reconcile',
  'verified_individual_outcomes','verified_transfer_to_crown','verified_financial_payment','caveat','next_action'].sort();
const labels = ['captive people aboard, as reported','first group ordered ashore, as reported',
  'additional group ordered ashore, as reported','reported to continue aboard toward Louisiana'];
function verify(x) {
  assert.deepEqual(Object.keys(x).sort(), fields, 'No unreviewed factual or monetary fields');
  assert.equal(x.id, 'human-1731-saint-louis-mediated');
  assert.equal(x.case, 'retrocession1731');
  assert(cases.has(x.case), 'Unknown case');
  assert.equal(x.date, '1731', 'No invented month or day');
  assert(/Saint-Louis/.test(x.vessel));
  assert.equal(x.review_level, 'modern_secondary_synthesis_only');
  assert.deepEqual(x.source_ids, ['src-esclavage-antilles-1731-saint-louis-mediated','src-hachette-harms-diligent-2002-publisher']);
  for (const id of x.source_ids) {
    const s = sources.get(id);
    assert(s && s.reviewed === true && /^https:\/\//.test(s.url) && s.locator, 'Missing source provenance');
    assert(/not_primary|not_examination/.test(s.type), 'Do not promote mediated source to direct original');
  }
  for (const flag of ['underlying_book_pages_examined','original_voyage_records_examined',
    'reported_counts_reconcile','verified_individual_outcomes','verified_transfer_to_crown',
    'verified_financial_payment']) assert.equal(x[flag], false, flag + ' needs independent original evidence');
  assert.deepEqual(x.reported_counts.map(n => n.label), labels, 'Keep distinct, attributed count meanings');
  assert.deepEqual(x.reported_counts.map(n => n.value), [340,92,10,229], 'Do not silently fix contradictory secondary numbers');
  assert(x.reported_counts.every(n => Number.isInteger(n.value) && n.value >= 0), 'Invalid reported count');
  const [aboard, first, second, continuing] = x.reported_counts.map(n => n.value);
  assert.notEqual(aboard - first - second, continuing, 'Contradiction must remain explicit until primary audit');
  assert(/not 229|not 229\.|not 229,/.test(x.caveat), 'Explain arithmetic discrepancy');
  assert(/not establish|does not establish/i.test(x.caveat), 'Do not infer nine missing people');
  assert(/Harms/.test(x.caveat) && /original/.test(x.caveat), 'State scholarly and original-record limits');
  assert(/read Harms/i.test(x.next_action) && /original/i.test(x.next_action), 'Require primary verification route');
}
assert(Array.isArray(evidence) && evidence.length === 1, 'Exactly one audited contextual lead');
evidence.forEach(verify);
const context = cases.get('retrocession1731').interpretations.find(i => i.label === "Enslaved people's lives are not corporate transfer entries");
assert(context && context.status === 'unresolved' && context.sources.includes(evidence[0].source_ids[0]),
  'The public atlas must label mediated human-cost evidence unresolved');
for (const key of ['original_voyage_records_examined','reported_counts_reconcile','verified_individual_outcomes',
  'verified_transfer_to_crown','verified_financial_payment']) {
  assert.throws(() => verify({...evidence[0], [key]:true}), 'Unverified claim must fail: ' + key);
}
assert.throws(() => verify({...evidence[0], verified_survivors:229}));
assert.throws(() => verify({...evidence[0], alleged_missing_people:9}));
assert.throws(() => verify({...evidence[0], source_ids:['nonexistent']}));
assert.throws(() => verify({...evidence[0], reported_counts:[...evidence[0].reported_counts.slice(0,3),{label:labels[3],value:238}]}));
console.log('OK: Saint-Louis 1731 mediated human context; contradictory counts and unverified outcomes protected');
