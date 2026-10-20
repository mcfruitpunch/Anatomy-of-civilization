# V1.3 — Louisiana's 1731 retrocession: corporate exit, royal courts, assets and debts

**Research status:** a dated source-led inquiry using a photograph of one original printed title page, university scholarly citations to original folios, legally authoritative bibliographic metadata and HNOC's original-letter catalogue abstracts. **Not** a completed diplomatic or financial transcription. Original decree articles, liability allocation, judicial court folios, and payment ledgers remain open.

## The central discovery: four related actions that cannot be merged into one transaction

| Exact date | Documentary finding | What the evidence supports | What remains unknown |
|---|---|---|---|
| **23 Jan 1731** | *Arrêt du Conseil d'Estat du Roy* returning the Compagnie des Indes' Louisiana and Illinois concession to the King; preserved original printed title page | The royal Council formally issued a decree about retrocession on this date | Full conditions of legal transfer, any reservations of private grants, effective dates in remote posts |
| **24 Jan 1731** | Louisiana Historical Center local Superior Council dossier, document 1731-01-24-03, 24 digitized French pages | There exists a separate dated **local** retrocession-related administrative record | Which acts were ratified or transcribed on its pages, whether it is the same as the preceding royal decree |
| **24 Feb 1731** | Royal decree *concernant le payement des dettes de la Compagnie des Indes à la Louisiane*, according to its historic full title | There was a distinct legal act about company debts dated **1731** | Which debtor owed which sums, how claims were calculated or settled, and which creditors actually received funds |
| **22 May 1731** | Royal law reorganizing the Louisiana Superior Council; academic research cites ANOM COL F3 242 fol.190 | The Council reverted to a composition based on 1716 rules **excluding Company directors** | Original clauses, complete appointee roster, implementation at outlying posts |
| **19 Jan 1732** | Salmon's indexed letter to minister, ANOM C13 15:31 | Fiscal officer reported possession **for the King** of Company forts, buildings and artillery, except specified posts; also noted conflict about merchandise | Full inventory, disputed property rights, actual account balances |
| **2 Sep 1732** | Minister to Salmon, ANOM B57:815 | Ministry corresponded about Superior Council decision involving Diron and Company | Whether it is precisely the 29,000-livre award, who was liable, and whether paid |

### Source: a primary printed title page actually identified

