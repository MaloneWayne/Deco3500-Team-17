# Prototype

**The Weekly Split** is a mid-fi mobile web ritual. Four housemates. One receipt. About ten minutes. No extra software. The brief asked for a link that runs without installing anything. This is that link.

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

1. **Receipt draft.** Each item lands on every phone. Swipe right to claim, left to pass. If three people claim the cheese, it splits three ways. If one claims it, they pay it. *(R3, R6: item-level, not only a house total.)*
2. **Orphan spinner.** If nobody claims the cleaner, it becomes an orphan. A ten-second wheel picks who pays or who does the chore. Houses already use chance here (P01’s rock-paper-scissors; P03’s air-con wheel joke).
3. **Anonymous veto.** Before lock, each person taps “Looks fair” or “Play veto card.” The app never names who vetoed. Screens go red. The house reviews the heavy items. *(R1, R5. P05: let the app say the item needs review.)*
4. **Blind review.** Luxury items: communal or personal. Shared food: a fairness slider (nibble / average / feral). Personal items go to whoever put them in the cart. *(R6. This is P04’s milk problem.)*
5. **Bounty cards.** If you still owe, you can *propose* a chore trade. The others accept or reject on their phones. *(R7. Interviews said informal trades work; priced chores start a second fight.)*
6. **Lock.** The house sees who pays whom, and the item maths stays visible. *(R2, P06: explain the result.)*

You can play all four seats on one device. That is for demo. The intended use is four phones at one table.

## How good design practice shows up

**The system takes the heat.** HCI for this problem is not prettier charts. It is moving the accusation off the human. P04 already felt like an accuser for naming protein powder. The veto flash is ugly on purpose. It occupies the room so nobody starts a witch hunt.

**Same item, same time.** Splitwise is async. P01 never sits together to calculate. We deal the receipt like a deck so the house stays in one beat.

**Anonymity is for input, not for geography.** People sit together. Votes stay on-device. P06 wanted both: hide the voter, show the outcome.

**Labour is money, but only if the house says yes.** Bounty cards refuse “dollars only.” They also refuse a silent conversion of the poorest housemate into unpaid cleaner.

**Progressive commitment.** Claim first. Veto only if the totals still feel wrong. Do not start with a court case.

**No install.** A webpage matches “Sunday, kitchen, now” (P06 already treats Sunday as the settle night).

**Visual + playable.** The Ruize Ma screens show the social beat (claim, result, veto, lock). The web app has to do the maths. Both are the prototype. One is how it should feel. One is how it actually runs.

## What is still mid-fi

NPC housemates auto-swipe so a single demo phone can finish the ritual. There is no real OCR of a Woolies receipt, no accounts, no bank payout. The social mechanics are the high-fidelity part. The plumbing is not.
