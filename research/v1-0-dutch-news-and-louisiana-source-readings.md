# V1.0 — First source readings: Dutch financial news and Louisiana population records

**Research date:** 19 October 2026  
**Scope:** 1720 financial reporting and November 1721 New Orleans population figures  
**Status:** dated 1720 primary newspaper items reproduced and translated by Yale; historic secondary transcriptions of the 1721 colonial census; original folio verification outstanding.

## What was actually read?

This research pass inspected **three Yale School of Management articles featuring contemporaneous Dutch Leydse Courant clippings and translations**, and historical digitizations of **J. Hanno Deiler** and **Marc de Villiers du Terrage** describing a 24 November 1721 New Orleans census. These are meaningful steps beyond simply citing collection catalogs, but **not fresh complete transcriptions of all original manuscript pages or Dutch newspaper editions**.

Data records live in `data/source_extracts.json` and show exact source, evidence mediation, reported numbers, and what remains unknown. No copyrighted Yale full translation or newspaper image is copied into this repository.

## 1. February 26, 1720: actual reported South Sea price quotations

Yale's [February 26, 1720 Leydse Courant translation](https://som.yale.edu/blog/the-south-sea-bubble-26-february-1720) presents news of large trading activity, with successive quoted South Sea stock figures of **177 and 184**. Some market participants anticipated **200**.

**Evidence strength:** this is a concrete dated press report containing distinct numerical figures, publicly shared with a scan/curated translation. It does **not** document that a named broker bought at 184, establish the denomination/base of those quotations, or establish that the prediction 200 materialized. The translation comes from Yale's historical research team (Geert Rouwenhorst). The underlying Dutch page has not been independently completely transcribed.

Atlas: `extract-001`, `evt-1720-dutch-feb-prices`.

## 2. April 22, 1720: Paris financial news reaches a Dutch-language newspaper

Yale's [curated April 22 item](https://som.yale.edu/blog/financial-history-repeats-itself-the-south-sea-bubble-22-april-1720) reproduces a Paris report of the **previous day's suspension of cash redemption for bank bills**, fears about draining the bank's resources, food prices, and a *rumor* that someone was deliberately trying to obstruct the bank.

**Evidence strength:** the public news report and its attributed content are documented. The insinuation of deliberate sabotage was **a contemporaneous suspicion, not proof of a conspiracy**; do not add a criminal or political perpetrator from that paragraph. The exact legal operation of the April bank order must be checked separately against surviving government edicts.

Atlas: `extract-002`, `evt-1720-dutch-apr-paris`, `route-005`.

## 3. June 14, 1720: a London dispatch reaches Dutch readers

Yale's [London June 14 item](https://som.yale.edu/blog/the-south-sea-bubble-14-june-1720) includes a Dutch clipping headed **Londen den 14 Juny**, describing a House of Commons committee reviewing a reported **70** dubious financial projects and anticipating parliamentary measures against them.

**Evidentiary distinction:** **June 14 is the date written in the London report.** It is **not** evidence, on its own, of the Dutch newspaper's final printing date, mail-boat travel time, or the exact day a Dutch investor heard the news. The newspaper also reports committee assertions and expectations, which must not be equated to proven illegality of each project or a completed parliamentary closure of 70 businesses.

Atlas: `extract-003`, `evt-1720-dutch-jun-london`, `route-006`.

## 4. November 24, 1721: historical versions of the New Orleans census

The actual archival record is **COL G1 464**, a New Orleans and nearby-settlements census held in France's Archives nationales d'outre-mer (ANOM), and BnF's [New Orleans documents catalogue](https://heritage.bnf.fr/france-ameriques/en/new-orleans) separately links a manuscript labeled **Recensement de la Nouvelle-Orléans 1721** at **Gallica ark:/12148/btv1b101054200**.

**Original manuscript inspection was blocked** for the BnF link; the ANOM folio images have not been directly transcribed in this research pass.

Two later historical books offer *secondary readings*:

