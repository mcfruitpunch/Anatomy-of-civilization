# V1.2 — Choctaw diplomatic bargaining, the Mobile trade monopoly, and 29,000-livre award

**Research date:** 19 October 2026 · **Covered events:** 1725–1732, building on the Choctaw-led request of 1721  
**Claim standard:** Confirm who petitioned, what state decision was reported, what sums were awarded, and what remains **unverified as paid**. Source quality is indexed separately from the originality of the historical documents.

## The discovery

Musco, Ellis and Spring's 2025 peer-reviewed study, jointly developed with Indigenous historical expertise, reconstructs how **Choctaw leaders** sustained demands for a French trading post within their territory. The requests were made in **1721**, repeated in **1725**, renegotiated in **1729**, and realized as the **Youanis/Haiyowvni post in early 1730**. The new post competed with an exclusive trade privilege that French authorities had previously authorized to **Bernard Diron d'Artaguiette**, a commander at Mobile and colonial official.

The scholars report that Diron took the dispute before the Louisiana **Superior Council**, which **awarded 29,000 French livres in compensation**, citing **ANOM C13A (1732), folios 33–33v**. This is the first source-supported specific monetary figure we have uncovered for that post's monopolistic displacement. The original court folio itself has **not** been read or re-transcribed in this investigation.

