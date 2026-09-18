# Design Process Overview

We did not start in a St Lucia kitchen. We started with a wide, fashionable brief: smart campus student budgeting, location frameworks, social maps, ambient thrift. That is a reasonable studio move. It is also how you accidentally design for “university students,” which the assignment told us not to do.

This page is the longer version of how we got from that fog to a ten-minute household ritual.

## Bound the place, then the people

The brief asked for a geographically bound problem. St Lucia, Indooroopilly, and Toowong are easy to name because we actually move through them. The mistake would have been to treat those names as a campus overlay: library desks, cafeterias, QR codes on benches.

Those suburbs are also full of **sharehouses**. Four people, one fridge, one Sunday shop. That is a local community. It is not a student club. Housemates here include workers, partners, and students. The shared condition is the lease.

Once we said that out loud, a lot of our early ideas looked like they were aimed at the wrong unit. A thrift radar wants pedestrians. A cooling-off buddy wants an online checkout. A household split wants a table.

## Use the frameworks as a knife

The six social dimensions were useful when we treated them as a checklist we could fail.

Social objective: not networking. Lower the cost of talking about money.

Social mechanism: not a public board that might fill with spam. A private, simultaneous vote in a room that already exists.

Technology’s role: not GPS pins. A mediator that holds everyone’s screen at once.

People’s contribution: existing Sunday habits, not a new campus behaviour we have to bootstrap.

Consequences: spam was the risk for public notes. For a household, the risks are majority pile-ons, veto trolling, and making debt look like a game.

Assumption: people will contest a bill if the social heat is low enough. We still need a real house to confirm that. The prototype is how we made the assumption testable.

The Social Possibility Wheel stopped us from only drawing maps. Shared objects became the receipt, the bounty card, the house pool. Awareness became seeing other people’s claims land without a speech. Traces became the locked bill: who paid whom, item by item.

## Kill concepts in public

We put three concepts on a matrix so we could compare them in the same language.

Campus Thrift Radar is a location product. It needs daily mobility and faith that people will tag a deal in under ten seconds. It also needs “student” as the identity. Out.

Cooling-off Buddy is a good idea for impulse shopping. It assumes a trusted pair and a five-minute delay. It does not settle last week’s groceries. Out, for this brief.

Budget Quest was the parent of what we shipped. Shared dashboard, shared goal, gamified pool. The weakness was async logging. If the house is already in the kitchen, do not send them away to type.

The Weekly Split is Budget Quest pulled into the room. Same shared object (the receipt). Same social fear (awkwardness). Different timing: synchronous, colocated, ten minutes.

## Prototype the fight, not the branding

A mid-fi prototype in this project had to do one job: **run the conflict**.

Claim/pass is the polite version of “I didn’t eat that.” The orphan wheel is what happens when politeness fails. The veto is for the person who still feels ripped off after the swipes. The review is a blind reclassification, not a debate. The slider is for pizza, where “personal vs communal” is the wrong question. The bounty card is for weeks when cash is the wrong currency.

We implemented those moves in a mobile web app so a demonstrator can press through them without installing Xcode. That matches the submission rule: simple to run.

Building it changed the design. On paper, “everyone swipes at once” is a sentence. In the interface, you feel the wait for the fourth person. You see why a toast that says “3 claimed · $4.00 each” matters. You see why the veto screen must not list names.

## Stay honest about evidence

We used AI to build faster. We did not use it to invent users. There is no fabricated interview in this wiki. The strongest current evidence is (1) how existing apps fail the conversation, (2) how the local housing pattern produces Sunday splits, and (3) a prototype that makes the proposed social move playable.

The next method is obvious and still undone: sit with a real house, use a real receipt, watch whether anyone asks who vetoed. Until that night happens, we understand the problem well enough to argue, not well enough to stop listening.

## What we would protect if time got short

If we had to throw things overboard, we would keep the colocated rule, the anonymous veto, and the item-level claim. We would drop OCR, bank payouts, and campus features. Those are how, not what.

The what is small: a St Lucia kitchen, a receipt, and a way to be unfairly charged without having to become the unkind one.

*(About 1,050 words.)*
