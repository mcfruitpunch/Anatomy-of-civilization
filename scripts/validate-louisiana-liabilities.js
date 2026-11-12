#!/usr/bin/env node
// V1.4 evidence gate: a catalogue entry or judicial award is not a payment receipt.
// Any future claim of a debtor, transfer or cash payment requires an explicit
// source-verified schema change, not a silently added ledger field.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const data = name => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', name + '.json'), 'utf8'));
const rows = data('louisiana_liability_ledger');
const documents = data('archival_documents');
const sources = data('sources');
const byDocument = new Map(documents.map(doc => [doc.id, doc]));
const sourceIds = new Set(sources.map(source => source.id));
const reviewByDocument = new Map([
  ['doc-022', 'title_page'], // Jan 23 royal decree: original title only
  ['doc-021', 'catalogue'],  // Jan 24 local council dossier
  ['doc-024', 'catalogue'],  // Feb 24 debt decree: edition catalogues only
  ['doc-023', 'abstract'],   // Jan 19 1732 Salmon letter
  ['doc-020', 'scholarship'],// Diron award: modern reading of folios
  ['doc-029', 'catalogue'],  // July 15 1732 Duval account: indexed only; 1736 internal date unresolved
  ['doc-019', 'abstract'],   // Sep 2 1732 ministerial letter
  ['doc-033', 'abstract'],   // Sep 30 1733 Council letter about Company notes; NOT the alleged same-day ordinance
  ['doc-030', 'abstract'],   // Mar 30 1735 Council ordinance: Company-as-creditor; original clauses unread
  ['doc-031', 'catalogue'],  // Aug 6 1735 indexed promissory note; contractual roles unread
  ['doc-032', 'catalogue'],  // Sep 1 1735 indexed promissory note; contractual roles unread
  ['doc-026', 'catalogue'],  // Oct 19 1735 indexed creditors' agreement; no clauses read
  ['doc-027', 'catalogue'],  // Aug 20 1736 indexed receipt; payer/payee unknown
  ['doc-028', 'catalogue'],  // May 11 1737 indexed receipt; payer/payee unknown
]);

const imageAudits = data('louisiana_image_access_audit');
const localDossier = byDocument.get('doc-021');
const localSource = sources.find(s => s.id === 'src-lcd-retrocession-1731');
function verifyLocalImageAudit(a) {
  assert(a && typeof a === 'object' && !Array.isArray(a), 'Local dossier access audit must be an object');
  const keys = ['id','document','source_id','record_url','observed_on','record_date','repository','collection','language','origin','catalogue_category','page_count_displayed','image_link_count','sampled_image_links','indexed_people','text_examined','full_resolution_asset_verified','wpa_black_book_crosswalk_verified','next_action'].sort();
  assert.deepEqual(Object.keys(a).sort(), keys, 'Unexpected local image-audit field');
  assert.equal(a.id, 'access-lcd-1731-01-24-03');
  assert.equal(a.document, 'doc-021');
  assert.equal(a.source_id, 'src-lcd-retrocession-1731');
  assert.equal(a.record_url, localSource?.url, 'Audit must cite the exact institutional record URL');
  assert.equal(a.record_date, localDossier?.date, 'Local record date must remain distinct from the 23 January royal act');
  assert.equal(a.repository, 'Louisiana Historical Center');
  assert.equal(a.collection, 'French Superior Council');
  assert.equal(a.language, 'French');
  assert.equal(a.origin, 'New Orleans, Province of Louisiana');
  assert.equal(a.catalogue_category, 'Administrative Acts, Retrocession of Louisiana');
  assert.equal(a.page_count_displayed, 24);
  assert.equal(a.image_link_count, 48);
  assert(Array.isArray(a.sampled_image_links) && a.sampled_image_links.length === 3, 'Three sampled preview links must be recorded');
  const sampleKeys = ['archive_link_id','url','asset_type','assessment'].sort();
  for (const sample of a.sampled_image_links) {
    assert.deepEqual(Object.keys(sample).sort(), sampleKeys, 'Unexpected preview-link field');
    assert([3,4,26].includes(sample.archive_link_id), 'Unexpected archive link ID');
    assert(/^https:\/\/lacolonialdocs-data\.s3\.amazonaws\.com\/station_thumbs_sm\/doc-img-\d+\.jpg$/.test(sample.url), 'Preview URL must match an observed thumbnail target');
    assert.equal(sample.asset_type, 'thumbnail_preview');
    assert(/no readable text transcription/i.test(sample.assessment), 'Thumbnail must not be treated as a transcription');
  }
  assert.deepEqual(a.indexed_people, ['Coligny','Company of Indies','Le Redde','Orry']);
  assert.equal(a.text_examined, false, 'No original text was examined');
  assert.equal(a.full_resolution_asset_verified, false, 'No full-resolution asset was verified');
  assert.equal(a.wpa_black_book_crosswalk_verified, false, 'No WPA crosswalk was verified');
  assert(typeof a.next_action === 'string' && /full-resolution|legible/i.test(a.next_action), 'Missing precise archive retrieval step');
  assert.equal(localDossier?.access_level, 'thumbnail_preview_links_observed_text_unread');
  assert(/thumbnail/i.test(localDossier?.limitations || ''), 'Document limitations must disclose thumbnail-only access');
  assert(/48 separate Image links/i.test(localSource?.locator || ''), 'Source locator must preserve observed link inventory');
}
assert.equal(imageAudits.length, 1, 'Expected one audited 1731 local Council image-access record');
const localImageAudit = imageAudits[0];
verifyLocalImageAudit(localImageAudit);
assert.throws(() => verifyLocalImageAudit({...localImageAudit, text_examined: true}), 'Thumbnail access cannot promote original text to examined');
assert.throws(() => verifyLocalImageAudit({...localImageAudit, full_resolution_asset_verified: true}), 'Unobserved full-resolution access must fail');
assert.throws(() => verifyLocalImageAudit({...localImageAudit, record_date: '1731-01-23'}), 'Do not conflate the local record with the royal decree date');
assert.throws(() => verifyLocalImageAudit({...localImageAudit, page_count_displayed: 23}), 'Page count must match the archive record');
assert.throws(() => verifyLocalImageAudit({...localImageAudit, sampled_image_links: localImageAudit.sampled_image_links.slice(1)}), 'All sampled image links must remain provenance-tracked');

