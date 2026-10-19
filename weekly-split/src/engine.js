import { HOUSEMATES, SEATS } from './data.js'

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

export function topExpensive(items, count = 3) {
  return [...items].sort((a, b) => b.price - a.price).slice(0, count)
}

export function receiptTotal(items) {
  return roundMoney(items.reduce((s, item) => s + item.price, 0))
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

/** Each person's percent is scaled so the shares add up to the price. If everyone says 0%, split evenly. */
function sliderSplit(price, weights, house = HOUSEMATES) {
  const entries = house.map((h) => [h.id, Number(weights[h.id] || 0)])
  const total = entries.reduce((s, [, w]) => s + w, 0)
  if (total <= 0) return evenSplit(price, house)
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
  if (!reviewReady(item, reviewVotes, house)) return null
  return { type: 'slider', shares: sliderSplit(item.price, reviewVotes[item.id], house) }
}

/** A reviewed item follows the slider. Otherwise claimers split it; nobody claimed it, the whole house does. */
export function allocateItem(item, votes, reviewResults, house = HOUSEMATES) {
  const reviewed = reviewResults[item.id]
  if (reviewed?.type === 'slider') return reviewed.shares

  const people = claimers(votes, item.id, house)
  return evenSplit(item.price, people.length ? people : house)
}

function roundMoney(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

/**
 * An accepted bounty moves part of the proposer's share onto everyone else.
 * Returns the new shares and, for the ledger, what each other housemate now owes the proposer for the chore.
 */
export function applyBounties(shares, bounties, house = HOUSEMATES) {
  const next = { ...shares }
  const credits = []
  for (const b of bounties) {
    if (!b.accepted) continue
    const others = house.filter((h) => h.id !== b.from)
    const cut = Math.min(b.amount, next[b.from] || 0)
    next[b.from] = roundMoney((next[b.from] || 0) - cut)
    if (!others.length) continue
    const piece = roundMoney(cut / others.length)
    let given = 0
    others.forEach((h, i) => {
      const amount = i === others.length - 1 ? roundMoney(cut - given) : piece
      next[h.id] = roundMoney((next[h.id] || 0) + amount)
      given += amount
      if (amount > 0) credits.push({ from: h.id, to: b.from, amount })
    })
  }
  return { shares: next, credits }
}

/**
 * Whoever added an item paid for it in full. Everyone else who used it owes that person their share,
 * and debts between each pair are offset so only the difference is paid, in one direction.
 */
export function computeSettlement(receipt, votes, reviewResults, bounties, house = HOUSEMATES) {
  const items = receipt.items
  const ids = house.map((h) => h.id)
  const rawShares = Object.fromEntries(ids.map((id) => [id, 0]))
  const lines = Object.fromEntries(ids.map((id) => [id, []]))
  const paid = Object.fromEntries(ids.map((id) => [id, 0]))
  const owes = Object.fromEntries(ids.map((id) => [id, Object.fromEntries(ids.map((to) => [to, 0]))]))
  const addDebt = (from, to, amount) => {
    if (from !== to && owes[from]?.[to] !== undefined) owes[from][to] += amount
  }

  for (const item of items) {
    if (paid[item.addedBy] !== undefined) paid[item.addedBy] += item.price
    const alloc = allocateItem(item, votes, reviewResults, house)
    for (const id of ids) {
      const amt = alloc[id] || 0
      if (amt <= 0) continue
      rawShares[id] += amt
      lines[id].push({ item, amount: amt })
      addDebt(id, item.addedBy, amt)
    }
  }

  for (const id of ids) {
    rawShares[id] = roundMoney(rawShares[id])
    paid[id] = roundMoney(paid[id])
  }

  const { shares, credits } = applyBounties(rawShares, bounties, house)
  for (const c of credits) addDebt(c.from, c.to, c.amount)

  const nets = Object.fromEntries(ids.map((id) => [id, roundMoney(shares[id] - paid[id])]))

  const transfers = []
  ids.forEach((a, i) => {
    for (const b of ids.slice(i + 1)) {
      const diff = roundMoney(owes[a][b] - owes[b][a])
      if (diff > 0.009) transfers.push({ from: a, to: b, amount: diff })
      else if (diff < -0.009) transfers.push({ from: b, to: a, amount: -diff })
    }
  })
  transfers.sort((x, y) => y.amount - x.amount)

  for (const id of ids) for (const to of ids) owes[id][to] = roundMoney(owes[id][to])

  return { shares, paid, nets, transfers, owes, lines, total: receiptTotal(items), rawShares }
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
