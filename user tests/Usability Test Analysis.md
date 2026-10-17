# The Weekly Split — P1 Usability Test Analysis

## Participant

**Participant ID:** P1  
**Test Type:** Synchronous Co-located Think-Aloud Test  
**Session Duration:** 33 min 42 sec  
**NPC:** ON  

P1 lives in a four-person sharehouse, regularly shares grocery and takeaway costs, and has experience paying upfront for shared household expenses.

---

# 1. Evaluation Overview

The purpose of this test was to understand whether the main interaction flow of **The Weekly Split** was understandable and whether the design could reduce awkwardness when housemates discuss shared expenses.

The test focused on six main parts of the experience:

1. Starting the shared settlement
2. Claim / Pass
3. Orphan Spinner
4. Anonymous Veto
5. Review
6. Bounty and Final Lock

The participant also completed a post-test questionnaire about fairness, anonymity, clarity, social comfort and preference for synchronous settlement.

---

# 2. Overall Result

P1 was able to complete the full prototype flow without major usability problems.

The strongest parts of the design were:

- Item-level Claim / Pass
- Clear receipt breakdown
- Synchronous settlement
- Review of disputed expenses

The main problems identified were:

- Anonymous Veto was not fully trusted
- The Orphan Spinner felt risky for expensive items
- Fixed monetary values for chores could create another disagreement
- High-value purchases still required human discussion

Overall, the prototype appears understandable, but some social mechanisms need further refinement.

---

# 3. Finding 1 — Claim / Pass Was Easy to Understand

## Evidence

P1 completed all seven receipt items without facilitator help.

The participant understood that:

- Claim means they use the item
- Pass means they do not use the item
- Item-level decisions are different from equal splitting

P1 explained:

> “Just opting out. I’m saying I won’t use it. I’m not accusing anyone for buying it.”

The participant also gave Claim / Pass a score of:

**5 / 5**

for the statement that item-level Claim / Pass was better than splitting the whole bill equally.

## Interpretation

This is a positive result because one of the main social risks in the project is making disagreement feel accusatory.

For P1, the Claim / Pass interaction changed the meaning of disagreement.

Instead of:

> “You bought this, so you should pay.”

the interaction felt more like:

> “I do not use this item.”

This may reduce direct interpersonal pressure.

## Design Decision

**Keep Claim / Pass as a core interaction.**

Further testing should investigate whether other users also interpret Pass as neutral rather than accusatory.

---

# 4. Finding 2 — LUXURY / COMMUNAL Labels Helped Interpretation

## Evidence

P1 understood the difference between the two labels.

The participant described:

- **COMMUNAL** as basic food everyone uses
- **LUXURY** as extra or non-essential items

P1 also noticed that Alex had added multiple luxury items to the cart.

This information influenced the participant’s later decision to use the Anonymous Veto.

## Interpretation

The labels helped the participant quickly understand the social meaning of an item.

However, the labels may also influence users strongly.

For example, describing something as **LUXURY** could make users more likely to treat it as personal even before considering the actual household context.

## Design Decision

**Keep the labels for now, but test whether they bias user decisions.**

Future participants should be asked whether they would classify the same items differently without the labels.

---

# 5. Finding 3 — Cart Ownership Affected Fairness Judgement

## Evidence

P1 noticed that Alex added both Fancy Cheese and Specialty Coffee.

The participant later said these items should become Alex’s personal cost because Alex added them and other people did not use them.

## Interpretation

Showing who added an item provides useful context, but it also changes the social meaning of the receipt.

The feature may improve accountability, but it may also create blame.

This is important because The Weekly Split aims to reduce conflict rather than simply identify responsibility.

## Design Decision

Keep Cart ownership visible for now, but future testing should examine whether it helps coordination or creates interpersonal pressure.

---

# 6. Finding 4 — Anonymous Veto Was Useful but Not Fully Trusted

## Evidence

P1 independently selected **Play Veto Card**.

