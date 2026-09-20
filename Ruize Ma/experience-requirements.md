# Experience Requirements

## Overview

The following experience requirements were developed from the interview findings.

The research showed that shared expense management is not only a financial problem. It is also a social problem involving fairness, trust, privacy, communication, and housemate relationships.

These requirements guide the design of The Weekly Split.

---

## R1. Safe Disagreement

Users should be able to raise concerns about an unfair expense without directly confronting or blaming another housemate.

### Research Link
Participants often accepted unfair splits because speaking up felt socially uncomfortable.

### Design Response
The system should provide an anonymous or low-pressure way to raise concerns, such as the Anonymous Veto feature.

---

## R2. Clear Cost Explanation

Users should understand why they are paying a certain amount.

### Research Link
Participants said that group chats and payment requests sometimes showed the amount owed without clearly explaining where the number came from.

### Design Response
The system should clearly show:

- Which items each person claimed
- How each item was divided
- How the final amount was calculated

---

## R3. Flexible Splitting Methods

Users should be able to divide expenses in different ways depending on the situation.

### Research Link
Equal splitting was convenient, but participants said it was not always fair when people consumed different amounts.

### Design Response
The system should support:

- Equal split
- Item-based split
- Personal items
- Proportional split

---

## R4. Shared Awareness

Users should be able to understand the current status of the shared expense process.

### Research Link
Participants described problems with forgotten payments, lost messages, and unclear expense records.

### Design Response
The system should show:

- Who has reviewed the expense
- Who has claimed an item
- Whether an expense is still under review
- Payment or settlement progress

---

## R5. Reduce Direct Confrontation

The system should help make difficult financial discussions feel less personal.

### Research Link
Participants often avoided discussing small financial disagreements because they wanted to protect their relationships with housemates.

### Design Response
The app should act as a neutral mediator during the splitting process rather than forcing one person to challenge another directly.

---

## R6. User Control

Users should have control over how their own expenses are classified.

### Research Link
Participants described disagreements about whether an item should be considered shared or personal.

### Design Response
Users should be able to:

- Claim an item
- Pass an item
- Review an item
- Suggest that an item is personal or shared

---

## R7. Group Agreement for Non-Monetary Trades

Non-monetary contributions should only be accepted when the group agrees.

### Research Link
Participants were open to using chores or favours as another form of contribution, but they did not want the system to automatically decide the financial value of a chore.

### Design Response
A user can propose a trade, such as completing a household task in exchange for reducing part of their debt.

Other housemates should then vote to accept or reject the proposal.

---

## R8. Responsible Gamification

Gamification should reduce tension without creating new unfairness.

### Research Link
Participants said that humor, simple games, or neutral decision tools could make difficult conversations easier.

However, financial issues can still be sensitive.

### Design Response
Gamification should be lightweight and should support decision-making rather than randomly deciding who must pay.

---

# Priority Requirements

For the early prototype, the team will focus on the following core requirements:

1. Safe disagreement
2. Clear cost explanation
3. Flexible splitting methods
4. Shared awareness
5. Reduced confrontation

These requirements are most directly connected to the main research finding:

> The main problem is not calculating shared expenses. It is negotiating fairness without damaging housemate relationships.
