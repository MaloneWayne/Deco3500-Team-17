# Literature Review: Supporting Fair Expense Negotiation in Shared Households

**Wanxing He - Team 17 - The Weekly Split**

## Scope and search approach

This targeted literature review examines how HCI and CSCW research can inform **The Weekly Split**, a co-located mobile experience for negotiating shared household expenses. The search prioritised peer-reviewed work published by the Association for Computing Machinery (ACM). Search terms included *digital money*, *personal finance*, *household coordination*, *shared household labour*, *social payment*, and *collocated mobile interaction*. Seven papers were selected because they address at least one part of the design problem: the social meaning of money, household coordination, privacy and awareness, or technology-mediated negotiation.

This is a focused design review rather than a systematic review. The selected literature is used to identify relevant design principles and research gaps, not to claim that the current prototype has already been validated.

## Literature overview

| Study | Context and method | Key contribution | Relevance to The Weekly Split |
| --- | --- | --- | --- |
| Lewis and Perry (2019) | Longitudinal study of everyday financial activity, including transaction tracking and interviews | Digital financial tools must fit existing practices and make financial data understandable and trustworthy | Supports visible item-level calculations and explanations rather than presenting only a final debt |
| Caraway et al. (2017) | Interviews with 14 Venmo users and surveys involving peer-to-peer payment users | Financial transactions can perform social and relational work, not only transfer money | Supports treating settlement as a social interaction while warning against unnecessary exposure of sensitive financial activity |
| Sannon et al. (2020) | Interviews and guided information-archive tours with members of ten families | Household information management involves substantial coordination and socioemotional labour | Supports reducing the burden placed on the person who currently collects receipts, calculates shares, and reminds others to pay |
| Sohn et al. (2012) | Three-week diary study with eight households | Household cooperation depends on awareness of other members' availability, capability, and circumstances | Supports shared progress awareness and optional chore proposals, but suggests that tasks should not be assigned without contextual agreement |
| Lundgren et al. (2015) | Synthesis of collocated mobile systems into a design framework | Collocated experiences must align the social situation, interaction mechanics, physical setting, and timing | Directly supports the project's same-room, Sunday-settlement ritual rather than another asynchronous payment feed |
| Jarusriboonchai et al. (2016) | Ten-day field trial with 13 participants using a mobile social display | Carefully designed cues can increase awareness among co-present people without necessarily destroying privacy | Supports private individual input combined with limited, shared status information |
| Bae et al. (2025) | Ten-day study with six cohabiting couples using diaries and probes | Domestic collaboration is relational and value-laden; efficiency-focused tools can overlook recognition, emotion, and negotiation | Supports framing chore trades and settlement as negotiated household practices rather than automatic optimisation |

## Money management is a social practice

Much financial technology is designed around accuracy, speed, and record keeping. Lewis and Perry (2019), however, show that digital money is embedded in everyday routines and that users must be able to interpret and trust what a financial system records. This is directly relevant to The Weekly Split. A final message such as “you owe $30” may be mathematically correct while remaining socially unsatisfactory if users cannot see which items produced that amount. The prototype should therefore preserve an inspectable trail from receipt item, to claim or proportion, to final settlement.

Caraway et al. (2017) further demonstrate that peer-to-peer payments have a relational layer. Venmo users adjusted transaction descriptions according to the relationship and sometimes used playful language with friends. Financial interaction between housemates is therefore not socially neutral. Interface tone, visibility, and timing can affect how a payment request is interpreted. For The Weekly Split, playfulness may reduce the formality of settlement, but a public social feed would expose more information than the task requires. The project should use playful interaction locally and temporarily while keeping detailed household transactions private.

Together, these studies support the project's central claim: shared-expense technology should not only calculate debt. It should help people understand and socially manage how the debt was produced.

## Household coordination includes invisible and emotional work

Sannon et al. (2020) describe family information management as an important form of household labour. Bills, documents, schedules, and reminders are distributed across people and tools, and managing them can create socioemotional costs. Although their participants were families rather than sharehouses, the finding exposes a similar risk in shared-expense routines: one housemate may become the unpaid administrator who photographs receipts, calculates shares, answers questions, and repeatedly asks others to pay.

The Weekly Split can reduce this concentration of work by distributing classification across the household. Each person claims or passes items, while the system performs the arithmetic and displays progress. However, automation should not hide responsibility. Participants still need to understand the result and be able to question it.

Sohn et al. (2012) found that cooperation around household errands depended on members' location, availability, capability, and circumstances. This challenges any automatic conversion between money and chores. A chore that is easy for one housemate may be difficult or inappropriate for another. The project's bounty feature should therefore remain a proposal that other members can accept or reject. The system can make an opportunity visible, but it should not decide the value or fairness of domestic labour on behalf of the household.

Bae et al. (2025) similarly argue that domestic collaboration cannot be treated as workplace task allocation. Their study highlights recognition, household values, emotion, and negotiation. This strengthens the decision to avoid presenting The Weekly Split as a purely efficient expense calculator. It also warns that gamified chores could intensify unfairness if they reward visible tasks while ignoring planning, shopping, or other less visible contributions.

