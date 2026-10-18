

# The Weekly Split
## What We Learned and How It Shaped Our Prototype

**DECO3500 · Team 17**

### Our central insight

Our interviews and prototype testing revealed that household bill splitting is more than a calculation problem. It is also a social negotiation.

Participants described paying for items they barely used because questioning a small amount felt more uncomfortable than accepting the cost. Others described the burden of paying upfront and then chasing housemates for money.

This helped us clarify the purpose of The Weekly Split: **make shared expenses easier to question, discuss and understand.**

### 1. People stay silent to avoid making money personal

In Ruize’s session, the participant described paying for unwanted premium groceries to keep the peace. Pengxiao’s participants reported similar experiences, including absorbing small costs because asking for repayment created friction. Malone’s record describes a participant paying for another housemate’s premium yogurt rather than requesting a recalculation.

Across these accounts, silence did not necessarily mean agreement. It sometimes meant that speaking up felt too costly socially.

**How this shaped our design**

This finding supports our item-level **Claim/Pass** interaction. Instead of requiring someone to say, “I will not pay for your food,” the interface lets them express whether they use an item.

Participants in the task-based sessions often interpreted Pass as opting out rather than accusing someone. That distinction is central to our design: give people a simple way to express their position before resentment builds.

**Sources:** Ruize’s transcript and analysis; Pengxiao’s P1 and P2 logs; Malone’s record.

### 2. Equal splitting is simple, but it does not always feel fair

Participants distinguished between personal purchases, shared essentials and food consumed in different amounts.

The interview analysis also exposed a weakness in binary choices: six participants reportedly said they would pass after consuming only a tiny amount. Paying a full share felt disproportionate, but paying nothing could leave part of the cost unresolved.

The two-couples household added another perspective. Its members sometimes understood fairness through shared responsibilities and contributions across several days, rather than through four equal shares on one receipt.

**How this shaped our design**

These findings support allocating expenses at the item level and allowing participants to review different consumption levels.

The prototype’s portion adjustment explores how users can express unequal consumption. Testing helped us recognise that the important feature is flexibility; exact percentages are not necessarily how people naturally describe what they ate.

The broader design principle is to **help the household agree on a fair allocation rather than assume that equal always means fair.**

**Sources:** Wanxing He’s interview analysis; two-couples testing analysis; Ruize’s and Pengxiao’s testing records.

### 3. People need a way to object, but hiding a name does not remove social pressure

Participants understood why a veto or review mechanism was useful. Some used it to challenge an allocation without starting a direct confrontation.

However, the evidence also challenged our anonymity assumption. Participants searched for the veto author, checked whether their own name would appear, or inferred who objected from facial expressions. In Malone’s shared-device session, one participant tilted the screen away while voting.

The interview analysis further reported that the red screen and countdown could make a disagreement feel more tense.

**How this shaped our design**

This finding reinforces the need for a review stage before settlement becomes final.

It also clarified what the mechanism can realistically achieve: the interface can avoid displaying the objector’s identity, but it cannot guarantee that housemates will not guess.

Our design direction is therefore to make review a normal part of reaching agreement, with attention on the disputed expense rather than the person raising it.

**Sources:** Ruize’s transcript; Pengxiao’s P1 and P2 logs; Malone’s record; two-couples analysis; Wanxing He’s interview analysis.

### 4. Playfulness does not automatically create fairness

The spinner produced laughter in several sessions. Some participants accepted it for a low-cost item while rejecting it for an expensive purchase.

However, the shared-household evidence revealed an important difference between enjoying the interaction and accepting its consequence. In Malone’s session, the participant selected to take responsibility for the cleaner rated the spinner **1/5**, while another participant rated it **4/5**.

The two-couples analysis and interview analysis also questioned why one person should randomly inherit the cost of a communal essential.

**How this shaped our design thinking**

Testing challenged the assumption that removing personal blame would make an outcome fair.

A random result may feel entertaining to observers while imposing an unwanted burden on the selected person. This makes the spinner a contested part of the concept, rather than evidence that gamification successfully resolves disagreement.

The resulting design principle is clear: **playful interaction should support agreement, while financial responsibility requires meaningful consent.**

**Sources:** Malone’s record and findings; two-couples analysis; Wanxing He’s interview analysis; solo testing records.

### 5. An alternative to cash can help, but it creates another agreement

Chore barter received different responses across households.

In Malone’s session, a cash-constrained participant valued having a way to contribute time instead of money. Other participants questioned the assigned price of chores, preferred cash, or felt that housework was already covered by existing household expectations.

The interview analysis also identified possible embarrassment and concern about what happens when a promised chore is not completed.

**How this shaped our design**

These findings explain the value of exploring **Bounty** as an alternative settlement option, while showing why it should remain optional.

The important interaction is the agreement between affected people: what work is offered, what it offsets and whether the arrangement is accepted. The app cannot assume that a chore has one universally fair price.

**Sources:** Malone’s record; Ruize’s transcript; Pengxiao’s P1 and P2 logs; two-couples analysis; Wanxing He’s interview analysis.

### 6. People need to understand the result, not just receive a number

Several participants could explain their final amount by referring to item lines and adjustments. This was a positive sign for the itemised breakdown.

However, the two-couples analysis reported that some participants needed more time to connect the original allocation, review changes and final payment.

**How this shaped our design**

This supports the prototype’s final breakdown as a core part of the experience.

The settlement should answer both:

- **What do I owe, and to whom?**
- **Which decisions produced that amount?**

An explainable result gives housemates a shared reference for checking the agreement. Reported understanding is encouraging, although it does not independently verify the underlying arithmetic.

**Sources:** Ruize’s transcript; Pengxiao’s P1 and P2 logs; Malone’s record; two-couples analysis.

### What this means for our prototype

The research helped us identify the strongest role for The Weekly Split: **structure the conversation around shared expenses.**

The current prototype explores that role through item-level choices, review, flexible allocation, alternative contributions and a visible settlement breakdown.

Testing supported the value of making expenses explicit, while challenging assumptions about anonymity, randomness and universally fair chore prices. These tensions are part of what we learned, rather than problems we can claim to have completely solved.

Our contribution is a shared process in which housemates can express their use, question an allocation and understand the resulting agreement.

