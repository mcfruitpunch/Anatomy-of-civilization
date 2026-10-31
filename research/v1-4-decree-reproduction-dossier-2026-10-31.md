# V1.4 primary-decree reproduction and verification dossier — 31 October 2026

## Why this milestone exists

[Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24) has accumulated numerous **catalogue-only** debt and creditor leads. The next high-value task is **not** another assumed settlement or duplicate index entry: it is reading the operative clauses of the **24 February 1731** Council of State debt decree. This dossier records precise retrieval keys so subsequent researchers can request a legible original rather than repeatedly treating a failed Gallica fetch as an examination.

## Witnesses and checked bibliographic evidence

| Witness | Checked evidence and locator | Direct original-page review | Next reproducible step |
| --- | --- | --- | --- |
| **24 February 1731 act, Paris 1731 royal printing** | BnF Catalogue général, filtered Conseil d'État result **39**: 1731 Imprimerie royale printing. The existing [filtered results URL](https://catalogue.bnf.fr/affiner.do?afficheRegroup=false&critereRecherche=&index=&listeAffinages=FacPays_fr%3BFacNatDoc_a%3BFacLan_fre%3BAUT3_12495798&motRecherche=&nbResultParPage=100&numNotice=&triResultParPage=0&trouveDansFiltre=NoticePUB&typeNotice=) is **not a stable item-level record**. | **No**; edition described by catalogue only. | Resolve a stable BnF item record, obtain images of every printed page, record original pagination. |
| **Same act dated 24 February 1731, Paris 1733 Saugrain–Prault printing** | [Columbia Law Library catalogue record 1505745](https://pegasus.law.columbia.edu/record/1505745), **two pages**, LLMC system no. **LLMC1338688796**, print **OCLC 27416388**, Wroth & Annan, *Acts of French Royal Administration*, no. **1214**. BnF digitized identifier: [Gallica ark:/12148/btv1b8602624n](https://gallica.bnf.fr/ark:/12148/btv1b8602624n), linked in [BnF France-Amériques](https://heritage.bnf.fr/france-ameriques/compagnies-commerce). | **No**. On 31 October 2026, the Gallica original-page request again returned **HTTP 403** in this environment. Columbia supplied bibliographic metadata, **not** the two pages' operative text. | Request a complete, legible two-page reproduction through the holding/digital collection and transcribe the clauses with page identifiers; compare to 1731 printing for substantive variants. |
| **Separate 23 January 1731 retrocession act** | [UMSL Mercantile Library printed title-page image](https://www.umsl.edu/mercantile/exhibitions/online-exhibits/lewis_and_clark_maps/MAPS_online_images/LP%20arrest%20du%20conseil%20OBJECT.jpg); issue #24 also cites ANOM COL F3 242 fol.187, not inspected in this run. | **Title page previously inspected only**, not the full act. | Obtain the remaining original pages; compare to the *Mercure de France* March 1731 contemporary printed report, pp. 610–611, already documented in PR #27. |

**Documented bibliographic fact:** The 1733 imprint refers to an act dated **24 February 1731**. It is **not evidence of a separate 1733 enactment**. The 1731 and 1733 imprints are two known bibliographic witnesses of one dated act; substantive textual equivalence is **not yet established**. <https://pegasus.law.columbia.edu/record/1505745>

**Unresolved legal question:** Which creditors and debtors did the decree address, what claims were allowed or excluded, what valuation or deadlines were prescribed, and who was ordered to perform? The word *payement* in the title does **not** establish disbursement. The Company's retained rights **against** colonial debtors in the January retrocession report are distinct from the Company's debts **to** creditors. No Crown assumption, debtor identity, paid amount, receipt or settlement is verified by these catalogue records.

## Original-image examination protocol

1. Record institution, shelfmark/ARK or stable catalogue ID, printing year, **act date**, page number/image sequence, and whether the object is a scan, transcription, catalogue description or modern summary.
2. Transcribe only legible French passages with a page/image locator; mark uncertain readings with brackets and preserve variant spellings. Keep a literal translation separate from interpretation.
3. For every purported obligation, identify **claimant, claimed debtor, deciding authority, obligated performer, currency/valuation, deadline, execution evidence and receipt**, allowing unknown values. Do not turn legal orders, promissory notes or judicial awards into cash-transfer arrows.
4. Compare 1731 and 1733 witnesses for omissions, corrections and imprint differences before claiming they contain identical operative provisions.
5. For any named person or estate, independently corroborate identities and financial direction in the original 1732–1737 accounting and receipt instruments. A name in an index does not prove a role.

## People absent from the corporate frame

Catherine Desbarats's [BnF scholarly overview](https://heritage.bnf.fr/france-ameriques/compagnies-commerce) describes chartered companies' imperial power and colonial violence, including forced labor and severe mortality. This is **scholarly context**, not a transcript of the 1731 debt decree. The [Choctaw Nation's Iti Fabvssa account of early treaties and Fort Tombecbe](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) is a **community-authored historical perspective** on diplomacy, not evidence that the Choctaw Nation accepted French colonial jurisdiction or owed Company debts. Distinct Indigenous nations must not be collapsed into a generic colonial counterparty. Likewise, the financial archive's treatment of enslaved people as assets cannot establish consent or exhaust their lived experiences; consult original records and descendant/community histories rather than assuming absence from an index means absence from history.

## Implementation and limits

The three records in `data/louisiana_decree_witnesses.json` now contain actionable retrieval keys and next-access steps. `scripts/validate-louisiana-decree-witnesses.js` rejects missing/duplicate retrieval keys and unsupported settlement language, and checks the Columbia/LLMC/OCLC/Gallica identifiers. This is **access and provenance improvement only**; no new original clause, debtor, payment, or monetary figure was established. The liability ledger is deliberately unchanged.

**Next gate:** obtain both pages of the 1733 printing or the full 1731 printing, verify a page-level legal clause and its role semantics, then consider updating the actor/role liability ledger. Until then, leave issue #24 open.
