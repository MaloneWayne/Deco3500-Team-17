# Assumptions and Evidence

## Starting assumptions

We began with four bets.

1. **People will flag an unfair item if they do not have to put their name on it.**  
   Motivation: we have all watched someone absorb the cost of a housemate’s specialty food rather than start a scene.

2. **A short, same-room ritual beats an async chase for money.**  
   Motivation: Splitwise already exists. People still dislike the repayment request that arrives later. Being together changes the social dynamics.

3. **Chores can stand in for cash.**  
   Motivation: houses already trade labour informally (“I’ll do bins if you skip my share”).

4. **The awkwardness is the product problem.**  
   Motivation: the maths is easy. The conversation is not.

---

## Why we held them

These started as lived-house bets, not as survey results.

Sharehouse kitchens in St Lucia, Indooroopilly and Toowong are close social spaces. You hear the fridge. You see who bought the expensive cheese. You often know who used what.

The cost of speaking up is therefore social, not arithmetic.

We also assumed that if the **app** pauses the bill and asks “communal or personal?”, nobody has to take on the role of house detective.

The research was used to test whether those initial assumptions reflected actual shared-living experiences.

---

## What the interviews did to those bets

We conducted **17 semi-structured interviews** with people who currently split household costs.

The interview set was collected across the team and explored confrontation avoidance, current settlement routines, unequal consumption, private proportional input, co-located settlement, anonymous review, chore-based contributions and playful mediation.

Full notes and analysis are available in:

- [`Ruize Ma/Interview Transcript 01.docx`](../Ruize%20Ma/Interview%20Transcript%2001.docx) and [`interview-findings.md`](../Ruize%20Ma/interview-findings.md)
- [`Chloe/Interview`](../Chloe/Interview/)
- [`Pengxiao Yang/Interview/README.md`](../Pengxiao%20Yang/Interview/README.md)
- [`Malone Wang/md type`](../Malone%20Wang/md%20type/)
- [`Wanxing He/interview1`](../Wanxing%20He/interview1/)

Some participants study. That is a demographic fact of inner-west Brisbane housing, not our user definition.

We asked about the lease, the fridge, the receipt and the group chat. We did not ask about campus life.

| Assumption | What we heard | Verdict |
| --- | --- | --- |
| 1. Anonymity lowers the cost of objecting | P06 wanted anonymous voting. P05 said it would feel different if *the app* asked for a review instead of a housemate. P01 stayed quiet over snacks rather than “look too serious about a few dollars.” Other participants said that a system-raised review could feel less personal, but also worried about repeated anonymous rejection. | **Held, with structure.** Anonymity can lower the interpersonal cost of objecting, but it needs a reason, a visible effect and a limited review loop. |
| 2. Same-room beats async | P01: “We never sit together to calculate it.” P02 gets a Messenger demand for $30 they cannot place. P03’s numbers arrive as WeChat screenshots and someone else’s maths. P06 already likes a Sunday-night rhythm. One additional participant said that being together while using separate phones still preserved privacy. | **Held, with a stronger distinction.** The design is not “everyone talks about every item.” It is synchronous co-location with private individual input. |
| 3. Chores can replace cash | Informal trades exist (P01, P02, P05). P03 and P04 pushed back: putting a dollar value on cleaning would start a *second* fight. One additional participant said chore barter might work for small amounts if everyone agrees; another preferred it to remain optional. | **Softened.** Bounty or chore trades stay optional. The house must accept the trade. We do not automatically price labour. |
| 4. Awkwardness, not arithmetic | P04: Splitwise records payments; “the difficult part happens before entering the expense.” P03: people accept small unfairness because exact calculation is also annoying. Other interview accounts described accepting small losses to avoid tension; one participant summarised this as: “The social cost feels bigger than the money.” | **Held.** This is now the core problem statement rather than an initial hunch. |

The delta that matters is that we started by treating chores as a cute equivalent to money.

The interviews pushed us toward a different principle:

**peace can matter more than perfect numerical fairness, and pricing labour can create a second negotiation problem.**

The concept therefore shifted from:

**“pay with chores”**

to:

**“propose a trade, let the household decide whether it is acceptable.”**

We also dropped the early campus story — thrift pins, ambient save-badges and checkout cooling-off.

Those concepts were about students-as-students.

The interviews kept pointing back to the household receipt.

---

## What the survey added

The interviews gave us depth. The survey helped us check whether several of the same patterns appeared across a broader set of shared-living experiences.

We analysed **35 responses**.

### Assumption 1 — Anonymous review may reduce the barrier to objecting

When asked whether anonymous flagging would make them more likely to challenge an unfair item:

- 9 said **Yes, definitely**
- 19 said **Maybe, depending on the item**
- 5 said it would still feel awkward
- 2 preferred direct confrontation