- **J. Hanno Deiler**, [*The Settlement of the German Coast of Louisiana*](https://louisiana-anthology.org/303_download/texts/01--deiler--german_coast--English/back/settlementofgerm01deil/OEBPS/part0000.html) (1910), reports **177 African people recorded as enslaved**, **21 Indigenous people recorded as enslaved**, and **28 European contracted laborers (engagés)** in a population discussion explicitly scoped to New Orleans and vicinity. A modern volunteer [Genealogy Trails rendering](https://genealogytrails.com/lou/orleans/1721census.html) repeats these values, but volunteer agreement does not substitute for primary inspection.
- **Marc de Villiers du Terrage**, [*La fondation de la Nouvelle-Orléans*](https://louisiana-anthology.org/303_download/texts/00--de_villiers--nouvelle-orleans_founding/villiers--nouvelle-orleans_founding.html) (historical edition c. 1917), printed p.94, reports **470 inhabitants** in New Orleans, of whom **277 were European**, and a separate set of values for surrounding concessions. Its digitized table is corrupted in OCR; the source may use different municipal/geographic boundaries.

These historical totals must **not** be blended into an invented clean total. Categories, geography and the original count logic could be inconsistent across the authors. A colonial administration's register is also intrinsically selective: individual names of enslaved people may be suppressed even where it counts them; independent Indigenous communities often fall outside the census.

Atlas: `extract-004`, `extract-005`. The numbers are labeled `people_reported_by_deiler` or `people_reported_by_villiers`, **not** `verified_1721_census_count`.

## 5. Implications for people whose history was suppressed

The early French colony's history cannot be reconstructed from British and French share ledgers alone. The reproduction of Diron's records makes visible people whom economic accounts otherwise treat as anonymous forced labor. The **European officials' own categorization is neither inclusive nor neutral**; people recorded under enslaved status were individuals with identities, relationships, and resistance that an enumeration cannot convey.

The BnF history [*French Cartography of the Mississippi River*](https://heritage.bnf.fr/france-ameriques/en/french-cartography-mississippi-river) explains that French maps incorporated geographical knowledge supplied by Indigenous people, and later colonial military mapping served settlement, transport and armed campaigns. This reminds us that supposed European 'discovery' or cartographic advancement relied on Indigenous expertise—frequently without credited names—and the territory was not vacant.

Next review must seek separately authored Indigenous diplomacy, nation-specific histories, and African-descended community records rather than simply extracting more colonial economic counts.

## 6. What this does NOT establish

- No personally authenticated John Law–John Blunt–Amsterdam investor letter or shared account.
- No confirmed execution of a Dutch individual trade at the quoted February newspaper levels.
- No proven clandestine actors behind April's newspaper rumor.
- No independently dated London-to-Leiden reporting delay or verified Dutch stock-market reaction.
- No complete 1721 folio transcription, validated enslaved-population total or representative roll of Indigenous residents.
- No lawful basis to republish Yale's restricted historical dataset in an open project.

## 7. Next primary-document tasks

1. Open the **BnF Gallica original 1721 census**, or request authorized access to the 12 ANOM census images. Transcribe headings and a handful of independently legible entries with folio/image numbers. Resolve which tables count the city versus outlying concessions.
2. Link one Yale translated Dutch paragraph to its **original complete Leydse Courant issue**; record the issue's exact printed date and its dispatch datelines separately, so delay can be tested.
3. Locate an original **Dutch-language article on the April Paris monetary decree** and verify the contemporary allegation's wording, including grammatical markers for rumor.
4. Inspect **Stad Rotterdam's transaction books** and, if access terms permit, note one specifically dated entry and its account instrument without rehosting images or licensed spreadsheets.
5. Find Indigenous-authored or Indigenous-community interpretations of French colonial cartography and the geography of the Choctaw, Chitimacha, Natchez and other nations; avoid treating these as one political entity.
6. Continue HNOC's original **MSS606 1719 share receipt** investigation, including whether an endorsement, price, or counterparty name appears on the full manuscript.

## Technical/ethical implementation

- `data/source_extracts.json` is explicit about `reading_level`, `date_role`, `paraphrase`, source IDs and each figure's `unit` and `meaning`.
- The public website renders these source readings separately from claims about individual transactions and the wider event timeline.
- Automated integrity tests reject unsupported 'original_folio_verified' status and enforce original-folio limitations for historical census copies. Quoted price forecasts and printed claims about lobbying are not converted into historical cash or conspiratorial relationships.

**Central finding:** French economic news and London financial-political reports did circulate in the Dutch press, and historical transcriptions give a provisional glimpse of New Orleans' enslaved population. Neither can yet substitute for verified trader correspondence or original colonial census folios.
