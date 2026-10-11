# Prototype Testing Analysis — The Weekly Split

> **Note:** This analysis is based on the simulated/pilot Mode B testing record for four housemates living together as two couples. Replace simulated evidence with actual testing data before formal submission.

## 1. Evaluation Overview

The Mode B testing session involved four participants who currently live together as two couples. Their household regularly shares meals, alternates responsibility for grocery shopping and cooking, and occasionally purchases personal items within shared grocery trips.

This household arrangement created a useful testing context because their expense-sharing behaviour is more complex than a simple equal four-way split. Their existing system combines individual spending, couple-level spending, communal expenses, and informal balancing across several days.

The testing therefore examined not only whether participants could use the prototype, but whether **The Weekly Split's model of fairness matched the way fairness is actually negotiated within a shared household**.

Overall, the prototype performed well in helping participants identify personal and shared expenses. However, several features introduced new forms of friction, particularly around anonymity, random cost assignment, chore valuation, and the assumption that every receipt should be settled independently.

---

## 2. Overall Usability

From a usability perspective, the prototype was generally understandable.

All four participants successfully completed the main interaction flow without facilitator hints. Participants understood the purpose of the system early in the session and were able to use the main Claim/Pass mechanism without instruction.

This suggests that the basic interaction model is sufficiently discoverable for a mid-fidelity prototype.

However, successful task completion did not necessarily mean that participants accepted the underlying design decisions.

The most important distinction emerging from the test was therefore:

> **The prototype was mostly usable, but not every interaction felt appropriate for the participants' real household practices.**

For example, participants understood how the spinner worked but questioned whether it was fair. Similarly, they understood the bounty system but did not want to use it in their own household.

The next design iteration should therefore focus less on improving basic discoverability and more on ensuring that each interaction reflects realistic household decision-making.

---

## 3. Strongest Feature: Item-Level Claim / Pass

The clearest positive result was the **item-level Claim / Pass interaction**.

All participants understood that an item's cost would be divided only among those who claimed it. When three participants claimed the $12 cheese, all four correctly understood that each claimant would contribute $4.

This indicates strong support for the design claim that item-level allocation is clearer than splitting an entire household bill equally.

Participants particularly valued this mechanism for items such as:

- premium protein;
- specialty coffee;
- snacks;
- personal-use products; and
- other goods that are only used by some household members.

The post-test rating for item-level splitting was also the highest of the tested features.

This suggests that the core interaction should remain central to the next prototype.

However, the testing also revealed that Claim/Pass should not necessarily be required for every item.

Participants felt that obvious communal products, such as standard shared groceries, could become unnecessarily repetitive if everyone had to manually claim them each week.

### Design Implication

The Claim/Pass mechanism should be retained, but the interaction could become more efficient by introducing options such as:

- **Shared by Everyone**
- **Personal**
- **Ask the House**

This would preserve item-level fairness without requiring the same level of interaction for every routine product.

---

## 4. The Prototype Reduces Direct Accusation, but Does Not Remove Social Pressure

One of the main design goals of The Weekly Split is to allow the system to “take the heat” instead of requiring one housemate to directly accuse another.

The testing partially supported this idea.

Participants reported that selecting Claim or Pass felt less confrontational than saying something such as:

> “I don't want to pay for your item.”

The interface therefore created a more neutral language for expressing disagreement.

However, this effect became weaker during the anonymous veto stage.

Although the application did not display the identity of the person who vetoed the bill, participants were still able to make guesses based on:

- who had previously questioned an item;
- hesitation before pressing a button;
- facial expressions;
- body language; and
- known personality or spending preferences.

One participant immediately looked towards another participant after the veto appeared and joked that they knew who had triggered it.

This shows an important distinction between:

**technical anonymity**

and

**social anonymity**.

The interface may successfully hide the user's identity, but participants sharing the same physical space can still infer who disagreed.

### Design Implication

The prototype should avoid claiming that the veto is completely anonymous.

A future design could instead:

