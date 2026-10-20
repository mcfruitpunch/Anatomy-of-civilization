# V1.1 — Choctaw sovereignty, a French trading promise, and the 1721 census discrepancy

**Research focus:** French Louisiana, Choctaw territory, 1721–1730; the New Orleans population census of 24 November 1721.  
**Method status:** reviewed collaborative scholarship and Choctaw Nation histories; examined multiple archive catalogues and historical population reproductions; **original Choctaw Council folios and census handwriting still not directly transcribed.**

## Discovery 1: Choctaw leaders negotiated French settlement on Choctaw terms

A substantial recent scholarly source brings Indigenous political decision-making into the investigation. [Musco, Ellis and Spring, “Sovereignty, Nations, and Diplomacy”](https://journals.openedition.org/gradhiva/9785) (*Gradhiva* 40, published November 2025) is a collaborative research article with the Choctaw Nation of Oklahoma's Historic Preservation Department. Its authors read original administrative materials from the French colonial archive and emphasize the Choctaw Nation's agency rather than treating chiefs as passive subjects of empire.

### Sequence supported by the 2025 study

- **1721:** Choctaw leaders asked for a trading establishment **within their own territory**. The Biloxi Council of Commerce approved the idea in February, referencing **ANOM C13A, vol. 6, fol. 146**. The study's English narrative gives **8 February 1721**, but its source list identifies a **28 February** council record; until original folio review, we record the date only as *1721*, with the month February and day unresolved.
- **1725:** Because a trading post was not promptly established, Choctaw representatives pressed their demand again. French administrative letters to the Company of the Indies and the minister cite ongoing requests and fear of the Choctaw obtaining trade goods from the British. Original leads: **ANOM C13A vol.9 fol.65v (27 Feb 1725) and fol.129v (23 Apr 1725)**. These exact folio descriptions come from the scholarly article; we have **not** opened the original letters.
- **1729:** Choctaw chiefs continued bargaining about trade access and site; some of the French officials' military security depended on Choctaw protection. The authors cite further historical correspondence.
- **February–March 1730:** the **Youanis / Haiyowvni trading post** was finally established after roughly a decade of requests. It was **not Fort Tombecbe**, which was built in 1736 according to the Choctaw Nation's own historical publication. The individual town and nation distinction matters.

### Why this is a domino in the anatomy of power

The link between French financial troubles and delayed colonial promises is a **qualified historian's explanation**, not independently checked financial evidence. The 2025 article suggests the aftermath of John Law's collapse contributed to French administrative delay. We **do not** yet have the original treasury transfer, refusal, or procurement paperwork to demonstrate a specific shortfall that prevented the Youanis project.

The more robust directly documented mechanism is **Choctaw-led negotiation → French acknowledgement → continued pressure and threatened trade alternatives → eventual post construction under Choctaw territorial and diplomatic conditions**.

This is a story about *Indigenous sovereignty and economic choice*, not simply European capital making everything happen.

**Independent contemporary community perspectives:** The [Choctaw Nation of Oklahoma's Iti Fabvssa account of Fort Tombecbe and treaties](https://www.choctawnation.com/news/iti-fabvssa/fort-tombecbe-and-early-choctaw-treaties/) describes hospitality, gifts, trade, kinship, chiefs' political authority and the meaning of agreements. The nation's [history of economic adaptation](https://www.choctawnation.com/news/iti-fabvssa/commerce-department-continues-long-legacy-of-economic-adaption/) rejects treating trade as exclusively European invention, and places Choctaw diplomacy within pre-contact systems of exchange and redistribution. These are not generic colonial commentaries: they are public histories created by the nation being discussed.

## Discovery 2: the 1721 New Orleans census survives in multiple versions

ANOM's original archive index documents two records for **24 November 1721**, both described as New Orleans and nearby settlements:

1. [ANOM 31235](https://nouvelle-france.org/eng/item/details?id=31235), **COL G1 464**, 12 digitized images, census signed by Diron and colleagues, appended to the 2 January 1722 letter; enumerates households, European servants and people classified by colonial authorities as enslaved.
2. [ANOM 31236](https://nouvelle-france.org/eng/item/details?id=31236), **COL G1 464**, 29 digitized images, catalogued as *apparently a copy of the previous census followed by more extensive details about concessions and the colony*. It is **not** automatically a second independent census.

Library and Archives Canada also references a microfilm copy of the 1721 item (ID 2319131). The LAC web viewer and ANOM original image transcription have not been accessible to us, so neither copy is yet a page-audited ledger. The possibility of multiple versions makes the requirement to name **which physical text** an editor used even more important.

### Three distinct historical interpretations

| Publication | Town / regional scope and data as published | Our evidence status |
| --- | --- | --- |
| **J. Hanno Deiler, 1910**, *Settlement of the German Coast of Louisiana*, pp.66–68 | 177 African people categorized as enslaved, 21 Indigenous people categorized as enslaved, 28 European *engagés*; discusses New Orleans and vicinity | Read in public digitized historical edition; **not original 1721 manuscript totals** |
| **Marc de Villiers du Terrage, 1917**, *La fondation de la Nouvelle-Orléans*, historical English translation | **470 total** New Orleans residents and **277 Europeans**, with surrounding concessions discussed separately | Read digitized secondary account; printed French numeric table is difficult to reconstruct from garbled text; not original manuscript |
| **Cécile Vidal, 2019**, *Caribbean New Orleans*, Table 1 p.121 | Indexed copy of scholarship indicates **472 total** = **278 people tabulated as white + 173 recorded as enslaved Africans + 21 recorded as enslaved Indigenous people** | Modern scholarly publication exists (UNC Press); **exact table independently unverified against official licensed edition**, as the numbers were seen in a search-indexed excerpt; mark provisional |

It would be a serious methodological error to add numbers from **different historical publications** to manufacture one definitive total. Even a coherent sum in a later scholar's table does not prove the original 1721 census contained that precise reconciled set. We have not established whether variation is due to original manuscript versions, different town/vicinity boundaries, additions and omissions, classification shifts or historic editorial mistakes.

The classifications above describe **colonial administrators' and historians' counting schemes**, not the lived identities of the people subjected to enslavement. The archive does not equally represent everyone, and often suppresses enslaved people's individual names.

**Structured output:** `data/census_evidence_audit.json` has five independent records: original 12-image item, extended 29-image item, Deiler 1910, de Villiers 1917, and a **provisional** Vidal 2019 tabulation. Each value stays bound to its author, scope, and source-review level. Missing primary amounts are **null**, never guessed.

## Discovery 3: new primary leads that join Indigenous geography to the colonial economy

- [ANOM item 40699, Le Gac memoir (circa 1721)](https://nouvelle-france.org/eng/item/details?id=40699): 101-page manuscript/99 indexed images. Its fifth section catalogs French and Indigenous villages along the Mississippi and tributaries. **Caution:** French records of villages cannot replace Indigenous nations' own placenames, land knowledge and political histories.
- [ANOM item 31415, John Law concession extract](https://nouvelle-france.org/eng/item/details?id=31415): two images (COL G1 465) of an undated census excerpt specifically referencing **Law's concession** in Louisiana. It creates a very concrete archival bridge between the financier whose system we studied and an actual colonial land-holding project. It does **not** establish his personal presence or money transfer.
- [ANOM item 31377, 9–10 March 1722 colonial correspondence](https://nouvelle-france.org/fra/item/details?id=31377): French accounts of conflict with Natchez around the Sainte-Catherine concession and proposed military intervention. These are **French officer reports**, not yet the Natchez perspective; avoid treating a colonial attack narrative as the full truth.
- [Musco, Ellis and Spring (2025)](https://journals.openedition.org/gradhiva/9785) offers itemized leads to ANOM C13A records for the 1721 Choctaw request, 1725 appeals, later letters and the 1730 Youanis post. These should be examined alongside Choctaw Nation community histories.

## Implementation in the atlas

- New case `choctawdiplomacy1721` and clearly dated historical events for 1721, 1725, 1729 and 1730.
- Separate entities for the Choctaw Nation, diplomatic delegates, Biloxi Council, Louisiana Superior Council, French officials and Youanis post—**not one generic 'Native American' entity**.
- Seven documented or corroborated relationships plus five explanatory dominoes; **a potential John Law liquidity connection is tagged an interpretation**.
- Two system analyses: Indigenous sovereignty as economic governance, and statistical invisibility of colonial censuses.
- New archival items `doc-014`–`doc-016` with explicit original-review limitations.
- New public **Census Evidence Audit** showing historian-specific counts, 1721 archive variants and accessible citations. Integrity tests disallow putting derived figures into catalogue-only primary records.

## Next verification tasks (do not call these complete)

1. Inspect **ANOM C13A vol.6 fol.146** and resolve the scholarly text's 8-vs-28 February discrepancy.
2. Obtain original and variant New Orleans census folio scans **31235** and **31236** and reconcile each author to an actual heading, geography and subtotal.
3. Consult **Vidal's Table 1 p.121** directly through library or publisher access, and preserve exact census definition and footnotes.
4. Seek **nation-approved Choctaw histories of the 1721 and 1729 delegations**; name leaders only when community or records support identification.
5. Look for Company procurement and state expense records corresponding to delayed Choctaw trading promises. Do not equate the French national crisis with a documented refusal of local expenditure.
6. Read the Le Gac manuscript's Indigenous village list together with Choctaw Nation, Natchez and other nation-specific place traditions. Use community consultation where relevant before publishing culturally sensitive locations.

**Conclusion:** The Choctaw Nation was a decision-maker exercising sovereign diplomacy within an interconnected trade system. Contemporary French monetary instability may have mattered, but that specific causal chain still needs fiscal records. Separately, the 1721 census disagreement is **not yet resolved**; the discovery of a second expanded archive copy provides a concrete verification route.
