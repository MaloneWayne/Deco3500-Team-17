# Interview Analysis

**Chloe · Team 17 · The Weekly Split**

Source: [Participant 01](Participant-01.md) and [Participant 02](Participant-02.md)

Two additional semi-structured interviews were conducted to explore how people experience fairness, confrontation and negotiation around shared household expenses.

These interviews were not intended to prove that the current prototype works. Instead, they were used to investigate whether the interaction direction — private input, proportional claims and mediated review — reflects problems people already experience.

---

## Finding 1 — Small unfair costs are often tolerated to protect relationships

Both participants described situations where they paid more than they believed was fair but chose not to challenge the split.

Participant 01 described repeatedly paying for groceries they did not consume because questioning small amounts could make living together uncomfortable.

Participant 02 described a similar pattern with takeaway:

> “The social cost feels bigger than the money.”

The problem is therefore not only the monetary amount. Small losses may be accepted because challenging them carries a perceived interpersonal cost.

**Design implication.** The system should make it possible to express disagreement without forcing one housemate to directly accuse another.

---

## Finding 2 — Asynchronous settlement can reduce shared understanding

Both participants currently settle expenses through messages or bank transfers rather than through a shared face-to-face process.

Participant 01 described receiving payment requests without remembering exactly what was included. Participant 02 described small payment requests arriving throughout the week as disruptive.

This suggests that asynchronous tools may support the transfer of money without necessarily supporting a shared understanding of how the split was decided.

**Design implication.** A short, predictable settlement session may provide a clearer moment for negotiation and confirmation.

---

## Finding 3 — Same-room interaction can still preserve privacy

Participant 02 distinguished between being physically together and having to publicly negotiate:

> “If everyone is sitting together while using their own phones, that feels different because you still have some privacy.”

This supports an important distinction in the current concept: co-location does not require every individual decision to be public.

**Design implication.** Each housemate can use their own phone as a private input channel while the group shares the overall settlement process.

---

## Finding 4 — Proportional input can support unequal consumption

Both participants felt that exact measurement of consumption would be unrealistic, but equal splitting was not always appropriate.

Participant 01 was comfortable privately entering an approximate percentage. Participant 02 similarly preferred a rough expression of consumption rather than exact measurement.

**Design implication.** Proportional Claim should be treated as a lightweight expression of perceived use rather than a precise measurement system.

---

## Finding 5 — Automation should stop where social disagreement begins

Participant 02 suggested that values above 100% could potentially be normalised, but unclaimed cost should return to the group for discussion.

This distinction supports the current prototype logic:

- Total = 100% → accept the allocation
- Total > 100% → normalise relative weights
- Total < 100% → trigger Allocation Review

**Design implication.** The system can resolve mathematical inconsistency automatically, but it should not silently resolve social disagreement.

---

## Finding 6 — Chore barter should remain optional

The participants did not strongly support treating labour as a direct replacement for money.

Participant 01 thought it could work for small amounts if everyone agreed. Participant 02 warned that assigning value to chores could create another dispute.

**Design implication.** Chore-based compensation should remain an optional future direction rather than a core settlement mechanism.

---

## Finding 7 — Anonymous review needs structure

Anonymous review was viewed positively, especially for more expensive or sensitive items, but Participant 02 raised the possibility of repeated anonymous rejection.

**Design implication.** Anonymous Review should include a structured reason and a limited review loop rather than unlimited vetoes.

---

## Summary

These interviews reinforce the wider design opportunity identified by the team:

**The difficult part of shared expense settlement is not only calculating the total, but expressing disagreement without damaging the social relationship.**

The strongest implications for the current prototype are:

- private input rather than public accusation;
- proportional self-reporting rather than equal split by default;
- synchronous settlement with individual privacy;
- anonymous but structured review;
- automatic calculation only where the disagreement is mathematical rather than social.
