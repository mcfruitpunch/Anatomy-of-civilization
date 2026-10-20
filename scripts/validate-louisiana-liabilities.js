#!/usr/bin/env node
const fs=require('fs'),path=require('path'),assert=require('assert');
const data=n=>JSON.parse(fs.readFileSync(path.join(__dirname,'../data',n+'.json')));
const rows=data('louisiana_liability_ledger'),docs=data('archival_documents');
const byDoc=new Map(docs.map(d=>[d.id,d]));
const verify=r=>{
 assert(byDoc.has(r.document),'Unknown archival record');
 assert(r.date===byDoc.get(r.document).date,'Date mismatch');
 assert(r.paid===null,'No receipted payment verified');
 assert(r.transfer===null,'No verified transfer edge');
 assert(r.liable===null,'Liable party unverified');
};
rows.forEach(verify);
assert(rows.length===6,'Expected six distinct documentary leads');
assert(new Set(rows.map(r=>r.document)).size===rows.length,'Duplicate archive item');
for(const field of ['paid','transfer','liable']){
 const bad={...rows[0],[field]:1};
 assert.throws(()=>verify(bad));
}
console.log('OK: six Louisiana documentary leads and nonpayment safeguards');
