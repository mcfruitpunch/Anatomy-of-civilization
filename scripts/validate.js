#!/usr/bin/env node
// Validates referential integrity of the research database in data/.
const fs = require('fs');
const path = require('path');
const load = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', n + '.json'), 'utf8'));
const sources = load('sources'), events = load('events'), entities = load('entities');
const rels = load('relationships'), cases = load('cases'), systems = load('systems');
const STATUS = ['documented', 'interpretation', 'supported interpretation', 'unresolved', 'speculation'];
const errors = [];
const ids = (arr, name) => {
  const s = new Set();
  arr.forEach((x) => { if (!x.id) errors.push(`${name}: missing id`); else if (s.has(x.id)) errors.push(`${name}: duplicate ${x.id}`); s.add(x.id); });
  return s;
};
const S = ids(sources, 'sources'), E = ids(events, 'events'), N = ids(entities, 'entities');
const C = ids(cases, 'cases'); ids(rels, 'relationships'); ids(systems, 'systems');
const need = (list, set, ctx) => (list || []).forEach((i) => { if (!set.has(i)) errors.push(`${ctx}: unknown reference ${i}`); });
const status = (x, ctx) => { if (x.status && !STATUS.includes(x.status)) errors.push(`${ctx}: bad status ${x.status}`); };
events.forEach((e) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errors.push(`${e.id}: bad date`);
  if (!e.sources || !e.sources.length) errors.push(`${e.id}: no sources`);
  need(e.sources, S, e.id); need([e.case], C, e.id); status(e, e.id);
});
rels.forEach((r) => {
  need([r.from, r.to], N, r.id);
  if (!r.sources || !r.sources.length) errors.push(`${r.id}: no sources`);
  need(r.sources, S, r.id);
});
cases.forEach((c) => {
  need(c.events, E, c.id); need(c.entities, N, c.id);
  c.interpretations.forEach((i) => { need(i.sources, S, c.id); status(i, c.id); });
});
systems.forEach((s) => { need(s.cases, C, s.id); need(s.sources, S, s.id); status(s, s.id); });
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`OK: ${sources.length} sources, ${events.length} events, ${entities.length} entities, ${rels.length} relationships, ${cases.length} cases, ${systems.length} systems`);