This means **28 of 35 respondents (80.0%)** were positively or conditionally positive about anonymous flagging.

However, only **25.7%** selected “Yes, definitely.”

**What this changed:** anonymity stayed in the design, but not as a blanket interaction model. It is used specifically in the Review stage and paired with structured reasons and visible recalculation.

---

### Assumption 2 — A short weekly settlement ritual is acceptable

Respondents were asked whether a designated 10-minute weekly settlement session would make shared-expense management more or less stressful.

- Much less stressful: 22
- Slightly less stressful: 12
- No difference: 1

This means **34 of 35 respondents (97.1%)** believed the session would be less stressful.

**What this changed:** the synchronous weekly ritual moved from an interesting concept to a strongly supported interaction direction.

Importantly, the interviews clarified that co-location should not mean public verbal confrontation.

The household can be together while sensitive input remains private.

---

### Assumption 3 — Chore barter has interest, but not enough clarity for the core MVP

Among valid responses to the chore-compensation question:

- 18 said they would use it often;
- 11 said they would use it for small amounts;
- 5 said no.

This means **29 of 34 respondents (85.3%)** were at least open to chore-based compensation.

However, the interviews consistently raised a second issue: different people value household labour differently.

**What this changed:** the survey showed interest, but the interviews exposed the negotiation risk. Chore barter therefore remains a future or optional feature rather than a core settlement mechanism.

---

### Assumption 4 — The problem is social as well as mathematical

Several survey results supported this assumption.

**71.4%** rated their awkwardness or anxiety when asking housemates for repayment at **4 or 5 out of 5**.

When a shared bill felt slightly unfair:

- 15 spoke up immediately;
- 16 preferred to text later;
- 4 paid and said nothing.

Combined, **20 of 35 respondents (57.1%)** avoided immediate face-to-face negotiation.

Meanwhile, **29 of 35 respondents (82.9%)** said they at least occasionally pay an equal share even when they consumed significantly less.

This suggests that people may knowingly accept an imperfect split because the interpersonal cost of challenging it feels too high.

**What this changed:** the project stopped treating “fairness” as a calculation problem and focused instead on how disagreement can be expressed safely.

---

## A new assumption that emerged: private proportional input is viable

The proportional slider was not one of our original four bets.

It emerged as the concept became more specific.

Respondents were asked how comfortable they would be using a private digital slider to indicate their own consumption for a shared item.

- Rating 5: 11
- Rating 4: 21
- Rating 3: 2
- Rating 2: 1
- Rating 1: 0

This means **32 of 35 respondents (91.4%)** rated their comfort at **4 or 5 out of 5**.

The mean rating was **4.20 / 5**.

The interview accounts supported the same direction: participants were more comfortable estimating their own consumption privately than directly telling another housemate that they had consumed more.

**Design consequence:** Proportional Claim became a core interaction rather than a speculative extra.

---

## Evidence we have

Our current evidence base includes:

- **17 semi-structured problem interviews**
- **four screen-led prototype interviews**
- **35 survey responses**
- recurring evidence that equal splitting is often accepted despite unequal consumption;
- evidence that people delay or avoid direct confrontation;
- strong support for a short weekly settlement session;
- strong comfort with private proportional input;
- conditional support for anonymous review;
- mixed evidence on chore barter;
- critique of Splitwise, group-chat screenshots, Messenger, WeChat and PayID;
- a playable mid-fi ritual plus visual flows in [`Ruize Ma/`](https://github.com/MaloneWayne/Deco3500-Team-17/tree/main/Ruize%20Ma);
- survey analysis and charts in [`Chloe/Survey`](https://github.com/MaloneWayne/Deco3500-Team-17/tree/main/Chloe/Survey).

Across these sources, the strongest recurring pattern is:

**the difficult part happens before the payment request — when the household has to decide what counts as shared, who used it, and whether the split feels fair.**

---

## Evidence we still need

The problem interviews are recall, the survey measures stated attitudes, and the prototype interviews were screen-led walkthroughs rather than complete household sessions.

Neither is the same as watching a household complete the ritual in context.

The prototype interviews identified concerns about guessable vetoes, timed confrontation, strategic slider input, chore valuation and the unfairness of the Orphan Item Penalty Game. We have not yet sat in a St Lucia kitchen with a real Woolworths or Coles receipt and observed:

- whether participants actually use anonymous review;
- whether someone still asks “who pressed veto?”;
- whether the proportional slider is interpreted consistently;
- whether private input genuinely reduces social pressure;
- whether the weekly ritual remains comfortable when a real disagreement occurs;
- whether the review loop feels transparent rather than frustrating.

That is the next test, not a claim we can make today.

The next evaluation should therefore be a **co-located multi-user session using a real or realistic household receipt**, followed by short interviews about comfort, fairness, clarity and trust.
