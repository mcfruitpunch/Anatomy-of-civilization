# V1.4 source audit — Company-to-Treasury memoir, 1735 half-reduction reply, and C13c microfilm route

**Research date:** 22 November 2026  
**Starting main:** `71db9d93a1edb3670fefc009f77cf5c5717da712`  
**Scope:** One bounded retrieval-and-provenance milestone. No new French manuscript text was transcribed.

## Repository state checked first

- `main` was at `71db9d9` (PR #52 merged).
- Issue #24 remained open; it was the principal V1.4 task.
- No open PRs were present.
- The January 23, 1731 retrocession decree had already been transcribed from a 1985 CIHM/ICMH microfiche facsimile; this work does not repeat that transcription.
- The March 30, 1735 commodity ordinance (doc-030), September 30, 1733 Company-notes letter (doc-033), Duval card (doc-029), and Guillon–Labbé card (doc-027) were already recorded. This milestone adds two different HNOC archival-calendar items and a precise microfilm retrieval route.

## 1. HNOC item 7589 — 1732 Company-to-Treasury memoir

The Historic New Orleans Collection's *A Guide to French Louisiana Manuscripts* identifies:

- **Item:** 7589
- **Catalogue date:** **[2 September 1732]**, explicitly marked **estimated**
- **Document type:** memoir
- **Extent:** 5 pages
- **Original archival locator:** **AC C 13c, 1:41**, updated by HNOC as **ANOM C 13c, 1:41**
- **Abstract:** a memoir on the amount due the French treasury by the Company of the Indies because of Louisiana's retrocession
- **Cross-citation/microfilm fields:** Library of Congress, Center for Louisiana Studies, and HNOC

Directly examined: HNOC catalogue notice, not the five French pages. The abstract's direction is explicit at the catalogue level: it describes the Company as owing the French treasury. It supplies no amount, calculation, author, adjudication, receipt or payment.

This is a **claim described in a memoir**, not proof that a court or the Crown fixed a final liability, that the Company accepted the amount, or that money changed hands.

## 2. HNOC item 8981 — 1735 reply on a one-half reduction

The HNOC guide identifies:

- **Item:** 8981
- **Date:** **[20 April 1735]**
- **Document type:** answer/reply
- **Extent:** 19 pages
- **Original archival locator:** **AC C 13c, 1:318**, updated by HNOC as **ANOM C 13c, 1:318**
- **Abstract:** reply to a memoir from the Council of Louisiana on reduction by one-half of the Company's outstanding debts in Louisiana

Directly examined: HNOC catalogue notice, not the nineteen French pages. The English abstract does **not** resolve whether the debts were owed by the Company or owed to it, identify the author of the reply, state the debt class, identify a decision-maker, or establish whether a reduction was approved or executed.

### Do not conflate this with the paper-money account

Nancy Maria Miller Surrey, *The Commerce of Louisiana During the French Régime, 1699–1763* (1916), printed pp. **122–123**, describes Company merchandise used from 1729–1731 to retire many Company notes at a 50-percent discount and a separate 30 September 1733 Superior Council reduction of old paper by half. Surrey cites **ANOM C 13, vol.16, fols.166–177** for this account (and Margry, vol. V, pp.654–655).

That is a different locator: **C 13, vol.16**, not **C 13c, vol.1**. The similarity of “one-half” language is a research question, not proof that HNOC item 8981 concerns the same paper notes. The original C 13c reply must be read before making that connection.

## 3. New retrieval route: UL Lafayette Collection 329, reels 539–541

The University of Louisiana at Lafayette's *Colonial Louisiana Records Collection 329* finding aid states:

- Collection 329 contains **1,292 reels** and was transferred to the University Archives and Acadiana Manuscripts Collection in **May 2013**.
- Its section II.F, printed p.4, lists **Archives des Colonies, Série C 13c, volumes 1–4 on reels 539–541**.
- The finding aid does **not** map volume 1 or folios 41 and 318 to an individual reel or frame.

The University Libraries microforms service page describes readers with reading/printing features and microform services during normal library hours. It also says users may bring outside microforms. This establishes a practical service route, **not** item-level availability, unrestricted public access, or confirmation that a particular reel is ready for consultation.

### Exact request now possible

Ask UAAMC/UL Lafayette to identify which of reels **539–541** contains **C 13c, volume 1**, and whether it can provide legible scans of:

1. folio **41** (HNOC item 7589, five pages);
2. folio **318** (HNOC item 8981, nineteen pages).

Request surrounding folios and the volume's title/sequence pages so that dates, hands, enclosures and document boundaries can be checked. The specific reel/frame remains unverified until the repository confirms it or the film is inspected.

## 4. Three financial directions now separated

The non-transactional direction audit records these as distinct evidence classes:

1. **23 January 1731 decree (doc-022):** directly read from the microfiche facsimile; the Company retains rights against unnamed provincial debtors. This is Company-side creditor-rights language; it identifies no debtor, amount or collection.
2. **2 September 1732 memoir (doc-040):** HNOC abstract describes an amount due from the Company to the French treasury. Company-to-Treasury direction is catalogue wording only; amount and legal status remain unknown.
3. **20 April 1735 reply (doc-041):** HNOC abstract mentions a one-half reduction of the Company's outstanding Louisiana debts, but direction and outcome remain unresolved.

The March 30, 1735 A 23:118 ordinance (doc-030) is separately catalogued as concerning debts **to** the Company and commodity-acceptance prices. It should not be collapsed into the 1735 C 13c reply without an original cross-reference. The 1733 C 13 vol.16:166 letter (doc-033) is another distinct correspondence item about Company notes and bills.

No unified net balance, debt chain, settlement, Crown assumption or payment is established.

## 5. Human and community context

These records are French imperial fiscal correspondence and an institutional calendar's descriptions of it. They do not capture the whole social history of the transition.

The atlas continues to retain community-authored Choctaw history (including the Choctaw Nation's *Iti Fabvssa* account of diplomacy and trade) and Peoria Tribe history as distinct perspectives. The Louisiana State Museum's manuscript guide identifies both creditor-recovery cases and petitions by enslaved people seeking manumission in the colonial judicial collections. None of these sources should be made to stand in for one another: a French fiscal memo is not evidence of Indigenous consent, and a debt ledger is not a record of the lives or agency of enslaved people.

## 6. Implementation and limits

- Added catalogue-level documents doc-040 and doc-041.
- Added two unresolved timeline events and explicit open questions.
- Updated Collection 329 source provenance with the C 13c reel range and microform-service route.
- Added a non-transactional claim-direction audit so that Company creditor rights, a Company-to-Treasury claim, and the ambiguous 1735 half-reduction reply cannot be collapsed into one debt.
- Added regression checks that reject invented debt direction, adjudicated liability, verified amount or payment.
- Added two null-valued rows to the liability review ledger; `paid`, `transfer` and `liable` remain null.
- No financial-flow records were created.
- The 24 February 1731 decree (doc-024) remains `catalogue_metadata_only`; its operative clauses are still unread.

**Next research gap:** obtain and transcribe the C 13c, volume 1 originals at folios 41 and 318, then compare the 1732 Company-to-Treasury claim and 1735 half-reduction reply with the original February 24, 1731 debt decree and any actual accounts/receipts. Do not claim a settlement or payment without a receipt or ledger that explicitly documents it.
