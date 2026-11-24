# V1.4 research audit — 24 January 1731 Company register extracts and the 1,450,000-livre undertaking

**Research date:** 24 November 2026  
**Repository:** `mcfruitpunch/Anatomy-of-civilization`  
**Issue:** [#24 — Read 1731 original decrees and map real colonial debts](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24)

## Scope and access level

I opened the Louisiana Historical Center's [record 1731-01-24-03](https://lacolonialdocs.org/document/2003) and visually examined 24 accessible 800px image derivatives corresponding to record image links 3–26. The record page lists 24 pages and 48 image links; the other 24 links were not inspected, and no recto/verso mapping is inferred.

The examined images comprise four typed English summary/translation cards (`doc-img-125291.jpg`–`doc-img-125294.jpg`) and twenty manuscript, certification and cover images (`doc-img-125271.jpg`–`doc-img-125290.jpg`).

The 1731 text was not examined as an original Company register. The surviving witness is an **1889 certified archival copy of extracts**. The certification on `doc-img-125286.jpg`–`doc-img-125287.jpg`, dated Paris, 20 September 1889, states that the extracts conform to a collated copy deposited in the archives.

## Provenance correction

The LHC record page labels the source "French Superior Council" and lists New Orleans as origin. The copied document's own heading instead identifies the **Ministère de la Marine et des Colonies, Bureau des Archives**, and "Cartons sur la Compagnie des Indes no.1". Its title page describes an extract from the Company's general assembly register.

These are not silently reconciled. The atlas records the LHC catalogue label and the internal Ministry/Company-cartons heading as a provenance discrepancy. The underlying 1731 register and the full custody chain remain unexamined.

## What the copied text records

### 22 January 1731 Company register extract

Image `doc-img-125271.jpg` identifies an extract from the Company's general administrative assembly register dated 22 January 1731. The petition pages describe the Company's request to relinquish Louisiana and Illinois governance/territorial privileges. They also describe an alternative under which the Company would retain exclusive trade while supplying the inhabitants with **500 enslaved people per year** and other necessities. This is a proposed contractual condition, not evidence that 500 people were shipped in any year.

The petition frames the Natchez conflict and colonial insecurity from the Company's perspective. It is a corporate administrative argument, not a neutral or complete account of Natchez political aims, the violence of French retaliation, or the experiences of enslaved people.

### 24 January 1731 Company committee deliberation

Image `doc-img-125283.jpg` is headed "Délibérations prises dans les Comités Généraux et particuliers du 24 Janvier 1731" and records the assembly of the Company's syndics and directors. It reads a letter from the Controller General dated at Marly, 22 January 1731.

The amount passage on `doc-img-125284.jpg` distinguishes two figures:
- **3,600,000 livres**: the Secretary of State for the Marine's estimate of the equivalent.
- **1,450,000 livres**: the amount the King reduced and fixed.

The ten-year schedule is stated as 200,000 livres in each of the first three years; 150,000 in each of the next three; and 100,000 in each of the final four. The schedule totals 1,450,000 livres.

The text on `doc-img-125285.jpg` says the Company assembly authorized the syndics and directors to make, on behalf of the Company, **"leur soumission de payer la susdite somme"**—their submission/undertaking to pay the stated sum—subject to what the King would order and the form he would prescribe.

**Direction:** Company-to-Crown is the contextual reading of this royal message and Company submission. The receiving Treasury account is not named in the excerpt.

**Status:** a Company-authorized submission/undertaking candidate, not proof that the final royal implementing order issued, that the undertaking was executed, or that any installment was paid. No Treasury account, receipt or settlement was examined. The amount is recorded in the non-transactional claim-direction audit only; no financial-flow record was created.

## The English summary-card discrepancy

The attached English typed cards summarize the matter as a 3,600,000-livre amount but do not carry forward the French copy's reduction to 1,450,000 livres. The Louisiana Historical Center explains that its WPA Black Books are translations produced in the 1930s and warns that the material can contain omissions and organizational problems. However, the exact crosswalk between these four attached cards and a numbered WPA Black Book 20 page has not been established.

For the amount and schedule, the French text of the 1889 certified copy takes precedence over the incomplete English summary. The cards are not treated as an independent original witness.

## Relation to the 23 January and 24 February instruments

This 24 January Company assembly extract is distinct from the **23 January 1731 royal retrocession decree**, whose three printed pages were previously transcribed from a CIHM/ICMH microfiche facsimile in PR #48, and the **24 February 1731 Company-debt decree**, printed in 1733, whose two operative pages remain unread.

No explicit cross-reference in the 24 January copy establishes that its 1,450,000-livre undertaking is the same legal subject as the 24 February debt decree. The two must not be merged into one settlement or balance.

## Affected-community context

The Company's petition discusses the Natchez conflict as a reason for its withdrawal and proposes a trade alternative involving an annual supply of enslaved people. Those are the Company's institutional claims and commercial proposals.

The [Natchez Nation's official website](https://natcheznation.org/) identifies a continuing sovereign Natchez community in Oklahoma and describes a modern history following French interaction. The [National Park Service's Natchez history](https://www.nps.gov/natc/learn/historyculture/indians.htm) describes the 1729 conflict, French retaliation and Natchez dispersal/refuge by 1731. The contemporary tribal self-description is included as a community perspective; the NPS page is institutional historical context, not Natchez testimony.

No colonial territorial language is treated as Indigenous consent. The proposed 500-person annual supply is not treated as a completed shipment or population count. Enslaved people are not encoded as neutral Company property or a financial asset.

## Repository implementation

- Reclassified `doc-021` as `certified_archival_copy_text_examined`, not an original 1731 register or an unexamined Superior Council manuscript.
- Updated the image-access audit with the 24 examined derivatives, 24 unexamined links, 1889 certification date and unresolved provenance discrepancy.
- Added `extract-015` with selected French phrases and the 1,450,000-livre schedule.
- Added a non-transactional claim-direction entry for the Company's submission to pay the Crown; `amount_verified`, `liability_adjudicated` and `payment_verified` remain false.
- Added a Natchez Nation entity and paired community self-description with NPS context.
- Added regression tests preventing the 3,600,000-livre estimate from being promoted to the fixed amount, the 1,450,000-livre undertaking from becoming a payment, and the 500-person proposal from becoming an actual shipment.
- No financial-flow record was created.

## Next research gaps

1. Obtain the original Company register or a higher-resolution certified copy and confirm the 1889 copy's custody/provenance.
2. Locate the royal implementing order and Treasury accounts/receipts for the 1,450,000-livre schedule; do not infer payment from the undertaking.
3. Establish the exact relationship, if any, between the 22–24 January Company register extracts and the 23 January royal decree.
4. Obtain both pages of the **24 February 1731 Company-debt decree** (1731 Imprimerie royale or 1733 Saugrain–Prault witness) and transcribe the operative clauses.
5. Establish whether the attached English cards map to WPA Black Book 20; do not rely on the incomplete 3,600,000-livre summary.
6. Continue research from Natchez, Choctaw and enslaved people's perspectives rather than treating Company petitions as a complete account of the colony.
