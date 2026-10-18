import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { CHORES, RECEIPT_LIMITS, SLIDER_STOPS, VETO_TOKENS_PER_MONTH, houseOf } from './data'
import { allVoted, claimers, computeSettlement, isUnclaimed, money, person, receiptTotal } from './engine'
import {
  DELAYS,
  botSeats,
  canStartSplit,
  choreById,
  cleanName,
  currentItem,
  currentReview,
  houseSeats,
  itemById,
  parsePrice,
} from './game'
import { cleanCode, clientId, randomCode, readRoomFromHash, roomLink, writeRoomHash } from './room'
import { useRoom } from './useRoom'

const PHASES = [
  { id: 'receipt', label: 'Receipt' },
  { id: 'draft', label: 'Draft' },
  { id: 'veto', label: 'Veto' },
  { id: 'review', label: 'Review' },
  { id: 'bounty', label: 'Bounty' },
  { id: 'locked', label: 'Lock' },
]

const HOME_STEPS = [
  ['Create the receipt', 'Add items and who paid'],
  ['Claim or pass', 'Swipe what you actually used'],
  ['Review', 'Looks fair, or play an anonymous veto'],
  ['Lock', 'See who pays whom'],
]

const TAG_LABEL = {
  luxury: 'Luxury',
  shareable: 'Shared',
  chore: 'Chore',
  communal: 'Communal',
}

