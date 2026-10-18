import { CHORES, ITEMS, SEATS, houseOf, npcReview, npcVeto, npcVote } from './data.js'
import { allVoted, bountyAccepted, orphansOf, resolveReview, topExpensive } from './engine.js'

export const DELAYS = {
  split: 1600,
  orphanSpin: 400,
  spin: 10000,
  veto: 900,
  flash: 2400,
  review: 2200,
  bounty: 1400,
  lock: 800,
}

export function itemById(id) {
  return ITEMS.find((i) => i.id === id) || null
}

export function choreById(id) {
  return CHORES.find((c) => c.id === id) || null
}

function seatObjects(ids) {
  return ids.map((id) => SEATS.find((s) => s.id === id)).filter(Boolean)
}

function freshRound() {
  return {
    phase: 'lobby',
    house: [],
    itemIndex: 0,
    votes: {},
    orphanQueue: [],
    orphanIndex: 0,
    spin: null,
    orphanMap: {},
    vetoIn: [],
    vetoResult: null,
    reviewList: [],
    reviewIndex: 0,
    reviewIn: {},
    reviewResults: {},
    bounties: [],
    draftBounty: null,
    ready: [],
  }
}

export function newState({ code, hostId, houseSize, fillBots }) {
  return {
    v: 2,
    code,
    hostId,
    rev: 1,
    houseSize: houseSize === 5 ? 5 : 4,
    fillBots: Boolean(fillBots),
    seats: {},
    online: {},
    ...freshRound(),
  }
}

/** Choices that must never be broadcast: who vetoed, how each person voted in review and on bounties. */
export function newPrivate() {
  return { veto: {}, review: {}, bounty: {} }
}

export function seatOf(state, clientId) {
  if (!state || !clientId) return ''
  return Object.keys(state.seats).find((seat) => state.seats[seat] === clientId) || ''
}

/** Seats playing this round. In the lobby, every seat at the table. */
export function houseSeats(state) {
  if (!state) return houseOf(4)
  if (state.phase === 'lobby') return houseOf(state.houseSize)
  return seatObjects(state.house)
}

export function botSeats(state) {
  if (!state || state.phase === 'lobby') return []
  return state.house.filter((id) => !state.seats[id])
}

export function currentItem(state) {
  return state?.phase === 'draft' ? ITEMS[state.itemIndex] || null : null
}

export function currentOrphan(state) {
  return state?.phase === 'orphan' ? itemById(state.orphanQueue[state.orphanIndex]) : null
}

export function currentReview(state) {
  return state?.phase === 'review' ? itemById(state.reviewList[state.reviewIndex]) : null
}

function inHouse(state, seat) {
  return Boolean(seat) && state.house.includes(seat)
}

function everyoneIn(state, list, except = '') {
  return state.house.filter((id) => id !== except).every((id) => list.includes(id))
}

/**
 * Host-side reducer. `action.seat` is resolved by the caller: the sender's seat for humans,
 * or the bot seat for NPC moves. Returns the next state, or the same object when ignored.
 */