The participant said the feature allowed unfair items to be challenged.

However, P1 was not fully convinced that the veto was anonymous.

Post-test score:

**Anonymous Veto trust: 3 / 5**

The participant also searched the interface to see whether the identity of the veto user could be found.

## Interpretation

This is an important problem.

The feature depends on anonymity.

If users do not trust that anonymity is real, the social benefit of the feature becomes much weaker.

The problem is therefore not whether the Veto button is understandable.

The problem is whether the system provides enough evidence for users to trust it.

## Design Decision

### Strengthen anonymity feedback

Possible improvements:

- Remove any identity information immediately after a veto
- Show a clear message such as:

  **“A veto was submitted. The identity is not recorded or shown.”**

- Avoid animations that appear connected to a specific avatar
- Test whether users still search for the veto author after the redesign

---

# 7. Finding 5 — Orphan Spinner Works Only for Low-Cost Items

## Evidence

P1 accepted the spinner for the:

**$14.50 Heavy-Duty Cleaner**

but strongly rejected using it for the:

**$80 Pizza Delivery Feast**

The participant said random assignment of a large cost could create conflict, especially if the selected housemate was short on money.

Post-test Spinner score:

**3 / 5**

## Interpretation

The spinner can make a small disagreement playful.

However, the same mechanism becomes unfair when the financial risk increases.

This means the problem is not the spinner itself.

The problem is the relationship between:

**randomness + financial consequence**

As the amount increases, the playful interaction becomes a risk.

## Design Decision

The next prototype should consider one of the following:

- Add a maximum dollar threshold
- Use the spinner only for low-cost items
- Replace high-cost random assignment with group voting
- Use chore-only resolution for expensive orphan items
- Allow the group to re-deal the item

---

# 8. Finding 6 — Review Supported Negotiation

## Evidence

P1 successfully used the Review stage.

The participant:

- Marked luxury items as Personal
- Adjusted the pizza share
- Understood the updated calculation

However, P1 still said that expensive purchases should involve a short conversation.

## Interpretation

This suggests that the Review stage should not try to replace human communication.

Instead, the technology can structure the discussion and make the disagreement easier to handle.

This supports the broader design direction of The Weekly Split:

> The app should support negotiation rather than automatically decide what is fair.

## Design Decision

**Keep the Review stage.**

Design it as a shared decision point rather than an automatic conflict-resolution system.

---

# 9. Finding 7 — Chore Trading Was Interesting but Could Create New Conflict

## Evidence

P1 successfully proposed a chore to reduce debt.

Post-test chore trading score:

**4 / 5**

However, the participant raised a new issue:

> “Is bin work really worth $10?”

## Interpretation

The Bounty feature may help users who are short on cash.

However, assigning fixed monetary values to chores can create a second negotiation problem.

Instead of arguing about the bill, housemates may begin arguing about the value of housework.

## Design Decision

Possible improvements:

- Remove fixed chore prices
- Let users propose a chore and amount
- Require group approval
- Allow users to negotiate the value
- Offer chore categories instead of fixed dollar values

---

# 10. Finding 8 — Final Bill Breakdown Was Understandable

## Evidence

P1 was able to explain the final payment without facilitator help.

The participant successfully identified where the final amount came from by referring to:

- Pizza share
- Orphan item adjustment
- Bounty adjustment

Post-test clarity score:

**4 / 5**

## Interpretation

The itemised structure helps users understand the final result.

This is important because financial systems need to explain not only:

> “How much do I owe?”

but also:

> “Why do I owe this amount?”

## Design Decision

Keep the item-level breakdown.

Future versions should make the final explanation even simpler, especially when multiple mechanisms such as Spinner, Review and Bounty affect the final amount.

---

# 11. Finding 9 — Synchronous Settlement Was Strongly Preferred

## Evidence

P1 compared the experience with receiving a Splitwise notification later.

The participant strongly preferred completing the bill discussion together.

Post-test score:

