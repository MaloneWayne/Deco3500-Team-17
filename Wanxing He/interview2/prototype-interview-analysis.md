# Prototype Interview Analysis

**Wanxing He · Team 17 · The Weekly Split**

Sources: [Transcript 1](prototype_interview_transcript_1.md), [Transcript 2](prototype_interview_transcript_2.md), [Transcript 3](prototype_interview_transcript_3.md), [Transcript 4](prototype_interview_transcript_4.md), [Transcript 5](prototype_interview_transcript_5.md), [Transcript 6](prototype_interview_transcript_6.md), and [Transcript 7](prototype_interview_transcript_7.md)

Seven participants evaluated four parts of the prototype: receipt claiming, anonymous veto and review, chore-for-debt barter, and the orphan-item penalty wheel. The sessions provide clear directional evidence about perceived fairness and social comfort. They do not provide usability performance data because the transcripts record answers to interview prompts rather than task completion, errors, hesitation, or observation.

---

## Executive summary

The prototype succeeds when it helps housemates privately express their own use and keeps a visible record of an agreed decision. It fails when it tries to manufacture confrontation or replace a fairness decision with chance.

The strongest findings are:

1. **Claim/Pass is immediately understandable, but too binary.** All seven participants understood it, while six said they would pass after taking only a small bite. The interaction therefore risks turning minor consumption into unallocated cost.
2. **The veto mechanism is understandable, but its presentation raises tension.** Every participant associated the red screen or countdown with stress, awkwardness, or confrontation. All seven also believed anonymity would be weak in a three- or four-person household.
3. **A portion slider adds useful flexibility but depends on trust.** All participants understood its purpose, yet all identified an opportunity to understate consumption.
4. **Chore barter is viable only as an optional, bounded agreement.** All seven accepted the basic idea conditionally, especially for small debts, but expected embarrassment, valuation disputes, or non-completion.
5. **The orphan-item wheel should not assign essential household costs.** All seven rejected it, believed it could encourage strategic passing, and expected it to create rather than resolve conflict.

The core design direction should therefore be **calm facilitation, private input, explicit group consent, and reversible agreements**—not pressure, punishment, or forced fun.

---

## Evidence at a glance

| Observation | Participants | Strength of signal |
| --- | ---: | --- |
| Understood Claim/Pass without explanation | 7/7 | Strong |
| Would pass, or hesitate to claim, after only a tiny amount | 7/7 | Strong |
| Said swiping does not resolve a real disagreement | 7/7 | Strong |
| Understood the purpose of veto/review | 7/7 | Strong |
| Described red screen/countdown as tense, awkward, rushed, or confrontational | 7/7 | Strong |
| Said anonymity is ineffective in a small household | 7/7 | Strong |
| Identified dishonesty risk in self-reported portions | 7/7 | Strong |
| Accepted chore barter only with conditions | 7/7 | Strong |
| Identified embarrassment or unwanted financial exposure in barter | 7/7 | Strong |
| Rejected random assignment of an essential shared item | 7/7 | Strong |
| Expected the wheel to encourage strategic passing | 7/7 | Strong |
| Expected the wheel to cause more conflict | 7/7 | Strong |

These counts show strong consistency within this sample. Because several questions presented a negative interpretation directly, the unanimity should be treated as formative evidence rather than proof that the same proportions would occur in the wider target population.

---

## Finding 1 — Claim/Pass is clear, but it creates a “tiny use” gap

All seven participants correctly inferred that Claim includes them in an item's cost and Pass excludes them. This is the clearest and most usable interaction in the tested flow.

However, six participants said they would pass after taking only a bite or taste. Participant 4 would claim only if the resulting allocation felt fair. The binary choice therefore does not match how participants reason about partial use. Their concern is not whether they touched the item, but whether the charge is proportional to their use.

> “If I only had a tiny bit, I wouldn’t really feel like I should pay for a full share.” — Participant 1

Showing that three housemates already claimed an item also influenced the decision context. Six participants reported at least some pressure, guilt, or fear of appearing cheap. Even Participant 4, who would not change their answer, said they would notice the group response. Visible claim counts can therefore create conformity before an independent choice is made.

All seven agreed that swiping only records positions; it does not resolve conflicting memories or interpretations.

**Design implications**

- Keep the simple item-by-item interaction.
- Replace the binary choice for shareable food with three lightweight options such as **Did not use**, **Had a little**, and **Regular share**.
- Hide other housemates' decisions until the participant submits their own response, then reveal the aggregate.
- Route conflicting or incomplete allocations to a calm review step rather than presenting the initial swipe as a resolution.

---

## Finding 2 — Anonymous veto lowers the barrier to objecting, but does not remove social risk

Every participant understood the veto as a way to pause or challenge an unfair split. This validates the need for a review mechanism before settlement is finalised.