export function applyAction(state, priv, action, { hostId = state.hostId } = {}) {
  const s = structuredClone(state)
  const seat = action.seat || ''
  const fromHost = action.from === hostId
  let changed = false

  switch (action.type) {
    case 'sit': {
      const want = action.want
      const owner = s.seats[want]
      if (owner && owner !== action.from) break
      if (s.phase === 'lobby') {
        if (!houseOf(s.houseSize).some((h) => h.id === want)) break
      } else if (!s.house.includes(want) || owner) break
      for (const id of Object.keys(s.seats)) if (s.seats[id] === action.from) delete s.seats[id]
      s.seats[want] = action.from
      changed = true
      break
    }
    case 'leave': {
      for (const id of Object.keys(s.seats)) {
        if (s.seats[id] === action.from) {
          delete s.seats[id]
          changed = true
        }
      }
      break
    }
    case 'handToBot': {
      if (!fromHost || !s.seats[action.target] || s.phase === 'lobby') break
      delete s.seats[action.target]
      changed = true
      break
    }
    case 'setSize': {
      if (!fromHost || s.phase !== 'lobby') break
      s.houseSize = action.size === 5 ? 5 : 4
      if (s.houseSize === 4) delete s.seats.eden
      changed = true
      break
    }
    case 'setBots': {
      if (!fromHost || s.phase !== 'lobby') break
      s.fillBots = Boolean(action.on)
      changed = true
      break
    }
    case 'deal': {
      if (!fromHost || s.phase !== 'lobby') break
      const table = houseOf(s.houseSize).map((h) => h.id)
      const house = s.fillBots ? table : table.filter((id) => s.seats[id])
      if (house.length < 2 || !Object.keys(s.seats).length) break
      Object.assign(s, freshRound(), { phase: 'draft', house })
      Object.assign(priv, newPrivate())
      changed = true
      break
    }
    case 'reset': {
      if (!fromHost) break
      Object.assign(s, freshRound())
      Object.assign(priv, newPrivate())
      changed = true
      break
    }
    case 'vote': {
      const item = currentItem(s)
      if (!item || item.id !== action.itemId || !inHouse(s, seat)) break
      if (s.votes[item.id]?.[seat]) break
      if (action.choice !== 'claim' && action.choice !== 'pass') break
      s.votes[item.id] = { ...s.votes[item.id], [seat]: action.choice }
      changed = true
      break
    }
    case 'orphan': {
      if (s.phase !== 'orphan' || !s.spin || s.spin.itemId !== action.itemId) break
      const winner = s.spin.winnerId
      const winnerIsBot = !s.seats[winner]
      if (seat !== winner && !(winnerIsBot && fromHost)) break
      if (action.choice !== 'pay' && action.choice !== 'chore') break
      s.orphanMap[action.itemId] = { winnerId: winner, choice: action.choice }
      s.spin = null
      if (s.orphanIndex < s.orphanQueue.length - 1) s.orphanIndex += 1
      else s.phase = 'veto'
      changed = true
      break
    }
    case 'veto': {
      if (s.phase !== 'veto' || s.vetoResult || !inHouse(s, seat) || s.vetoIn.includes(seat)) break
      if (action.choice !== 'veto' && action.choice !== 'fair') break
      priv.veto[seat] = action.choice
      s.vetoIn.push(seat)
      changed = true
      break
    }
    case 'review': {
      const item = currentReview(s)
      if (!item || item.id !== action.itemId || !inHouse(s, seat) || s.reviewResults[item.id]) break
      const list = s.reviewIn[item.id] || []
      if (list.includes(seat)) break
      const value = item.tag === 'shareable' ? Number(action.value) : action.value
      if (item.tag === 'shareable' ? !(value >= 10 && value <= 50) : value !== 'communal' && value !== 'personal') break
      priv.review[item.id] = { ...priv.review[item.id], [seat]: value }
      s.reviewIn[item.id] = [...list, seat]
      changed = true
      break
    }
    case 'propose': {
      if (s.phase !== 'bounty' || s.draftBounty || !inHouse(s, seat)) break
      const chore = choreById(action.choreId)
      if (!chore) break
      s.draftBounty = { from: seat, choreId: chore.id, amount: chore.amount, in: [] }
      priv.bounty = {}
      changed = true
      break
    }
    case 'bountyVote': {
      const d = s.draftBounty
      if (s.phase !== 'bounty' || !d || seat === d.from || !inHouse(s, seat) || d.in.includes(seat)) break
      if (action.choice !== 'accept' && action.choice !== 'reject') break
      priv.bounty[seat] = action.choice
      d.in.push(seat)
      changed = true
      break
    }
    case 'ready': {
      if (s.phase !== 'bounty' || !inHouse(s, seat) || s.ready.includes(seat)) break
      s.ready.push(seat)
      changed = true
      break
    }

    // Steps below only come from the host's own timers.
    case 'advanceDraft': {
      const item = currentItem(s)
      if (!item || !allVoted(s.votes, item.id, seatObjects(s.house))) break
      if (s.itemIndex < ITEMS.length - 1) s.itemIndex += 1
      else {
        const orphans = orphansOf(s.votes, seatObjects(s.house))
        if (orphans.length) Object.assign(s, { phase: 'orphan', orphanQueue: orphans.map((o) => o.id), orphanIndex: 0, spin: null })
        else s.phase = 'veto'
      }
      changed = true
      break
    }
    case 'spin': {
      const item = currentOrphan(s)
      if (!item || s.spin) break
      const winnerId = s.house[Math.floor(Math.random() * s.house.length)]
      s.spin = { itemId: item.id, winnerId, at: Date.now() }
      changed = true
      break
    }
    case 'resolveVeto': {
      if (s.phase !== 'veto' || s.vetoResult || !everyoneIn(s, s.vetoIn)) break
      const played = s.house.some((id) => priv.veto[id] === 'veto')
      s.vetoResult = played ? 'veto' : 'fair'
      if (played) {
        s.phase = 'flash'
        s.reviewList = topExpensive(s.votes, 3, seatObjects(s.house)).map((i) => i.id)
        s.reviewIndex = 0
      } else s.phase = 'bounty'
      priv.veto = {}
      changed = true
      break
    }
    case 'endFlash': {
      if (s.phase !== 'flash') break
      s.phase = s.reviewList.length ? 'review' : 'bounty'
      changed = true
      break
    }
    case 'resolveReview': {
      const item = currentReview(s)
      if (!item || s.reviewResults[item.id] || !everyoneIn(s, s.reviewIn[item.id] || [])) break
      const result = resolveReview(item, { [item.id]: priv.review[item.id] || {} }, seatObjects(s.house))
      if (!result) break
      s.reviewResults[item.id] = result
      delete priv.review[item.id]
      changed = true
      break
    }
    case 'nextReview': {
      const item = currentReview(s)
      if (!item || !s.reviewResults[item.id]) break
      if (s.reviewIndex < s.reviewList.length - 1) s.reviewIndex += 1
      else s.phase = 'bounty'
      changed = true
      break
    }
    case 'resolveBounty': {
      const d = s.draftBounty
      if (s.phase !== 'bounty' || !d || !everyoneIn(s, d.in, d.from)) break
      const accepted = bountyAccepted({ from: d.from, votes: priv.bounty }, seatObjects(s.house))
      s.bounties.push({ from: d.from, choreId: d.choreId, amount: d.amount, accepted })
      s.draftBounty = null
      priv.bounty = {}
      changed = true
      break
    }
    case 'lock': {
      if (s.phase !== 'bounty' || s.draftBounty || !everyoneIn(s, s.ready)) break
      s.phase = 'locked'
      changed = true
      break
    }
    case 'presence': {
      const next = action.online || {}
      if (JSON.stringify(next) === JSON.stringify(s.online)) break
      s.online = next
      changed = true
      break
    }
    default:
      break
  }

  if (!changed) return state
  s.rev = state.rev + 1
  return s
}