export default function App() {
  const [selfId] = useState(clientId)
  const [code, setCode] = useState(readRoomFromHash)
  const [create, setCreate] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const [joinInput, setJoinInput] = useState('')
  const room = useRoom({ code, create, selfId, attempt })

  useEffect(() => {
    const onHash = () => {
      setCreate(null)
      setCode(readRoomFromHash())
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const liveCode = room?.code || code
  const status = room?.status || 'connecting'
  useEffect(() => {
    if (status === 'live' && liveCode) writeRoomHash(liveCode)
  }, [status, liveCode])

  const g = room?.state || null
  const houseKey = !g ? '' : g.phase === 'lobby' ? `lobby:${g.houseSize}` : g.house.join(',')
  const house = useMemo(() => houseSeats(g), [houseKey])
  const settlement = useMemo(
    () => (g ? computeSettlement(g.receipt, g.votes, g.reviewResults, g.bounties, house) : null),
    [g, house],
  )

  function createTable(size) {
    const next = randomCode()
    writeRoomHash(next)
    setCreate({ houseSize: size, fillBots: true })
    setCode(next)
  }

  function joinTable() {
    const next = cleanCode(joinInput)
    if (next.length !== 4) return
    writeRoomHash(next)
    setCreate(null)
    setCode(next)
  }

  async function leaveTable() {
    await room?.leave()
    writeRoomHash('')
    setCreate(null)
    setCode('')
  }

  if (!code) {
    return (
      <Shell>
        <Home joinInput={joinInput} setJoinInput={setJoinInput} onCreate={createTable} onJoin={joinTable} />
      </Shell>
    )
  }

  if (!g || status === 'missing' || status === 'error') {
    return (
      <Shell>
        <ConnectStatus
          code={liveCode}
          status={status}
          onRetry={() => setAttempt((n) => n + 1)}
          onBack={leaveTable}
        />
      </Shell>
    )
  }

  const me = room.mySeat
  const isHost = room.isHost
  const phase = g.phase
  const send = (action) => room.send(action)

  return (
    <Shell>
      {phase !== 'lobby' && phase !== 'talk' && (
        <TopBar me={me} house={house} g={g} phase={phase} code={liveCode} onLeave={leaveTable} />
      )}

      {phase !== 'lobby' && (
        <TableNotices room={room} g={g} me={me} house={house} isHost={isHost} send={send} />
      )}

      {phase === 'lobby' && (
        <Lobby
          code={liveCode}
          g={g}
          me={me}
          selfId={selfId}
          isHost={isHost}
          sitting={room.pending('sit')}
          offline={status === 'offline'}
          send={send}
          onLeave={leaveTable}
        />
      )}

      {phase === 'receipt' && <ReceiptBuilder room={room} me={me} house={house} receipt={g.receipt} send={send} />}

      {phase === 'draft' && currentItem(g) && (
        <Draft
          me={me}
          house={house}
          receipt={g.receipt}
          item={currentItem(g)}
          itemIndex={g.itemIndex}
          votes={g.votes}
          waiting={room.pending('vote', currentItem(g).id)}
          onVote={(choice) => send({ type: 'vote', itemId: currentItem(g).id, choice })}
        />
      )}

      {phase === 'veto' && (
        <Veto
          me={me}
          house={house}
          receipt={g.receipt}
          votes={g.votes}
          settlement={settlement}
          vetoIn={g.vetoIn}
          answered={g.vetoIn.includes(me) || room.pending('veto')}
          onVote={(choice) => send({ type: 'veto', choice })}
        />
      )}

      {phase === 'talk' && (
        <TableTalk
          me={me}
          house={house}
          endsAt={g.talkEndsAt}
          items={g.reviewList.map((id) => itemById(g, id)).filter(Boolean)}
          talkReady={g.talkReady}
          answered={g.talkReady.includes(me) || room.pending('talkReady')}
          onReady={() => send({ type: 'talkReady' })}
        />
      )}

      {phase === 'review' && currentReview(g) && (
        <Review
          key={currentReview(g).id}
          me={me}
          house={house}
          item={currentReview(g)}
          reviewIndex={g.reviewIndex}
          total={g.reviewList.length}
          answeredBy={g.reviewIn[currentReview(g).id] || []}
          answered={(g.reviewIn[currentReview(g).id] || []).includes(me) || room.pending('review', currentReview(g).id)}
          result={g.reviewResults[currentReview(g).id] || null}
          onVote={(value) => send({ type: 'review', itemId: currentReview(g).id, value })}
        />
      )}

      {phase === 'bounty' && (
        <Bounty
          me={me}
          house={house}
          settlement={settlement}
          bounties={g.bounties}
          draftBounty={g.draftBounty}
          ready={g.ready}
          proposing={room.pending('propose')}
          voted={Boolean(g.draftBounty?.in.includes(me)) || room.pending('bountyVote')}
          readyPending={room.pending('ready')}
          onPropose={(choreId) => send({ type: 'propose', choreId })}
          onVote={(choice) => send({ type: 'bountyVote', choice })}
          onReady={() => send({ type: 'ready' })}
        />
      )}

      {phase === 'locked' && (
        <Locked
          settlement={settlement}
          receipt={g.receipt}
          house={house}
          bounties={g.bounties}
          isHost={isHost}
          onReset={() => send({ type: 'reset' })}
          onLeave={leaveTable}
        />
      )}
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <div className="stage">
      <div className="phone">{children}</div>
    </div>
  )
}

function Home({ joinInput, setJoinInput, onCreate, onJoin }) {
  return (
    <section className="screen welcome home">
      <header className="home-hero">
        <p className="kicker">Sunday sharehouse settlement</p>
        <h1>The Weekly Split</h1>
        <p className="lede">One table, ten minutes. Every housemate plays on their own phone, live. The app takes the blame.</p>
      </header>

      <ol className="home-steps">
        {HOME_STEPS.map(([title, body]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{body}</span>
          </li>
        ))}
      </ol>

      <div className="home-card">
        <div className="home-card-head">
          <h2>Open a table</h2>
          <span>This phone becomes the host</span>
        </div>
        <div className="vote-row">
          <button className="primary" onClick={() => onCreate(4)}>
            4 people
          </button>
          <button className="primary" onClick={() => onCreate(5)}>
            5 people
          </button>
        </div>
      </div>

      <p className="home-or">
        <span>or</span>
      </p>

      <div className="home-card">
        <div className="home-card-head">
          <h2>Join a housemate’s table</h2>
          <span>Type the 4-letter code</span>
        </div>
        <div className="join-row">
          <input
            className="code-input"
            value={joinInput}
            maxLength={4}
            placeholder="K7M2"
            aria-label="Table code"
            autoCapitalize="characters"
            onChange={(e) => setJoinInput(cleanCode(e.target.value))}
            onKeyDown={(e) => e.key === 'Enter' && onJoin()}
          />
          <button className="ghost claim" disabled={joinInput.length !== 4} onClick={onJoin}>
            Join
          </button>
        </div>
      </div>

      <p className="hint">Got an invite link? Just open it. Empty seats can be played by NPC housemates.</p>
    </section>
  )
}

function ConnectStatus({ code, status, onRetry, onBack }) {
  const copy = {
    connecting: { title: 'Connecting…', body: 'Finding the table on the sync server. Keep this page open.' },
    missing: {
      title: 'Table not found',
      body: 'Nobody has this table open right now. Check the code, or ask the person who opened it to keep their page open.',
    },
    error: {
      title: 'Can’t reach the sync server',
      body: 'This phone could not reach any of the live servers. Check the Wi-Fi or mobile data and try again.',
    },
    offline: { title: 'Reconnecting…', body: 'Lost the connection for a moment.' },
    live: { title: 'Loading the table…', body: '' },
  }[status] || { title: 'Connecting…', body: '' }

  return (
    <section className="screen welcome">
      <p className="kicker">Table {code}</p>
      <h1>{copy.title}</h1>
      <p className="lede">{copy.body}</p>
      {(status === 'missing' || status === 'error') && (
        <button className="primary" onClick={onRetry}>
          Try again
        </button>
      )}
      <button className="ghost pass" onClick={onBack}>
        Back
      </button>
    </section>
  )
}

function seatLabel(g, seatId, selfId) {
  const owner = g.seats[seatId]
  if (!owner) return g.phase === 'lobby' ? 'Free' : 'NPC'
  if (owner === selfId) return 'You'
  if (g.online[seatId] === false) return 'Offline'
  return owner === g.hostId ? 'Host' : 'Live'
}

function Lobby({ code, g, me, selfId, isHost, sitting, offline, send, onLeave }) {
  const [copied, setCopied] = useState(false)
  const table = houseOf(g.houseSize)
  const seated = table.filter((h) => g.seats[h.id]).length
  const canDeal = Boolean(me) && (g.fillBots ? seated >= 1 : seated >= 2)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(roomLink(code))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="screen welcome lobby">
      <p className="kicker">Live table · share this code</p>
      <h1 className="room-code">{code}</h1>
      <p className="lede tight">
        {seated} of {table.length} seats taken · {g.fillBots ? 'NPC plays any empty seat' : 'humans only'}
      </p>
      {offline && <p className="notice">Reconnecting to the table…</p>}
      <button className="chip" onClick={copyLink}>
        {copied ? 'Link copied' : 'Copy invite link'}
      </button>
      {isHost && (
        <div className="vote-row">
          <button className={`ghost ${g.houseSize === 4 ? 'claim' : ''}`} onClick={() => send({ type: 'setSize', size: 4 })}>
            4 seats
          </button>
          <button className={`ghost ${g.houseSize === 5 ? 'claim' : ''}`} onClick={() => send({ type: 'setSize', size: 5 })}>
            5 seats
          </button>
        </div>
      )}
      <p className="prompt">{me ? `You are ${person(me).name}` : 'Sit down — one seat per phone'}</p>
      <div className={`seat-grid ${table.length === 5 ? 'five' : ''}`}>
        {table.map((h) => {
          const owner = g.seats[h.id]
          const mine = me === h.id
          return (
            <button
              key={h.id}
              className={`seat-card ${mine ? 'on' : ''} ${owner && !mine ? 'taken' : ''}`}
              style={{ '--hue': h.hue }}
              disabled={Boolean(owner) || sitting}
              onClick={() => send({ type: 'sit', want: h.id })}
            >
              <span className="avatar lg">{h.initial}</span>
              <strong>{h.name}</strong>
              <span className="seat-status">{seatLabel(g, h.id, selfId)}</span>
            </button>
          )
        })}
      </div>
      {sitting && <p className="waiting">Sitting down…</p>}
      {isHost && (
        <button className="chip" onClick={() => send({ type: 'setBots', on: !g.fillBots })}>
          {g.fillBots ? 'NPC fills empty seats' : 'Humans only — no NPC'}
        </button>
      )}
      {isHost ? (
        <button className="primary" disabled={!canDeal} onClick={() => send({ type: 'deal' })}>
          Everyone’s here — create the receipt
        </button>
      ) : (
        <p className="hint">Waiting for the host to start. Then anyone can add items to the receipt.</p>
      )}
      <button className="ghost pass" onClick={onLeave}>
        Leave table
      </button>
      <p className="hint">
        {isHost
          ? 'You opened this table. Keep this page open while you play — it runs the timers and the NPC.'
          : 'Pick a free seat. Everyone sees the same table live.'}
      </p>
    </section>
  )
}

function TopBar({ me, house, g, phase, code, onLeave }) {
  const activeIndex = Math.max(
    0,
    PHASES.findIndex((p) => p.id === phase),
  )
  return (
    <header className="topbar">
      <div className="brand-row">
        <p className="eyebrow">The Weekly Split · {code}</p>
        <div className="top-actions">
          <button className="chip" onClick={onLeave}>
            Leave
          </button>
        </div>
      </div>
      <div className={`seats n${house.length}`}>
        {house.map((h) => {
          const owner = g.seats[h.id]
          const dropped = owner && g.online[h.id] === false
          return (
            <div key={h.id} className={`seat ${me === h.id ? 'on' : ''}`} style={{ '--hue': h.hue }}>
              <span className="avatar">{h.initial}</span>
              <span>{h.name}</span>
              <span className={`live-dot ${dropped ? 'off' : ''} ${owner ? '' : 'npc'}`}>
                {!owner ? 'NPC' : dropped ? 'offline' : owner === g.hostId ? '● host' : '●'}
              </span>
            </div>
          )
        })}
      </div>
      <ol className="steps">
        {PHASES.map((p, i) => (
          <li key={p.id} className={i === activeIndex ? 'current' : i < activeIndex ? 'done' : ''}>
            {p.label}
          </li>
        ))}
      </ol>
    </header>
  )
}

function TableNotices({ room, g, me, house, isHost, send }) {
  const dropped =
    g.phase === 'locked'
      ? []
      : house.filter((h) => g.seats[h.id] && g.seats[h.id] !== room.selfId && g.online[h.id] === false)
  const freeSeats = botSeats(g)

  return (
    <>
      {room.status === 'offline' && <p className="notice">Reconnecting to the table…</p>}
      {room.hostAway && (
        <p className="notice">The host’s phone has gone quiet. If it doesn’t come back, another phone takes over.</p>
      )}
      {dropped.map((h) => (
        <div key={h.id} className="notice">
          <span>{h.name}’s phone dropped out.</span>
          {isHost && (
            <button className="chip" onClick={() => send({ type: 'handToBot', target: h.id })}>
              Let NPC play {h.name}
            </button>
          )}
        </div>
      ))}
      {!me && g.phase !== 'locked' && (
        <div className="notice">
          <span>{freeSeats.length ? 'You are watching. Take over an NPC seat:' : 'You are watching this round.'}</span>
          {freeSeats.map((id) => (
            <button key={id} className="chip" onClick={() => send({ type: 'sit', want: id })}>
              Play as {person(id).name}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

function newItemId() {
  return `i${Date.now().toString(36).slice(-5)}${Math.random().toString(36).slice(2, 6)}`
}

function ReceiptBuilder({ room, me, house, receipt, send }) {
  const playing = house.some((h) => h.id === me)
  const [nameDraft, setNameDraft] = useState(receipt.name)
  const [nameEditing, setNameEditing] = useState(false)
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [byAppetite, setByAppetite] = useState(false)
  const [editing, setEditing] = useState('')
  const [lastSent, setLastSent] = useState('')
  const [error, setError] = useState('')

  const shownName = nameEditing || room.pending('receiptName') ? nameDraft : receipt.name
  const editItem = receipt.items.find((i) => i.id === editing) || null
  const total = receiptTotal(receipt.items)
  const ready = canStartSplit({ ...receipt, name: shownName }, house.map((h) => h.id))
  const starting = room.pending('startSplit')
  const missing = !cleanName(shownName, RECEIPT_LIMITS.name)
    ? 'Give the receipt a name.'
    : !receipt.items.length
      ? 'Add at least one item.'
      : !house.some((h) => h.id === receipt.payer)
        ? 'Pick who paid.'
        : ''

  function commitName() {
    if (!nameEditing) return
    setNameEditing(false)
    if (cleanName(nameDraft, RECEIPT_LIMITS.name) !== receipt.name) send({ type: 'receiptName', name: nameDraft })
  }

  useEffect(() => {
    if (!nameEditing) return
    const timer = setTimeout(commitName, 700)
    return () => clearTimeout(timer)
  }, [nameDraft, nameEditing])

  function resetForm() {
    setEditing('')
    setItemName('')
    setPrice('')
    setByAppetite(false)
    setError('')
  }

  function startEdit(item) {
    setEditing(item.id)
    setItemName(item.name)
    setPrice(item.price.toFixed(2))
    setByAppetite(item.tag === 'shareable')
    setError('')
  }

  function saveItem(e) {
    e.preventDefault()
    const name = cleanName(itemName, RECEIPT_LIMITS.itemName)
    const value = parsePrice(price)
    if (!name) return setError('Give the item a name.')
    if (Number.isNaN(value)) return setError(`Enter a price between $0.01 and ${money(RECEIPT_LIMITS.maxPrice)}.`)
    if (!editItem && receipt.items.length >= RECEIPT_LIMITS.items) return setError('This receipt is full.')
    const itemId = editItem ? editItem.id : newItemId()
    send({ type: 'itemSave', itemId, name, price: value, tag: byAppetite ? 'shareable' : '' })
    setLastSent(itemId)
    resetForm()
  }

  function removeItem(item) {
    send({ type: 'itemRemove', itemId: item.id })
    if (editing === item.id) resetForm()
  }

  return (
    <section className="screen receipt-make">
      <h2 className="screen-title">Create a receipt</h2>
      <p className="lede tight center">
        {playing ? 'Anyone at the table can add items. Every phone sees the same list.' : 'Watching the house write up the receipt.'}
      </p>

      <label className="field">
        <span>Receipt name</span>
        <input
          value={shownName}
          maxLength={RECEIPT_LIMITS.name}
          placeholder="e.g. Sunday Woolies run"
          disabled={!playing}
          onChange={(e) => {
            setNameEditing(true)
            setNameDraft(e.target.value)
          }}
          onBlur={commitName}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        />
      </label>

      <div className="field">
        <span>Who paid?</span>
        <div className={`payer-row n${house.length}`}>
          {house.map((h) => (
            <button
              key={h.id}
              className={`payer ${receipt.payer === h.id ? 'on' : ''}`}
              style={{ '--hue': h.hue }}
              disabled={!playing}
              aria-pressed={receipt.payer === h.id}
              onClick={() => send({ type: 'receiptPayer', payer: h.id })}
            >
              <span className="avatar">{h.initial}</span>
              {h.name}
            </button>
          ))}
        </div>
      </div>

      {playing && (
        <form className={`item-form ${editItem ? 'editing' : ''}`} onSubmit={saveItem}>
          <p className="form-title">{editItem ? `Editing “${editItem.name}”` : 'Add an item'}</p>
          <div className="item-inputs">
            <input
              value={itemName}
              maxLength={RECEIPT_LIMITS.itemName}
              placeholder="Item name"
              aria-label="Item name"
              onChange={(e) => setItemName(e.target.value)}
            />
            <label className="price-input">
              <span>$</span>
              <input
                value={price}
                inputMode="decimal"
                placeholder="0.00"
                aria-label="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
          <label className="appetite">
            <input type="checkbox" checked={byAppetite} onChange={(e) => setByAppetite(e.target.checked)} />
            Shared food — split by appetite if vetoed
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            {editItem && (
              <button type="button" className="ghost" onClick={resetForm}>
                Cancel
              </button>
            )}
            <button type="submit" className="primary">
              {editItem ? 'Save changes' : 'Add item'}
            </button>
          </div>
        </form>
      )}

      {receipt.items.length ? (
        <ul className="bill-list receipt-items">
          {receipt.items.map((item) => (
            <li key={item.id} className={editing === item.id ? 'editing' : ''}>
              <span className="ri-main">
                <strong>{item.name}</strong>
                <small>
                  Added by {person(item.addedBy).name}
                  {item.tag === 'shareable' ? ' · by appetite' : ''}
                </small>
              </span>
              <span className="mono">{money(item.price)}</span>
              {playing && (
                <span className="ri-actions">
                  <button aria-label={`Edit ${item.name}`} onClick={() => startEdit(item)}>
                    ✎
                  </button>
                  <button className="danger" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item)}>
                    ✕
                  </button>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="receipt-empty">
          <p>No items yet.</p>
          {playing && (
            <button className="chip" disabled={room.pending('sampleReceipt')} onClick={() => send({ type: 'sampleReceipt' })}>
              Fill in the sample receipt instead
            </button>
          )}
        </div>
      )}
      {lastSent && room.pending('itemSave', lastSent) && <p className="waiting">Sending to the table…</p>}

      <div className="receipt-sum">
        <span>
          {receipt.items.length} {receipt.items.length === 1 ? 'item' : 'items'}
          {receipt.payer ? ` · ${person(receipt.payer).name} paid` : ''}
        </span>
        <strong>{money(total)}</strong>
      </div>

      {playing && (
        <button className="primary" disabled={!ready || starting} onClick={() => send({ type: 'startSplit', name: shownName })}>
          {starting ? 'Starting…' : 'Start splitting'}
        </button>
      )}
      <p className="hint">
        {missing || 'Everyone swipes Claim or Pass on each item next.'} Items go through a public test server — use made-up
        ones, not your real shop.
      </p>
    </section>
  )
}

function Draft({ me, house, receipt, item, itemIndex, votes, waiting, onVote }) {
  const mine = votes[item.id]?.[me]
  const people = claimers(votes, item.id, house)
  const votesIn = house.filter((h) => votes[item.id]?.[h.id]).length
  const done = allVoted(votes, item.id, house)
  const unclaimed = done && people.length === 0
  const share = people.length ? item.price / people.length : 0
  const playing = house.some((h) => h.id === me)
  const locked = !playing || Boolean(mine) || waiting || done
  const count = receipt.items.length

  return (
    <section className="screen draft">
      <div className="run-head">
        <p>
          {receipt.name} · Item {itemIndex + 1} of {count}
        </p>
        <div className="run-bar">
          <span style={{ width: `${((itemIndex + (done ? 1 : 0)) / count) * 100}%` }} />
        </div>
      </div>
      <div className="card-stack">
        <SwipeCard key={item.id} locked={locked} onClaim={() => onVote('claim')} onPass={() => onVote('pass')}>
          <article className={`deal-card tag-${item.tag || 'plain'}`}>
            {TAG_LABEL[item.tag] && <span className="stamp-tag">{TAG_LABEL[item.tag]}</span>}
            <p className="emoji">{item.emoji || '🧾'}</p>
            <p className="price">{money(item.price)}</p>
            <h2>{item.name}</h2>
            {item.detail && <p className="detail">{item.detail}</p>}
            <span className="claim-badge">
              <b>{people.length}</b> {people.length === 1 ? 'Housemate' : 'Housemates'} Claimed
            </span>
            <div className="claim-faces">
              {people.map((h) => (
                <span key={h.id} className="avatar sm" style={{ '--hue': h.hue }}>
                  {h.initial}
                </span>
              ))}
            </div>
            <p className="paid-by">Added by {person(item.addedBy).name}</p>
          </article>
        </SwipeCard>
      </div>
      <div className="round-actions">
        <button className="round pass" disabled={locked} onClick={() => onVote('pass')} aria-label="Pass">
          <span>✕</span>
          Pass
        </button>
        <button className="round claim" disabled={locked} onClick={() => onVote('claim')} aria-label="Claim">
          <span>✓</span>
          Claim
        </button>
      </div>
      <p className="votes-pill">
        {waiting && !mine ? 'Sending…' : mine ? `You ${mine === 'claim' ? 'claimed' : 'passed'} · ` : ''}
        Votes in: {votesIn}/{house.length}
      </p>
      {done && (
        <div className={`split-toast ${unclaimed ? 'unclaimed' : ''}`}>
          {unclaimed
            ? `Nobody claimed it · split evenly across all ${house.length}, ${money(item.price / house.length)} each`
            : `${people.length} claimed · ${money(share)} each`}
        </div>
      )}
    </section>
  )
}

function SwipeCard({ children, onClaim, onPass, locked }) {
  const ref = useRef(null)
  const startX = useRef(null)
  const dx = useRef(0)
  const [offset, setOffset] = useState(0)
  const [fly, setFly] = useState('')

  function pointerDown(e) {
    if (locked) return
    startX.current = e.clientX
    dx.current = 0
    ref.current?.setPointerCapture(e.pointerId)
  }
  function pointerMove(e) {
    if (locked || startX.current === null) return
    dx.current = e.clientX - startX.current
    setOffset(dx.current)
  }
  function pointerUp() {
    if (locked) return
    const x = dx.current
    startX.current = null
    if (x > 90) {
      setFly('right')
      setTimeout(onClaim, 220)
    } else if (x < -90) {
      setFly('left')
      setTimeout(onPass, 220)
    } else setOffset(0)
    dx.current = 0
  }

  return (
    <div
      ref={ref}
      className={`swipe ${fly}`}
      style={{ transform: fly ? undefined : `translateX(${offset}px) rotate(${offset / 18}deg)` }}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={() => {
        startX.current = null
        setOffset(0)
      }}
    >
      {children}
    </div>
  )
}

function WhoIsIn({ house, list, skip = '' }) {
  return (
    <ul className="who-in">
      {house
        .filter((h) => h.id !== skip)
        .map((h) => (
          <li key={h.id} className={list.includes(h.id) ? 'in' : ''} style={{ '--hue': h.hue }}>
            <span className="avatar sm">{h.initial}</span>
            <span>{list.includes(h.id) ? 'in' : '…'}</span>
          </li>
        ))}
    </ul>
  )
}

function Shield({ className = '', off = false }) {
  return (
    <svg className={`shield ${off ? 'off' : ''} ${className}`} viewBox="0 0 24 28" aria-hidden="true">
      <path d="M12 1 2 5v8c0 6.6 4.3 11.8 10 14 5.7-2.2 10-7.4 10-14V5L12 1Z" />
      <path className="half" d="M12 1v26c5.7-2.2 10-7.4 10-14V5L12 1Z" />
    </svg>
  )
}

/** Veto tokens live only on this phone, so spending one never tells the table who vetoed. */
function useVetoTokens(seat) {
  const [, bump] = useReducer((n) => n + 1, 0)
  const now = new Date()
  const key = `weekly-split-veto:${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}:${seat}`
  const used = Number(window.localStorage.getItem(key) || 0)
  const left = Math.max(0, VETO_TOKENS_PER_MONTH - used)
  const spend = () => {
    window.localStorage.setItem(key, String(used + 1))
    bump()
  }
  return { left, spend }
}

function Veto({ me, house, receipt, votes, settlement, vetoIn, answered, onVote }) {
  const tokens = useVetoTokens(me || 'watcher')
  const playing = house.some((h) => h.id === me)
  const waiting = house.length - vetoIn.length
  const total = settlement.total
  const unclaimed = receiptTotal(receipt.items.filter((item) => isUnclaimed(votes, item.id, house)))

  function playVeto() {
    tokens.spend()
    onVote('veto')
  }

  return (
    <section className="screen veto">
      <h2 className="screen-title">Pre-Lock Review</h2>
      <div className="total-box">
        <div>
          <span>Household Total</span>
          <strong>{money(total)}</strong>
        </div>
        <div>
          <span>Your Share</span>
          <strong>{playing ? money(settlement.shares[me] || 0) : '—'}</strong>
        </div>
      </div>

      {playing && (
        <div className="token-box">
          <p>
            <strong>Your Veto Tokens</strong>
            <br />
            {tokens.left} of {VETO_TOKENS_PER_MONTH} remaining this month
          </p>
          <div className="token-row">
            {Array.from({ length: VETO_TOKENS_PER_MONTH }, (_, i) => (
              <Shield key={i} off={i >= tokens.left} />
            ))}
          </div>
        </div>
      )}

      <ul className="bill-list">
        <li>
          <span className="who">
            🧾 {receipt.name} · {person(receipt.payer).name} paid
          </span>
          <span className="mono">{money(total)}</span>
        </li>
        {unclaimed > 0 && (
          <li>
            <span className="who">🧾 Unclaimed · split evenly</span>
            <span className="mono">{money(unclaimed)}</span>
          </li>
        )}
      </ul>

      <ul className="bill-list compact">
        {house.map((h) => (
          <li key={h.id}>
            <span className="who">
              <span className="avatar sm" style={{ background: h.hue }}>
                {h.initial}
              </span>
              {h.name}
            </span>
            <span className="mono">{money(settlement.shares[h.id] || 0)}</span>
          </li>
        ))}
      </ul>

      <div className="veto-actions">
        <button className="primary fair" disabled={answered || !playing} onClick={() => onVote('fair')}>
          Looks Fair
        </button>
        <button className="primary veto-btn" disabled={answered || !playing || tokens.left === 0} onClick={playVeto}>
          <Shield className="btn-shield" />
          <span>
            Play Veto Card
            <small>(Anonymous)</small>
          </span>
        </button>
      </div>
      <WhoIsIn house={house} list={vetoIn} />
      <p className="waiting">
        {!playing
          ? 'Only seated housemates answer.'
          : answered
            ? waiting
              ? `You're in. Waiting on ${waiting} more`
              : 'Everyone is in'
            : tokens.left === 0
              ? 'No veto tokens left this month. You can still say it looks fair.'
              : 'No name is sent. Every phone only learns whether a veto was played.'}
      </p>
    </section>
  )
}

function TableTalk({ me, house, endsAt, items, talkReady, answered, onReady }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(tick)
  }, [])
  const remaining = Math.min(DELAYS.talk, Math.max(0, endsAt - now))
  const secs = Math.ceil(remaining / 1000)
  const clock = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
  const ring = 2 * Math.PI * 54
  const playing = house.some((h) => h.id === me)
  const waiting = house.length - talkReady.length

  return (
    <section className="screen talk">
      <header className="talk-banner">
        <Shield className="alert-shield" />
        <h2>VETO PLAYED!</h2>
        <p>The house demands a review of the heavy hitters.</p>
      </header>
      <div className="talk-body">
        <div className="talk-clock">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="track" cx="60" cy="60" r="54" />
            <circle
              className="left"
              cx="60"
              cy="60"
              r="54"
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - remaining / DELAYS.talk)}
            />
          </svg>
          <div>
            <strong>{clock}</strong>
            <span>Table Talk Time</span>
          </div>
        </div>
        <div className="spotlight">
          {items.map((item) => (
            <article key={item.id}>
              <span className="review-tag">REVIEW</span>
              <strong>{money(item.price)}</strong>
              <span>{item.name}</span>
            </article>
          ))}
        </div>
        <p className="talk-prompt">Discuss with the room or proceed to blind vote</p>
        {playing && (
          <button className="primary talk-go" disabled={answered} onClick={onReady}>
            {!answered ? 'Proceed to blind vote' : waiting ? `Ready · waiting on ${waiting} more` : 'Starting the blind vote…'}
          </button>
        )}
        <WhoIsIn house={house} list={talkReady} />
      </div>
    </section>
  )
}

function ReviewResult({ result, house }) {
  return (
    <div className="split-toast review-toast">
      {result.type === 'slider' && (
        <div>
          <p>Recut by appetite</p>
          <ul>
            {house.map((h) => (
              <li key={h.id}>
                {h.name} · {money(result.shares[h.id] || 0)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {result.type === 'personal' && (
        <p>
          The house has spoken: Personal. Assigned to {person(result.owner).name}.
          <br />
          <small>
            {result.tally.personal} personal · {result.tally.communal} communal
          </small>
        </p>
      )}
      {result.type === 'communal' && (
        <p>
          The house says Communal. It stays split.
          <br />
          <small>
            {result.tally.communal} communal · {result.tally.personal} personal
          </small>
        </p>
      )}
    </div>
  )
}

function Review({ me, house, item, reviewIndex, total, answeredBy, answered, result, onVote }) {
  const [stop, setStop] = useState(0)
  const playing = house.some((h) => h.id === me)
  const locked = answered || !playing || Boolean(result)
  const status = (
    <p className="votes-pill">
      {result ? 'Results revealed' : `Votes in: ${answeredBy.length}/${house.length}${answeredBy.length < house.length ? ' waiting on table…' : ''}`}
    </p>
  )

  if (item.tag === 'shareable') {
    const pick = SLIDER_STOPS[stop]
    return (
      <section className={`screen review slider-screen ${result ? 'revealed' : ''}`}>
        <p className="kicker warn">
          Review · {reviewIndex + 1}/{total} · The Slider of Fairness
        </p>
        <p className="run-title">
          {item.name} ({money(item.price)} Total)
        </p>
        <p className="emoji hero">{item.emoji || '🍽️'}</p>
        <h2 className="prompt-big">Be honest, how hard did you hit this one?</h2>
        <div className="fair-slider">
          <div className="fair-track">
            <span className="fill" style={{ width: `${(stop / (SLIDER_STOPS.length - 1)) * 100}%` }} />
            {SLIDER_STOPS.map((s, i) => (
              <button
                key={s.value}
                className={`stop ${i === stop ? 'on' : ''}`}
                style={{ left: `${(i / (SLIDER_STOPS.length - 1)) * 100}%` }}
                disabled={locked}
                onClick={() => setStop(i)}
                aria-label={`${s.label} ${s.value}%`}
              >
                {i === stop && (
                  <span className={`share-badge ${i === 0 ? 'at-start' : i === SLIDER_STOPS.length - 1 ? 'at-end' : ''}`}>
                    Your Share: {money((item.price * s.value) / 100)}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="fair-labels">
            {SLIDER_STOPS.map((s, i) => (
              <button key={s.value} className={i === stop ? 'on' : ''} disabled={locked} onClick={() => setStop(i)}>
                <strong>{s.label}</strong>
                <span>
                  ({s.value}% · {money((item.price * s.value) / 100)})
                </span>
              </button>
            ))}
          </div>
        </div>
        {!locked && (
          <button className="primary lock-portion" onClick={() => onVote(pick.value)}>
            Lock My Portion
          </button>
        )}
        {!result && <p className="hint">Shares are scaled at the end so they add up to {money(item.price)}.</p>}
        {status}
        {result && <ReviewResult result={result} house={house} />}
      </section>
    )
  }

  return (
    <section className={`screen review blind ${result ? 'revealed' : ''}`}>
      <p className="kicker warn">
        Review · {reviewIndex + 1}/{total}
      </p>
      <h2 className="screen-title">Blind Item Vote</h2>
      <p className="lede tight center">Cast your secret vote — results revealed together</p>
      <article className="item-card">
        <span className="item-art">{item.emoji || '🧾'}</span>
        <div>
          <strong>{money(item.price)}</strong>
          <span>{item.name}</span>
        </div>
        <span className="added-by">Added by: {person(item.addedBy).name}</span>
      </article>
      <div className="split-vote">
        <button className="communal" disabled={locked} onClick={() => onVote('communal')}>
          Communal
          <small>(Shared by all)</small>
        </button>
        <button className="personal" disabled={locked} onClick={() => onVote('personal')}>
          Personal
          <small>(Private stash)</small>
        </button>
      </div>
      {answered && !result && <p className="waiting">Your vote is in. Nobody sees it until the reveal.</p>}
      {status}
      {result && <ReviewResult result={result} house={house} />}
    </section>
  )
}

function BountyCard({ chore, amount }) {
  return (
    <div className="parchment">
      <h3>
        Bounty Card:
        <br />
        {chore.label}
      </h3>
      <hr />
      <p>
        I will {chore.pitch} to offset {money(amount)} of my debt.
      </p>
    </div>
  )
}

function Bounty({
  me,
  house,
  settlement,
  bounties,
  draftBounty,
  ready,
  proposing,
  voted,
  readyPending,
  onPropose,
  onVote,
  onReady,
}) {
  const playing = house.some((h) => h.id === me)
  const net = settlement.nets[me] || 0
  const isProposer = draftBounty?.from === me
  const imReady = ready.includes(me) || readyPending
  const draftChore = draftBounty ? choreById(draftBounty.choreId) : null

  if (draftBounty && draftChore) {
    const proposer = person(draftBounty.from)
    const voters = house.length - 1
    return (
      <section className="screen bounty">
        <h2 className="screen-title">House Bounty Proposal</h2>
        <p className="offset-pill">Debt Offset Request: -{money(draftBounty.amount)}</p>
        <BountyCard chore={draftChore} amount={draftBounty.amount} />
        <div className="proposer">
          <span className="avatar lg" style={{ '--hue': proposer.hue }}>
            {proposer.initial}
          </span>
          <div>
            <strong>{isProposer ? 'You' : proposer.name}</strong>
            <span>
              House Vote: {draftBounty.in.length}/{voters} in
            </span>
          </div>
        </div>
        {playing && !isProposer && !voted ? (
          <div className="trade-actions">
            <button className="accept" onClick={() => onVote('accept')}>
              Accept Trade
            </button>
            <button className="decline" onClick={() => onVote('reject')}>
              Decline Trade
            </button>
          </div>
        ) : (
          <p className="waiting">
            {isProposer ? 'The house is voting on your card.' : 'Your vote is in.'} Votes are secret — only the result is shown.
          </p>
        )}
        <WhoIsIn house={house} list={draftBounty.in} skip={draftBounty.from} />
      </section>
    )
  }

  return (
    <section className="screen bounty">
      <h2 className="screen-title">House Bounty</h2>
      <p className="lede tight center">
        {!playing
          ? 'Watching the bounty round.'
          : net > 0
            ? `You still owe ${money(net)}. Offer a chore to offset some of it.`
            : 'You are owed this week. Vote on any card, or say you are ready to lock.'}
      </p>
      <ul className="bill-list compact">
        {house.map((h) => (
          <li key={h.id}>
            <span>{h.name}</span>
            <span className={(settlement.nets[h.id] || 0) > 0 ? 'owe' : 'owed'}>
              {(settlement.nets[h.id] || 0) > 0.009
                ? `owes ${money(settlement.nets[h.id])}`
                : (settlement.nets[h.id] || 0) < -0.009
                  ? `owed ${money(-settlement.nets[h.id])}`
                  : 'even'}
            </span>
          </li>
        ))}
      </ul>

      {bounties.map((b, i) => (
        <p key={i} className={`bounty-note ${b.accepted ? 'yes' : 'no'}`}>
          {person(b.from).name} · {choreById(b.choreId)?.label} · -{money(b.amount)} ·{' '}
          {b.accepted ? 'Accepted' : 'Declined'} {b.total ? `${b.yes}/${b.total}` : ''}
        </p>
      ))}

      {playing && (
        <>
          <p className="prompt">Play a bounty card</p>
          <div className="chore-list">
            {CHORES.map((c) => (
              <button key={c.id} className="chore" disabled={proposing} onClick={() => onPropose(c.id)}>
                <strong>{c.label}</strong>
                <span>-{money(c.amount)}</span>
              </button>
            ))}
          </div>
          <button className="primary" disabled={imReady} onClick={onReady}>
            {imReady ? 'Ready — waiting for the others' : 'Ready to lock the bill'}
          </button>
        </>
      )}
      <p className="waiting">
        {ready.length}/{house.length} ready · the bill locks when everyone is ready
      </p>
    </section>
  )
}

function Locked({ settlement, receipt, house, bounties, isHost, onReset, onLeave }) {
  return (
    <section className="screen locked">
      <p className="kicker">Ritual complete</p>
      <h2>Bill locked</h2>
      <p className="lede tight">No cold push notification. You played the settlement together.</p>
      <h3 className="pay-title">Who pays whom</h3>
      <div className="transfers">
        {settlement.transfers.length === 0 && <p className="transfer-row">Everyone is even.</p>}
        {settlement.transfers.map((t) => (
          <p
            key={`${t.from}-${t.to}-${t.amount}`}
            className="transfer-row"
            style={{ color: '#241c16', background: '#fffaf1' }}
          >
            <span>
              {person(t.from).name} pays {person(t.to).name}
            </span>
            <strong>{money(t.amount)}</strong>
          </p>
        ))}
      </div>
      <div className="breakdown">
        {house.map((h) => (
          <article key={h.id}>
            <header>
              <span className="avatar sm" style={{ background: h.hue }}>
                {h.initial}
              </span>
              <div>
                <strong>{h.name}</strong>
                <p>
                  Share {money(settlement.shares[h.id] || 0)} · paid {money(settlement.paid[h.id] || 0)}
                </p>
              </div>
            </header>
            <ul>
              {(settlement.lines[h.id] || []).map((line) => (
                <li key={line.item.id}>
                  <span>{line.item.name}</span>
                  <span>{money(line.amount)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {bounties
        .filter((b) => b.accepted)
        .map((b, i) => (
          <p key={i} className="bounty-note yes">
            Bounty on: {person(b.from).name} · {choreById(b.choreId)?.label}
          </p>
        ))}
      <p className="hint">
        {person(receipt.payer).name} paid for {receipt.name} ({money(settlement.total)})
      </p>
      {isHost ? (
        <button className="primary" onClick={onReset}>
          Back to the lobby for next Sunday
        </button>
      ) : (
        <p className="hint">The host can take everyone back to the lobby.</p>
      )}
      <button className="ghost pass" onClick={onLeave}>
        Leave table
      </button>
    </section>
  )
}
