#!/usr/bin/env node
// Dependency-free smoke checks for the public atlas explorer.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const readJson = name => JSON.parse(read('data/' + name + '.json'));
const assert = (condition, text) => { if (!condition) throw new Error(text); };
const html = read('index.html');
const js = read('site/app.js');
const events = readJson('events'), cases = readJson('cases');
const entities = readJson('entities'), relationships = readJson('relationships');
const dominoes = readJson('dominoes');
const financial = readJson('financial_flows');
const ownership = readJson('ownership_overlap');
const comparisons = readJson('comparisons');
const archiveDocs = readJson('archival_documents');
const routes = readJson('information_routes');
const ids = ['search', 'case-filter', 'year-from', 'year-to', 'timeline-list',
  'event-detail', 'rel-filter', 'entity-filter', 'verified-only', 'clear-focus',
  'graph', 'entity-detail', 'network-list', 'case-list', 'system-list', 'source-list', 'domino-list', 'domino-count', 'finance-list', 'finance-count', 'ownership-list', 'ownership-count', 'comparison-list', 'comparison-count', 'archive-list', 'archive-count', 'route-list'];
for (const id of ids) {
  assert(new RegExp('id="' + id + '"').test(html), 'Missing UI control or target: ' + id);
  assert(js.includes("'"+id+"'"), 'Explorer does not reference control: ' + id);
}
assert(html.includes('name="viewport"'), 'Missing mobile viewport');
assert(html.includes('href="#main"'), 'Missing skip navigation');
assert(html.includes('aria-live="polite"'), 'Missing screen reader announcements');
assert(js.includes("state.reviewedOnly") && js.includes("isDocumented(rel)"),
  'Do not remove source-review filtering');
assert(js.includes("sameCase(rel, state.caseId)"), 'Keep case-specific network containment');
assert(js.includes("typeCategory(rel)"), 'Keep relationship type filters');
assert(js.includes("caseEventIds()"), 'Keep timeline case filter');
assert(js.includes("scrollIntoView"), 'Cross-linked actor navigation missing');
const entityMap = new Map(entities.map(e => [e.id, e]));
const caseMap = new Map(cases.map(c => [c.id, c]));
for (const event of events) {
  const c = caseMap.get(event.case);
  assert(c, 'Unknown case: ' + event.case);
  for (const id of event.entities || []) {
    assert(entityMap.has(id), 'Unknown event entity: ' + id);
    assert(c.entities.includes(id), 'Cross-case entity for event: ' + event.id);
  }
}
const siblings = relationships.filter(r => r.type === 'sibling_of');
assert(siblings.length >= 1, 'Family-only explorer requires at least one sourced family link');
assert(siblings.every(r => r.status === 'documented' && r.verification === 'reviewed'),
  'Family demo cannot use unreviewed links');
assert(dominoes.length > 0, 'No event-to-event records');
assert(js.includes('renderDominoes()') && js.includes('goToEvent(id)'), 'Domino explorer controls missing');
assert(html.includes('href="#dominoes"'), 'Missing domino navigation');
const eventIds = new Set(events.map(e => e.id));
for (const d of dominoes) {
  assert(eventIds.has(d.from) && eventIds.has(d.to), 'Domino has unresolved event');
  assert(d.sources && d.sources.length, 'Domino missing citations');
}
assert(html.includes('href="#finance"'), 'Finance navigation link missing');
assert(js.includes('renderFinance()'), 'Finance cards are not rendered');
assert(financial.length >= 8, 'No financial traces provided');
assert(financial.some(f => f.value === null && f.flow_state === 'prospective_not_documented_paid'), 'Missing honest unknown-amount record');
assert(financial.some(f => f.unit === 'percent_of_sales' && f.flow_state === 'prospective_not_documented_paid'), 'Missing explicit conditional commission');
assert(financial.some(f => f.flow_state === 'documented_historical_loan' && f.value === 1200000), '1694 documented government loan missing');
assert(financial.some(f => f.flow_state === 'shareholding_not_cash_transfer' && f.value === 315000), '1698 recorded equity holding incorrectly characterized');
assert(financial.some(f => f.flow_state === 'agreement_not_disbursement' && f.value === 4200000), '1722 agreement should not be called a payment');
const financesById = new Set(financial.map(f => f.id));
assert(financesById.size === financial.length, 'Duplicate financial IDs');
for (const f of financial) {
  assert(caseMap.has(f.case), 'Finance case missing: ' + f.id);
  assert(entityMap.has(f.from), 'Unknown financier: ' + f.id);
  assert(f.to.every(id => entityMap.has(id)), 'Unknown financial recipient: ' + f.id);
  assert(f.sources.length > 0, 'Financial record missing citations: ' + f.id);
}
assert(ownership.length >= 2, 'Historic ownership overlap dataset absent');
assert(ownership.every(o => o.distinct_individuals_verified === false), 'Aggregate accounts must not be converted to people');
assert(ownership.some(o=>o.year === 1719 && o.matched_accounts_approx === 700), '1719 ledger comparison missing');
assert(ownership.some(o=>o.year === 1721 && o.matched_accounts_approx === 760), '1721 ledger comparison missing');
assert(financial.some(f=>f.flow_state === 'authorized_no_transfer' && f.value === null), 'Missing explicit unexecuted 1721 transfer');
assert(js.includes('renderOwnership()'), 'Ownership overlap interface missing');
assert(html.includes('href="#comparison"') && js.includes('renderComparisons()'), 'Country comparison interface missing');
assert(comparisons.length >= 4, 'Country comparison records missing');
assert(comparisons.every(c => c.sources?.length && c.france_case !== c.britain_case), 'Invalid comparative research evidence');
assert(financial.some(f => f.flow_state === 'policy_target_not_cash_flow' && f.unit === 'livres_tournois'), 'France monetary target not distinguished');
assert(!comparisons.some(c=>/joint secret organization|centralized family conspiracy/i.test(c.interpretation)), 'Cross-border hypothesis overstatement');
assert(html.includes('href="#archives"') && js.includes('renderArchives()'), 'Archive explorer not hooked up');
assert(archiveDocs.length >= 10 && routes.length >= 3,'Insufficient documentary records/routes');
const archiveIds = new Set(archiveDocs.map(d=>d.id));
for (const d of archiveDocs) {
  assert(d.reference && d.limitations && d.sources?.length,'Archival item lacks provenance/limitations '+d.id);
}
for (const r of routes) {
  assert(r.named_correspondent_verified === false,'Do not invent personal international correspondence');
  assert(r.documents.every(id=>archiveIds.has(id)),'Route contains broken archive link');
  assert(r.sources?.length,'Cross-border route requires a cited source');
}
console.log('OK: country comparisons, archive evidence layers, named correspondence safeguards and financial states');
