import { HOUSEMATES, ITEMS, PAYERS } from './data'

export function money(n) {
  const v = Math.round((n + Number.EPSILON) * 100) / 100
  return `$${v.toFixed(2)}`
}

export function person(id) {
  return HOUSEMATES.find((h) => h.id === id)
}

export function votesOf(votes, itemId) {
  return votes[itemId] || {}
}

export function allVoted(votes, itemId) {
  const v = votesOf(votes, itemId)
  return HOUSEMATES.every((h) => v[h.id] === 'claim' || v[h.id] === 'pass')
}

export function claimers(votes, itemId) {
  const v = votesOf(votes, itemId)
  return HOUSEMATES.filter((h) => v[h.id] === 'claim')
}

export function isOrphan(votes, itemId) {
  return allVoted(votes, itemId) && claimers(votes, itemId).length === 0
}

export function orphansOf(votes) {
  return ITEMS.filter((item) => isOrphan(votes, item.id))
}

export function topExpensive(votes, count = 3) {
  const live = ITEMS.filter((item) => !isOrphan(votes, item.id))
  const flagged = live
    .filter((item) => item.tag === 'luxury' || item.tag === 'shareable')
    .sort((a, b) => b.price - a.price)
  const rest = live
    .filter((item) => item.tag !== 'luxury' && item.tag !== 'shareable')
    .sort((a, b) => b.price - a.price)
  return [...flagged, ...rest].slice(0, count)
}

export function reviewReady(item, reviewVotes) {
  const v = reviewVotes[item.id] || {}
  return HOUSEMATES.every((h) => v[h.id] !== undefined && v[h.id] !== null)
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

function sliderSplit(price, weights) {
  const entries = HOUSEMATES.map((h) => [h.id, Number(weights[h.id] || 0)])
  const total = entries.reduce((s, [, w]) => s + w, 0) || 1
  const shares = {}
  let allocated = 0
  entries.forEach(([id, w], i) => {
    if (i === entries.length - 1) shares[id] = Math.round((price - allocated) * 100) / 100
    else {
      const amt = Math.round(((w / total) * price) * 100) / 100
      shares[id] = amt
      allocated += amt
    }
  })
  return shares
}

export function resolveReview(item, reviewVotes) {
  const v = reviewVotes[item.id] || {}
  if (item.tag === 'shareable') {
    if (!reviewReady(item, reviewVotes)) return null
    return { type: 'slider', shares: sliderSplit(item.price, v) }
  }
  if (!reviewReady(item, reviewVotes)) return null
  const personal = HOUSEMATES.filter((h) => v[h.id] === 'personal').length
  const communal = HOUSEMATES.filter((h) => v[h.id] === 'communal').length
  if (personal > communal) {
    return { type: 'personal', owner: item.addedBy, tally: { personal, communal } }
  }
  return { type: 'communal', tally: { personal, communal } }
}

export function allocateItem(item, votes, reviewVotes, orphanMap) {
  const orphan = orphanMap[item.id]
  if (orphan) {
    if (orphan.choice === 'pay') return { [orphan.winnerId]: item.price }
    return evenSplit(item.price, HOUSEMATES)
  }

  const reviewed = reviewVotes[item.id] ? resolveReview(item, reviewVotes) : null
  if (reviewed?.type === 'slider') return reviewed.shares
  if (reviewed?.type === 'personal') return { [reviewed.owner]: item.price }

  const people = claimers(votes, item.id)
  if (!people.length) return {}
  return evenSplit(item.price, people)
}

function roundMoney(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function applyBounties(shares, bounties) {
  const next = { ...shares }
  for (const b of bounties) {
    if (!b.accepted) continue
    const others = HOUSEMATES.filter((h) => h.id !== b.from)
    const cut = Math.min(b.amount, next[b.from] || 0)
    next[b.from] = roundMoney((next[b.from] || 0) - cut)
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

export function computeSettlement(votes, reviewVotes, orphanMap, bounties) {
  const rawShares = Object.fromEntries(HOUSEMATES.map((h) => [h.id, 0]))
  const lines = Object.fromEntries(HOUSEMATES.map((h) => [h.id, []]))

  for (const item of ITEMS) {
    const alloc = allocateItem(item, votes, reviewVotes, orphanMap)
    for (const h of HOUSEMATES) {
      const amt = alloc[h.id] || 0
      if (amt > 0) {
        rawShares[h.id] += amt
        lines[h.id].push({ item, amount: amt })
      }
    }
  }

  for (const h of HOUSEMATES) {
    rawShares[h.id] = Math.round(rawShares[h.id] * 100) / 100
  }

  const shares = applyBounties(rawShares, bounties)
  const paid = Object.fromEntries(HOUSEMATES.map((h) => [h.id, 0]))
  for (const item of ITEMS) {
    const payer = PAYERS[item.receipt]
    paid[payer] += item.price
  }

  const nets = {}
  for (const h of HOUSEMATES) {
    nets[h.id] = Math.round((shares[h.id] - paid[h.id]) * 100) / 100
  }

  const debtors = HOUSEMATES.map((h) => ({ id: h.id, amt: nets[h.id] }))
    .filter((x) => x.amt > 0.009)
    .sort((a, b) => b.amt - a.amt)
  const creditors = HOUSEMATES.map((h) => ({ id: h.id, amt: -nets[h.id] }))
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

export function bountyAccepted(bounty) {
  if (!bounty) return false
  const voters = HOUSEMATES.filter((h) => h.id !== bounty.from)
  const votes = bounty.votes || {}
  if (!voters.every((h) => votes[h.id])) return false
  const yes = voters.filter((h) => votes[h.id] === 'accept').length
  return yes > voters.length / 2
}