/** The next timed step the host should take, keyed so the timer is not restarted by unrelated updates. */
export function nextStep(state) {
  if (!state) return null
  switch (state.phase) {
    case 'draft': {
      const item = currentItem(state)
      if (item && allVoted(state.votes, item.id, seatObjects(state.house))) {
        return { type: 'advanceDraft', delay: DELAYS.split, key: `draft:${state.itemIndex}` }
      }
      return null
    }
    case 'orphan':
      return state.spin ? null : { type: 'spin', delay: DELAYS.orphanSpin, key: `spin:${state.orphanIndex}` }
    case 'veto':
      return !state.vetoResult && everyoneIn(state, state.vetoIn)
        ? { type: 'resolveVeto', delay: DELAYS.veto, key: 'veto' }
        : null
    case 'flash':
      return { type: 'endFlash', delay: DELAYS.flash, key: 'flash' }
    case 'review': {
      const item = currentReview(state)
      if (!item) return null
      if (state.reviewResults[item.id]) return { type: 'nextReview', delay: DELAYS.review, key: `review-next:${item.id}` }
      if (everyoneIn(state, state.reviewIn[item.id] || [])) return { type: 'resolveReview', delay: 150, key: `review:${item.id}` }
      return null
    }
    case 'bounty': {
      const d = state.draftBounty
      if (d) return everyoneIn(state, d.in, d.from) ? { type: 'resolveBounty', delay: DELAYS.bounty, key: `bounty:${state.bounties.length}` } : null
      return everyoneIn(state, state.ready) ? { type: 'lock', delay: DELAYS.lock, key: 'lock' } : null
    }
    default:
      return null
  }
}

