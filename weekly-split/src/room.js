import mqtt from 'mqtt'
import { SEATS } from './data.js'
import {
  STATE_VERSION,
  actionSettled,
  applyAction,
  botMoves,
  newPrivate,
  newState,
  nextStep,
  reopenPrivateInputs,
  seatOf,
} from './game.js'

/**
 * Public MQTT test brokers. Room traffic is readable by anyone who knows the topic, so the receipt
 * screen asks for made-up items, and private veto/review/bounty choices never leave the host phone
 * that tallies them.
 */
export const BROKERS = [
  'wss://broker.emqx.io:8084/mqtt',
  'wss://test.mosquitto.org:8081/mqtt',
  'wss://broker.hivemq.com:8884/mqtt',
]

const TOPIC_ROOT = 'deco3500/weekly-split/v2/'
const CONNECT_TIMEOUT_MS = 6000
const FIND_TABLE_MS = 8000
const RESUME_WAIT_MS = 2500
const HELLO_MS = 4000
const ONLINE_MS = 12000
const HOST_STALE_MS = 20000
const LOBBY_DROP_MS = 30000
const RESEND_MS = 2500
const MAX_RESENDS = 12
const HEARTBEAT_MS = 5000
const TICK_MS = 2000

const RESENDABLE = new Set([
  'sit',
  'receiptName',
  'itemSave',
  'itemRemove',
  'sampleReceipt',
  'startSplit',
  'vote',
  'veto',
  'review',
  'propose',
  'bountyVote',
  'ready',
  'talkReady',
])

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function pick(chars) {
  return chars[Math.floor(Math.random() * chars.length)]
}

export function randomCode() {
  return Array.from({ length: 4 }, () => pick(ALPHABET)).join('')
}

/** The first letter of a room code says which broker the table lives on, so a typed code needs no extra hint. */
export function brokerOfCode(code) {
  const i = ALPHABET.indexOf(code[0])
  return i < 0 ? 0 : i % BROKERS.length
}

function codeOnBroker(code, broker) {
  if (brokerOfCode(code) === broker) return code
  const firsts = [...ALPHABET].filter((_, i) => i % BROKERS.length === broker)
  return pick(firsts) + code.slice(1)
}

export function cleanCode(raw) {
  return String(raw || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 4)
}

