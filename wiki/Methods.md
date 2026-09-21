# Methods

HCI methods have to match the claim. Our claim is social, not statistical: **the split is painful because of face, not because people cannot add**.

We therefore used qualitative methods to understand how people negotiate shared expenses, and a survey to check whether the patterns emerging from interviews also appeared across a broader set of shared-living experiences.

## What we used

### Semi-structured interviews (n = 17)

We conducted 17 semi-structured interviews with people who already share household expenses.

The interviews used a consistent set of prompts around:

- a time they paid for something they did not use;
- how the household currently settles shared expenses;
- what happens when consumption differs;
- whether non-monetary trades such as chores ever stand in for cash;
- whether humour, anonymity, games or a neutral tool can reduce tension.

The interview set was collected across the team. It covers existing settlement routines, confrontation avoidance, unequal consumption, private proportional input, co-located settlement, anonymous review, chore-based contributions and playful mediation.

We did not fish for campus stories. Participants were people already living in shared households, including sharehouses and university accommodation. Several study, but the **unit of analysis was the household**, not “the university student” as an abstract category.

Raw and summarised interview material is available in the repo:

- Rize Ma: [`Interview Transcript 01.docx`](../Ruize%20Ma/Interview%20Transcript%2001.docx) (P01-P06) and [`interview-findings.md`](../Ruize%20Ma/interview-findings.md)
- Chloe: [`Interview`](../Chloe/Interview/) (two transcripts and analysis)
- Pengxiao Yang: [`Interview/README.md`](../Pengxiao%20Yang/Interview/README.md) (four transcripts, protocol and analysis)
- Malone Wang: [`interview transcript1.md`](../Malone%20Wang/md%20type/interview%20transcript1.md), [`interview transcript2.md`](../Malone%20Wang/md%20type/interview%20transcript2.md) and [`Interview analysis.md`](../Malone%20Wang/md%20type/Interview%20analysis.md)
- Wanxing He: [`interview transcript 1`](../Wanxing%20He/interview1/interview_transcript_1.md), [`interview transcript 2`](../Wanxing%20He/interview1/interview_transcript_2.md) and [`interview transcript 3`](../Wanxing%20He/interview1/interview_transcript_3.md)

### Prototype interviews (n = 4)

We also conducted four screen-led prototype interviews. Participants walked through the Receipt Draft, Veto and Review phase, proportional slider, chore proposal and Orphan Item Penalty Game. These sessions tested comprehension and anticipated social consequences; they were not full co-located household trials.

The prototype interviews found that:

- Claim / Pass was easy to understand, but could create pressure when other housemates' choices were visible;
- swiping could postpone disagreement rather than resolve it;
- a veto may not feel anonymous in a three- or four-person household;
- the countdown, majority vote and proportional slider could introduce pressure, pile-ons or strategic under-reporting;
- chore offsets were acceptable only for small amounts with explicit group agreement; and
- participants consistently viewed the Orphan Item Penalty Game as unfair for shared essentials.

Prototype interview material:

- Malone Wang: [`process and questions`](../Malone%20Wang/md%20type/prototype%20interview%20process%20and%20questions.md), [`transcript 1`](../Malone%20Wang/md%20type/prototype%20interview%20transcript1.md), [`transcript 2`](../Malone%20Wang/md%20type/prototype%20interview%20transcript2.md) and [`analysis`](../Malone%20Wang/md%20type/prototype%20interview%20analysis.md)
- Wanxing He: [`prototype interview transcript 1`](../Wanxing%20He/interview2/prototype_interview_transcript_1.md) and [`prototype interview transcript 2`](../Wanxing%20He/interview2/prototype_interview_transcript_2.md)

---

### Survey (n = 35)

We also analysed 35 survey responses about shared living and expense settlement.

The survey was used to explore:

