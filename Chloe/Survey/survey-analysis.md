# Survey Analysis

**Chloe · Team 17 · The Weekly Split**

## Overview

A survey was conducted to explore how people living with others experience shared expenses, unequal consumption, repayment requests and potential settlement interactions.

**Total responses: 35**

The majority of respondents were currently living in shared-living arrangements relevant to the project context:

- 29 respondents lived in a sharehouse with roommates or friends;
- 5 lived in university accommodation;
- 1 lived in another arrangement.

This means **34 of 35 respondents (97.1%)** were living in a context closely aligned with shared household expense management.

The survey was used to identify recurring patterns and assess whether our interaction direction was plausible. It was not used to claim that the prototype had already been validated.

---

## Finding 1 — Asking for repayment creates social discomfort

Respondents were asked how awkward or anxious they feel when asking housemates to repay shared expenses.

**25 of 35 respondents (71.4%)** selected a rating of 4 or 5 out of 5.

The mean rating was:

**M = 3.66 / 5**

This suggests that expense settlement is not purely an accounting task. The act of requesting repayment can itself create interpersonal tension.

**Design implication.** The system should reduce reliance on one housemate repeatedly requesting money from others and instead mediate the settlement process.

---

## Finding 2 — Equal splitting often does not reflect actual consumption

![Unequal split frequency](charts/01-unequal-split-frequency.png)

Respondents were asked how often they pay an equal share even when they consumed significantly less than others.

- Frequently: 18
- Occasionally: 11
- Rarely: 5
- Never: 1

This means **29 of 35 respondents (82.9%)** experience this at least occasionally.

More than half of the sample (**51.4%**) said it happens frequently.

**Design implication.** Equal splitting should not be treated as the only default. The prototype should allow participants to express different levels of consumption.

This contributed to the development of **Proportional Claim**.

---

## Finding 3 — Many people avoid immediate confrontation

![Reaction to an unfair bill](charts/02-unfair-bill-response.png)

Respondents were asked what they normally do when they feel a shared bill is slightly unfair.

- Speak up immediately: 15
- Text later to avoid face-to-face tension: 16
- Pay and say nothing: 4

Combined, **20 of 35 respondents (57.1%)** avoided immediate face-to-face negotiation.

This is important because it suggests that the issue is not simply disagreement, but also how that disagreement is expressed.

**Design implication.** Sensitive decisions should be entered privately on individual phones rather than requiring users to verbally challenge one another.

---

## Finding 4 — A short weekly settlement ritual was strongly accepted

![Weekly settlement session](charts/03-weekly-settlement.png)

Respondents were asked whether a designated 10-minute weekly settlement session would make shared-expense management more or less stressful.

- Much less stressful: 22
- Slightly less stressful: 12
- No difference: 1

**34 of 35 respondents (97.1%)** believed this would be less stressful.

**62.9%** selected “much less stressful.”

This was one of the strongest results in the survey.

**Design implication.** The result supported our exploration of a predictable, synchronous weekly settlement ritual instead of fragmented payment requests throughout the week.

---

## Finding 5 — Anonymous review may lower the barrier to speaking up

Respondents were asked whether anonymous flagging would make them more likely to challenge an unfair item.

- Yes, definitely: 9
- Maybe, depending on the item: 19
- No, it would still feel awkward: 5
- Prefer direct confrontation: 2

**28 of 35 respondents (80.0%)** responded positively or conditionally positively.

However, only **25.7%** selected “Yes, definitely.”

This suggests that anonymity may help, but it is not a complete solution by itself.

**Design implication.** We use anonymity specifically for the Review stage rather than making the entire interaction anonymous.

---

## Finding 6 — Private proportional input was highly acceptable

![Private slider comfort](charts/04-private-slider-comfort.png)

Respondents rated how comfortable they would be using a private digital slider to indicate their own consumption.

- Rating 5: 11
- Rating 4: 21
- Rating 3: 2
- Rating 2: 1
- Rating 1: 0

**32 of 35 respondents (91.4%)** selected 4 or 5.

Mean comfort rating:

**M = 4.20 / 5**

**Design implication.** Rather than asking one person to estimate everyone's consumption, each participant can privately report their own perceived share.

This directly informed the **Proportional Claim** interaction.

---

## Finding 7 — Chore barter showed interest but also introduced ambiguity

Among valid responses to the chore-compensation question:

- Yes, often: 18
- Yes, for small amounts only: 11
- No: 5

**29 of 34 respondents (85.3%)** were at least open to the idea.

However, interview findings suggested that different people may assign different values to household labour.

**Design implication.** Chore-based compensation was therefore deprioritised from the core MVP and retained as a possible future direction.

---

## Design Synthesis

The survey did not suggest that people simply need a better expense calculator.

Instead, the strongest patterns concerned:

- discomfort when asking for repayment;
- unequal consumption;
- avoidance of direct confrontation;
- strong acceptance of a short shared settlement session;
- high comfort with private digital input.

Together, these findings shaped the current interaction direction:

**Private expression → synchronous coordination → mediated review → shared resolution**

The app therefore focuses on negotiating perceived fairness rather than simply recording debt.
