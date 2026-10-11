# Cross-session notes (Test-P1, Test-P2)

Two Mode A sessions, 11 October 2026. Same prototype, NPC on. P1 sat as Bailey; P2 sat as Alex (so P2 had to play the veto themselves to reach Review).

Raw logs: [Test-P1.md](Test-P1.md), [Test-P2.md](Test-P2.md). Plan: [Testing Plan](../../wiki/Testing-Plan.md) section 10.

## What both did

- Finished T1–T6 with **zero hints**.
- Could point at a lock-screen line for their total (C4).
- Rated claim/pass vs equal split **5/5** (C3).
- Kept the pizza slider (Q10, both).
- Want everyone in the same room next Sunday (Q11).
- Cap the spinner: P1 ~$30, P2 ~$20. Neither would spin an $80 pizza (C5).

## Where they split

| | P1 (Bailey, comfort 3/5) | P2 (Alex, comfort 2/5, house accountant) |
| --- | --- | --- |
| Veto | Tapped Fair; NPC Alex vetoed | Tapped **Play Veto Card** to reopen coffee |
| Spinner mood | Laughed; chose chore | Nodded; Casey absorbed cash |
| Bounty | Proposed bathroom $10 | Skipped; cash only |
| Q5 spinner | 4 | 3 |
| Q6 chores | 5 | 3 |
| Missing | PayID / Venmo on lock | Manual % if the slider is too coarse |

P2 is the kind of user the interviews called the default spreadsheet person. They still swallowed $5 coffee in real life (W3). In the prototype they vetoed. That is the C1 bet, on a small n.

## Claims (honest, n = 2)

| Claim | Call | Evidence |
| --- | --- | --- |
| C1 contest without naming | Supported | P2 vetoed coffee; P1 passed protein instead of a speech. |
| C2 app takes the heat | Supported | Q8 both 4; attention on the screen. |
| C3 item-level clearer | Supported | Q4 both 5. |
| C4 explain the number | Supported | T6q4 both unaided. |
| C5 spinner as chance | Supported only under a dollar cap | Both refuse it for big / personal items. Decision rule in the plan: if cruel at $14.50, drop random pay — here $14.50 was OK; the fail line they named is $20–$30. |
| C6 bounty if rejectable | Split | P1 yes; P2 `bounty-price`. Do not auto-price chores. Same delta as the earlier interviews. |
| C7 nobody asks who vetoed | **Not clean** | P1: “Wait, who did that?” P2: “Does the app tell them Alex pressed this?” Plan: C7 fails if they ask who vetoed. Copy and the flash still leak curiosity. Q2 is 4/5, not 5. |

Mode A with NPCs cannot prove C2 or C7 in a real kitchen. Next test should be Mode B if a house will sit together.

## Design pass from these two

1. Keep claim/pass and the pizza slider.
2. Hard-cap or disable the spinner above ~$20–$30; prefer chore over “absorb the cost” when someone is short.
3. Bounty: proposal + yes/no; drop or hide preset dollars, or make the amount optional (P2).
4. Veto: say on the welcome or veto screen, in one line, that **no name is sent**. P2 looked for a red name. P1 still guessed Alex or Drew.
5. Lock: optional PayID/Venmo link (P1). Optional custom % (P2). Plumbing, not the social mechanic.
