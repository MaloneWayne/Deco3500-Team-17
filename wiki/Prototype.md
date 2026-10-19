# Prototype

**The Weekly Split** is a mid-fi mobile web ritual. Two to eight housemates. One receipt. About ten minutes. No extra software. The brief asked for a link that runs without installing anything. This is that link.

**Open the prototype:** [https://malonewayne.github.io/Deco3500-Team-17/](https://malonewayne.github.io/Deco3500-Team-17/)

If that 404s, the repo owner still needs to turn on GitHub Pages. Local fallback (still no extra app store install):

```bash
cd weekly-split
npm install
npm run dev
```

Then open `http://localhost:5173/`.

Code: [`weekly-split/`](https://github.com/MaloneWayne/Deco3500-Team-17/tree/main/weekly-split)  
Screen flows: [`Ruize Ma/`](https://github.com/MaloneWayne/Deco3500-Team-17/tree/main/Ruize%20Ma) (home, receipt, claim/pass, item result, review/veto, lock)

## What you can do

The prototype is not a poster. The core loop runs.

0. **Create a receipt.** Before anyone claims anything, the house writes the receipt up together. Any seated housemate can enter the receipt name, add each item's name and price, and edit or remove items while the running total updates on every phone. There is no "who paid?" question: whoever adds an item is tagged as having paid for that item in full, so a week where several people shopped still works. The summary line shows how much each person paid. Every item counts as shared; there is no separate "shared food" option. **Start splitting** hands the list to the claim/pass round. For test sessions, **Fill in the sample receipt instead** loads the seven-item demo week, with items added (and paid) by A, B, C and D. Seats are lettered A–H rather than given made-up names. *(Team decision after the latest group discussion: the house needs to enter its own items, not only play a seeded receipt.)*
1. **Receipt draft.** Each item lands on every phone. A progress bar shows the receipt name and "Item 4 of 7." Swipe right or tap the green ✓ to claim, swipe left or tap the red ✕ to pass. The card shows how many housemates claimed it, with their avatars. If three people claim the cheese, it splits three ways. If one claims it, they pay it. If **nobody** claims an item (the cleaner, usually), it is split evenly across the whole house. *(R3, R6: item-level, not only a house total.)*
2. **Pre-lock review and anonymous veto.** Before lock, every phone shows the household total next to your share, the bill by category, and everyone's share. Each person taps **Looks Fair** or **Play Veto Card (Anonymous)**. Each housemate has **3 veto tokens a month**. They are counted only on their own phone, so spending one never tells the table who vetoed. *(R1, R5. P05: let the app say the item needs review.)*
3. **Veto played · table talk.** If anyone vetoes, every phone turns red: "VETO PLAYED! The house demands a review of the heavy hitters." A 2-minute Table Talk countdown runs over the contested items, each flagged REVIEW. The contested items are the three most expensive on the receipt. The house can discuss, or everyone taps **Proceed to the slider** to skip ahead.
4. **The slider of fairness.** Each contested item comes back one at a time. Every housemate drags a slider anywhere from 0% to 100% for how much of it they used. The screen shows the percent, a word for it (None of it, Just a Nibble, Average, Hungry, Feral) and the dollar share, then **Lock My Portion**. "Votes in: 3/4" counts answers without naming them, and all shares are revealed together. Percents are rescaled so the item still adds up to its price; if everyone picks 0%, it is split evenly. *(R6. This is P04’s milk problem: the protein can land almost entirely on the one person who used it, without anyone saying so out loud.)*
5. **House bounty.** If you still owe, you can play a bounty card: a first-person offer such as "I will take out all the bins and sort recycling for the next 2 weeks to offset $10 of my debt." The others tap **Accept Trade** or **Decline Trade** in secret; only the tally is shown. *(R7. Interviews said informal trades work; priced chores start a second fight.)*
6. **Lock.** When everyone taps **Ready to lock the bill**, the house sees who pays whom, and the item maths stays visible. The transfers work like a small ledger: everyone who used an item owes its share to the person who added it, and the debts between each pair are offset so money only moves one way. If A owes B $5 and B owes A $10, B pays A $5 and nothing else. A **Detail** button at the bottom opens your own bill: your share item by item (with who paid each one), what you already paid at the shop, then the list of people you pay and how much, with the offset shown. It lists only what *you* send, so a housemate who owes nothing after offsetting sees no line for that person. *(R2, P06: explain the result.)*

**What we cut: the orphan spinner.** Earlier versions spun a ten-second wheel to decide who paid for an unclaimed item. Participants in the prototype interviews consistently called it unfair for shared essentials ([Methods](Methods.md)), so the group removed it. Unclaimed items are now split evenly; nobody is singled out by chance.

**What we cut: the communal/personal vote and the three-stop slider.** After team testing, the group dropped the blind Communal/Personal vote and the separate "shared food" tag. A free 0–100% slider can already express "all mine" (100%), "not mine at all" (0%) and everything in between, so a second voting mechanic only added a choice people had to learn. The three fixed stops (10% / 25% / 50%) became one draggable slider for the same reason.

### Concept screens

The team drew the target screens with AI image tools. The prototype now follows them, using the existing paper-and-ink colours.

| | | |
| --- | --- | --- |
| ![Receipt draft](images/concept/01-receipt-draft.jpg) | ![Pre-lock review](images/concept/02-pre-lock-review.jpg) | ![Veto played](images/concept/03-veto-played.jpg) |
| Receipt Draft | Pre-Lock Review | Veto Played · Table Talk |
| ![Blind item vote](images/concept/04-blind-item-vote.jpg) | ![Slider of fairness](images/concept/05-slider-of-fairness.jpg) | ![House bounty](images/concept/06-house-bounty.jpg) |
| Blind Item Vote | The Slider of Fairness | House Bounty Proposal |

Three places where the build differs from the drawings on purpose. The Blind Item Vote screen was cut (see above): every contested item now goes to the slider. The bounty screen shows how many votes are in during voting, not how many accepted, so early votes cannot be guessed. The concept's rent and utilities rows are replaced by the receipt the house entered and any unclaimed items.

**Live table, one phone each.** One housemate sets how many people live in the house (2–8) and opens a table, then shares a 4-letter code. Everyone else joins on their own phone and takes a seat. From then on the receipt entry, the swipes, the veto, the table-talk timer, the review slider, the bounties and the final bill stay in sync on every phone. The host phone acts as referee. Veto, review and bounty choices go only to its private tally, so the table learns *that* a veto was played but never *who* played it. *(C7. In Test-P1 and Test-P2 both participants asked who had vetoed, so the veto screen now also says in one line that nobody is named.)* If a phone drops, the host can hand that seat to an NPC. If the host phone closes, the next phone takes over. Empty seats can still be NPC for a solo demo.

## How good design practice shows up

**The system takes the heat.** HCI for this problem is not prettier charts. It is moving the accusation off the human. P04 already felt like an accuser for naming protein powder. The red veto screen is loud on purpose. It gives the room a two-minute script — talk about the items, not the person — so nobody starts a witch hunt.

**Same item, same time.** Splitwise is async. P01 never sits together to calculate. We deal the receipt like a deck so the house stays in one beat.

**Anonymity is for input, not for geography.** People sit together. Votes stay on-device. P06 wanted both: hide the voter, show the outcome.

**Labour is money, but only if the house says yes.** Bounty cards refuse “dollars only.” They also refuse a silent conversion of the poorest housemate into unpaid cleaner.

**Progressive commitment.** Claim first. Veto only if the totals still feel wrong. Do not start with a court case.

**No install.** A webpage matches “Sunday, kitchen, now” (P06 already treats Sunday as the settle night).

**Visual + playable.** The Ruize Ma screens show the social beat (claim, result, veto, lock). The web app has to do the maths. Both are the prototype. One is how it should feel. One is how it actually runs.

## What is still mid-fi

NPC housemates auto-swipe so a single demo phone can finish the ritual. Items are typed in by hand: there is no OCR of a Woolies receipt, no accounts, no bank payout. One receipt per round; each item is paid by whoever added it, so nobody can enter an item on someone else's behalf. Sync runs through a free public test server, so the receipt screen asks for made-up items, and the seats use fake names. The social mechanics are the high-fidelity part. The plumbing is not.

How to test this with real housemates: [Testing Plan](Testing-Plan.md).
