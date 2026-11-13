# V1.4 — 13 November 2026: Youanis place-reference and map-date provenance audit

Related: [Issue #24](https://github.com/mcfruitpunch/Anatomy-of-civilization/issues/24). This milestone does not resolve the 24 February 1731 debt decree. It strengthens the source trail for one of Issue #24's explicit cautions: the HNOC catalogue's “Youanis (Yazoo)” must not be silently merged with the Choctaw Haiyow ni/Youanis post.

## Repository state checked first

- Starting `main`: `444719e56ab0ad004e596006cd01a031527bfa1b` (PR #43 merge).
- Open PR search returned no outstanding PRs before this work; PR #43 is merged.
- Issue #24 remains open. Its highest-priority uncompleted legal text is still the **24 February 1731 Company-debt decree**, dated in 1731 but printed in 1733.
- The BnF Gallica ARK `btv1b8602624n`, Columbia record [1505745](https://pegasus.law.columbia.edu/record/1505745), and LLMC identifier `LLMC1338688796` were again pursued. The Gallica and Columbia pages did not yield readable original pages in this pass; LLMC's direct document endpoint was inaccessible. No debt-decree clauses were transcribed and no debtor or settlement rule was added.

## 1. Two different evidentiary records for “Youanis”

### HNOC / Salmon, 19 January 1732

The Historic New Orleans Collection's [Surrey Calendar item 7287](https://surrey.hnoc.org/full_notice.php?id_document=7287) identifies a two-page letter from Edme Gatien Salmon to the minister, dated **19 January 1732**, with archival locator **ANOM C13 15:31**. Its abstract says Salmon reported taking possession for the King of forts, buildings and artillery, except Illinois, Natchitoches and a site labelled **“Youanis (Yazoo)”**; it also describes a dispute with MacMahon over Company merchandise.

**What was examined:** the HNOC catalogue abstract.

**What was not examined:** the original two-page French letter at ANOM C13 15:31. The parenthetical “(Yazoo)” is present in the modern HNOC abstract; it is not verified as wording in Salmon's original letter. The abstract does not provide coordinates or a reason for the exception.

### Haiyow ni / Youani / Éiouanné / Poste des Youanis in Choctaw country

The English-language scholarly article by Jonas Musco, Elizabeth Ellis and Ryan Spring, “Sovereignty, Nations, and Diplomacy: the French and Native American Alliances in Louisiana,” *Gradhiva* 40 (2025), DOI [10.4000/15621](https://doi.org/10.4000/15621), was directly examined, especially pp.101–106.

The authors cite:
- **ANOM C13A 1721 fol.146** for a Choctaw request for a French trading post, accepted by the Trade Council on 8 February 1721;
- **C13A 1725a fol.65v and 1725b fol.129v** for renewed requests;
- **C13A 1726 fol.159** for Charles-Frédéric Merveilleux's proposal, which first names the Choctaw village **Haiyow ni (Youani or Éiouanné)** as a possible site;
- **C13A 1729d fols.31–31v** for the Choctaw delegation and negotiations in which chiefs chose a trading store in their territory and negotiated terms;
- **C13A 1733 fol.202** for construction at Haiyow ni in **February–March 1730** under Régis du Roullet.

The authors interpret the negotiations as evidence of Choctaw political agency: chiefs pressed for direct access to manufactured goods, chose a store over itinerant traders, negotiated prices, and were asked by French officials to help protect the soldiers at the post. The article also explicitly treats the suggestion that Haiyow ni was the southernmost village near Mobile as speculation, not a measured coordinate.

**Community perspective:** Ryan Spring is a co-author and Cultural Research Associate with the Choctaw Nation of Oklahoma. The article is a scholarly synthesis that includes Indigenous historical expertise. The related Versailles exhibition press kit also lists Ryan Spring and Ian Thompson (Choctaw Nation of Oklahoma) and Elizabeth Ellis (Peoria Tribe of Indians of Oklahoma) among its scientific advisors. The article itself cautions that many written records were penned by colonial observers and must be read critically.

**What was not examined:** the cited ANOM folios themselves. The article's reconstruction and interpretation are not a substitute for a diplomatic transcription of those French records.

### Conclusion on identity

These are two separately sourced references. The scholarly article does **not** identify the HNOC abstract's “Youanis (Yazoo)” exception as the Choctaw Haiyow ni/Youanis post. The original Salmon letter is unread, and a shared spelling is insufficient to prove a match. The atlas therefore keeps the comparison **unresolved** and adds no place-identity, asset-transfer or exemption-reason relationship.

## 2. A newly found map-date discrepancy

The Dumont de Montigny map used in the *Gradhiva* article to contextualize Indigenous territories is inconsistently captioned:

| Source | Caption/date | Locator |
|---|---|---|
| Musco, Ellis & Spring, *Gradhiva* 40 (2025) | **1736** | Fig. 6/7, pp.102 and 104; Archives nationales, old cote N/III/Louisiane/1/3 |
| Archives nationales de France | **1746** | *Mémoire d'avenir*, no.61, Jan.–Mar. 2026, PDF lines 1835–1842; current reference AE/II/1768/BIS, old cote CP/N/III/Louisiane/1/3 |
| Château de Versailles / musée du quai Branly–Jacques Chirac | **“après 1736”** | *1725. Native American Allies at the Court of Louis XV*, press kit, p.18 / PDF lines 235–236 |

The Archives nationales caption is the strongest current institutional dating lead and gives the same old shelfmark as the *Gradhiva* caption. Versailles says “after 1736” but does not print the shelfmark beside its caption. The three captions may refer to the same map, but that identity has not been checked against the map or the full archival catalogue record. The atlas records the conflict and leaves the map date unresolved; it does not silently replace 1736 with 1746.

The Versailles press kit is also valuable for its explicit collaboration with Indigenous scientific advisors, including Choctaw and Peoria representatives. It frames the maps as evidence about Indigenous territories and alliances, not merely French imperial geography.

## 3. Monetary wording caution

The English-language *Gradhiva* version, p.105, renders the reported Diron award as **“29,000 pounds”**, citing **ANOM C13A 1732 fols.33–33v**. The original French article and the archival court folios were not examined in this pass. The atlas's existing `livres_tournois` normalization is therefore **provisional**, not a direct transcription of the original unit. The amount remains a scholarly-reported legal award, not a receipted payment; the payer, actual disbursement and beneficiary receipt remain unverified. No financial-flow role or payment status was changed.

## 4. What is documented, interpreted and unresolved

- **Documented about consulted sources:** HNOC's abstract describes the 19 January 1732 Salmon letter and labels an exception “Youanis (Yazoo)”; the 2025 *Gradhiva* article cites the ANOM records above and describes the Choctaw-negotiated Haiyow ni/Youanis post; Archives nationales' 2026 caption dates a map at the relevant old shelfmark 1746; Versailles' 2025 press kit calls a Dumont map “after 1736”.
- **Scholarly interpretation:** Choctaw leaders controlled important terms of the post negotiations; French authorities relied on Indigenous diplomacy and local protection.
- **Unresolved:** whether the HNOC “Youanis (Yazoo)” and Choctaw Haiyow ni are the same place; the exact map date and whether every caption refers to the same map; the original wording of the 1732 Diron award and its currency; and whether any award was actually paid.

No coordinates, asset transfer, legal exemption rationale, named debtor or payment was inferred from these materials.

## Implementation

- Added `data/place_name_disambiguations.json`, preserving the HNOC and Choctaw-post references separately and recording the map-date conflict.
- Added `extract-009` with the scholarly reconstruction and explicit original-folio limitations.
- Added two institutional map-caption sources and refined the locator for the *Gradhiva* article.
- Updated the Youanis event summary to cite the specific archival footnotes and preserve the unresolved identity.
- Added `scripts/validate-place-name-disambiguations.js`, which rejects a forced same-site identity, invented coordinates, promotion of unexamined folios, or a falsely resolved map date.
- Clarified that the English translation's “29,000 pounds” and the atlas's provisional French-livre normalization are not yet reconciled.
- Left the Louisiana liability ledger's payer, payment and receipt fields unchanged.

## Next source-verification actions

1. Obtain and transcribe the **two-page original Salmon letter**, ANOM C13 15:31, including the exact French place-name and the context for the exception.
2. Inspect ANOM C13A 1726 fol.159, 1729d fols.31–31v and 1733 fol.202, or obtain reliable full-resolution reproductions; compare the cited spellings and the post's location with the Choctaw Nation's own historical knowledge.
3. Obtain the original Dumont de Montigny map and full Archives nationales catalogue record for AE/II/1768/BIS / CP/N/III/Louisiane/1/3 to resolve the 1736/1746/“after 1736” caption conflict.
4. Continue to prioritize both pages of the **24 February 1731 Company-debt decree** and its operative clauses. No current source justifies an invented liability or settlement.