**Source 1:** [Musco, Ellis and Spring, *Sovereignty, Nations, and Diplomacy* (2025)](https://journals.openedition.org/gradhiva/9785), the section on Choctaw trade initiatives and original ANOM 1732 folios. Full French scholarly article and publisher material cited; archive folios pending.

### A separately catalogued follow-on document

The [Historic New Orleans Collection manuscript guide](https://surrey.hnoc.org/result_keyword.php?keyword=botany&page_number=5) describes a **2 September 1732** ministry letter from Marly to **Salmon** approving the Superior Council decision in a case involving **Diron and the Company of the Indies**. Its catalogue reference is **AC B57, p.815**. The summary does **not** give 29,000 livres, an individual payee receipt or the amount of any actual cash transfer.

We therefore track two distinct pieces of evidence:
- **1732 Superior Council award of 29,000 livres**: modern scholarship citing **ANOM C13A fols.33–33v**, not independently verified original court text.
- **2 September 1732 approval of a Diron–Company decision**: archive's description of ministry correspondence, **AC B57 p.815**. Connecting this exact letter to the identified 29,000-livre ruling is a reasonable research lead **pending original text comparison**.

The two should **not** automatically be treated as an audited single payment chain.

## Precursors: original-source cataloguing

An earlier [HNOC French Louisiana manuscript guide](https://surrey.hnoc.org/result_keyword.php?keyword=slavery&page_number=37) indexes a **27 February 1725** Superior Council report to the Company of the Indies that covers Choctaw trade (AC C13 vol.9, p.51; 47-page copy). This is closer to original official correspondence than a retrospective narrative but the full report has **not** been read, and it should not be assumed to be the specific **C13A vol.9 fol.65v** passage identified by the 2025 authors without a folio match.

Similarly, the [HNOC guide's abstract of **9–10 February 1730** correspondence](https://surrey.hnoc.org/result_keyword.php?keyword=military+posts&page_number=36) catalogs a letter from Diron d'Artaguiette at Mobile discussing the disagreement between him and Governor Périer over Régis du Roullet's Choctaw mission, among other questions (AC C13 vol.12 p.362; nine pages). This provides an additional named, dated archival lead to conflict around the post, but its contents are not transcribed in the atlas.

The [15 January 1732 Salmon report](https://surrey.hnoc.org/result_keyword.php?keyword=fur+trade&page_number=21) touches on Choctaw hides, trade goods, weapons and complaints over metalworkers' prices (AC C13 vol.15 p.7). Its catalogue demonstrates practical trade-price tensions; it does not show what anyone paid for a particular Choctaw shipment.

## The other unimplemented plan

In **1726**, Charles-Frédéric de Merveilleux proposed building a French trading station in Choctaw territory. The French authorities did **not** adopt that plan. In the late 1720s, French governor Étienne Périer pursued the Choctaw-desired post **over the objection of Diron**, whose Mobile trading privilege stood in the way, and against the Company of the Indies' reluctance to fund new infrastructure.

Saying *the French founded the station and offered trade as a gift* would therefore erase Choctaw leverage. Saying *France lacked any influence over the process* would also be too strong: French colonial institutions administered commercial grants and budgets, and those powers generated the legal damages dispute.

The more accurate sequence is **Choctaw sovereign demands → colonial trade negotiations → conflict with a granted monopoly → Périer's decision → new station in 1730 → Superior Council compensation award in 1732**. Not all arrows represent simple causation and the personal interests of actors differed.

## The money record, with strict distinctions

Our `data/financial_flows.json` entry `fin-012` has these properties:

| Field | Meaning |
| --- | --- |
| `value: 29000` | Amount of *legal award*, not cash proven paid |
| `unit: livres_tournois` | Historic French unit, **not British pounds** |
| `flow_state: legal_award_not_disbursement` | This is explicitly not an observed transfer |
| `from: ent-french-superior-council-la` | The institution issuing the ruling, **not an established payer** |
| `to: [ent-bernard-diron-dartaguiette]` | Award's beneficiary; **not an evidenced recipient of funds** |
| `sources` | Peer-reviewed reconstruction and ministry's separately indexed case reference |

The web interface displays **“29,000 French livres · legal award, payment not verified.”** This protection matters because otherwise a money-flow diagram could falsely imply the Choctaw nation paid the indemnity or the French treasury disbursed it.

## Identity issue: Diron the inspector and Diron the monopoly holder

Existing V0.9 records identify the signer of a 1721 census only as **“Diron”**. A separate 1916 edited historical source identifies **Bernard Diron d'Artaguiette** as inspector-general in this historical period. This is strong contextual evidence they may be the same person, **but the signatures and original administrative terms have not yet been compared**. They are retained as separately identified database records rather than silently merged. The [Library of Congress's digitized edited journal](https://www.loc.gov/resource/lhbtn.09410/) offers a way to check the editor's introductory evidence; the original manuscript is elsewhere.

## Questions for the next archival pass

1. **Original ANOM folio:** obtain the page image or an approved transcription of **C13A 1732 f.33–33v**. Determine date, exact claimant, liable party, monetary denomination, reason for indemnity and whether the judgment is preliminary or final.
2. **Ministerial letter:** read **AC B57 p.815** for the September 2 approval and check that it refers to the same adjudication, with the same sum.
3. **Ledger reconciliation:** search the Company of the Indies' account books, treasury payment orders and private receipts for whether **29,000 livres** was *actually paid* and to whom.
4. **Choctaw diplomatic record:** obtain **C13A 1721 vol.6 f.146** and resolve the *8 vs 28 February 1721* disagreement without treating one secondary date as settled.
5. **Demands of specific Choctaw towns:** consult community-approved histories and surviving diplomatic letters for whether the post's location and trade arrangements satisfied those who demanded it.
6. **Company cost accounting:** find the actual procurement accounts, salaries, goods lists and building costs for Youanis in 1729–1730. Do not equate the later compensation award with the cost of constructing the post.
7. **People held in slavery:** consider how expanding colonial trade shaped coercive labor systems; do not silently collapse enslaved Africans, the Natchez nation, Choctaw towns and other peoples into one financial category.

## Quality boundary

The original legal folios have **not** been independently inspected. Primary **archive summaries** are clearly labeled as summaries; a peer-reviewed historian's citation to a folio is not our own direct reading. Named colonial officials' accusations or financial complaints are not the same as criminal wrongdoing. Choctaw motivations must not be reconstructed solely through French complaints about diplomacy. No connection implies guilt through family relationship, surname, nation, or religion.

**Main outcome:** We have reached a rare, quantified, historical connection between Indigenous leverage and colonial commercial law: a 29,000-livre legal award. The next verification hurdle is the court's original text and proof (or lack) of actual disbursement.