The emotional framing is the problem. Participants described the red screen and countdown as “awkward,” “tense,” “dramatic,” “stressful,” or likely to make the room go quiet. All seven preferred normal conversation over a two-minute timer. The interface currently turns a routine correction into a high-stakes event.

> “The red screen makes it feel more serious than it probably is.” — Participant 4

Anonymity also has a hard social limit. All seven said a small household could probably infer who raised the objection, especially if one person had already appeared unhappy. The design should not promise anonymity it cannot reliably provide.

Blind voting produces a decision, but participants anticipated that a losing housemate could feel judged, singled out, attacked, or “ganged up on.” A mathematically valid majority result is not automatically a socially accepted result.

**Design implications**

- Rename the action from **Play Veto Card** to a neutral phrase such as **Request review**.
- Replace the red warning screen with calm, neutral colours and language.
- Remove the compulsory countdown. Let the group pause, discuss, or continue later.
- Describe input as **private** rather than guaranteeing **anonymous** in small groups.
- Ask for a structured reason—such as “I did not use this,” “portion is inaccurate,” or “item should be personal”—so the discussion focuses on the item rather than the objector.
- Require confirmation from affected participants after a vote; use voting as a recommendation, not an irreversible verdict.

---

## Finding 3 — Proportional splitting is useful, but self-report alone is easy to game

All seven participants understood that the pizza slider represents different levels of consumption. This suggests that a rough proportional input is more appropriate for food such as pizza than a shared/personal binary.

At the same time, every participant said a housemate could select the cheapest “nibble” option to reduce their payment. Trust varied by relationship, but nobody identified an in-product safeguard.

The design should not attempt precise surveillance of food consumption. It should instead make self-reporting accountable enough for a household agreement.

**Design implications**

- Keep a small number of understandable portion levels rather than asking for exact percentages.
- Reveal everyone's selections together after private input, reducing anchoring and imitation.
- Show whether the combined allocation covers the item's cost.
- If it does not, ask the group to review the remaining amount instead of silently redistributing it.
- Save the final agreed allocation so repeated patterns can be discussed with evidence later.

---

## Finding 4 — Chore barter is a useful fallback, not a default payment system

All seven participants understood the proposed exchange and were open to it under some conditions. The most common conditions were that the debt is small, the task is useful, the exchange is occasional, and everyone affected agrees.

Participants also raised two operational risks. First, a chore has no universally agreed cash value. Second, clearing the financial debt before the task is completed creates a new enforcement problem. Five participants explicitly said the cash debt should return if the chore is not done; the other responses similarly anticipated further conflict.

The public vote can also reveal that someone cannot pay. Every participant identified possible embarrassment, although Participants 4 and 6 also saw the option as potentially empowering.

> “It could be empowering because they have another option, but the public vote could still be embarrassing.” — Participant 6

**Design implications**

- Make barter optional and initiated privately by the person who owes money.
- Show it only to the people financially affected, not automatically to the whole household.
- Let the parties agree on the task, value, deadline, and acceptance criteria before approval.
- Mark the cash amount as **pending**, not cleared, until the chore is confirmed complete.
- Automatically restore the original debt if the task expires or is rejected.
- Avoid assigning a universal hourly value to domestic labour.

---

## Finding 5 — Random punishment is incompatible with perceived fairness

The orphan-item wheel produced the strongest negative response. All seven participants understood the mechanism and rejected it for an essential communal item such as dishwasher pods. They consistently argued that shared essentials should become shared costs.

> “It feels more like a punishment than a useful feature.” — Participant 5

The wheel also changes the incentives around Claim/Pass. All seven believed someone might deliberately pass and gamble on another person being selected. It therefore rewards strategic non-claiming and punishes one person for a group-level allocation failure.

This finding does not mean randomisation can never be playful or useful. It means that randomisation is inappropriate when it transfers a real, essential cost to one individual without prior consent. A spinner could still be tested for low-stakes, non-financial tasks that everyone explicitly agrees are equivalent.

**Design implications**

- Remove the wheel from essential shared expenses.
- When no one claims an essential item, suggest an equal household split and allow members to opt out with a reason.
- For a non-essential unclaimed item, return it to the purchaser or open a group review rather than assigning it randomly.
- If a spinner remains anywhere in the concept, restrict it to opt-in, low-stakes chores with no effect on a person's cash debt.

---

## Cross-cutting insight — The app should structure the conversation, not pretend to eliminate it

Across all four features, participants repeatedly distinguished between recording an answer and resolving a disagreement. Claim/Pass records a position. Voting produces a majority. A slider records a self-assessment. A wheel produces an outcome. None of these automatically creates agreement.

The product's strongest role is therefore to:

1. let each person respond privately before group influence appears;
2. make the source of disagreement specific and visible;
3. offer fair defaults for common item types;
4. preserve time for discussion without theatrical pressure;
5. record the final agreement and any outstanding obligation.

The product should automate arithmetic and reminders. Social disagreement should remain reviewable, explainable, and reversible.
