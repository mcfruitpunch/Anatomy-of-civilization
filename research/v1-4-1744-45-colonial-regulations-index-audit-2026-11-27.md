# V1.4 — 1744–1745 colonial-regulations compilation scope check

**Research date:** 27 November 2026  
**Target:** `doc-024`, royal Company-of-Indies Louisiana debt decree dated 24 February 1731, catalogued in separate 1731 and 1733 printings.  
**Result:** A distinct public two-tome compilation is now a retrieval route. The examined Tome I contents transcription does not list the target decree. This is a bounded negative scope check, not proof of absence from the whole compilation.

## 1. Digital file metadata

### Tome I — 1744
[Wikimedia Commons file metadata](https://commons.wikimedia.org/wiki/File:Recueils_de_reglemens,_edits,_declaration_et_arrets_I.djvu) identifies a 218-page DjVu, publication date 1744, and labels it Tome I. The page lists Bibliothèque nationale de France as the source and John Carter Brown Library as the collection field. These provenance fields are not reconciled; the physical copy and file pages were not examined.

[Wikisource book-level record and contents transcription](https://fr.wikisource.org/wiki/Livre:Recueils_de_reglemens,_edits,_declaration_et_arrets_I.djvu).

### Tome II — 1745
[Wikimedia Commons file metadata](https://commons.wikimedia.org/wiki/File:Recueils_de_reglemens,_edits,_declaration_et_arrets_II.djvu) identifies a 373-page DjVu, publication date 1745, and labels it Tome II. It likewise names BnF as source and JCB in the collection field. No page image or contents transcription was examined.

[Wikisource book-level record](https://fr.wikisource.org/wiki/Livre:Recueils_de_reglemens,_edits,_declaration_et_arrets_II.djvu).

## 2. Contents transcription examined (Tome I only)

The book-level Wikisource contents transcription notes the table at printed page 211 and lists colonial-regulation entries including:

- 1724 Louisiana Code Noir, p. 135.
- 1734 ordinance regulating certificates for the slave trade, p. 188.
- 1736 ordinance concerning manumission and baptism of enslaved people, p. 202.
- 1738 declaration concerning enslaved people, p. 156.
- 1742 exemption ordinance connected to products of the slave trade, p. 205.

The **24 February 1731 Company-debt decree is not listed** in the examined Tome I contents transcription. The transcription is OCR/contents text, not direct visual examination of the printed table page. The book's scope is colonial regulations about trade, justice, police, engagés and the Code Noir; it is not a comprehensive index of all royal acts. The negative result therefore applies only to the examined contents list.

## 3. Volume-label discrepancy

Wikisource's metadata labels the file ending `I.djvu` as “tome 2” and `II.djvu` as “tome 1”, opposite the Commons file labels. This may be metadata error, but the title pages were not examined. Do not cite a tome/page until the volume title pages and contents are checked.

Tome II contents were not examined. Its last Wikisource page (373) is marked “not intended to be corrected” and contains no transcription; it is not a verified contents page.

## 4. Evidence classification

**Observed:** Commons metadata and a Wikisource book-level contents transcription.  
**Not observed:** physical volumes, title pages, original contents-page image, Tome II contents, or any text of the 24 February 1731 decree.

The 1744–1745 collection is recorded as a retrieval/scope lead, not a witness or source extract for doc-024. It does not change the legal or financial interpretation.

## 5. Affected-community context

The contents show that the collection includes colonial law concerning enslaved people and manumission. Such entries describe the Crown's regulatory framework; they do not establish the lived experiences, consent or agency of enslaved people or Indigenous nations. No community testimony about this particular compilation or the debt decree was located in this bounded task. Existing Choctaw-, Peoria-, and Natchez-authored histories remain separate from this royal-law record and should not be replaced by it.

## 6. Repository implementation and safeguards

- Added three source records for Tome I metadata, Tome I contents transcription, and Tome II metadata.
- Added a retrieval lead limited to the Tome I contents result and unresolved Tome II scope.
- Updated doc-024 and V1.4 source-verification notes.
- Added a validator and integrated it into the main research-data check.
- Negative fixtures reject promotion of the contents result to page-level examination, a confirmed decree witness, a located page, or a verified liability/payment.

No source extract, event, witness, or financial-flow record was created. `paid`, `transfer`, and `liable` remain null.

## 7. Next access priority

1. Obtain the Tome II title page and contents, and resolve the Wikisource/Commons volume-label mismatch.
2. Continue prioritizing the two operative pages of the standalone 1731 Imprimerie royale or 1733 Saugrain–Prault debt decree.
3. For the separate 1755–1756 BnF Recueil, inspect the T.4 chronological index only if a working access route is obtained; do not presume the act appears there.
4. When the debt decree is obtained, transcribe its operative clauses, distinguish legal debtor/creditor direction, and seek separate receipts or accounts before asserting any payment.

**Conclusion:** This new collection route helps avoid an unsupported assumption that the decree is in a later colonial-regulations compilation. The central 1731 legal text remains unread.


## Validation history

PR CI exposed four test-fixture issues, all corrected: `printed_toc_page` was absent from the strict allowed-key list; the volume-label regex expected Arabic numerals while the metadata uses Roman numerals; a source-locator assertion expected 'examined' where the locator said 'examination'; and one negative fixture mutated `volume2_contents_examined` without the validator asserting that field. The locator now explicitly says the page image was not examined, and the validator guards the unexamined Tome II flag. I also expanded the workflow path filter to include individual `scripts/validate-*.js` changes, because validator-only edits had not triggered CI. The branch is awaiting its final triggered validation run; no merge is planned until all checks pass.
