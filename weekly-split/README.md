# The Weekly Split

**[Open the live website](https://malonewayne.github.io/Deco3500-Team-17/)**

A mobile web prototype for a Sunday sharehouse settlement ritual: receipt draft, pre-lock review with anonymous veto tokens, table talk, blind item vote, the slider of fairness, and house bounty cards. Items nobody claims are split evenly across the house.

## Play together (4 or 5 phones, live)

1. One housemate opens the site and taps **4 people** or **5 people**. That opens a table with a 4-letter room code. This phone is the host.
2. Everyone else opens the site on their own phone, types the code and taps **Join**, or opens the copied invite link (`…/#r=CODE`).
3. Each person taps a free seat. Every phone sees seats fill in live.
4. The host taps **Deal the receipt to every phone**. Swipes, vetoes, the 2-minute table-talk timer, blind votes, bounties and the final bill stay in sync on every phone.
5. Before the bill locks, every seated housemate taps **Ready to lock the bill**.

Empty seats can be played by NPC housemates (**NPC fills empty seats** in the lobby), so one person can still demo the whole ritual.

### How the sync works

- Phones talk through a public MQTT test server over secure websockets: EMQX first, with Mosquitto and HiveMQ as fallbacks. There is no backend to run. The first letter of the room code says which server the table is on.
- The host phone is the referee. It applies every action in order, runs the timers and NPCs, and publishes the table state. The other phones send their taps to it and resend them until the host confirms.
- Veto tokens (3 per housemate per month) are counted only on each person's own phone.
- Veto, review and bounty choices are private. Only the host phone tallies them. Every phone sees **who has answered** and the result, never who chose what.
- If a phone drops out, the others see it marked offline and the host can tap **Let NPC play …**. A refreshed phone gets its seat back.
- If the host phone closes, the next seated phone takes over after about 20 seconds. Open veto, review or bounty votes reopen, because the old host's private tallies left with it.
- Each browser tab is its own phone. To test alone, open the invite link in a second tab or a private window; a duplicated tab copies the identity of the first.

The test servers are public, so the prototype only sends the seeded demo receipt and the fake names. Do not type real data into it.

## Run locally

```bash
npm install
npm run dev
```

The dev server binds to the LAN (`--host`). Other phones on the same Wi-Fi can use `http://YOUR-IP:5173/`. Every phone still needs internet access to reach the sync server.