/** Moves NPC seats still owe in the current phase. Each carries a stable key and a stagger delay. */
export function botMoves(state) {
  const bots = botSeats(state)
  if (!bots.length) return []
  const out = []
  const push = (seat, i, base, step, action) =>
    out.push({ ...action, seat, delay: base + i * step, key: `${action.type}:${seat}:${action.itemId || ''}:${state.bounties.length}` })

  if (state.phase === 'draft') {
    const item = currentItem(state)
    if (!item) return out
    bots.forEach((seat, i) => {
      if (!state.votes[item.id]?.[seat]) push(seat, i, 700, 320, { type: 'vote', itemId: item.id, choice: npcVote(item.id, seat) })
    })
  } else if (state.phase === 'orphan') {
    const winner = state.spin?.winnerId
    if (winner && bots.includes(winner)) {
      push(winner, 0, DELAYS.spin + 1200, 0, { type: 'orphan', itemId: state.spin.itemId, choice: 'pay' })
    }
  } else if (state.phase === 'veto' && !state.vetoResult) {
    bots.forEach((seat, i) => {
      if (!state.vetoIn.includes(seat)) push(seat, i, 500, 280, { type: 'veto', choice: npcVeto(seat) || 'fair' })
    })
  } else if (state.phase === 'review') {
    const item = currentReview(state)
    if (!item || state.reviewResults[item.id]) return out
    const list = state.reviewIn[item.id] || []
    bots.forEach((seat, i) => {
      if (!list.includes(seat)) push(seat, i, 600, 280, { type: 'review', itemId: item.id, value: npcReview(item.id, seat) })
    })
  } else if (state.phase === 'bounty') {
    const d = state.draftBounty
    if (d) {
      bots.forEach((seat, i) => {
        if (seat !== d.from && !d.in.includes(seat)) {
          push(seat, i, 600, 300, { type: 'bountyVote', choice: d.amount <= 12 ? 'accept' : 'reject' })
        }
      })
    } else {
      bots.forEach((seat, i) => {
        if (!state.ready.includes(seat)) push(seat, i, 400, 150, { type: 'ready' })
      })
    }
  }
  return out
}

/** After a host change the new host cannot see choices made on the old host, so those inputs reopen. */
export function reopenPrivateInputs(state) {
  const s = structuredClone(state)
  if (s.phase === 'veto' && !s.vetoResult) s.vetoIn = []
  const item = currentReview(s)
  if (item && !s.reviewResults[item.id]) s.reviewIn[item.id] = []
  if (s.draftBounty) s.draftBounty.in = []
  return s
}

/** Has the host's state already absorbed this action from `seat`? Used to stop resending. */
export function actionSettled(state, action, seat, clientId) {
  if (!state) return false
  switch (action.type) {
    case 'sit':
      return Boolean(state.seats[action.want])
    case 'leave':
      return !seatOf(state, clientId)
    case 'vote':
      return currentItem(state)?.id !== action.itemId || Boolean(state.votes[action.itemId]?.[seat])
    case 'orphan':
      return state.phase !== 'orphan' || Boolean(state.orphanMap[action.itemId])
    case 'veto':
      return state.phase !== 'veto' || Boolean(state.vetoResult) || state.vetoIn.includes(seat)
    case 'review':
      return (
        currentReview(state)?.id !== action.itemId ||
        Boolean(state.reviewResults[action.itemId]) ||
        (state.reviewIn[action.itemId] || []).includes(seat)
      )
    case 'propose':
      return state.phase !== 'bounty' || Boolean(state.draftBounty)
    case 'bountyVote':
      return state.phase !== 'bounty' || !state.draftBounty || state.draftBounty.in.includes(seat)
    case 'ready':
      return state.phase !== 'bounty' || state.ready.includes(seat)
    default:
      return true
  }
}
