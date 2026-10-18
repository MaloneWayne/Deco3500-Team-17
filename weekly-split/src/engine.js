import { HOUSEMATES, ITEMS, PAYERS, SEATS } from './data.js'

export function money(n) {
  const v = Math.round((n + Number.EPSILON) * 100) / 100
  return `$${v.toFixed(2)}`
}

export function person(id) {
  return SEATS.find((h) => h.id === id) || HOUSEMATES[0]
}

export function votesOf(votes, itemId) {
  return votes[itemId] || {}
}

export function allVoted(votes, itemId, house = HOUSEMATES) {
  const v = votesOf(votes, itemId)
  return house.every((h) => v[h.id] === 'claim' || v[h.id] === 'pass')
}

export function claimers(votes, itemId, house = HOUSEMATES) {
  const v = votesOf(votes, itemId)
  return house.filter((h) => v[h.id] === 'claim')
}

export function isUnclaimed(votes, itemId, house = HOUSEMATES) {
  return allVoted(votes, itemId, house) && claimers(votes, itemId, house).length === 0
}

export function topExpensive(count = 3) {
  const flagged = ITEMS.filter((item) => item.tag === 'luxury' || item.tag === 'shareable').sort((a, b) => b.price - a.price)
  const rest = ITEMS.filter((item) => item.tag !== 'luxury' && item.tag !== 'shareable').sort((a, b) => b.price - a.price)
  return [...flagged, ...rest].slice(0, count)
}

export function reviewReady(item, reviewVotes, house = HOUSEMATES) {
  const v = reviewVotes[item.id] || {}
  return house.every((h) => v[h.id] !== undefined && v[h.id] !== null)
}

function evenSplit(price, people) {
  if (!people.length) return {}
  const raw = price / people.length
  const shares = {}
  let allocated = 0
  people.forEach((h, i) => {
    if (i === people.length - 1) shares[h.id] = Math.round((price - allocated) * 100) / 100
    else {
      const amt = Math.round(raw * 100) / 100
      shares[h.id] = amt
      allocated += amt
    }
  })
  return shares
}

function sliderSplit(price, weights, house = HOUSEMATES) {
  const entries = house.map((h) => [h.id, Number(weights[h.id] || 0)])
  const total = entries.reduce((s, [, w]) => s + w, 0) || 1
  const shares = {}
  let allocated = 0
  entries.forEach(([id, w], i) => {
    if (i === entries.length - 1) shares[id] = Math.round((price - allocated) * 100) / 100
    else {
      const amt = Math.round((w / total) * price * 100) / 100
      shares[id] = amt
      allocated += amt
    }
  })
  return shares
}

export function resolveReview(item, reviewVotes, house = HOUSEMATES) {
  const v = reviewVotes[item.id] || {}
  if (item.tag === 'shareable') {
    if (!reviewReady(item, reviewVotes, house)) return null
    return { type: 'slider', shares: sliderSplit(item.price, v, house) }
  }
  if (!reviewReady(item, reviewVotes, house)) return null
  const personal = house.filter((h) => v[h.id] === 'personal').length
  const communal = house.filter((h) => v[h.id] === 'communal').length
  if (personal > communal) {
    return { type: 'personal', owner: item.addedBy, tally: { personal, communal } }
  }
  return { type: 'communal', tally: { personal, communal } }
}

/** Nobody claimed it: the whole house shares it evenly. */
export function allocateItem(item, votes, reviewResults, house = HOUSEMATES) {
  const reviewed = reviewResults[item.id]
  if (reviewed?.type === 'slider') return reviewed.shares
  if (reviewed?.type === 'personal') return { [reviewed.owner]: item.price }

  const people = claimers(votes, item.id, house)
  return evenSplit(item.price, people.length ? people : house)
}

function roundMoney(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function applyBounties(shares, bounties, house = HOUSEMATES) {
  const next = { ...shares }
  for (const b of bounties) {
    if (!b.accepted) continue
    const others = house.filter((h) => h.id !== b.from)
    const cut = Math.min(b.amount, next[b.from] || 0)
    next[b.from] = roundMoney((next[b.from] || 0) - cut)
    if (!others.length) continue
    const piece = roundMoney(cut / others.length)
    let given = 0
    others.forEach((h, i) => {
      if (i === others.length - 1) {
        next[h.id] = roundMoney((next[h.id] || 0) + (cut - given))
      } else {
        next[h.id] = roundMoney((next[h.id] || 0) + piece)
        given += piece
      }
    })
  }
  return next
}

export function computeSettlement(votes, reviewResults, bounties, house = HOUSEMATES) {
  const rawShares = Object.fromEntries(house.map((h) => [h.id, 0]))
  const lines = Object.fromEntries(house.map((h) => [h.id, []]))

  for (const item of ITEMS) {
    const alloc = allocateItem(item, votes, reviewResults, house)
    for (const h of house) {
      const amt = alloc[h.id] || 0
      if (amt > 0) {
        rawShares[h.id] += amt
        lines[h.id].push({ item, amount: amt })
      }
    }
  }

  for (const h of house) {
    rawShares[h.id] = Math.round(rawShares[h.id] * 100) / 100
  }

  const shares = applyBounties(rawShares, bounties, house)
  const paid = Object.fromEntries(house.map((h) => [h.id, 0]))
  for (const item of ITEMS) {
    const payer = PAYERS[item.receipt]
    if (paid[payer] === undefined) continue
    paid[payer] += item.price
  }

  const nets = {}
  for (const h of house) {
    nets[h.id] = Math.round((shares[h.id] - paid[h.id]) * 100) / 100
  }

  const debtors = house
    .map((h) => ({ id: h.id, amt: nets[h.id] }))
    .filter((x) => x.amt > 0.009)
    .sort((a, b) => b.amt - a.amt)
  const creditors = house
    .map((h) => ({ id: h.id, amt: -nets[h.id] }))
    .filter((x) => x.amt > 0.009)
    .sort((a, b) => b.amt - a.amt)

  const transfers = []
  let i = 0
  let j = 0
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amt, creditors[j].amt)
    const amt = Math.round(pay * 100) / 100
    if (amt > 0) {
      transfers.push({ from: debtors[i].id, to: creditors[j].id, amount: amt })
    }
    debtors[i].amt = Math.round((debtors[i].amt - amt) * 100) / 100
    creditors[j].amt = Math.round((creditors[j].amt - amt) * 100) / 100
    if (debtors[i].amt <= 0.009) i += 1
    if (creditors[j].amt <= 0.009) j += 1
  }

  const groceryTotal = ITEMS.filter((x) => x.receipt === 'grocery').reduce((s, x) => s + x.price, 0)
  const pizzaTotal = ITEMS.filter((x) => x.receipt === 'pizza').reduce((s, x) => s + x.price, 0)

  return { shares, paid, nets, transfers, lines, groceryTotal, pizzaTotal, rawShares }
}

export function bountyTally(bounty, house = HOUSEMATES) {
  const voters = house.filter((h) => h.id !== bounty.from)
  const votes = bounty.votes || {}
  return { yes: voters.filter((h) => votes[h.id] === 'accept').length, total: voters.length }
}

export function bountyAccepted(bounty, house = HOUSEMATES) {
  if (!bounty) return false
  const voters = house.filter((h) => h.id !== bounty.from)
  const votes = bounty.votes || {}
  if (!voters.every((h) => votes[h.id])) return false
  const { yes, total } = bountyTally(bounty, house)
  return yes > total / 2
}
