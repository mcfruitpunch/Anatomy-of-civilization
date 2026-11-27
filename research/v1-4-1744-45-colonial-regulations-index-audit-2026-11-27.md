# V1.4 — 1744–1745 colonial-regulations compilation scope check

**Research date:** 27 November 2026  
**Target:** `doc-024`, royal Company-of-Indies Louisiana debt decree dated 24 February 1731, catalogued in separate 1731 and 1733 printings.  
**Result:** A distinct public two-tome compilation is now a retrieval route. The examined Tome I contents transcription does not list the target decree. This is a bounded negative scope check, not proof of absence from the whole compilation.

## 1. Digital file metadata

### File I.djvu — Commons labels Tome I (1744); Wikisource labels Tome II
[Wikimedia Commons file metadata](https://commons.wikimedia.org/wiki/File:Recueils_de_reglemens,_edits,_declaration_et_arrets_I.djvu) identifies a 218-page DjVu, publication date 1744, and labels it Tome I. The page lists Bibliothèque nationale de France as the source and John Carter Brown Library as the collection field. These provenance fields are not reconciled; the physical copy and file pages were not examined.

[Wikisource book-level record and contents transcription](https://fr.wikisource.org/wiki/Livre:Recueils_de_reglemens,_edits,_declaration_et_arrets_I.djvu).

### File II.djvu — Commons labels Tome II (1745); Wikisource labels Tome I
[Wikimedia Commons file metadata](https://commons.wikimedia.org/wiki/File:Recueils_de_reglemens,_edits,_declaration_et_arrets_II.djvu) identifies a 373-page DjVu, publication date 1745, and labels it Tome II. It likewise names BnF as source and JCB in the collection field. No page image or contents transcription was examined.

[Wikisource book-level record](https://fr.wikisource.org/wiki/Livre:Recueils_de_reglemens,_edits,_declaration_et_arrets_II.djvu).

## 2. Contents transcription examined (file I.djvu; tome designation unresolved)

The book-level Wikisource contents transcription notes the table at printed page 211 and lists colonial-regulation entries including:

- 1724 Louisiana Code Noir, p. 135.
- 1734 ordinance regulating certificates for the slave trade, p. 188.
- 1736 ordinance concerning manumission and baptism of enslaved people, p. 202.
- 1738 declaration concerning enslaved people, p. 156.
- 1742 exemption ordinance connected to products of the slave trade, p. 205.

The **24 February 1731 Company-debt decree is not listed** in the examined contents transcription for file I.djvu. Commons metadata labels this file Tome I, while Wikisource labels it Tome II; the designation remains unresolved until the title page is examined. The transcription is OCR/contents text, not direct visual examination of the printed table page. The book's scope is colonial regulations about trade, justice, police, engagés and the Code Noir; it is not a comprehensive index of all royal acts. The negative result therefore applies only to the examined file I.djvu contents list.

## 3. Volume-label discrepancy

Wikisource metadata labels `I.djvu` as Tome II and `II.djvu` as Tome I, opposite Commons metadata. Neither label is confirmed by title-page examination. Do not cite a tome/page until both title pages are checked.

File II.djvu contents were not examined. Its last Wikisource page (373) is marked “not intended to be corrected” and contains no transcription; it is not a verified contents page.

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

1. Obtain title pages for both files and file II.djvu contents, and resolve the Wikisource/Commons volume-label mismatch.
2. Continue prioritizing the two operative pages of the standalone 1731 Imprimerie royale or 1733 Saugrain–Prault debt decree.
3. For the separate 1755–1756 BnF Recueil, inspect the T.4 chronological index only if a working access route is obtained; do not presume the act appears there.
4. When the debt decree is obtained, transcribe its operative clauses, distinguish legal debtor/creditor direction, and seek separate receipts or accounts before asserting any payment.

**Conclusion:** This new collection route helps avoid an unsupported assumption that the decree is in a later colonial-regulations compilation. The central 1731 legal text remains unread.


## Validation history

PR CI exposed five test-fixture issues, all corrected: `printed_toc_page` was absent from the strict allowed-key list; the volume-label regex expected Arabic numerals while the metadata uses Roman numerals; a source-locator assertion expected 'examined' where the locator said 'examination'; one negative fixture mutated `volume2_contents_examined` without a corresponding guard; and another changed a volume year without the validation helper checking volume identity. The locator now explicitly says the page image was not examined, and the helper checks volume identities, provenance IDs, and the Tome II flag. I also expanded the workflow path filter to include individual `scripts/validate-*.js` changes, because validator-only edits had not triggered CI. The branch is awaiting its final triggered validation run; no merge is planned until all checks pass.


## Post-merge scope-label correction

After PR #59 merged, a stricter review of the two book-level records showed the contents transcription belongs to file `I.djvu`, but Commons labels that file Tome I while Wikisource labels it Tome II (and labels file II.djvu Tome I). The scope audit was corrected to refer to file identifiers and mark tome designation unresolved. The original negative contents result is unchanged; no title-page examination was performed.


**PR #60 validation note:** The first run caught a validator regex that expected different wording than the source record's `Commons metadata labels...` phrase. The regex was updated to match the exact provenance wording; final checks are pending.