- discomfort when asking housemates for repayment;
- how often equal splitting does not match actual consumption;
- whether people raise unfairness immediately or avoid confrontation;
- attitudes toward a short weekly settlement session;
- willingness to use anonymous review;
- comfort with private proportional input;
- attitudes toward chores as an alternative form of contribution.

The survey was not used to claim that the prototype had already been validated.

Instead, it helped us test whether the interaction directions emerging from the interviews — private input, proportional claiming, synchronous settlement and mediated review — were plausible across a larger set of respondents.

Full analysis and charts are available in:

- [`Chloe / Survey / survey-analysis.md`](https://github.com/MaloneWayne/Deco3500-Team-17/blob/main/Chloe/Survey/survey-analysis.md)

---

### Framework analysis

We ran the six social dimensions on the current direction:

- objective;
- mechanism;
- technology;
- people’s contribution;
- consequences;
- key assumption.

That stopped us from pitching “an app that tracks spending” and forced us to say what social move the system actually makes.

The core shift became:

> The interface does not simply calculate debt. It mediates how fairness is negotiated.

---

### Social Possibility Wheel

We diverged on *shared objects* and *awareness* before we converged.

Shared objects became:

- the receipt;
- the shared item;
- the house pool;
- the disputed item under review.

Awareness became the live claim state across everyone’s phones, without forcing every disagreement into spoken conversation.

This helped move the concept away from a personal budgeting tool and toward a synchronous multi-user experience.

---

### Concept matrix

We explored three concepts using the same four-part split:

- overview;
- mechanism;
- contribution;
- consequences.

The concepts were:

- Campus Thrift Radar — location-based opportunity discovery;
- Budget Quest — shared objects and collective financial interaction;
- Cooling-off Buddy Alert — contextual push and social intervention.

The interviews weakened the first and third directions.

We retained the direction that could be **played in a room**, because the strongest research pattern concerned negotiation between people who already share a household.

---

### Prototyping as inquiry

We built a mid-fi web ritual rather than only documenting flows on paper.

The prototype explored:

- Claim / Pass;
- proportional claiming;
- orphan or unallocated items;
- anonymous review;
- review reasons;
- recalculation;
- bounty / chore ideas;
- final settlement;
- shared completion.

Building the interaction exposed design problems that were less visible in static diagrams.

For example:

- a proportional slider needs rules for totals above or below 100%;
- anonymity needs enough explanation to remain trustworthy;
- review cannot loop forever;
- co-location does not mean every input should be public;
- game-like mechanisms can reduce tension, but should not randomly assign unfair financial responsibility.

---

## What the interviews revealed that the frameworks could not

The frameworks told us *where* to look. The interviews told us *what people already do*.

### Silence is the current “feature”

Across the interviews, participants repeatedly described accepting a slightly unfair split rather than challenging a housemate.

P01, P02, P03, P05 and P06 all described versions of paying and swallowing the difference.

The wider interview set reinforced this pattern. One participant described accepting small grocery differences because questioning every item could make the household uncomfortable. Another summarised the trade-off as:

> “The social cost feels bigger than the money.”

P04 was the rare participant who directly challenged a disputed item, and even then described the interaction as feeling accusatory.

---

### Tools start too late

Splitwise, Messenger, WeChat and bank transfers generally appear **after someone has already decided the split**.

P04 described the difficult work as classifying the item rather than logging the dollar.

The interviews reinforced the same point: participants described receiving payment requests after the calculation had already happened, sometimes without clearly remembering what the amount included.

The design opportunity therefore sits before payment:

**Who consumed this? How much? Is this shared? Does this split feel fair?**

---

### Equal is a social lubricant

Households often split evenly because it is fast and avoids a difficult conversation.

But the memory of unfairness remains.

Examples included:

- P02 paying an extra amount on takeaway;
- P05 arriving late to dinner but still sharing the cost;
- additional interview participants describing shared groceries or takeaway where actual consumption was clearly unequal.

Equal splitting therefore works socially in the short term, but can still accumulate resentment.

---

### Grey items matter more than totals

The recurring problems were not usually arithmetic.

They were classification problems:

- alcohol versus groceries;
- milk used by three people;
- cleaning products bought while someone was away;
- takeaway where people ordered or consumed different amounts;
- shared items where nobody agreed on exact ownership.

The prototype therefore needs more than one split logic.

---

### Co-location does not require public confrontation

The interviews surfaced an important distinction between:

- being physically together;
- having to verbally challenge another person.

One participant said:

> “If everyone is sitting together while using their own phones, that feels different because you still have some privacy.”

This became central to the current interaction model.

The household can complete the settlement together while sensitive inputs remain individual and private.

---

### Humour already mediates

Participants already use lightweight external mechanisms to lower tension:

- rock-paper-scissors for toilet paper (P01);
- joking about spinning a wheel for the air-conditioning bill (P03);
- random-choice apps (P04).

This means playful mediation is not something we invented in a vacuum.

However, the research also pushed us away from using randomness to decide meaningful financial responsibility.

Game-like elements may support rhythm, progress and tension relief, but should not punish the person with less money or assign costs unfairly.

---

### Anonymity needs structure

P06 wanted a vote that does not embarrass anyone, but also wanted a clear explanation of the result.

The interviews strengthened this concern.

Participants were open to anonymous review, but raised the risk that someone could repeatedly reject an item without explanation.

Our response was:

**hide the person, but show the reason and the maths.**

Anonymous review therefore needs:

- a structured reason;
- a visible effect on the item;
- a limited review loop;
- a clear transition into final resolution.

The prototype interviews made the limitation more concrete: in a small household, participants expected people to guess who used the veto, and some felt that a timed discussion or a 3-to-1 vote could increase tension. Anonymous review therefore remains a design hypothesis to refine and test, not a solved problem.

---

## What the survey added

The survey helped us check whether several interview patterns also appeared across a broader sample.

Key results included:

- **82.9%** reported at least occasionally paying an equal share despite consuming significantly less;
- **57.1%** avoided immediate face-to-face negotiation when a shared bill felt unfair;
- **97.1%** believed a designated 10-minute weekly settlement session would be less stressful;
- **91.4%** rated themselves 4 or 5 out of 5 in comfort with a private digital consumption slider;
- **80.0%** said anonymous flagging would definitely or potentially make them more likely to raise an unfair split.

These results did not prove that our prototype works.

They did, however, support the interaction direction:

**private expression → synchronous coordination → mediated review → shared resolution**

---

## Experience requirements we took from that

R1. Raise a concern without naming yourself.  
R2. Show how each total was made.  
R3. Allow more than one split method: equal, item-based, personal and proportional.  
R4. Show which items have been reviewed without exposing who raised the concern.  
R5. Keep confrontation off the human where possible.  
R6. Let the household mark an item shared, personal or in-between.  
R7. Non-money trades need group agreement.  
R8. Game-like mechanisms can cool the room, but must not create unfair financial punishment.  
R9. Allow private individual input inside a synchronous, co-located session.  
R10. Use automation for mathematical inconsistency, but return unresolved social disagreement to the group.

---

## What we did not do (yet)

The four prototype interviews tested feature comprehension and anticipated social effects. We have not yet conducted:

- a diary study;
- direct observation of a live household settlement;
- a full colocated evaluation where an existing household completes the entire ritual using a real receipt.

We also do not treat interview or survey responses as proof that the prototype itself has already succeeded.

The next evaluation method should therefore be a **colocated session with multiple users and a real or realistic shared receipt**, followed by a short interview about:

- whether anyone felt forced to speak;
- whether private input reduced social pressure;
- whether the proportional process was understandable;
- whether anonymous review felt safe and trustworthy;
- whether the session felt better than receiving asynchronous payment requests.

That method matches the claim.
