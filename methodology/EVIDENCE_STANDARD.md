# Evidence standard — V0.2

## Epistemic status is not verification status

**Epistemic status** describes a proposition: `documented`, `supported interpretation`, `interpretation`, `unresolved`, or `speculation`. These terms do not imply a numerical confidence score. **Verification** describes our inspection of the supporting record: `reviewed` or `pending`.

In V0.2, `reviewed` means that an identifiable online institutional/primary or reference source and a specific section/document locator were inspected for relevance to the record. **This is not a claim of comprehensive scholarly peer review, independent replication, or authentication of every statement on the linked page.** Further archival consultation may change the claim.

A bibliographic reference without a checked locator stays pending even when its existence is known. Do not turn a source title into evidence of claims that were not checked.

## Minimum structure

- Each person/institution has a stable identifier, description, and cited sources.
- Each event has a supported date precision: `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. Do **not** insert January 1 to mean an uncertain year.
- Each relationship names its endpoints, type, sources, epistemic status, and verification state.
- Each case study's summary, decision account, and consequences cite sources separately.
- Interpretive claims must state plausible alternatives and limits. Distinguish observed impact from intended outcome, and benefiting from a historical event from planning it.
- A source `reviewed: true` must have an accessible HTTPS URL and a specific locator to the relevant section, document or catalogue item.

## What counts as a connection?

Kinship, shared association membership, business dealings, documented communications, ownership, and coordinated action are **different edge types**. Do not equate one with another. A family relationship never implies shared motives, culpability, or coordination. Distinguish the event an actor *benefited from* and the event the actor *caused*.

Covert arrangements can be described as documented only where sources demonstrate participation and action. Missing archival records, closed meetings, and similarities in ideology are not affirmative evidence of hidden coordination.

## Provenance and review workflow

1. Create a source record with publication metadata, URL, and exact locator.
2. Write a narrow claim with time and geography; attach the source.
3. Consider who authored the evidence, its purpose, date, access restrictions and possible bias.
4. Seek corroboration or contradicting sources, including people affected by the events.
5. Use the least precise date and narrowest causal statement supported.
6. Mark uncertainties explicitly; welcome corrections through pull requests.
7. Run `node scripts/validate.js` before publishing changes.

## Source category caution

A **catalogue entry** documents the existence and scope of a historical record, not every claim within the record. A **declassified intelligence memoir** may contain firsthand information and retrospective self-justifications; evaluate those separately. An institutional interpretive article is not itself an original charter or treaty. Books without consulted passages are leads, not verified evidence.

The `source-reviewed` indicator describes the link/locator review defined here, not a verdict that competing historians are wrong.
