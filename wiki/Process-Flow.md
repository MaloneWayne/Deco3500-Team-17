# Process Flow

This is the project flow the brief asked for: short notes at each stage, in the order we actually moved.

```mermaid
flowchart TD
  A[Local bound<br/>St Lucia / Indooroopilly / Toowong] --> B[First read of the problem<br/>Sharehouse Sunday split]
  B --> C[Starting assumptions<br/>Anonymity helps<br/>Same-room beats async<br/>Chores can offset cash]
  C --> D[Methods<br/>6 social dimensions<br/>Possibility Wheel<br/>Concept matrix]
  D --> E[Problem interviews n=17<br/>Sharehouse settlement]
  E --> F{What we learned}
  F -->|Campus map aims at students| G[Drop Thrift Radar]
  F -->|Impulse alert is the wrong moment| H[Drop Cooling-off Buddy]
  F -->|Priced chores start a second fight| I[Soften bounty: propose, do not auto-price]
  F -->|Tools log money, skip the talk| J[Keep household ritual]
  J --> K[Existing tools<br/>Splitwise / WeChat / Messenger]
  K --> L[Solution class<br/>Colocated web ritual]
  L --> M[Mid-fi prototype<br/>The Weekly Split]
  M --> W[Prototype interviews n=4<br/>Feature walkthroughs]
  W --> N[Claim / Pass]
  N --> O[Orphan spinner]
  O --> P[Anonymous veto]
  P --> Q[Blind review + slider]
  Q --> R[Bounty cards]
  R --> S[Lock: who pays whom]
  S --> T[Meta<br/>Housing as parent problem<br/>New risks: majority, veto trolling]
  T --> U[Ethics<br/>Shopper bias, no-phone exclusion]
  U --> V[Reflection + AI note<br/>Interviews real<br/>Kitchen observation still missing]
```

## Stage notes

| Stage | What we did | What we carried forward |
| --- | --- | --- |
| Bound | Picked inner-west Brisbane sharehouses, not a campus population | Geography stays; user is housemate |
| Assumptions | Named the speech-act problem | Still the core bet |
| Methods | Frameworks, three concepts, 17 problem interviews, four prototype interviews, a working prototype | Interviews ranked the bets and exposed design risks |
| Filter | Killed location and impulse-buy branches; softened priced chores | Kitchen ritual remains |
| Current practice | Splitwise, WeChat, Messenger, equal split by default | Expectation: item totals, not lectures |
| Solution class | Compared posters, tokens, async apps, colocated UI | Web ritual, no install |
| Prototype | Draft, orphan, veto, review, bounty, lock | Playable mid-fi + screen flows |
| Meta / ethics | Parent problems and who we might harm | Testing must watch pile-ons |
| Reflection | Five-person team; recall interviews, no live kitchen yet | Next: one real Sunday |

## Prototype path (user-facing)

Welcome → pick a seat → swipe the receipt → maybe a spinner → confirm fair or veto → review heavy items → optional bounty → locked transfers.
