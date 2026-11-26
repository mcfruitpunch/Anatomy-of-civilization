#!/usr/bin/env node
// Keep card-money authorization, retrospective distribution assertions, recall, and separate reissue reports distinct.
const fs = require('fs');
const path = require('path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const audit = load('louisiana_card_money_implementation_audit');
const sources = load('sources'), docs = load('archival_documents'), extracts = load('source_extracts');
const events = load('events'), cases = load('cases'), flows = load('financial_flows');
const errors = [];
const records = audit.records || [];
const ids = new Set();
for (const r of records) { if (!r.id || ids.has(r.id)) errors.push('audit: missing/duplicate record id '+r.id); ids.add(r.id); }
const S = new Set(sources.map(s=>s.id)), D = new Set(docs.map(d=>d.id)), E = new Set(events.map(e=>e.id));
const required = ['audit-1735-authorization','audit-1744-27-april-retrospective-recall','audit-1744-30-april-secondary-order','audit-1746-200k-allowance-exchange-lead'];
required.forEach(id=>{if(!ids.has(id))errors.push('audit missing '+id);});
function byId(arr,id){return arr.find(x=>x.id===id);}
const a35=byId(records,'audit-1735-authorization');
const a27=byId(records,'audit-1744-27-april-retrospective-recall');
const a30=byId(records,'audit-1744-30-april-secondary-order');
const a46=byId(records,'audit-1746-200k-allowance-exchange-lead');
if(!a35||a35.document!=='doc-034'||a35.event!=='evt-1735-louisiana-card-money-ordinance'||a35.authorized_nominal_ceiling_livres!==200000||a35.issued_quantity_verified!==false||a35.fabrication_procès_verbaux_examined!==false)errors.push('1735: authorization ceiling and unexamined production records must remain distinct');
if(!a27||a27.document!=='doc-043'||a27.event!=='evt-1744-04-27-louisiana-card-money-recall-declaration'||a27.retrospective_distribution_asserted!==true||a27.exact_issued_quantity_verified!==false||a27.redemption_execution_verified!==false)errors.push('1744-27: preserve retrospective distribution claim without verifying quantity or redemption');
if(!a30||a30.document!=='doc-044'||a30.event!=='evt-1744-04-30-card-money-order-reported-deferred'||a30.original_order_examined!==false||a30.execution_reported_deferred_by_surrey!==true||a30.issued_quantity_verified!==false)errors.push('1744-30: separate secondary report and deferred execution');
if(!a46||a46.amount_reported_livres!==200000||a46.amount_verified!==false||a46.exchange_or_payment_verified!==false||!a46.archival_locator)errors.push('1746: secondary amount/exchange lead must remain unverified');
for(const r of records){
 if(!Array.isArray(r.source_ids)||!r.source_ids.length)errors.push(r.id+': source_ids missing');
 for(const s of r.source_ids||[])if(!S.has(s))errors.push(r.id+': unknown source '+s);
 if(r.document&&!D.has(r.document))errors.push(r.id+': unknown document '+r.document);
 if(r.event&&!E.has(r.event))errors.push(r.id+': unknown event '+r.event);
}
const expected=[
 ['doc-043','extract-016','evt-1744-04-27-louisiana-card-money-recall-declaration','src-zay-1892-louisiana-card-money-1744-recall'],
 ['doc-044','extract-017','evt-1744-04-30-card-money-order-reported-deferred','src-surrey-1916-louisiana-card-money-implementation-1735-1746']
];
for(const [d,x,e,s] of expected){
 const doc=byId(docs,d), extract=byId(extracts,x), event=byId(events,e);
 if(!doc)errors.push(d+': document missing');
 if(doc&&d==='doc-043'&&doc.access_level!=='historical_edited_text_not_original')errors.push(d+': reprint must be classified as not original');
 if(doc&&d==='doc-044'&&doc.access_level!=='scholarly_reference_only')errors.push(d+': scholarly reference must not be promoted to original');
 if(!extract||!extract.sources.includes(s)||!extract.limitations)errors.push(x+': extract/source limitation missing');
 if(!event||!event.sources.includes(s)||event.case!=='retrocession1731')errors.push(e+': event/source/case missing');
 if(event&&d==='doc-044'&&event.status!=='interpretation')errors.push(e+': secondary report should remain interpretation');
}
const caseStudy=byId(cases,'retrocession1731');
if(!caseStudy||!caseStudy.events.includes('evt-1744-04-27-louisiana-card-money-recall-declaration')||!caseStudy.events.includes('evt-1744-04-30-card-money-order-reported-deferred'))errors.push('case: separate 1744 events missing');
if((audit.financial_flow_records_created||0)!==0)errors.push('audit must state no financial flow records created');
if(flows.some(f=>(f.sources||[]).some(s=>records.some(r=>(r.source_ids||[]).includes(s)))||records.some(r=>r.event&&f.event===r.event)))errors.push('financial flows: card-money authorization, retrospective declaration or secondary lead cannot be converted into a transfer');
function validFixtures(x){return x.authorized_nominal_ceiling_livres===200000&&x.issued_quantity_verified===false&&x.exact_issued_quantity_verified===false&&x.redemption_execution_verified===false&&x.original_order_examined===false&&x.execution_reported_deferred_by_surrey===true;}
const fixture={authorized_nominal_ceiling_livres:200000,issued_quantity_verified:false,exact_issued_quantity_verified:false,redemption_execution_verified:false,original_order_examined:false,execution_reported_deferred_by_surrey:true};
if(validFixtures({...fixture,authorized_nominal_ceiling_livres:260000}))errors.push('negative fixture: incorrect ceiling passed');
if(validFixtures({...fixture,issued_quantity_verified:true}))errors.push('negative fixture: issued quantity claim passed');
if(validFixtures({...fixture,redemption_execution_verified:true}))errors.push('negative fixture: redemption execution claim passed');
if(validFixtures({...fixture,original_order_examined:true}))errors.push('negative fixture: original order examination claim passed');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('OK: 1735 ceiling, 1744 retrospective distribution/recall, separate 1744 order, and 1746 secondary lead remain distinct; no issue/payment asserted');