- collect all votes privately before displaying any outcome;
- show the veto result only after everyone has submitted;
- reduce visible hesitation time;
- allow participants to vote on separate devices;
- frame the review as a normal system check rather than evidence that “someone complained.”

This would reduce the focus on identifying the person who raised the concern.

---

## 5. The Spinner Was Playful but Not Perceived as Fair

The orphan-item spinner created one of the strongest negative reactions.

Participants initially responded positively to the visual interaction. Several laughed when the wheel started, suggesting that the game-like mechanic successfully introduced playfulness.

However, their reaction changed when the spinner assigned actual financial responsibility.

For the $14.50 cleaner, participants questioned why one person should absorb the cost when the product was clearly communal.

The problem became even more obvious when participants were asked whether the same mechanism would be acceptable for an $80 pizza.

They strongly rejected this idea.

This indicates that participants distinguished between:

- **randomness as entertainment**, and
- **randomness as a legitimate fairness mechanism**.

The wheel may reduce the feeling of direct personal blame, but it also removes meaningful justification for the outcome.

This weakens the system's perceived fairness.

### Design Implication

The spinner should not directly determine who must pay for a disputed communal item.

It could instead be used for lower-stakes decisions, such as:

- who completes a small chore;
- who starts the next cooking rotation;
- who chooses the next shared meal;
- who initiates the discussion.

For orphan expenses, more appropriate options could be:

- **Split equally**
- **Assign manually**
- **Re-deal**
- **Discuss as a group**

The playful interaction can remain, but it should not control significant financial consequences.

---

## 6. Shopper Does Not Equal Owner

One of the clearest usability and fairness problems appeared during the review stage.

The prototype currently assumes that if an item is marked as personal, responsibility can be assigned to the person who placed it in the shopping cart.

All four participants challenged this assumption.

Their household frequently includes situations in which:

- one partner buys something for the other;
- one person shops on behalf of the household;
- one person picks up another person's requested product.

Therefore:

> **The person purchasing an item is not necessarily the person responsible for paying for it.**

This is especially important in households where couples shop together or where one person regularly handles grocery trips.

### Design Implication

The next version should separate the roles of:

- **shopper**
- **user**
- **payer**

For example, selecting **Personal** could open a simple assignment option:

> Personal item  
> Who is this for?  
> P1 / P2 / P3 / P4

This would better reflect real household purchasing behaviour.

---

## 7. The Prototype Assumes Individual Fairness, but Participants Sometimes Think in Couples

The current prototype models the household as four independent individuals.

However, these participants frequently treated themselves as two financial units:

- Couple A
- Couple B

For some expenses, they did not care whether the cost was perfectly balanced between the two partners within each couple.

Instead, they were more concerned with whether Couple A and Couple B contributed fairly overall.

For example, participants suggested that shared takeaway could sometimes be split between the two couples rather than calculated by individual consumption.

This suggests that household financial structures can exist at multiple levels.

### Design Implication

The next prototype should consider flexible grouping options:

- **Individual**
- **Couple / Pair**
- **Whole Household**

Not every household will use couples, so this should remain optional rather than becoming the default.

The broader design principle is that **users should be able to define the financial units that matter in their household**.

---

## 8. Fairness Is Not Always Measured Receipt by Receipt

One of the most significant findings emerged from participants' existing household routine.

The two couples often alternate cooking and grocery responsibilities.

For example:

- Couple A may pay more on Monday.
- Couple B may pay more on Tuesday.

They do not necessarily settle both meals separately.

Instead, they judge fairness across time.

This means the prototype's current assumption:

> One receipt → one fair settlement

does not fully match their lived experience.

The participants may tolerate an “unequal” receipt because they expect the balance to reverse later.

This finding expands the problem beyond individual bill splitting.

The relevant question for these users is not always:

> “Was this receipt perfectly fair?”

It may instead be:

> “Have we contributed fairly over the last week?”

### Design Implication

Future iterations could support lightweight history, such as:

- previous shared purchases;
- who paid last time;
- weekly balance;
- carried credit;
- couple-level contributions.

