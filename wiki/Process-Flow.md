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
  N --> O[Unclaimed items split evenly<br/>Orphan spinner cut after interviews]
  O --> P[Pre-lock review<br/>Anonymous veto tokens]
  P --> P2[Veto played<br/>2-minute table talk]
  P2 --> Q[Blind item vote + slider of fairness]
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
| Prototype | Draft, veto, table talk, blind vote, bounty, lock; live on 4–5 phones; screens redrawn from AI concept art; orphan spinner removed | Playable mid-fi + screen flows |
| Meta / ethics | Parent problems and who we might harm | Testing must watch pile-ons |
| Reflection | Five-person team; recall interviews, no live kitchen yet | Next: one real Sunday |

## Prototype path (user-facing)

Open or join a table → pick a seat → swipe the receipt (unclaimed items split evenly) → pre-lock review: looks fair or veto → if vetoed, 2-minute table talk → blind item vote and pizza slider → optional bounty card → everyone ready → locked transfers.
