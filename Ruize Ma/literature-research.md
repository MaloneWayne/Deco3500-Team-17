# Literature Research

## Research Purpose

To better understand how people manage shared household expenses, we reviewed two ACM papers about collaborative financial management in domestic settings.

These papers were selected because they focus on financial management as a social and collaborative activity, rather than only as a mathematical or accounting task.

The findings were used to support the design direction of **The Weekly Split**.

---

# Paper 1

## Fostering Collaboration in the Management of Family Finances

**Authors:** Stephen Snow and Dhaval Vyas  
**Year:** 2015  
**Conference:** OzCHI 2015  
**Publisher:** ACM  
**DOI:** 10.1145/2838739.2838746

### Research Focus

This paper explores how technology could support greater collaboration around family financial management.

The authors argue that financial management is often handled by only one or a small number of family members.

They explore design opportunities that could involve more household members in financial activities and decision-making.

---

## Key Insight 1: Financial Management Can Be Collaborative

Household financial management is not only an individual task.

It can involve communication, coordination, shared responsibility and decision-making between different people.

### Design Implication

The Weekly Split should not allow one housemate to completely control the splitting process.

Instead, all housemates should have opportunities to participate.

For example:

- Users can Claim or Pass individual items
- Everyone can review the result
- Users can raise concerns
- The group can agree on the final split

This changes expense splitting from an individual accounting task into a collaborative activity.

---

## Key Insight 2: Technology Can Encourage Participation

The paper explores how interactive systems can encourage more household members to participate in financial management.

This is important because financial decisions can become unbalanced when only one person is responsible for tracking and managing money.

### Design Implication

The Weekly Split should distribute responsibility across the household.

Instead of:

> One person calculates the bill and tells everyone what they owe.

The system supports:

> Everyone reviews and contributes to the decision before the final amount is confirmed.

---

## Key Insight 3: Financial Activities Are Connected to Household Life

Financial management is connected to everyday household responsibilities and routines.

It does not happen separately from daily life.

### Design Implication

The Weekly Split uses the idea of a regular shared settlement session.

For example, housemates could review shared expenses together once a week.

This may be more socially comfortable than receiving unexpected payment requests throughout the week.

---

# Paper 2

## Social Organization of Household Finance: Understanding Artful Financial Systems in the Home

**Authors:** Dhaval Vyas, Stephen Snow, Paul Roe and Margot Brereton  
**Year:** 2016  
**Conference:** CSCW 2016  
**Publisher:** ACM  
**DOI:** 10.1145/2818048.2819937

### Research Focus

This paper reports a field study of fifteen families and examines how money and financial activities are managed in everyday domestic life.

The study found that families develop their own financial systems based on their relationships, values, routines and responsibilities.

These systems often combine physical and digital tools.

---

## Key Insight 1: Household Finance Is Socially Organised

The study shows that financial management is closely connected to social relationships.

Financial decisions are influenced by:

- Trust
- Household responsibilities
- Relationships
- Daily routines
- Shared values

This means financial decisions are not purely mathematical.

### Design Implication

The Weekly Split should consider social comfort as well as financial accuracy.

A mathematically equal split may not always feel fair to the people involved.

Therefore, the system should help housemates discuss and negotiate fairness.

---

## Key Insight 2: Different Households Have Different Ideas of Fairness

Different households develop different ways of managing money.

There is no single financial system that works for every household.

Some people prefer equal sharing, while others prefer more individual control.

### Design Implication

The Weekly Split should not automatically decide what is fair.

Instead, it should support different methods, such as:

- Equal split
- Item-based split
- Personal items
- Proportional split

The household should have control over the final decision.

---

## Key Insight 3: Technology Should Support Existing Practices

The study found that people use combinations of digital and physical tools to manage household finances.

This includes receipts, banking systems, informal conversations and other existing practices.

### Design Implication

The Weekly Split should support existing behaviours rather than trying to replace everything.

For example:

1. Housemates continue shopping normally
2. A normal grocery receipt is uploaded
3. The Weekly Split helps the group negotiate the expense
4. Users can continue using their normal banking application for payment

The app mainly supports the difficult social decision-making stage.

---

# Comparison of the Two Papers

Although the two papers have different focuses, they provide a similar understanding of household financial management.

### Paper 1

The first paper mainly focuses on **collaboration and participation**.

It suggests that financial management can become more collaborative when technology allows more household members to participate.

### Paper 2

The second paper mainly focuses on **social organisation and existing practices**.

It shows that financial systems are shaped by relationships, values, routines and household responsibilities.

---

# Combined Insight

Together, the two papers suggest that shared financial management is not simply about calculating money.

It is also about:

- Communication
- Collaboration
- Trust
- Negotiation
- Relationships
- Household routines

This changes how we understand the design problem.

The problem is not only:

> How can we calculate a shared bill accurately?

A more important question is:

> How can we help people negotiate what feels fair while protecting their relationships?

---

# Our Design Position

Based on these papers and our user research, we developed the following design position:

> **Shared expense management should support negotiation, not only calculation.**

The Weekly Split should therefore act as a **social mediator** between housemates.

The system should not completely decide what is fair.

Instead, it should provide a structured and low-pressure environment where housemates can:

- Express whether they used an item
- Understand how costs are calculated
- Raise concerns safely
- Review disagreements
- Reach a shared decision

---

# Connection to The Weekly Split

The literature directly informed several features of our prototype.

## Claim / Pass

Supports participation by allowing each housemate to contribute to the splitting process.

## Item Split Result

Improves transparency by showing how costs are calculated.

## Anonymous Veto

Supports safe disagreement and reduces direct confrontation.

## Review Phase

Allows fairness to be negotiated rather than automatically decided by the system.

## Flexible Splitting

Recognises that different households and situations may require different definitions of fairness.

## Weekly Settlement

Connects shared expense management to a regular household routine.

---

# Final Conclusion

The two papers helped us understand that household finance is both a financial and social activity.

The first paper highlights the importance of collaboration and participation, while the second shows that financial practices are shaped by relationships, values and household routines.

From these findings, we concluded that the main opportunity for The Weekly Split is not to create another bill calculator.

Instead, the design opportunity is to create a shared space where housemates can negotiate expenses in a way that feels fair, transparent and socially comfortable.

Our final design viewpoint is:

> **The main problem is not calculating shared expenses. It is helping housemates negotiate fairness without damaging their relationships.**
