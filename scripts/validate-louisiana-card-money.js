#!/usr/bin/env node
// Prevent a later reprint of a royal monetary authorization becoming a fictional paid transfer.
const fs = require('fs');
const path = require('path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const sources = load('sources'), events = load('events'), docs = load('archival_documents');
const extracts = load('source_extracts'), cases = load('cases'), flows = load('financial_flows');
const sid = 'src-zay-1892-louisiana-card-money-1735', eid = 'evt-1735-louisiana-card-money-ordinance', did = 'doc-034', xid = 'extract-006';
const source = sources.find(s => s.id === sid), event = events.find(e => e.id === eid);
const doc = docs.find(d => d.id === did), extract = extracts.find(e => e.id === xid);
const study = cases.find(c => c.id === 'retrocession1731');
const errors = [];
function check(x, context) {
  if (!x || x.date !== '1735-09-14' || x.case && x.case !== 'retrocession1731') errors.push(context + ': wrong/missing document date or case');
  if (x && (!Array.isArray(x.sources) || !x.sources.includes(sid))) errors.push(context + ': missing source');
}
check(event, 'event'); check(doc, 'document'); check(extract, 'extract');
if (!source || source.year !== 1892 || !source.reviewed || !/181.{0,3}183/.test(source.locator || '') || !/original.*not examined/i.test(source.locator || '')) errors.push('source: must disclose 1892 reprint and unexamined original');
if (!study || !study.events.includes(eid)) errors.push('case: missing dated event');
function validateReading(x) {
  if (!x || x.reading_level !== 'historical_secondary_transcription_not_verified_against_original' || x.money_status !== 'authorization_only_no_issue_or_payment_verified') return false;
  if (!/original/i.test(x.limitations || '') || !/260 m\./.test(x.limitations || '')) return false;
  const n = x.reported_numbers;
  return Array.isArray(n) && n.length === 1 && n[0].value === 200000 &&
    n[0].unit === 'authorized_card_money_ceiling_livres_not_disbursed' &&
    /not verified issued|not.*issued/i.test(n[0].meaning || '');
}
if (!validateReading(extract)) errors.push('extract: authorization ceiling, OCR uncertainty or reading level invalid');
if (!event || event.status !== 'documented' || event.verification !== 'reviewed' || !/not.*independently inspected/i.test(event.summary || '')) errors.push('event: must disclose original access limitation');
if (!doc || doc.access_level !== 'historical_edited_text_not_original' || !/not inspected/i.test(doc.limitations || '')) errors.push('document: reprint must not be called original');
if (flows.some(f => (f.sources || []).includes(sid) || f.event === eid)) errors.push('financial flow: do not render authorization as a transfer');
if (extract) {
  const negative = [
    {...extract, reported_numbers:[{...extract.reported_numbers[0],value:260000}]},
    {...extract, reported_numbers:[{...extract.reported_numbers[0],unit:'paid_livres'}]},
    {...extract, money_status:'issued_or_paid'},
    {...extract, reading_level:'direct_original'}
  ];
  if (negative.some(validateReading)) errors.push('negative fixtures: false issuance or original-reading claim passed');
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('OK: 1735 card-money reprint is an authorization ceiling, not a verified issue, debt settlement, or paid transfer');
