# Testing Plan

Team 17 · The Weekly Split  
Mid-fi prototype: [live site](https://malonewayne.github.io/Deco3500-Team-17/) · local: `cd weekly-split && npm run dev`

This plan is for **facilitators**. Read it before the session. Do not hand the whole document to participants. Print or copy the sheets in the appendices.

The interviews told us people swallow unfair splits. This test asks whether the **playable ritual** actually lowers that cost, or whether it just looks like a game.

---

## 1. Why we are testing

We are not asking “do you like the colours?” We are checking the claims the design is built on.

| ID | Claim from research | Experience req. |
| --- | --- | --- |
| C1 | People will contest an item if they do not have to put their name on it | R1, R5 |
| C2 | The app can take the heat so a housemate does not have to accuse anyone | R5 |
| C3 | Item-level claim/pass is clearer than one house total | R3, R6 |
| C4 | After lock, people can explain *why* they owe a number | R2, R4 |
| C5 | A spinner / game feels like chance, not a personal attack — unless the amount is too high | R8 |
| C6 | A chore-for-cash trade is acceptable only if the house can reject it | R7 |
| C7 | Nobody asks “who played the veto?” | R1 |

If C1, C2, and C7 fail, the product has failed, even if the maths is correct.

### What this prototype cannot test

- Real Woolies OCR or typing a receipt
- Four phones in true real-time (NPC housemates auto-vote unless you turn them off)
- Bank transfer
- A house using this every Sunday for a month

Say that out loud in the intro. Do not apologise for it. Mid-fi is the point.

---

## 2. Who to recruit

**User:** a housemate who currently splits grocery or takeaway costs. Studying is fine as background. Do not recruit “students as students.”

**Target:** 4–8 people. Mix of houses if you can. At least one person who has been the default payer / spreadsheet person.

**Session type (pick one per booking):**

| Mode | When to use | NPC |
| --- | --- | --- |
| **A. Solo think-aloud** | Default. One participant, ~35 min | **NPC on** |
| **B. Pair / house** | Two to four housemates who already live together, ~45 min | **NPC off**; they tap seats to “be” each person, or sit with one device and pass it |

Mode B is stronger evidence for C2 and C7. Mode A is enough if you cannot get a whole house.

**Do not** test teammates as if they were users. Teammate dry-runs are for the facilitator, not for the findings file.

---

## 3. Ethics in the room

- Audio (and optional screen) only with spoken yes. Default: notes only.
- They can skip any task or stop the session.
- Names in notes: P1, P2… House suburb only if they offer it.
- Do not store a public feed of who bought what from this test. The prototype already uses fake names (Alex, Bailey, Casey, Drew).
- If they become uncomfortable at the veto or spinner, skip to lock and go to the interview.

Consent script is in [Appendix A](#appendix-a--consent-script).

---

## 4. Setup (10 minutes before they arrive)

1. Open the prototype on a **phone or narrow browser** (~390px). Laptop is a last resort; this is a kitchen ritual.
2. Confirm **NPC on** for Mode A. Top bar chip should read `NPC on`.
3. Have a spare charger. Have a paper copy of [Appendix B](#appendix-b--observation-log) and [Appendix C](#appendix-c--post-test-sheet).
4. Know this prototype quirk (do not hide it from the team; do not lecture the user about it):

> If the participant sits as **anyone except Alex** and leaves NPC on, Alex will auto-play a veto. That is useful: they will see Review without being told to veto.  
> If they sit as **Alex**, other NPCs vote “Looks Fair.” To see Review, they must tap **Play Veto Card** themselves.

5. Seeded receipt they will see (do not read the whole list aloud):

   Communal Basket $66.80 · Fancy Cheese $12.00 · Premium Protein $22.00 · Chicken Thighs $18.90 · Heavy-Duty Cleaner $14.50 · Specialty Coffee $15.80 · Pizza Delivery Feast $80.00

---

## 5. Session clock

| Time | Block |
| --- | --- |
| 0:00–0:03 | Consent + context |
| 0:03–0:08 | Warm-up (current house split) |
| 0:08–0:25 | Tasks T1–T6 on the prototype |
| 0:25–0:33 | Post-test questions (Appendix C) |
| 0:33–0:35 | Thanks, stop recording |

One facilitator runs the talk. One other person (if available) only logs Appendix B. If you are alone, record audio with consent and fill the log the same evening.

---

## 6. Facilitator rules

- Think-aloud: “Say what you are looking at and what you are about to do. There is no right split.”
- If they go silent for 10 seconds: “What are you trying to do?”
- **Do not** say “you should veto,” “claim the protein,” or “the cleaner is an orphan.”
- **Do not** defend the design. Write the complaint down.
- If they ask “did I do it right?”: “Whatever you would do in your house is right.”
- After each task, ask the **immediate** questions in that task. Save Likert items for the end so you do not break the flow.

---

## 7. Opening script

> We are testing a ten-minute sharehouse settlement on a phone. It is a prototype: fake housemates, a fake Woolies-plus-pizza week, no real money. We want to know whether this way of splitting feels usable and whether it would change how you talk about a bill. You can stop at any time. I will not tell you which buttons to prefer.

Then warm-up (data, not small talk):

**W1.** How many people are on your lease, and who usually pays for the weekly shop?  
**W2.** Last time you split a grocery or takeaway bill, how did the request arrive (chat, Splitwise, in the kitchen, other)?  
**W3.** Have you ever paid for something you barely used and said nothing? One sentence is enough.  
**W4.** On a scale of 1–5, how comfortable is money talk in your house right now? (1 = we avoid it, 5 = easy)

Log W1–W4 on Appendix B before you open the app.

---

## 8. Tasks

Give **one task at a time**. Start the next only when they have answered the immediate questions, or after 90 seconds of stuckness (then hint once, log the hint).

### T1 — Sit down and start  
**Goal:** Can they enter the ritual without a tutorial?

**Say:**

> You are a housemate at this table. Pick who you are tonight, then start the settlement.

**Success:** They choose a seat (Alex / Bailey / Casey / Drew) and tap **Deal the receipt**.

**Immediate questions (after they tap):**

- T1q1. In your own words, what is this app for?
- T1q2. Did anything on this first screen feel like a lecture?

**Log:** seat chosen; time to first tap; any hesitation on “Who are you tonight?”

**Hint if stuck (once):** “The big button under the names starts it.”

---

### T2 — Claim or pass the receipt  
**Goal:** C3. Item-level control without a treasurer.

**Say:**

> Go through the receipt as you would in your house. Claim what you would actually use. Pass the rest. Think aloud, especially on the protein and the cheese.

There are seven cards. Swipe right / **Claim**, swipe left / **Pass**. NPC others will fill in.

**Watch for (tick on Appendix B):**

- Do they notice live votes (`Claim` / `Pass` / `...`) under the card?
- Do they wait for the toast (`N claimed · $X each` or `Nobody claimed it · this is an Orphan`)?
- Protein ($22, cart: Drew) and Fancy Cheese ($12) — do they hesitate? Do they say a housemate’s name out loud?
- Cleaner — do they pass, and do they understand it will come back?

**Immediate questions (after the seventh card, or at the spinner):**

- T2q1. When three people claimed the cheese, what did you think the $4 each meant?
- T2q2. Was there a moment you wanted to say “that’s yours” to someone on the screen?
- T2q3. Did passing feel like accusing, like opting out, or like neither?

**Success:** They complete all seven items without the facilitator driving the clicks.

---

### T3 — Orphan spinner (Heavy-Duty Cleaner)  
**Goal:** C5. With NPC defaults, everyone passes the cleaner, so this screen should appear.

**Say nothing extra** unless they look lost. Let the 10-second wheel run.

When it stops: **Absorb the cost** or **Kitchen duty for a week**.

**Immediate questions:**

- T3q1. Did it feel like bad luck, like a punishment, or like a joke?
- T3q2. Would you use this wheel for $14.50 cleaner? For an $80 pizza? Why / why not?
- T3q3. If this landed on the housemate who is broke this week, what would go wrong?

**Log:** winner name; pay vs chore; laugh / frown / “that’s mean”; whether they waited or asked to skip.

---

### T4 — Fair or veto  
**Goal:** C1, C2, C7.

Screen: **Does this look fair?** Totals per person. Buttons: **Looks Fair** / **Play Veto Card**. Copy says the veto is anonymous.

**Say:**

> These are the running totals. Do whatever you would do before locking a real house bill. You do not have to match what you think we want.

If they sit as non-Alex with NPC on, Alex will veto anyway. Still let them choose first if they have not tapped yet.

**Immediate questions (after their tap, before or during the red VETO flash):**

- T4q1. Why did you choose Fair or Veto?
- T4q2. Do you believe the others cannot see who vetoed? What would prove it to you?
- T4q3. *(If a veto happened)* Did you want to know who triggered it?

**Success:** They tap one of the two buttons without being told which.  
**Critical fail for C7:** they ask the facilitator who vetoed, or they hunt the UI for a name.

---

### T5 — Review (only if a veto fired)  
**Goal:** C3, C6-adjacent. Heavy items come back. Luxury: **Communal** / **Personal**. Pizza: slider **Nibble 10% → Feral 50%**, then **Lock in X%**.

**Say:**

> The house is reviewing the expensive items. Answer as yourself, not as the character.

If they never veto and NPC does not veto (they sat as Alex and tapped Fair), **skip T5**. Log “review not seen.” Optionally ask them to **Play next Sunday**, sit as Bailey, and replay only to reach review. Mark that run as *prompted*, not naturalistic.

**Immediate questions:**

- T5q1. (Protein) “Personal” assigns it to whoever put it in the cart. Is that fair to the shopper?
- T5q2. (Pizza) Did the slider match how your house actually eats, or did it feel fake?
- T5q3. Did the result toast explain the new split well enough, or did you still want a conversation?

---

### T6 — Bounty, then lock  
**Goal:** C4, C6.

**Bounty:** “Chores can settle debt.” Propose a chore (bins, bathroom, dishes, kitchen) or **Skip and lock the bill**. Others Accept / Reject.

**Say:**

> If your house ever trades chores for money, try proposing one. If you never would, skip. Then look at the locked bill until you can tell me who pays whom, and why your number is that number.

**Immediate questions on bounty:**

- T6q1. Would you offer a chore this week? Why / why not?
- T6q2. Is the dollar next to the chore helpful, or would it start a second fight?

**Immediate questions on lock (Bill locked / Who pays whom):**

- T6q3. In one sentence: who do you pay, and how much?
- T6q4. Point to the line that made that number. If you cannot find it, say so.
- T6q5. Compared with a Splitwise ping tonight, is this better, worse, or only different because we were sitting here?

**Success for C4:** they can point to at least one item line that explains their share, without the facilitator scrolling for them.

---

## 9. After the prototype

Run [Appendix C](#appendix-c--post-test-sheet) in order. Do not skip the open questions. Likert without a sentence is weak evidence for this brief.

Then:

> Thank you. We will keep you as a code, not a name. If you want this prototype off your phone history, close the tab.

---

## 10. What to capture (so the wiki can change)

After each session, the facilitator fills this within 24 hours. Store in the repo only as anonymised notes (e.g. `Pengxiao Yang/Interview/Test-P1.md`), not as a spreadsheet of real names.

### Quantitative (count across sessions)

| Metric | How to get it | Relates to |
| --- | --- | --- |
| Time T1 → lock | Phone clock | Ritual length claim (~10 min) |
| Task completion T1–T6 | 0/1 per task | Usability |
| Hint count | Tally | Usability |
| Chose Veto vs Fair | T4 | C1 |
| Asked “who vetoed?” | Yes/no | C7 |
| Explained lock number without help | T6q4 yes/no | C4 |
| SUS-lite (Q1–Q8 below) | Means | Overall |
| Comfort talking about the bill, before vs after (W4 vs Q8) | 1–5 | C2 |

### Qualitative (tag quotes)

Tag each quote with: `silence` `accusation` `anonymity` `maths` `spinner-cruel` `spinner-ok` `bounty-price` `bounty-ok` `ping-vs-table` `shopper-unfair` `majority`.

A finding is real when **two sessions** produce the same tag, or when one session produces a clear critical incident (e.g. they refuse to veto because they think the others will see).

### Decision rules (for the next design pass)

- If ≥ half of participants cannot explain the lock total → redesign the breakdown, not the swipe.
- If ≥ half ask who vetoed, or do not believe it is anonymous → the flash/copy has failed C7.
- If the spinner is called cruel for $14.50 → drop random pay; keep chore-only, or let the house re-deal.
- If bounty dollars start a “is cleaning worth $10?” speech → remove preset amounts; proposal + yes/no only.
- If they say the session only worked because the facilitator was there → Mode B (real housemates) is mandatory before claiming C2.

---

## 11. Facilitator dry run

Before the first real user: one teammate runs Mode A end-to-end with NPC on, once as Bailey (expect auto-veto) and once as Alex (expect no review unless they veto). Time it. Fix anything in this plan that does not match the screen.

---

## Appendix A — Consent script

Read this. Tick yes/no.

> This is a student design test for The Weekly Split. You will use a prototype and answer questions about splitting house bills. It takes about 35 minutes. You can skip or stop. Notes will use a code, not your name. Optional: we record audio / screen. The recording is for the team only and will not be posted. Do you agree to take part? Do you agree to audio? Do you agree to screen recording?

| Item | Yes | No |
| --- | --- | --- |
| Take part | | |
| Audio | | |
| Screen | | |

Participant code: ______ Date: ______ Facilitator: ______ Mode: A / B

---

## Appendix B — Observation log

**Session:** ______ **Seat they chose:** Alex / Bailey / Casey / Drew **NPC:** on / off

**Warm-up**

| ID | Answer |
| --- | --- |
| W1 house size / who pays | |
| W2 current channel | |
| W3 swallowed an item? | |
| W4 comfort 1–5 | |

**Tasks**

| Task | Done | Hints | Time (s) | Critical incidents (what they said or did) |
| --- | --- | --- | --- | --- |
| T1 start | | | | |
| T2 claim/pass | | | | Protein: · Cheese: · Cleaner: |
| T3 spinner | | | | Pay / chore · mood: |
| T4 veto | | | | Fair / Veto · asked who?: Y/N |
| T5 review | | | | Seen? Y/N · protein vote: · pizza %: |
| T6 bounty + lock | | | | Proposed? · explained number? Y/N |

**Talk during play (tick all that apply)**

- [ ] Named a fake housemate as greedy / unfair  
- [ ] Whispered or lowered voice at veto  
- [ ] Laughed at spinner  
- [ ] Called spinner mean  
- [ ] Looked for who vetoed  
- [ ] Confused by toast / totals  
- [ ] Compared to Splitwise / chat unprompted  

**T1–T6 immediate answers** (short)

T1q1–2:  
T2q1–3:  
T3q1–3:  
T4q1–3:  
T5q1–3:  
T6q1–5:

---

## Appendix C — Post-test sheet

Participant code: ______  
Scales: 1 = strongly disagree, 5 = strongly agree. Circle one. Then the “why” line is required.

**Q1.** I could raise a concern in this flow without feeling like I was accusing a housemate.  
1  2  3  4  5  
Why:

**Q2.** I believed the veto (if any) stayed anonymous.  
1  2  3  4  5 · N/A (no veto)  
Why:

**Q3.** I understood how my final amount was calculated.  
1  2  3  4  5  
Why:

**Q4.** Claim / pass on each item was better than splitting the whole bill equally.  
1  2  3  4  5  
Why:

**Q5.** The spinner was an acceptable way to deal with something nobody claimed.  
1  2  3  4  5  
Why:

**Q6.** Trading a chore for part of the bill would be OK in my house if everyone has to accept it.  
1  2  3  4  5  
Why:

**Q7.** Doing this together in one sitting would beat a payment request that arrives later on my phone.  
1  2  3  4  5  
Why:

**Q8.** After using this, talking about this week’s bill would feel less awkward than usual in my house.  
1  2  3  4  5  
Why:

**Q9.** What is the one moment you would refuse to do with real housemates?

**Q10.** What is the one moment you would keep?

**Q11.** If your house used this next Sunday, what would have to be true (everyone home, one receipt, trust, phones…)?

**Q12.** Anything missing that would stop you finishing the ritual?

---

## Appendix D — Mode B extras (housemates together)

Keep tasks T1–T6. Changes:

- NPC **off**. They switch the seat chips to vote as Alex / Bailey / Casey / Drew, or pass one phone.
- Add two questions after T4, asked to the table, not to one person:  
  **B1.** Did anyone in this room feel watched while choosing Fair or Veto?  
  **B2.** Did anyone look at someone else’s face to guess who might veto?
- After lock: **B3.** Who in your real house would still end up as the accountant if you used this every week?

Log B1–B3. C7 fails in Mode B if anyone stares, jokes “it was you,” or asks across the table who tapped veto.

---

## Appendix E — File naming

After the session, type the logs the same day:

`Pengxiao Yang/Interview/Test-P#.md` (or the facilitator’s own folder)

Include: consent ticks, Appendix B, Appendix C scores + why lines, tags from section 10. No real names. No raw audio in the public repo.