The University of Missouri–St Louis Mercantile Library [preserves an image of the original printed royal decree's title page](https://www.umsl.edu/mercantile/exhibitions/online-exhibits/lewis_and_clark_maps/MAPS_online_images/LP%20arrest%20du%20conseil%20OBJECT.jpg). It explicitly states **23 January 1731** and describes the return of the *Louisianne et du pays des Illinois* concession by the **Compagnie des Indes**. This is **stronger than inferring a day from a later history**. A [2026 legal historical research article from Université de Limoges](https://www.unilim.fr/conflictualite/806) independently cites the original **ANOM COL F3 242 fol.187** for that act and **fol.190** for the Council composition reform of May 22.

A surrounding generic exhibit web caption mistakenly describes a 'transfer to Spain' in 1731. The **original royal text's title and named parties** concern the Company's return of the concession to the **French Crown**, **not Spain**. The atlas cites the preserved original image and separately notes the incorrect modern caption. Only the **title page**, not all articles, was inspected.

### Critical dating correction: the debt decree is **1731**, although printed **1733**

BnF's curated archival list presents the debt item under **1733**. That initially led us to place a separate supposed debt law in 1733. However, [Columbia Law Library's rare-book catalogue](https://pegasus.law.columbia.edu/record/1505745) gives the title of the two-page royal act as ***Du 24 février 1731*** and states the extant printed pamphlet was published **in Paris in 1733**.

This is a meaningful correction. Publication year ≠ legal decision date. An early historical bibliography likewise lists February 24, 1731 for the debt decree. We now use **evt-1731-french-company-debt-decree**, with the actual **1731-02-24** act date and 1733 publication noted separately. The obsolete apparent 1733 legal event was replaced, not duplicated, and all dominoes retimed.

**No actual company debt was asserted as paid** from this bibliographic evidence.

## Corporate and royal power were not the same thing

The Louisiana State Museum [explains the historical transition](https://louisianastatemuseum.org/louisiana-history-colonial-louisiana): the French Crown first authorized private proprietors and trading companies to administer colonial Louisiana, then resumed responsibility after difficulties and colonial conflict.

The company returning a **governing concession** did not mean that every store, house, monopoly, private plantation, labor claim or financial obligation automatically belonged to or was paid by the Crown.

The May 22 law is an unusually specific institutional example: company directors were **excluded** from Louisiana's reconfigured Superior Council, according to a modern legal historian's reading of **ANOM F3 242 fol.190**. That is a sourced structural redistribution of official power, not just a succession in an ownership network.

### Asset handover in January 1732

The Historic New Orleans Collection's [specific archival record 7287](https://surrey.hnoc.org/full_notice.php?id_document=7287) inventories a letter from **Edme Gatien Salmon**, *commissaire-ordonnateur* of Louisiana, **January 19, 1732** (**ANOM C13 15:31**, two pages). Its archive description states he reported taking possession of forts, buildings and artillery for the king, **excluding Illinois, Natchitoches and 'Youanis (Yazoo)'**, and that he disputed Company property including brick and stores with **MacMahon**.

**Caution about names:** the site's parenthetical **'Youanis (Yazoo)'** has **not** been matched to the **Haiyowvni/Youanis Choctaw post** from the 1729–1730 diplomacy case. These may be different locations or archival editorial naming choices. **We must not draw a link between them based on the shared spelling.**

## The 1732 Diron award: adjudicator ≠ legal debtor ≠ actual payer

The 2025 study by Musco, Ellis and Spring cites **ANOM C13A (1732), fols.33–33v** for a Superior Council compensation decision in favor of Bernard Diron d'Artaguiette. It reports an amount of **29,000 pounds** in the English text (under the contemporary French monetary context, previously entered as **29,000 French livres** in our atlas); the original folio's currency terminology still needs direct verification.

The [September 2, 1732 ministerial letter, record 7620](https://surrey.hnoc.org/full_notice.php?id_document=7620), references approval of a Diron–Compagnie des Indes case but **does not state 29,000** in the archival summary. Whether that exact approval corresponds to the referenced award is **still unresolved**.

The existing `fin-012` financial record has now gained explicit role fields:
- `decision_issuer = ent-french-superior-council-la` — the **adjudicating body**, not the payer.
- `award_beneficiary = ent-bernard-diron-dartaguiette` — legal beneficiary of the reported award, not necessarily a recipient of money.
- `payer_verified = false`, `payer_entity = null`, `amount_paid_verified = null`, `payee_receipt_verified = false`.

### Major atlas interface correction

Previously, Financial Traces displayed an **arrow** from the issuing Council to Diron, even though the textual label said the award was unverified as paid. That arrow visually suggested a transfer that we had not proven.

V1.3 restricts **directed transfer arrows** to records with actual documented movement: historically established loans or a documented share receipt. Other records display **record participants** without arrows; `fin-012` now explicitly displays **Decision issued by / Award beneficiary / Payer not identified / Paid amount not verified**.

The automated validator and site smoke test enforce this separation.

## Additional research tasks

1. Read all pages of the original [23 January 1731 retrocession decree](https://www.umsl.edu/mercantile/exhibitions/online-exhibits/lewis_and_clark_maps/MAPS_online_images/LP%20arrest%20du%20conseil%20OBJECT.jpg) and compare with the local [24 January Superior Council item 1731-01-24-03](https://lacolonialdocs.org/document/2003).
2. Open the **two-page 24 February 1731 debt decree (1733 imprint)** through Columbia Law Library/LLMC or a public Gallica image, and extract which party was legally responsible for former Company of Indies obligations.
3. Read **ANOM COL F3 242 fols.187 and 190** to verify retrocession and 22 May Council reorganization.
4. Read **Salmon's ANOM C13 15:31** and map exact royal and Company properties, exceptions, and unresolved brick/merchandise disputes; investigate 'Youanis (Yazoo)' separately from the Choctaw Haiyowvni post.
5. Read **Diron ANOM C13A (1732) fols.33–33v** and **the September 2 ministerial approval (B57:815)**. Identify exact claims and parties and seek cash receipt or account clearing **before** recording any payout. The English study's translation of the 29,000 amount as 'pounds' should be checked against original French money denomination.
6. Study real experiences of Choctaw nations, other Indigenous polities and enslaved African-descended people across the 1731 transition, instead of treating colonial ownership documents as a complete history of inhabitants.

## Sources and ethics

This is a **source-location and limited-title-page verification study**. The documents listed do **not** establish a shared international secret command structure, an intentional conspiracy across royal financiers, or that a judgment proved a cash payment. Contradictory archival dating is resolved only when a primary title or trustworthy direct bibliography supports the revision. The project publicly preserves unresolved questions and explains when original folios were not actually inspected.

**Research takeaway:** the same historical sequence can contain a company withdrawing from governance, a state reorganizing courts, unresolved asset inventories, private litigation, debts, and Indigenous sovereign trade demands. Each connection has its own actors and evidence, which our atlas now keeps visible.