## Co-located interaction: private action and shared awareness

The project's main interaction is intentionally synchronous and co-located: housemates sit together but enter choices on separate phones. Lundgren et al. (2015) provide a useful framework for analysing this design. They argue that a collocated mobile experience should be considered through the relationship among the social situation, technological mechanics, physical environment, and time. Applied to The Weekly Split:

- the **social situation** is an existing relationship among housemates, not a group of strangers;
- the **mechanics** include private claim/pass choices, proportional input, review, and settlement;
- the **physical environment** is the shared home, ideally around the same table;
- the **temporal structure** is a short and predictable weekly session rather than unexpected payment notifications.

Jarusriboonchai et al. (2016) show that mobile interfaces can provide lightweight awareness to co-present people while retaining a meaningful degree of privacy. The specific display they studied differs from The Weekly Split, but the principle is useful: systems can reveal that activity is occurring without exposing all personal detail. In the prototype, the group can see that all four housemates have responded, while an individual's exact choice or veto identity can remain hidden.

This privacy-awareness balance provides a stronger justification for the interface than anonymity alone. The reviewed studies do not prove that an anonymous veto will always reduce conflict. Anonymous input may also create suspicion or repeated obstruction. The veto should therefore be treated as a testable design hypothesis, supported by a visible reason for review, a limited review loop, and transparent recalculation.

## Research gap and design opportunity

Within the reviewed literature, personal financial management, social payment feeds, family information management, household cooperation, and collocated mobile interaction have all received attention. Less attention is given to the moment when **non-family co-residents negotiate whether individual grocery or takeaway items should be shared, personal, or proportional**.

The Weekly Split explores this gap by combining:

1. item-level financial transparency;
2. private individual expression;
3. shared awareness of group progress;
4. a synchronous, co-located settlement ritual; and
5. a mediated process for reviewing disagreement.

Its novelty does not come from calculating a split more efficiently than existing apps. It comes from treating fairness as a socially negotiated outcome and designing the interaction around the interpersonal cost of speaking up.

## Implications for the next prototype evaluation

The literature suggests that the next evaluation should test the full social interaction, not only whether participants can operate the interface. A co-located session with three or four housemates and a realistic receipt should examine:

- whether item-level explanations make the result understandable;
- whether private input makes disagreement easier to express;
- whether participants trust an anonymous veto and the recalculation that follows;
- whether the shared progress display creates useful awareness or pressure;
- whether the weekly ritual feels preferable to asynchronous group-chat requests;
- whether chore proposals feel flexible, coercive, or unfair; and
- whether playful mechanics reduce tension without trivialising financial stress.

These questions keep the evaluation aligned with the literature and with the project's actual design claim: improving the experience of negotiating fairness, rather than merely producing a correct total.

## References

Bae, G., Park, S. K., Kim, T., & Hong, H. (2025). Exploring design spaces to facilitate household collaboration for cohabiting couples. In *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems* (Article 166, pp. 1-16). Association for Computing Machinery. https://doi.org/10.1145/3706598.3713383

Caraway, M., Epstein, D. A., & Munson, S. A. (2017). Friends don't need receipts: The curious case of social awareness streams in the mobile payment app Venmo. *Proceedings of the ACM on Human-Computer Interaction, 1*(CSCW), Article 28, 1-17. https://doi.org/10.1145/3134663

Jarusriboonchai, P., Malapaschas, A., Olsson, T., & Väänänen, K. (2016). Increasing collocated people's awareness of the mobile user's activities: A field trial of social displays. In *Proceedings of the 19th ACM Conference on Computer-Supported Cooperative Work & Social Computing*. Association for Computing Machinery. https://doi.org/10.1145/2818048.2819990

Lewis, M., & Perry, M. (2019). Follow the money: Managing personal finance digitally. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (Paper 390, pp. 1-14). Association for Computing Machinery. https://doi.org/10.1145/3290605.3300620

Lundgren, S., Fischer, J. E., Reeves, S., & Torgersson, O. (2015). Designing mobile experiences for collocated interaction. In *Proceedings of the 18th ACM Conference on Computer Supported Cooperative Work & Social Computing* (pp. 496-507). Association for Computing Machinery. https://doi.org/10.1145/2675133.2675171

Sannon, S., Vorvoreanu, M., Walker, K., & Fourney, A. (2020). “Am I doing this all wrong?” Challenges and opportunities in family information management. *Proceedings of the ACM on Human-Computer Interaction, 4*(CSCW2), Article 138, 1-28. https://doi.org/10.1145/3415209

Sohn, T., Lee, L. L., Zhang, S. M., Dearman, D., & Truong, K. N. (2012). An examination of how households share and coordinate the completion of errands. In *Proceedings of the ACM 2012 Conference on Computer Supported Cooperative Work* (pp. 729-738). Association for Computing Machinery. https://doi.org/10.1145/2145204.2145315
