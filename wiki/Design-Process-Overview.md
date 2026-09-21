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

Assumption: people will contest a bill if the social heat is low enough. Interviews later supported that, with a catch: people also want to see the maths.

The Social Possibility Wheel stopped us from only drawing maps. Shared objects became the receipt, the bounty card, the house pool. Awareness became seeing other people’s claims land without a speech. Traces became the locked bill: who paid whom, item by item.

## Ask, then kill concepts in public

We put three concepts on a matrix so we could compare them in the same language: Campus Thrift Radar, Budget Quest, Cooling-off Buddy.

Then we conducted 17 problem interviews with people who already split household costs. The transcripts are in the repo. We did not invent them.

They kept describing the same night: someone pays, someone screenshots, someone stays quiet. P01 did not want to look serious about a few dollars. P04 did speak up about protein powder and felt like an accuser. P05 said it would feel different if the *app* asked for a review. P06 wanted a vote that does not embarrass anyone, and a result they can read.

That is not a campus map. That is a kitchen.

Thrift Radar went out: it needs students-as-students and daily tagging. Cooling-off Buddy went out: impulse shopping is the wrong moment. Budget Quest was the parent of what we shipped, but async logging fights the fact that the house is already in the room.

The Weekly Split is Budget Quest pulled onto the table. Same shared object (the receipt). Same social fear (awkwardness). Different timing: synchronous, colocated, ten minutes.

One assumption broke in a useful way. We had treated chores as a cute currency. P03 and P04 said pricing labour would start a second argument. Informal trades already happen. So bounty cards stayed, but only as a proposal the others can reject.

## Prototype the fight, not the branding

A mid-fi prototype in this project had to do one job: **run the conflict**.

Claim/pass is the polite version of “I didn’t eat that.” The orphan wheel is what happens when politeness fails — and houses already use rock-paper-scissors and joke wheels for that. The veto is for the person who still feels ripped off after the swipes. The review is a blind reclassification, not a debate. The slider is for pizza, where “personal vs communal” is the wrong question. The bounty card is for weeks when cash is the wrong currency.

We implemented those moves in a mobile web app so a demonstrator can press through them without installing Xcode. Visual screens sit next to that code so the social beat is readable without a laptop. That matches the submission rule: simple to run.

Building it changed the design. On paper, “everyone swipes at once” is a sentence. In the interface, you feel the wait for the fourth person. You see why a toast that says “3 claimed · $4.00 each” matters. You see why the veto screen must not list names.

## Stay honest about evidence

We used AI to build faster. We did not use it to invent users. The interview file is a teammate’s work. The quotes in this wiki come from there.

What we can claim: existing apps often leave the fairness conversation to housemates; 17 problem interviews repeatedly described silence, unclear payment requests and uneven consumption; four prototype interviews showed that the core flow is understandable while also exposing risks in guessable vetoes, timed confrontation, chore valuation and the orphan spinner.

What we cannot claim: we have watched a house that is not us finish this ritual. That night is still ahead.

## What we would protect if time got short

If we had to throw things overboard, we would keep the colocated rule, the anonymous veto, the visible maths, and the item-level claim. We would drop OCR, bank payouts, and campus features. Those are how, not what.

The what is small: a St Lucia kitchen, a receipt, and a way to be unfairly charged without having to become the unkind one.

If this pitch has a personality, it is that sentence. We would rather be accused of designing something small than of decorating a campus.