This does not mean the product needs to become a full accounting platform.

A simple indicator such as:

> “Couple A covered the last shared dinner”

may already help users interpret the current bill in context.

---

## 9. The Pizza Slider Was Flexible but Too Precise

The fairness slider allowed participants to estimate different levels of consumption.

Conceptually, participants understood why the feature existed.

However, they found the percentage-based interaction unrealistic.

Participants did not normally think:

> “I ate approximately 30% of the pizza.”

Instead, they tended to think in simpler categories:

- ate none;
- ate a little;
- normal share;
- ate much more than others.

The percentage slider therefore introduced false precision.

### Design Implication

A categorical system may better match natural reasoning.

For example:

- **None**
- **A little**
- **Normal share**
- **A lot**

The system could convert those choices into percentages internally without requiring users to estimate exact consumption.

This would preserve flexibility while reducing cognitive effort.

---

## 10. Bounty Cards Did Not Fit This Household

The chore-for-money feature received relatively low acceptance.

Participants did not necessarily reject the idea that labour could compensate for money.

Instead, they questioned whether it was appropriate within their existing household system.

Their house already had informal expectations around:

- cooking;
- dishes;
- cleaning;
- shared chores.

Adding financial values to these activities created a new question:

> “How much is doing the dishes actually worth?”

Participants felt that this could create a second fairness dispute rather than solving the original financial disagreement.

### Design Implication

The problem appears to be less about offering chores and more about **pre-pricing chores**.

A better version may allow:

> “Offer to do the dishes instead”

followed by:

> **Accept / Reject**

This allows the group to decide whether the trade is acceptable without requiring the system to assign an objective dollar value to domestic labour.

The feature could also remain optional and appear only when a participant actively requests an alternative settlement.

---

## 11. Final Bill Transparency Was Useful but Could Be Stronger

Most participants could understand the final settlement.

Three of four participants were able to identify at least one item-level line that explained their final amount without facilitator help.

This suggests that the final breakdown generally supports the prototype's goal of making the result explainable.

However, some participants needed additional time to connect:

1. the original bill;
2. Claim/Pass decisions;
3. review adjustments;
4. final payment.

Participants specifically requested greater visibility of what changed during review.

### Design Implication

The final screen should show a clearer transformation, for example:

**Before review:** $42.50  
**Adjustment:** -$8.00 personal protein  
**Shared pizza adjustment:** +$4.50  
**Final:** $39.00

This would make the logic easier to audit without forcing participants to reconstruct previous interactions.

---

## 12. Efficiency Is a Major Adoption Constraint

Although participants valued fairness, they repeatedly raised concerns about time and effort.

Two participants preferred the full process for complex bills but said they would rather receive a normal payment request for straightforward expenses.

This reveals an important tension:

> Greater fairness can require greater interaction cost.

If users have to review every item every week, the system may become more annoying than the small unfairness it is trying to solve.

The prototype therefore should not force the full ritual in every situation.

### Design Implication

A stronger design may provide two paths:

### Quick Split

For simple shared expenses.

Examples:

- shared takeaway;
- obvious communal groceries;
- straightforward equal payments.

### Review Together

For:

- mixed personal/shared receipts;
- expensive purchases;
- disputed items;
- unusual consumption.

This would make the system more adaptable to the complexity of the bill.

---

## 13. Analysis of the Original Design Claims

| Claim | Result | Analysis |
|---|---|---|
| **C1 — People will contest an item if they do not have to put their name on it** | Partially supported | Participants used veto and Claim/Pass, but physical co-presence still exposed social cues. |
| **C2 — The app can take the heat instead of a housemate** | Partially supported | The interface reduced direct accusation but could not remove interpersonal pressure. |
| **C3 — Item-level claim/pass is clearer than one total** | Supported | This was the strongest and most consistently understood feature. |
| **C4 — Users can explain their final amount** | Mostly supported | 3/4 participants clearly traced part of their amount; final transformations could be clearer. |
| **C5 — Spinner feels like chance rather than attack** | Not supported as a payment mechanism | Participants enjoyed the game but rejected random financial responsibility. |
| **C6 — Chore-for-cash is acceptable if rejectable** | Weakly supported | Consent helped, but predetermined dollar values created additional fairness concerns. |
| **C7 — Nobody asks who vetoed** | Not supported | Participants socially inferred or guessed who triggered the veto. |

