import { useEffect, useMemo, useRef, useState } from 'react'
import { CHORES, ITEMS, PAYERS, houseOf } from './data'
import { allVoted, claimers, computeSettlement, money, person } from './engine'
import { DELAYS, botSeats, choreById, currentItem, currentOrphan, currentReview, houseSeats } from './game'
import { cleanCode, clientId, randomCode, readRoomFromHash, roomLink, writeRoomHash } from './room'
import { useRoom } from './useRoom'

const PHASES = [
  { id: 'draft', label: 'Draft' },
  { id: 'orphan', label: 'Orphan' },
  { id: 'veto', label: 'Veto' },
  { id: 'review', label: 'Review' },
  { id: 'bounty', label: 'Bounty' },
  { id: 'locked', label: 'Lock' },
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
    () => (g ? computeSettlement(g.votes, g.reviewResults, g.orphanMap, g.bounties, house) : null),
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
      {phase !== 'lobby' && phase !== 'flash' && (
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

      {phase === 'draft' && currentItem(g) && (
        <Draft
          me={me}
          house={house}
          item={currentItem(g)}
          itemIndex={g.itemIndex}
          votes={g.votes}
          waiting={room.pending('vote', currentItem(g).id)}
          onVote={(choice) => send({ type: 'vote', itemId: currentItem(g).id, choice })}
        />
      )}

      {phase === 'orphan' && currentOrphan(g) && (
        <Orphan
          item={currentOrphan(g)}
          house={house}
          spin={g.spin}
          me={me}
          seats={g.seats}
          waiting={room.pending('orphan', currentOrphan(g).id)}
          onChoose={(choice) => send({ type: 'orphan', itemId: currentOrphan(g).id, choice })}
        />
      )}

      {phase === 'veto' && (
        <Veto
          me={me}
          house={house}
          settlement={settlement}
          vetoIn={g.vetoIn}
          answered={g.vetoIn.includes(me) || room.pending('veto')}
          onVote={(choice) => send({ type: 'veto', choice })}
        />
      )}

      {phase === 'flash' && <VetoFlash />}

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
  const grocery = ITEMS.filter((i) => i.receipt === 'grocery').reduce((s, i) => s + i.price, 0)
  return (
    <section className="screen welcome">
      <p className="kicker">Synchronous colocated settlement</p>
      <h1>The Weekly Split</h1>
      <p className="lede">
        Sunday night, one table, ten minutes. Every housemate plays on their own phone, live. The app takes the blame.
      </p>
      <div className="receipt-mini">
        <div className="receipt-head">
          <span>This week</span>
          <span>SUN  SETTLEMENT</span>
        </div>
        {ITEMS.map((row) => (
          <div key={row.id} className="receipt-line">
            <span>{row.name}</span>
            <span>{money(row.price)}</span>
          </div>
        ))}
        <div className="receipt-line total">
          <span>Groceries + pizza</span>
          <span>{money(grocery + 80)}</span>
        </div>
      </div>
      <p className="prompt">Open a table on this phone</p>
      <div className="vote-row">
        <button className="primary" onClick={() => onCreate(4)}>
          4 people
        </button>
        <button className="primary" onClick={() => onCreate(5)}>
          5 people
        </button>
      </div>
      <p className="prompt">Or join a housemate’s table</p>
      <div className="join-row">
        <input
          className="code-input"
          value={joinInput}
          maxLength={4}
          placeholder="K7M2"
          autoCapitalize="characters"
          onChange={(e) => setJoinInput(cleanCode(e.target.value))}
          onKeyDown={(e) => e.key === 'Enter' && onJoin()}
        />
        <button className="ghost claim" disabled={joinInput.length !== 4} onClick={onJoin}>
          Join
        </button>
      </div>
      <p className="hint">
        One person opens a table and shares the 4-letter code or invite link. Everyone else joins on their own phone.
        Empty seats can be played by NPC housemates.
      </p>
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
          Deal the receipt to every phone
        </button>
      ) : (
        <p className="hint">Waiting for the host to deal the receipt.</p>
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

function Draft({ me, house, item, itemIndex, votes, waiting, onVote }) {
  const mine = votes[item.id]?.[me]
  const people = claimers(votes, item.id, house)
  const done = allVoted(votes, item.id, house)
  const orphan = done && people.length === 0
  const share = people.length ? item.price / people.length : 0
  const playing = house.some((h) => h.id === me)
  const locked = !playing || Boolean(mine) || waiting || done

  return (
    <section className="screen draft">
      <p className="progress">
        Receipt draft · {itemIndex + 1}/{ITEMS.length}
      </p>
      <p className="sub">Swipe right to Claim · left to Pass · waiting on every phone</p>
      <SwipeCard key={item.id} locked={locked} onClaim={() => onVote('claim')} onPass={() => onVote('pass')}>
        <article className={`deal-card tag-${item.tag}`}>
          <span className="stamp-tag">{TAG_LABEL[item.tag] || 'Communal'}</span>
          <p className="emoji">{item.emoji}</p>
          <h2>{item.name}</h2>
          <p className="detail">{item.detail}</p>
          <p className="price">{money(item.price)}</p>
          <p className="paid-by">Cart: {person(item.addedBy).name}</p>
        </article>
      </SwipeCard>
      <div className="vote-row">
        <button className="ghost pass" disabled={locked} onClick={() => onVote('pass')}>
          Pass
        </button>
        <button className="ghost claim" disabled={locked} onClick={() => onVote('claim')}>
          Claim
        </button>
      </div>
      {waiting && !mine && <p className="waiting">Sending…</p>}
      <ul className="live-votes">
        {house.map((h) => {
          const v = votes[item.id]?.[h.id]
          return (
            <li key={h.id} className={v || ''}>
              <span className="avatar sm" style={{ background: h.hue }}>
                {h.initial}
              </span>
              <span>{v === 'claim' ? 'Claim' : v === 'pass' ? 'Pass' : '...'}</span>
            </li>
          )
        })}
      </ul>
      {done && (
        <div className={`split-toast ${orphan ? 'orphan' : ''}`}>
          {orphan ? 'Nobody claimed it · this is an Orphan' : `${people.length} claimed · ${money(share)} each`}
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

function Orphan({ item, house, spin, me, seats, waiting, onChoose }) {
  const [time, setTime] = useState(10)
  const [spinning, setSpinning] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [deg, setDeg] = useState(0)
  const [duration, setDuration] = useState(DELAYS.spin)
  const slice = 360 / house.length
  const winnerId = spin?.winnerId || ''
  const spinAt = spin?.at || 0

  useEffect(() => {
    if (!winnerId) return undefined
    const remaining = Math.min(DELAYS.spin, Math.max(0, DELAYS.spin - (Date.now() - spinAt)))
    const idx = Math.max(0, house.findIndex((h) => h.id === winnerId))
    const land = 360 * 6 + 360 - slice / 2 - idx * slice
    setDuration(remaining)
    setSpinning(true)
    setRevealed(false)
    setTime(Math.ceil(remaining / 1000))
    const start = requestAnimationFrame(() => setDeg(land))
    const tick = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000)
    const stop = setTimeout(() => {
      setSpinning(false)
      setRevealed(true)
      setTime(0)
      clearInterval(tick)
    }, remaining)
    return () => {
      cancelAnimationFrame(start)
      clearInterval(tick)
      clearTimeout(stop)
    }
  }, [winnerId, spinAt, house, slice])

  const wheelBg = `conic-gradient(from -90deg, ${house
    .map((h, i) => `${h.hue} ${i * slice}deg ${(i + 1) * slice}deg`)
    .join(', ')})`
  const winner = revealed && winnerId ? person(winnerId) : null
  const winnerIsBot = winnerId && !seats[winnerId]
  const canChoose = Boolean(winner) && !waiting && me === winnerId

  return (
    <section className="screen orphan">
      <p className="kicker warn">Orphan item penalty</p>
      <h2>{item.name}</h2>
      <p className="price">{money(item.price)}</p>
      <p className="lede tight">
        {winnerId ? 'Everyone passed. The same wheel is spinning on every phone.' : 'Waiting for the table to spin…'}
      </p>
      <div className="wheel-wrap">
        <div className="needle" />
        <div
          className="wheel"
          style={{
            background: wheelBg,
            transform: `rotate(${deg}deg)`,
            transition: spinning ? `transform ${duration}ms cubic-bezier(.12,.7,.08,1)` : 'none',
          }}
        />
        <div className="timer">{time}</div>
      </div>
      <ul className="wheel-legend">
        {house.map((h) => (
          <li key={h.id}>
            <span style={{ background: h.hue }} />
            {h.name}
          </li>
        ))}
      </ul>
      {winner && (
        <div className="orphan-result">
          <p>{winner.name} got tagged</p>
          {canChoose ? (
            <div className="vote-row">
              <button className="ghost pass" onClick={() => onChoose('pay')}>
                Absorb the cost
              </button>
              <button className="ghost claim" onClick={() => onChoose('chore')}>
                {item.chore || 'Do the chore'}
              </button>
            </div>
          ) : (
            <p className="waiting">
              {waiting
                ? 'Sending…'
                : winnerIsBot
                  ? `NPC ${winner.name} absorbs the cost.`
                  : `Waiting for ${winner.name} to choose on their phone.`}
            </p>
          )}
        </div>
      )}
    </section>
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

function Veto({ me, house, settlement, vetoIn, answered, onVote }) {
  const playing = house.some((h) => h.id === me)
  const waiting = house.length - vetoIn.length
  return (
    <section className="screen veto">
      <p className="kicker">Before we lock</p>
      <h2>Does this look fair?</h2>
      <p className="lede tight">
        Your answer is counted privately. Every phone only learns whether a veto was played — never who played it.
      </p>
      <ul className="bill-list">
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
      <p className="hint">
        Drew floated groceries {money(settlement.groceryTotal)} · Casey floated pizza {money(settlement.pizzaTotal)}
      </p>
      <div className="veto-actions">
        <button className="primary fair" disabled={answered || !playing} onClick={() => onVote('fair')}>
          Looks Fair
        </button>
        <button className="primary veto-btn" disabled={answered || !playing} onClick={() => onVote('veto')}>
          Play Veto Card
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
            : 'Answer on your own phone'}
      </p>
    </section>
  )
}

function VetoFlash() {
  return (
    <section className="screen flash">
      <div className="stamp">VETO</div>
      <h2>Veto played</h2>
      <p>The house demands a review of the heavy hitters. Nobody is named. The fight stays on-screen.</p>
    </section>
  )
}

function Review({ me, house, item, reviewIndex, total, answeredBy, answered, result, onVote }) {
  const [sliderVal, setSliderVal] = useState(25)
  const playing = house.some((h) => h.id === me)
  const isSlider = item.tag === 'shareable'
  const locked = answered || !playing || Boolean(result)

  return (
    <section className={`screen review ${result ? 'revealed' : ''}`}>
      <p className="kicker warn">
        Review phase · {reviewIndex + 1}/{total}
      </p>
      <p className="emoji">{item.emoji}</p>
      <h2>{item.name}</h2>
      <p className="price">{money(item.price)}</p>

      {isSlider ? (
        <>
          <p className="lede tight">Be honest, how hard did you hit the pizza tonight?</p>
          <div className="slider-block">
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              disabled={locked}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
            />
            <div className="slider-labels">
              <span>Nibble 10%</span>
              <span>Average 25%</span>
              <span>Feral 50%</span>
            </div>
            {!locked && (
              <button className="primary" onClick={() => onVote(sliderVal)}>
                Lock in {sliderVal}%
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <p className="lede tight">Communal for the house, or someone’s private stash?</p>
          <div className="vote-row stack">
            <button className="ghost claim" disabled={locked} onClick={() => onVote('communal')}>
              Communal
            </button>
            <button className="ghost pass" disabled={locked} onClick={() => onVote('personal')}>
              Personal
            </button>
          </div>
        </>
      )}

      {!result && (
        <>
          <WhoIsIn house={house} list={answeredBy} />
          <p className="waiting">Answers stay private until everyone is in.</p>
        </>
      )}

      {result && (
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
              The tribe has spoken: Personal. Assigned to {person(result.owner).name}.
              <br />
              <small>
                {result.tally.personal} personal · {result.tally.communal} communal
              </small>
            </p>
          )}
          {result.type === 'communal' && (
            <p>
              The tribe says Communal. It stays split.
              <br />
              <small>
                {result.tally.communal} communal · {result.tally.personal} personal
              </small>
            </p>
          )}
        </div>
      )}
    </section>
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

  return (
    <section className="screen bounty">
      <p className="kicker">Barter · Bounty card</p>
      <h2>Chores can settle debt</h2>
      <p className="lede tight">
        {!playing
          ? 'Watching the bounty round.'
          : net > 0
            ? `You still owe ${money(net)}. Play a bounty card and trade labour for relief.`
            : 'You are owed this week. Vote on proposals, or say you are ready to lock.'}
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
          {person(b.from).name} · {choreById(b.choreId)?.label} · {money(b.amount)} ·{' '}
          {b.accepted ? 'accepted' : 'rejected'}
        </p>
      ))}

      {!draftBounty && playing && (
        <div className="chore-list">
          {CHORES.map((c) => (
            <button key={c.id} className="chore" disabled={proposing} onClick={() => onPropose(c.id)}>
              <strong>{c.label}</strong>
              <span>Forgive {money(c.amount)}</span>
            </button>
          ))}
        </div>
      )}

      {draftBounty && draftChore && (
        <div className="proposal">
          <p>
            {person(draftBounty.from).name} proposes: {draftChore.label} / {money(draftBounty.amount)}
          </p>
          {playing && !isProposer && !voted && (
            <div className="vote-row">
              <button className="ghost claim" onClick={() => onVote('accept')}>
                Accept
              </button>
              <button className="ghost pass" onClick={() => onVote('reject')}>
                Reject
              </button>
            </div>
          )}
          <WhoIsIn house={house} list={draftBounty.in} skip={draftBounty.from} />
          <p className="waiting">Votes are secret — only the result is shown.</p>
        </div>
      )}

      {playing && (
        <button className="primary" disabled={imReady || Boolean(draftBounty)} onClick={onReady}>
          {imReady ? 'Ready — waiting for the others' : 'Ready to lock the bill'}
        </button>
      )}
      <p className="waiting">
        {ready.length}/{house.length} ready · the bill locks when everyone is ready
      </p>
    </section>
  )
}

function Locked({ settlement, house, bounties, isHost, onReset, onLeave }) {
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
        Floated by {person(PAYERS.grocery).name} (groceries) and {person(PAYERS.pizza).name} (pizza)
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
