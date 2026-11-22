#!/usr/bin/env node
// Keep Company claim direction separate from adjudicated liability, transfer, and payment.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const load = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const audit = load('louisiana_claim_direction_audit');
const documents = new Map(load('archival_documents').map(d => [d.id, d]));
const sources = new Map(load('sources').map(s => [s.id, s]));
const flows = load('financial_flows');
const allowed = [
  'id','document','date','date_basis','claim_direction','creditor_or_claimant','party_described_as_owing',
  'decision_maker','instrument_or_proceeding','alleged_payee','amount_reported','amount_verified',
  'liability_adjudicated','payment_verified','evidence_level','archival_locator','relation_to_doc_024','source_ids'
].sort();
function validate(data) {
  assert.equal(data.version, '1.0');
  assert(/not a financial-flow ledger/i.test(data.purpose));
  assert.equal(data.claims.length, 7);
  assert.equal(new Set(data.claims.map(x => x.id)).size, data.claims.length);
  for (const c of data.claims) {
    assert.deepEqual(Object.keys(c).sort(), allowed, c.id + ': unexpected field');
    const doc = documents.get(c.document);
    assert(doc, c.id + ': unknown archival document');
    assert.equal(c.date, doc.date, c.id + ': date must match its document record');
    assert(c.archival_locator && c.date_basis && c.instrument_or_proceeding);
    assert(Array.isArray(c.source_ids) && c.source_ids.length);
    for (const id of c.source_ids) {
      const s = sources.get(id);
      assert(s && s.reviewed === true && /^https:\/\//.test(s.url) && s.locator, c.id + ': source provenance missing: ' + id);
    }
    assert.equal(c.amount_verified, false, c.id + ': no amount is verified in this direction audit');
    assert.equal(c.liability_adjudicated, false, c.id + ': no specific liability is adjudicated here');
    assert.equal(c.payment_verified, false, c.id + ': no payment is verified here');
    assert(c.amount_reported && Object.keys(c.amount_reported).sort().join(',') === 'text,unit,value,verification');
    if (c.amount_reported.value !== null) assert.equal(c.amount_reported.verification, 'index_card_only_not_original_account');
  }
  const byId = id => { const c = data.claims.find(x => x.id === id); assert(c, 'Missing ' + id); return c; };
  const treasury = byId('claim-1732-company-to-treasury');
  assert.equal(treasury.document, 'doc-040');
  assert.equal(treasury.claim_direction, 'company_to_french_treasury_as_catalogue_abstract_describes');
  assert.equal(treasury.creditor_or_claimant, 'French treasury (HNOC abstract wording)');
  assert.equal(treasury.party_described_as_owing, 'Company of the Indies (HNOC abstract wording)');
  assert.equal(treasury.amount_reported.value, null);
  const reduction = byId('claim-1735-half-reduction');
  assert.equal(reduction.document, 'doc-041');
  assert.equal(reduction.claim_direction, 'unresolved_from_catalogue_abstract');
  assert.equal(reduction.creditor_or_claimant, null);
  assert.equal(reduction.party_described_as_owing, null);
  assert.equal(reduction.decision_maker, null);
  assert.equal(reduction.alleged_payee, null);
  const companyCreditor = byId('claim-1735-company-creditor-ordinance');
  assert.equal(companyCreditor.claim_direction, 'company_as_creditor_per_catalogue_abstract');
  assert.equal(companyCreditor.creditor_or_claimant, 'Company of the Indies (HNOC abstract says debts to the Company)');
  const duval = byId('claim-1732-duval-index-card-direction-conflict');
  assert.equal(duval.claim_direction, 'heading_prose_conflict');
  assert.equal(duval.amount_reported.value, null);
  const labbe = byId('claim-1736-labbe-company-receivable-card-report');
  assert.equal(labbe.claim_direction, 'company_receivable_reported_by_index_card');
  assert.equal(labbe.amount_reported.value, 5845);
  assert.equal(labbe.amount_verified, false);
  const decree = byId('claim-1731-company-creditor-rights');
  assert.equal(decree.claim_direction, 'company_creditor_rights_preserved_against_unnamed_provincial_debtors');
  assert.equal(decree.amount_reported.value, null);
  const paper = byId('claim-1733-company-notes-letter');
  assert.equal(paper.claim_direction, 'unresolved_company_notes_and_bills_correspondence');
  const newSourceIds = new Set(['src-hnoc-1732-company-treasury-memo','src-hnoc-1735-company-half-debt-reply']);
  assert(!flows.some(f => (f.sources || []).some(id => newSourceIds.has(id))), 'Catalogue abstracts must not become financial flows');
  return true;
}
validate(audit);
const reject = (id, mutate) => {
  const bad = structuredClone(audit);
  const c = bad.claims.find(x => x.id === id);
  assert(c, 'Missing negative fixture ' + id);
  mutate(c);
  assert.throws(() => validate(bad));
};
reject('claim-1732-company-to-treasury', x => { x.party_described_as_owing = 'French Crown'; });
reject('claim-1735-half-reduction', x => { x.claim_direction = 'company_to_french_treasury_as_catalogue_abstract_describes'; });
reject('claim-1735-half-reduction', x => { x.payment_verified = true; });
reject('claim-1736-labbe-company-receivable-card-report', x => { x.amount_verified = true; });
reject('claim-1731-company-creditor-rights', x => { x.payment_verified = true; });
console.log('OK: seven Louisiana claim-direction records; Company creditor/debtor distinctions preserved; ambiguous 1735 reply and card conflicts remain unresolved; no liability or payment promoted');
