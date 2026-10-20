#!/usr/bin/env node
// Historical evidence gate: schema, links, review status, and date precision.
const fs = require('fs');
const path = require('path');
const load = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', n + '.json'), 'utf8'));
const sources = load('sources'), events = load('events'), entities = load('entities');
const rels = load('relationships'), cases = load('cases'), systems = load('systems'), dominoes = load('dominoes');
const STATUS = ['documented', 'interpretation', 'supported interpretation', 'unresolved', 'speculation'];
const errors = [];
const ids = (arr, name) => {
  const s = new Set();
  arr.forEach((x) => { if (!x.id) errors.push(name + ': missing id'); else if (s.has(x.id)) errors.push(name + ': duplicate ' + x.id); s.add(x.id); });
  return s;
};
const S = ids(sources, 'sources'), E = ids(events, 'events'), N = ids(entities, 'entities');
const C = ids(cases, 'cases'); ids(rels, 'relationships'); ids(systems, 'systems'); ids(dominoes, 'dominoes');
const bySource = Object.fromEntries(sources.map(s => [s.id, s]));
const need = (list, set, ctx) => (list || []).forEach(i => { if (!set.has(i)) errors.push(ctx + ': unknown reference ' + i); });
const validStatus = (obj, ctx) => { if (!STATUS.includes(obj.status)) errors.push(ctx + ': bad/missing status ' + obj.status); };
const cite = (obj, ctx, requireReviewed) => {
  if (!Array.isArray(obj.sources) || !obj.sources.length) errors.push(ctx + ': no source citations');
  need(obj.sources, S, ctx);
  if (requireReviewed && !(obj.sources || []).some(id => {
    const s = bySource[id];
    return s && s.reviewed === true && /^https:\/\//.test(s.url || '') && (s.locator || '').trim();
  })) errors.push(ctx + ': documented claim requires at least one reviewed online source with a specific locator');
};
const validDate = (date, id) => {
  if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(date || '')) return errors.push(id + ': invalid or falsely encoded date');
  const [year, month, day] = date.split('-').map(Number);
  if (month !== undefined && (month < 1 || month > 12)) errors.push(id + ': bad month');
  if (day !== undefined) {
    const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (day < 1 || day > last) errors.push(id + ': bad calendar day');
  }
};
sources.forEach(s => {
  if (s.reviewed === true && (!/^https:\/\//.test(s.url || '') || !(s.locator || '').trim()))
    errors.push(s.id + ': reviewed sources must have URL + locator');
});
events.forEach(e => {
  validDate(e.date, e.id); need([e.case], C, e.id);
  if (!Array.isArray(e.entities) || !e.entities.length) errors.push(e.id + ': no event-linked entities');
  need(e.entities, N, e.id);
  const matchCase = cases.find(record => record.id === e.case);
  if (matchCase) (e.entities || []).forEach(entityId => {
    if (!matchCase.entities.includes(entityId)) errors.push(e.id + ': linked entity outside case: ' + entityId);
  });
  validStatus(e, e.id); cite(e, e.id, e.status === 'documented');
  if (e.status === 'documented' && e.verification !== 'reviewed') errors.push(e.id + ': requires review');
});
entities.forEach(e => { cite(e, e.id, false); });
rels.forEach(r => {
  need([r.from, r.to], N, r.id); validStatus(r, r.id);
  cite(r, r.id, r.status === 'documented');
  if (r.status === 'documented' && r.verification !== 'reviewed') errors.push(r.id + ': requires review');
  if (r.date) validDate(r.date, r.id);
});
cases.forEach(c => {
  need(c.events, E, c.id); need(c.entities, N, c.id);
  for (const field of ['summary_sources','decision_sources','consequences_sources']) {
    const cit = {sources:c[field]};
    cite(cit,c.id + '.' + field,true);
  }
  c.interpretations.forEach((i,k) => { cite(i, c.id + '.interpretation['+k+']',false); validStatus(i,c.id); });
});
systems.forEach(s => { need(s.cases, C, s.id); cite(s,s.id,false); validStatus(s,s.id); });
const yearOf = date => date ? Number(date.slice(0,4)) : NaN;
dominoes.forEach(d => {
  need([d.from, d.to], E, d.id);
  if (d.from === d.to) errors.push(d.id + ': self-link not allowed');
  const first = events.find(e => e.id === d.from);
  const second = events.find(e => e.id === d.to);
  if (first && second && yearOf(first.date) > yearOf(second.date))
    errors.push(d.id + ': event chain reverses known year order');
  if (!d.mechanism || !d.claim || !d.kind) errors.push(d.id + ': missing mechanism/claim/kind');
  validStatus(d, d.id);
  cite(d, d.id, d.status === 'documented');
  if (d.status === 'documented' && d.verification !== 'reviewed')
    errors.push(d.id + ': documented link requires review');
});
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('OK: ' + sources.length + ' sources, ' + events.length + ' events, ' + entities.length + ' entities, ' + rels.length + ' relationships, ' + cases.length + ' cases, ' + systems.length + ' systems, ' + dominoes.length + ' dominoes');