export function readRoomFromHash() {
  const code = cleanCode(new URLSearchParams(window.location.hash.replace(/^#/, '')).get('r'))
  return code.length === 4 ? code : ''
}

export function writeRoomHash(code) {
  const hash = code ? `#r=${code}` : ''
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
}

export function roomLink(code) {
  return `${window.location.origin}${window.location.pathname}#r=${code}`
}

/** One identity per browser tab, so two tabs on one laptop act as two phones. */
export function clientId() {
  const key = 'weekly-split-client'
  let id = window.sessionStorage.getItem(key)
  if (!id) {
    id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
    window.sessionStorage.setItem(key, id)
  }
  return id
}

function pendingKey(action) {
  return `${action.type}:${action.itemId || ''}`
}

function shortId() {
  return Math.random().toString(36).slice(2, 8)
}

export class RoomSession {
  constructor({ code, selfId, storage, create = null, onChange = () => {} }) {
    this.selfId = selfId
    this.storage = storage
    this.create = create
    this.onChange = onChange
    this.setCode(code)

    this.status = 'connecting'
    this.brokerIndex = null
    this.state = null
    this.isHost = false
    this.priv = newPrivate()

    this.client = null
    this.lastSeen = {}
    this.lastStateAt = 0
    this.lastPublishAt = 0
    this.hostSince = 0
    this.pendingActions = new Map()
    this.stepKey = ''
    this.stepTimer = null
    this.botTimers = new Map()
    this.intervals = []
    this.stateWaiters = []
    this.stopped = false
  }

  setCode(code) {
    this.code = code
    this.topics = { state: `${TOPIC_ROOT}${code}/state`, action: `${TOPIC_ROOT}${code}/action` }
  }

  get mySeat() {
    return seatOf(this.state, this.selfId)
  }

  get hostAway() {
    return !this.isHost && this.status === 'live' && Date.now() - this.lastStateAt > HEARTBEAT_MS * 2.5
  }

  isOnline(clientId) {
    if (clientId === this.selfId) return true
    return Date.now() - (this.lastSeen[clientId] || this.hostSince || 0) < ONLINE_MS
  }

  pending(type, itemId = '') {
    return this.pendingActions.has(`${type}:${itemId}`)
  }

  emit() {
    if (!this.stopped) this.onChange()
  }

  setStatus(status) {
    this.status = status
    this.emit()
  }

  async start() {
    const preferred = this.create ? 0 : brokerOfCode(this.code)
    const order = [preferred, ...BROKERS.map((_, i) => i).filter((i) => i !== preferred)]
    let reached = false
    for (const i of order) {
      if (this.stopped) return
      if (!(await this.tryBroker(i))) continue
      reached = true
      if (this.create) this.setCode(codeOnBroker(this.code, i))
      if ((await this.enterRoom()) || this.stopped) return
      this.client.end(true)
      this.client = null
    }
    if (!this.stopped) this.setStatus(reached ? 'missing' : 'error')
  }

  tryBroker(index) {
    return new Promise((resolve) => {
      const client = mqtt.connect(BROKERS[index], {
        clientId: `wsplit_${this.selfId.replace(/-/g, '').slice(0, 12)}_${shortId()}`,
        clean: true,
        keepalive: 30,
        connectTimeout: CONNECT_TIMEOUT_MS,
        reconnectPeriod: 0,
      })
      let settled = false
      const fail = () => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        client.end(true)
        resolve(false)
      }
      const timer = setTimeout(fail, CONNECT_TIMEOUT_MS + 1000)
      client.once('connect', () => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        if (this.stopped) {
          client.end(true)
          resolve(false)
          return
        }
        client.options.reconnectPeriod = 2000
        this.client = client
        this.brokerIndex = index
        this.wireClient()
        resolve(true)
      })
      client.once('error', fail)
      client.once('close', fail)
    })
  }

  wireClient() {
    const client = this.client
    client.on('message', (topic, payload) => {
      let msg
      try {
        msg = JSON.parse(payload.toString())
      } catch {
        return
      }
      if (topic === this.topics.state) this.onState(msg)
      else if (topic === this.topics.action) this.onAction(msg)
    })
    client.on('connect', () => {
      if (this.stopped) return
      if (this.status === 'offline') this.setStatus('live')
      if (this.isHost) this.publishState()
      this.flushPending(true)
    })
    client.on('offline', () => {
      if (!this.stopped && this.status === 'live') this.setStatus('offline')
    })
  }

  /** Returns false when this broker has no such table, so the caller can look on the next one. */
  async enterRoom() {
    try {
      await this.client.subscribeAsync([this.topics.state, this.topics.action], { qos: 1 })
    } catch {
      return false
    }
    const hostKey = `weekly-split-host:${this.code}`

    if (this.create) {
      this.becomeHost(newState({ code: this.code, hostId: this.selfId, ...this.create }), newPrivate())
    } else if (this.storage.getItem(hostKey) === this.selfId) {
      const found = await this.waitForState(RESUME_WAIT_MS)
      if (found && found.hostId === this.selfId) {
        this.becomeHost(found, this.loadPrivate())
      } else if (!found) {
        const saved = this.loadSavedState()
        if (!saved) return false
        this.becomeHost({ ...saved, hostId: this.selfId }, this.loadPrivate())
      } else this.storage.removeItem(hostKey)
    } else if (!(await this.waitForState(FIND_TABLE_MS))) {
      return false
    }

    if (this.stopped) return true
    this.status = 'live'
    this.intervals.push(setInterval(() => this.publishAction({ type: 'hello', from: this.selfId }), HELLO_MS))
    this.intervals.push(setInterval(() => this.flushPending(false), RESEND_MS))
    this.intervals.push(setInterval(() => this.tick(), TICK_MS))
    this.publishAction({ type: 'hello', from: this.selfId })
    this.emit()
    return true
  }

  waitForState(ms) {
    if (this.state) return Promise.resolve(this.state)
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        this.stateWaiters = this.stateWaiters.filter((w) => w !== waiter)
        resolve(null)
      }, ms)
      const waiter = (s) => {
        clearTimeout(timer)
        resolve(s)
      }
      this.stateWaiters.push(waiter)
    })
  }

  onState(msg) {
    if (!msg || msg.v !== STATE_VERSION || msg.code !== this.code) return
    this.lastStateAt = Date.now()

    if (this.isHost) {
      if (msg.hostId === this.selfId) return
      const theirsWins = msg.rev > this.state.rev || (msg.rev === this.state.rev && msg.hostId < this.selfId)
      if (theirsWins) this.demote(msg)
      else this.publishState()
      return
    }

    if (this.state && msg.rev < this.state.rev) return
    this.state = msg
    const waiters = this.stateWaiters
    this.stateWaiters = []
    waiters.forEach((w) => w(msg))
    this.reconcilePending()
    this.emit()
  }

  onAction(msg) {
    if (!msg || typeof msg.from !== 'string') return
    this.lastSeen[msg.from] = Date.now()
    if (msg.type === 'hello' || !this.isHost || msg.from === this.selfId) return
    this.hostApply(msg)
  }

  becomeHost(state, priv) {
    this.isHost = true
    this.state = state
    this.priv = priv
    this.hostSince = Date.now()
    this.lastStateAt = Date.now()
    this.pendingActions.clear()
    this.storage.setItem(`weekly-split-host:${this.code}`, this.selfId)
    this.publishState()
    this.schedule()
    this.emit()
  }

  demote(state) {
    this.isHost = false
    this.state = state
    this.priv = newPrivate()
    this.clearHostTimers()
    this.storage.removeItem(`weekly-split-host:${this.code}`)
    this.emit()
  }

  hostApply(action, botSeat = '') {
    if (!this.isHost || !this.state) return
    const seat = botSeat || seatOf(this.state, action.from)
    const next = applyAction(this.state, this.priv, { ...action, seat }, { hostId: this.selfId })
    if (next === this.state) return
    this.state = next
    this.savePrivate()
    this.publishState()
    this.schedule()
    this.emit()
  }

  /** Every phone calls this. The host applies it directly; others publish and resend until the host echoes it. */
  send(action) {
    if (!this.state || this.stopped) return
    const full = { ...action, from: this.selfId, id: shortId() }
    if (this.isHost) {
      this.hostApply(full)
      return
    }
    this.publishAction(full)
    if (RESENDABLE.has(full.type)) this.pendingActions.set(pendingKey(full), { action: full, tries: 0 })
    this.emit()
  }

  publishAction(action) {
    this.client?.publish(this.topics.action, JSON.stringify(action), { qos: 1 })
  }

  publishState() {
    if (!this.client || !this.state) return
    this.client.publish(this.topics.state, JSON.stringify(this.state), { qos: 1, retain: true })
    this.lastPublishAt = Date.now()
    this.storage.setItem(`weekly-split-state:${this.code}`, JSON.stringify(this.state))
  }

  reconcilePending() {
    const seat = this.mySeat
    for (const [key, entry] of this.pendingActions) {
      if (actionSettled(this.state, entry.action, seat, this.selfId)) this.pendingActions.delete(key)
    }
  }

  flushPending(force) {
    if (this.isHost) return
    this.reconcilePending()
    for (const [key, entry] of this.pendingActions) {
      if (!force && entry.tries >= MAX_RESENDS) {
        this.pendingActions.delete(key)
        continue
      }
      entry.tries += 1
      this.publishAction(entry.action)
    }
    this.emit()
  }

  tick() {
    if (this.stopped || !this.state) return
    if (this.isHost) this.hostTick()
    else this.maybeTakeOver()
    this.emit()
  }

  hostTick() {
    const now = Date.now()
    const online = {}
    for (const [seat, cid] of Object.entries(this.state.seats)) online[seat] = this.isOnline(cid)
    this.hostApply({ type: 'presence', from: this.selfId, online })

    if (this.state.phase === 'lobby') {
      for (const cid of Object.values(this.state.seats)) {
        if (cid === this.selfId) continue
        if (now - (this.lastSeen[cid] || this.hostSince) > LOBBY_DROP_MS) this.hostApply({ type: 'leave', from: cid })
      }
    }
    if (now - this.lastPublishAt > HEARTBEAT_MS) this.publishState()
  }

  /** If the host phone has gone quiet, the first online seated phone (in seat order) carries the table on. */
  maybeTakeOver() {
    if (this.status !== 'live' || Date.now() - this.lastStateAt < HOST_STALE_MS) return
    const s = this.state
    if (!this.mySeat) return
    const candidates = SEATS.map((h) => h.id).filter((seat) => {
      const cid = s.seats[seat]
      return cid && cid !== s.hostId && this.isOnline(cid)
    })
    if (candidates[0] !== this.mySeat) return
    this.becomeHost({ ...reopenPrivateInputs(s), hostId: this.selfId, rev: s.rev + 1 }, newPrivate())
  }

  schedule() {
    if (!this.isHost || this.stopped) return
    const step = nextStep(this.state)
    const key = step ? step.key : ''
    if (key !== this.stepKey) {
      clearTimeout(this.stepTimer)
      this.stepKey = key
      if (step) {
        this.stepTimer = setTimeout(() => {
          this.stepKey = ''
          this.hostApply({ type: step.type, from: this.selfId })
          this.schedule()
        }, step.delay)
      }
    }

    const moves = botMoves(this.state)
    const live = new Set(moves.map((m) => m.key))
    for (const [key, timer] of this.botTimers) {
      if (!live.has(key)) {
        clearTimeout(timer)
        this.botTimers.delete(key)
      }
    }
    for (const move of moves) {
      if (this.botTimers.has(move.key)) continue
      const { delay, key: moveKey, seat, ...action } = move
      this.botTimers.set(
        moveKey,
        setTimeout(() => {
          this.botTimers.delete(moveKey)
          this.hostApply({ ...action, from: `bot:${seat}` }, seat)
        }, delay),
      )
    }
  }

  clearHostTimers() {
    clearTimeout(this.stepTimer)
    this.stepKey = ''
    for (const timer of this.botTimers.values()) clearTimeout(timer)
    this.botTimers.clear()
  }

  savePrivate() {
    this.storage.setItem(`weekly-split-priv:${this.code}`, JSON.stringify(this.priv))
  }

  loadPrivate() {
    try {
      return { ...newPrivate(), ...JSON.parse(this.storage.getItem(`weekly-split-priv:${this.code}`) || '{}') }
    } catch {
      return newPrivate()
    }
  }

  loadSavedState() {
    try {
      const saved = JSON.parse(this.storage.getItem(`weekly-split-state:${this.code}`) || 'null')
      return saved?.v === STATE_VERSION && saved.code === this.code ? saved : null
    } catch {
      return null
    }
  }

  stop() {
    this.stopped = true
    this.clearHostTimers()
    this.intervals.forEach(clearInterval)
    this.intervals = []
    this.stateWaiters.forEach((w) => w(null))
    this.stateWaiters = []
    this.client?.end(true)
    this.client = null
  }

  /** Leave on purpose: free the seat first so the lobby updates straight away. Resolves once it is sent. */
  leave() {
    if (this.state && this.mySeat) this.send({ type: 'leave' })
    this.storage.removeItem(`weekly-split-host:${this.code}`)
    return new Promise((resolve) => setTimeout(resolve, 300))
  }
}