---

## 14. Priority Issues for the Next Iteration

Based on the severity and consistency of the findings, the design changes can be prioritised as follows.

### High Priority

#### 1. Separate Shopper from Item Owner

This issue was raised consistently across the group and directly affects financial correctness.

#### 2. Redesign Orphan-Item Handling

Randomly assigning financial responsibility was strongly rejected.

#### 3. Improve Veto Privacy

The current mechanism protects identity technically but not socially.

#### 4. Reduce Interaction for Obvious Shared Items

Without this change, weekly use may become too time-consuming.

### Medium Priority

#### 5. Support Couple/Group-Based Splitting

This is highly relevant to this household, although other household structures may differ.

#### 6. Improve Final Bill Explanation

Users should more easily understand how adjustments produced the final total.

#### 7. Simplify the Pizza Consumption Interaction

Replace exact percentages with more natural categories.

### Future Exploration

#### 8. Multi-Day or Weekly Fairness

This was a meaningful finding but may expand the product scope significantly.

It should be explored carefully rather than immediately added.

#### 9. Reframe Bounty Cards

The feature may still be useful in some households, but the current fixed-price model should be reconsidered.

---

## 15. Proposed Revised User Flow

The findings suggest a simplified future interaction:

1. **Import or create receipt**
2. **Automatically mark obvious communal items**
3. **Review uncertain items**
4. For each uncertain item:
   - Shared by everyone
   - Shared by selected people
   - Personal → assign owner
5. Show provisional totals
6. Everyone privately selects:
   - Looks fair
   - Review needed
7. If review is triggered:
   - review disputed/high-value items
   - avoid revealing who requested review
8. For orphan items:
   - equal split
   - manual assignment
   - discuss/re-deal
9. Optional alternative settlement:
   - propose chore
   - group accepts/rejects
10. Show:
   - original total
   - adjustments
   - final amount
   - who pays whom
11. Optionally carry household contribution history forward.

This revised flow keeps the strongest feature—item-level fairness—while removing or simplifying the interactions that generated the most resistance.

---

## 16. Overall Design Interpretation

The test suggests that the core problem identified by The Weekly Split is valid.

Participants do experience situations where they pay for things they barely use, and they sometimes avoid raising the issue because the amount is too small to justify a socially uncomfortable conversation.

The prototype's strongest contribution is therefore not simply “splitting bills.”

Its value is:

> **providing a neutral structure for making small financial disagreements discussable.**

However, the test also shows that fairness should not be interpreted as perfect mathematical equality.

Household fairness is contextual.

It can depend on:

- relationships;
- previous contributions;
- future responsibilities;
- individual preferences;
- household routines;
- amount of money involved;
- whether the expense is personal or communal.

The next iteration should therefore move away from rigidly deciding what is mathematically fair and instead provide **flexible tools that help the household negotiate what they consider fair**.

---

## 17. Conclusion

The Mode B testing showed that The Weekly Split has a viable core interaction, particularly its item-level Claim/Pass mechanism and transparent bill breakdown.

Participants were able to use the prototype successfully and appreciated having a structured way to identify personal expenses without directly confronting another housemate.

At the same time, the test identified several important mismatches between the prototype and real household behaviour.

The spinner, fixed-price bounty system, social anonymity assumptions, shopper ownership rule, and one-receipt-at-a-time model require further refinement.

The central design direction for the next iteration should therefore be:

> **Keep item-level transparency, but make the system faster, more socially realistic, and more flexible about what fairness means in different households.**

Rather than forcing every household into one fixed settlement model, the prototype should support different ways of sharing expenses while continuing to reduce the interpersonal friction that originally motivated the design.