**5 / 5**

P1 explained that disagreements could be resolved in one session instead of continuing through awkward messages over several days.

## Interpretation

This supports the main social design direction of The Weekly Split.

The value of the system may not be faster calculation.

The value may instead be creating a structured moment where housemates resolve the issue together.

## Design Decision

Keep the synchronous, co-located settlement as a central part of the experience.

The project should continue to focus on:

**“Sunday night, one table, ten minutes.”**

---

# 12. Quantitative Summary

| Measure | P1 Result |
| --- | --- |
| Initial comfort discussing money | 2 / 5 |
| Raise concern without accusation | 4 / 5 |
| Trust Anonymous Veto | 3 / 5 |
| Understand final amount | 4 / 5 |
| Prefer Claim / Pass | 5 / 5 |
| Accept Orphan Spinner | 3 / 5 |
| Accept chore trading | 4 / 5 |
| Prefer synchronous settlement | 5 / 5 |
| Less awkward after using prototype | 4 / 5 |
| Required hints | 0 |
| Completed full flow | Yes |

---

# 13. Main Design Strengths

Based on P1, the strongest parts of the prototype are:

### Claim / Pass
Simple, understandable and less confrontational.

### Synchronous Settlement
The participant strongly preferred resolving the bill together instead of receiving a later payment request.

### Item-Level Breakdown
The participant could understand and explain the final amount.

### Review
The feature supported negotiation without completely replacing human discussion.

---

# 14. Main Design Problems

### Anonymous Veto Trust

The participant understood the feature but did not fully trust the anonymity.

### High-Cost Randomness

The Orphan Spinner became unacceptable when the amount increased.

### Chore Valuation

Adding a dollar amount to chores may create another disagreement.

### Complex Final Calculation

The final amount was understandable, but combining several mechanisms may increase cognitive load.

---

# 15. Recommended Prototype Changes

## High Priority

### Improve Anonymous Veto

Make anonymity more visible and trustworthy.

### Add Spinner Cost Limit

Do not randomly assign high-value expenses.

## Medium Priority

### Reconsider Fixed Chore Prices

Allow negotiation instead of automatically defining the value of housework.

### Simplify Final Breakdown

Clearly show how each interaction changed the final amount.

## Keep

- Claim / Pass
- Item-level expense review
- Synchronous settlement
- Review stage
- LUXURY / COMMUNAL labels for further testing

---

# 16. Limitations

This analysis is based on **one participant only**.

Therefore, the results should be treated as:

**initial observations**

rather than:

**general conclusions about all users**

The participant also completed the test with NPC housemates rather than a full group of real housemates.

This means the test cannot fully show how real social pressure, facial expressions, group dynamics or interpersonal relationships would affect behaviour.

---

# 17. Next Steps

The next evaluation stage should include:

**P2 → P3 → P4 → Cross-Participant Analysis**

After multiple sessions, the team should compare:

- Repeated findings
- Contradictions
- Critical incidents
- Feature preferences
- Social behaviour
- Changes in comfort around money discussion

A design change should be supported by repeated evidence where possible.

The next design iteration should then follow:

**User Evidence → Finding → Design Decision → Prototype Change → Re-test**

---

# 18. Overall Conclusion

P1's test suggests that the basic interaction model of **The Weekly Split** is understandable and that the synchronous settlement concept has potential.

The strongest result was the item-level Claim / Pass interaction, which allowed the participant to express their own use of an item without feeling that they were directly accusing another housemate.

The most important weakness was the Anonymous Veto. Although the participant understood its purpose, they did not fully trust the anonymity.

The Orphan Spinner also revealed an important boundary: playful random mechanisms may work for low-value expenses but become socially risky when the financial consequence increases.

Overall, this test suggests that The Weekly Split should continue to focus on **supporting negotiation rather than replacing it**.

The next iteration should prioritise:

**stronger anonymity, safer handling of orphan items, clearer final explanations, and further testing with real housemates.**