const allowedKeys = ['date', 'document', 'review', 'paid', 'transfer', 'liable'].sort();

function verify(row) {
  assert(row && typeof row === 'object' && !Array.isArray(row), 'Ledger row must be an object');
  assert(reviewByDocument.has(row.document), 'Unknown or unapproved liability document');
  assert.deepEqual(Object.keys(row).sort(), allowedKeys, 'Unreviewed ledger field (including payment/creditor claims)');
  const document = byDocument.get(row.document);
  assert(document, 'Unknown archival record');
  assert.equal(row.date, document.date, 'Ledger date differs from archival record');
  assert.equal(row.review, reviewByDocument.get(row.document), 'Review level overstated or changed without audit');
  assert(Array.isArray(document.sources) && document.sources.length > 0, 'Document has no provenance');
  assert(document.sources.every(id => sourceIds.has(id)), 'Document cites unknown source');
  for (const field of ['paid', 'transfer', 'liable']) {
    assert.equal(row[field], null, field + ' requires original, claim-specific evidence');
  }
}

assert(Array.isArray(rows), 'Liability ledger must be an array');
assert.equal(rows.length, reviewByDocument.size, 'All fourteen audited leads must be present');
assert.equal(new Set(rows.map(row => row.document)).size, rows.length, 'Duplicate archival item');
rows.forEach(verify);

// Negative fixtures protect against invented transfer arrows, amounts, payer
// names, hidden new fields, and inflated claims of original-document review.
for (const field of ['paid', 'transfer', 'liable']) {
  for (const badValue of [0, false, 'French Crown', {}, []]) {
    assert.throws(() => verify({...rows[0], [field]: badValue}));
  }
}
assert.throws(() => verify({...rows[0], payer: 'French Crown'}));
assert.throws(() => verify({...rows[0], payment_amount: 29000}));
assert.throws(() => verify({...rows[0], review: 'original_decree_transcribed'}));
assert.throws(() => verify({...rows[2], review: 'title_page'}));
// A commodity-valuation ordinance for debts TO the Company does not prove
// produce delivery, Crown debt assumption, or payment BY the Company.
const commodityRow = rows.find(r => r.document === 'doc-030');
assert(commodityRow, '1735 commodity ordinance missing');
assert.equal(commodityRow.review, 'abstract');
for (const field of ['paid', 'transfer', 'liable']) {
  assert.throws(() => verify({...commodityRow, [field]: 'French Crown'}));
}
assert.throws(() => verify({...commodityRow, payment_amount: 1}));
assert.throws(() => verify({...commodityRow, commodity_delivered: 'rice'}));
assert.throws(() => verify({...commodityRow, review: 'original_ordinance_transcribed'}));
// A calendar abstract for a Council letter about notes cannot establish a ruling,
// reduction in value, or a disbursement. The separate ordinance remains unread.
const creditLetter = rows.find(r => r.document === 'doc-033');
assert(creditLetter, '1733 credit-dispute letter missing');
assert.equal(creditLetter.review, 'abstract');
for (const field of ['paid', 'transfer', 'liable']) {
  assert.throws(() => verify({...creditLetter, [field]: 'French Crown'}));
}
assert.throws(() => verify({...creditLetter, face_value_reduced: 0.5}));
assert.throws(() => verify({...creditLetter, council_ruling: 'redeemed'}));
assert.throws(() => verify({...creditLetter, payment_amount: 1}));
assert.throws(() => verify({...creditLetter, review: 'original_letter_transcribed'}));
// An archival index's label "Receipt" does not establish who paid whom.
for (const docId of ['doc-027', 'doc-028']) {
  const row = rows.find(r => r.document === docId);
  assert(row, 'Indexed receipt lead missing: ' + docId);
  assert.equal(row.review, 'catalogue');
  for (const field of ['paid', 'transfer', 'liable']) {
    assert.throws(() => verify({...row, [field]: 'Company of Indies'}));
  }
  assert.throws(() => verify({...row, payer: 'French Crown'}));
  assert.throws(() => verify({...row, payment_amount: 1}));
  assert.throws(() => verify({...row, review: 'original_receipt_transcribed'}));
}
// An index label "IOU/Promissory Note" cannot establish a debtor, payee or paid amount.
for (const docId of ['doc-031', 'doc-032']) {
  const row = rows.find(r => r.document === docId);
  assert(row, 'Indexed promissory-note lead missing: ' + docId);
  assert.equal(row.review, 'catalogue');
  for (const field of ['paid', 'transfer', 'liable']) {
    assert.throws(() => verify({...row, [field]: 'Company of Indies'}));
  }
  assert.throws(() => verify({...row, promisor: 'Company of Indies'}));
  assert.throws(() => verify({...row, payment_amount: 1}));
  assert.throws(() => verify({...row, review: 'original_note_transcribed'}));
}
console.log('OK: fourteen Louisiana archival leads, strict negative payment fixtures, and thumbnail-only access gate for the 1731 local Council dossier');
