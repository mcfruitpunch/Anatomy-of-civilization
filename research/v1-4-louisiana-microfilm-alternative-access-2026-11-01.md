# V1.4 — Alternative physical source route for Louisiana decrees (1 November 2026)

**Related open question:** [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). This is a *reproduction-access milestone*, **not** an original-decree transcription or proof of a debt settlement. It does not duplicate the LLMC/BnF reproduction identifiers already tracked in [PR #33](https://github.com/mcfruitpunch/Anatomy-of-civilization/pull/33).

## What was directly examined

1. **University of Louisiana at Lafayette, Edith Garland Dupré Library**, [*Colonial Louisiana Records. Collection, 1626–1928*, Collection 329, institutional finding aid](https://library.louisiana.edu/sites/library/files/Colonial_Louisiana_Records_COLL329.pdf), inventory **printed p. 6**, section II.L, **reel 580**: `F3 242: Collection Moreau de Saint Méry: Code Louisiane, Tome II, 1724–1746`; **reel 574**: `A 23: Actes du pouvoir souverain, 1712–1746`. The introductory section (p. 1) confirms this is a held microfilm collection transferred to the university's archives in 2013. **The finding aid was read; the microfilm itself was not.**
2. **Université de Limoges**, [scholarly study, footnotes 38–39](https://www.unilim.fr/conflictualite/806), separately cites **ANOM COL F3 242 fol.187** for the **23 January 1731** retrocession act and **fol.190** for the **22 May 1731** Council reform. This gives a *candidate folio within the reel's listed series*, not an independently located reel frame.
3. **Historic New Orleans Collection**, [Surrey Calendar item 8949](https://surrey.hnoc.org/full_notice.php?id_document=8949), independently identifies the **30 March 1735** Superior Council ordinance as **ANOM A 23:118**, three pages. This is a *candidate item within reel 574's listed series*, not an examined original.
4. **UL Lafayette Special Collections**, [digitization request form and policy](https://library.louisiana.edu/collections/digital-archives/digitization-request-form), accepts item-level requests but states it **will not duplicate entire microfilm reels**. The [Special Collections appointment page](https://library.louisiana.edu/node/1990) identifies an email contact and an appointment route. **No request was submitted, and no image was received in this milestone.**

## Source-status matrix

| Target | Independently supported inventory path | Evidence status | Unresolved |
| --- | --- | --- | --- |
| 23 January 1731 retrocession decree | UL Lafayette Collection 329, **reel 580**, ANOM **F3 242**; separately cited **fol.187** | **Institutional finding aid + scholarly folio citation**, not inspected reel | Confirm fol.187 is present/legible; transcribe operative articles, compare with March 1731 *Mercure de France* pp.610–611 |
| 30 March 1735 Company creditor ordinance | UL Lafayette Collection 329, **reel 574**, ANOM **A 23**; separately catalogued **A 23:118** | **Institutional finding aid + HNOC calendar**, not inspected reel | Confirm frame and read three French pages, rates, payer/debtor language and exceptions |
| 24 February 1731 Company debt decree | Existing BnF/Columbia/LLMC printed witnesses in `data/louisiana_decree_witnesses.json` | **Bibliographic only**, operative clauses still unread | **Not proven to be on either UL Lafayette reel.** Obtain 1731 or 1733 printing separately; do not claim it is at F3 242 without verification |

### Exact targeted request plan (not sent)

Ask UL Lafayette Special Collections for an *item-level frame check* of **Collection 329, reel 580, ANOM F3 242 fol.187** (23 January 1731) and **reel 574, ANOM A 23:118** (30 March 1735). Request legible recto/verso images, frame/folio identification, omissions, permissions and any fees. If a frame is absent or illegible, record that outcome rather than reconstructing the text. Do **not** request whole-reel duplication, which the library policy disallows. The next researcher should use the institution's official form or email contact, not presume an access grant.

## Claims kept separate

- **Documented catalogue fact:** The university lists the two *series* on the specified microfilm reels. Independent scholarship/calendar sources give the folio/item targets.
- **Retrieval hypothesis:** The corresponding original legal pages may be recoverable by examining those reels. Presence, completeness and legibility of the specific frames are not yet verified.
- **Unresolved financial history:** The February 1731 debt act's clauses, Crown/company debtor allocation, individual creditor claims, settlement amounts, commodity deliveries, and actual payments remain unverified. The 1735 ordinance's location does **not** prove that it implements the 1731 decree. No new arrow, payer, debtor, or amount is added to the financial ledger.

## People and source bias

A French royal decree and a Superior Council ordinance represent colonial legal claims, not proof of Indigenous nations' consent. Continue to read the [Choctaw Nation of Oklahoma's *Iti Fabvssa*](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) for Choctaw diplomacy and agency, and distinguish Choctaw from other nations. The [Louisiana Historical Center's indexing-process warning](https://www.lacolonialdocs.org/post/8/the-process) explains omissions of enslaved people's and women's names in older WPA summaries; absence from an official creditor index is not evidence that these people were absent from events. Treat enslaved persons as people subjected to coercion, not transferable financial assets.

## Implementation

Added two institutionally supported source records, `data/louisiana_archive_access_routes.json` with two **candidate** reel-to-document routes, and a strict validator wired into `scripts/validate.js`. The validator requires exact series/reel/date/source links, forbids promotion from finding aid to original inspection, and rejects fabricated liability and payment fields. Updated the 23 January decree witness's retrieval route; did **not** alter the February debt decree's status or any liability-ledger values.

**Next research gap:** A verified, legible page image of the 24 February 1731 debt decree's operative articles remains the highest priority. The new reel 580 route is a practical parallel way to obtain the 23 January act; it is not proof of access to the February act.
