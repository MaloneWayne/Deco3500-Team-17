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

## What you can do

The prototype is not a poster. The core loop runs.

1. **Receipt draft.** Each item lands on every phone. Swipe right to claim, left to pass. If three people claim the cheese, it splits three ways. If one claims it, they pay it.
2. **Orphan spinner.** If nobody claims the cleaner, it becomes an orphan. A ten-second wheel picks who pays or who does the chore.
3. **Anonymous veto.** Before lock, each person taps “Looks fair” or “Play veto card.” The app never names who vetoed. Screens go red. The house reviews the heavy items.
4. **Blind review.** Luxury items: communal or personal. Shared food: a fairness slider (nibble / average / feral). Personal items go to whoever put them in the cart.
5. **Bounty cards.** If you still owe, you can trade chores for dollars. The others accept or reject on their phones.
6. **Lock.** The house sees who pays whom.

You can play all four seats on one device. That is for demo. The intended use is four phones at one table.

## How good design practice shows up

**The system takes the heat.** HCI for this problem is not prettier charts. It is moving the accusation off the human. The veto flash is ugly on purpose. It occupies the room so nobody starts a witch hunt.

**Same item, same time.** Splitwise is async. We deal the receipt like a deck so the house stays in one beat.

**Anonymity is for input, not for geography.** People sit together. Votes stay on-device. That hybrid is the point.

**Labour is money.** Bounty cards and orphan chores refuse the idea that the only fair unit is dollars.

**Progressive commitment.** Claim first. Veto only if the totals still feel wrong. Do not start with a court case.

**No install.** A webpage matches “Sunday, kitchen, now.”

## What is still mid-fi

NPC housemates auto-swipe so a single demo phone can finish the ritual. There is no real OCR of a Woolies receipt, no accounts, no bank payout. The social mechanics are the high-fidelity part. The plumbing is not.
