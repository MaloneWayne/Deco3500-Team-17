import { useEffect, useMemo, useRef, useState } from 'react'
import { CHORES, HOUSEMATES, ITEMS, npcReview, npcVeto, npcVote, PAYERS } from './data'
import {
  allVoted,
  bountyAccepted,
  claimers,
  computeSettlement,
  money,
  orphansOf,
  person,
  resolveReview,
  reviewReady,
  topExpensive,
} from './engine'

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
  const [phase, setPhase] = useState('welcome')
  const [me, setMe] = useState('alex')
  const [autoNpc, setAutoNpc] = useState(true)
  const [itemIndex, setItemIndex] = useState(0)
  const [votes, setVotes] = useState({})
  const [showSplit, setShowSplit] = useState(false)
  const [orphanMap, setOrphanMap] = useState({})
  const [orphanQueue, setOrphanQueue] = useState([])
  const [orphanIndex, setOrphanIndex] = useState(0)
  const [vetoVotes, setVetoVotes] = useState({})
  const [reviewList, setReviewList] = useState([])
  const [reviewIndex, setReviewIndex] = useState(0)
  const [reviewVotes, setReviewVotes] = useState({})
  const [showReviewResult, setShowReviewResult] = useState(false)
  const [bounties, setBounties] = useState([])
  const [draftBounty, setDraftBounty] = useState(null)
  const item = ITEMS[itemIndex]
  const orphanItem = orphanQueue[orphanIndex]
  const reviewItem = reviewList[reviewIndex]

  const settlement = useMemo(
    () => computeSettlement(votes, reviewVotes, orphanMap, bounties.filter((b) => b.accepted)),
    [votes, reviewVotes, orphanMap, bounties],
  )

  useEffect(() => {
    if (phase !== 'draft' || !item || !autoNpc) return
    const timers = HOUSEMATES.filter((h) => h.id !== me).map((h, i) =>
      setTimeout(() => {
        setVotes((prev) => {
          if (prev[item.id]?.[h.id]) return prev
          return {
            ...prev,
            [item.id]: { ...prev[item.id], [h.id]: npcVote(item.id, h.id) },
          }
        })
      }, 700 + i * 320),
    )
    return () => timers.forEach(clearTimeout)
  }, [phase, item?.id, me, autoNpc, itemIndex])

  useEffect(() => {
    if (phase !== 'draft' || !item) return
    if (!allVoted(votes, item.id)) {
      setShowSplit(false)
      return
    }
    setShowSplit(true)
    const t = setTimeout(() => {
      setShowSplit(false)
      if (itemIndex < ITEMS.length - 1) setItemIndex((i) => i + 1)
      else {
        const orphans = orphansOf(votes)
        if (orphans.length) {
          setOrphanQueue(orphans)
          setOrphanIndex(0)
          setPhase('orphan')
        } else setPhase('veto')
      }
    }, 1600)
    return () => clearTimeout(t)
  }, [votes, phase, item?.id, itemIndex])

  useEffect(() => {
    if (phase !== 'veto' || !autoNpc) return
    const timers = HOUSEMATES.filter((h) => h.id !== me).map((h, i) =>
      setTimeout(() => {
        setVetoVotes((prev) => {
          if (prev[h.id]) return prev
          return { ...prev, [h.id]: npcVeto(h.id, me) || 'fair' }
        })
      }, 500 + i * 280),
    )
    return () => timers.forEach(clearTimeout)
  }, [phase, me, autoNpc])

  useEffect(() => {
    if (phase !== 'veto') return
    if (!HOUSEMATES.every((h) => vetoVotes[h.id])) return
    const t = setTimeout(() => {
      const played = HOUSEMATES.some((h) => vetoVotes[h.id] === 'veto')
      if (played) setPhase('flash')
      else setPhase('bounty')
    }, 900)
    return () => clearTimeout(t)
  }, [vetoVotes, phase])

  useEffect(() => {
    if (phase !== 'flash') return
    const heavy = topExpensive(votes, 3)
    setReviewList(heavy)
    setReviewIndex(0)
    setReviewVotes({})
    const t = setTimeout(() => setPhase('review'), 2400)
    return () => clearTimeout(t)
  }, [phase, votes])

  useEffect(() => {
    if (phase !== 'review' || !reviewItem || !autoNpc) return
    const timers = HOUSEMATES.filter((h) => h.id !== me).map((h, i) =>
      setTimeout(() => {
        setReviewVotes((prev) => {
          if (prev[reviewItem.id]?.[h.id] !== undefined) return prev
          return {
            ...prev,
            [reviewItem.id]: { ...prev[reviewItem.id], [h.id]: npcReview(reviewItem.id, h.id) },
          }
        })
      }, 600 + i * 280),
    )
    return () => timers.forEach(clearTimeout)
  }, [phase, reviewItem?.id, me, autoNpc, reviewIndex])

  useEffect(() => {
    if (phase !== 'review' || !reviewItem) return
    if (!reviewReady(reviewItem, reviewVotes)) {
      setShowReviewResult(false)
      return
    }
    setShowReviewResult(true)
    const t = setTimeout(() => {
      setShowReviewResult(false)
      if (reviewIndex < reviewList.length - 1) setReviewIndex((i) => i + 1)
      else setPhase('bounty')
    }, 2200)
    return () => clearTimeout(t)
  }, [reviewVotes, phase, reviewItem?.id, reviewIndex, reviewList.length])

  useEffect(() => {
    if (phase !== 'bounty' || !draftBounty || !autoNpc) return
    const timers = HOUSEMATES.filter((h) => h.id !== draftBounty.from && h.id !== me).map((h, i) =>
      setTimeout(() => {
        setDraftBounty((prev) => {
          if (!prev || prev.votes[h.id]) return prev
          const accept = prev.amount <= 12
          return { ...prev, votes: { ...prev.votes, [h.id]: accept ? 'accept' : 'reject' } }
        })
      }, 600 + i * 300),
    )
    return () => timers.forEach(clearTimeout)
  }, [phase, draftBounty?.from, draftBounty?.amount, autoNpc, me])

  useEffect(() => {
    if (!draftBounty) return
    const voters = HOUSEMATES.filter((h) => h.id !== draftBounty.from)
    if (!voters.every((h) => draftBounty.votes[h.id])) return
    const t = setTimeout(() => {
      const accepted = bountyAccepted(draftBounty)
      setBounties((prev) => [...prev, { ...draftBounty, accepted }])
      setDraftBounty(null)
    }, 1400)
    return () => clearTimeout(t)
  }, [draftBounty])

  function reset() {
    setPhase('welcome')
    setItemIndex(0)
    setVotes({})
    setShowSplit(false)
    setOrphanMap({})
    setOrphanQueue([])
    setOrphanIndex(0)
    setVetoVotes({})
    setReviewList([])
    setReviewIndex(0)
    setReviewVotes({})
    setShowReviewResult(false)
    setBounties([])
    setDraftBounty(null)
  }

  function castVote(choice) {
    if (!item || votes[item.id]?.[me]) return
    setVotes((prev) => ({
      ...prev,
      [item.id]: { ...prev[item.id], [me]: choice },
    }))
  }

  function castVeto(choice) {
    if (vetoVotes[me]) return
    setVetoVotes((prev) => ({ ...prev, [me]: choice }))
  }

  function castReview(value) {
    if (!reviewItem || reviewVotes[reviewItem.id]?.[me] !== undefined) return
    setReviewVotes((prev) => ({
      ...prev,
      [reviewItem.id]: { ...prev[reviewItem.id], [me]: value },
    }))
  }

  return (
    <div className="stage">
      <div className="phone">
        {phase !== 'welcome' && phase !== 'flash' && (
          <TopBar me={me} setMe={setMe} autoNpc={autoNpc} setAutoNpc={setAutoNpc} phase={phase} />
        )}

        {phase === 'welcome' && <Welcome me={me} setMe={setMe} onStart={() => setPhase('draft')} />}

        {phase === 'draft' && item && (
          <Draft me={me} item={item} itemIndex={itemIndex} votes={votes} showSplit={showSplit} onVote={castVote} />
        )}

        {phase === 'orphan' && orphanItem && (
          <Orphan
            item={orphanItem}
            onDone={(winnerId, choice) => {
              setOrphanMap((prev) => ({ ...prev, [orphanItem.id]: { winnerId, choice } }))
              if (orphanIndex < orphanQueue.length - 1) setOrphanIndex((i) => i + 1)
              else setPhase('veto')
            }}
          />
        )}

        {phase === 'veto' && <Veto me={me} settlement={settlement} vetoVotes={vetoVotes} onVote={castVeto} />}

        {phase === 'flash' && <VetoFlash />}

        {phase === 'review' && reviewItem && (
          <Review
            me={me}
            item={reviewItem}
            reviewIndex={reviewIndex}
            total={reviewList.length}
            reviewVotes={reviewVotes}
            showResult={showReviewResult}
            onVote={castReview}
          />
        )}

        {phase === 'bounty' && (
          <Bounty
            me={me}
            settlement={settlement}
            bounties={bounties}
            draftBounty={draftBounty}
            onPropose={(chore) =>
              setDraftBounty({
                from: me,
                chore,
                amount: chore.amount,
                votes: {},
              })
            }
            onVote={(choice) =>
              setDraftBounty((prev) =>
                prev ? { ...prev, votes: { ...prev.votes, [me]: choice } } : prev,
              )
            }
            onSkip={() => {
              setDraftBounty(null)
              setPhase('locked')
            }}
          />
        )}

        {phase === 'locked' && <Locked settlement={settlement} bounties={bounties} onReset={reset} />}
      </div>
    </div>
  )
}

function TopBar({ me, setMe, autoNpc, setAutoNpc, phase }) {
  const activeIndex = Math.max(
    0,
    PHASES.findIndex((p) => p.id === phase),
  )
  return (
    <header className="topbar">
      <div className="brand-row">
        <p className="eyebrow">The Weekly Split</p>
        <div className="top-actions">
          <button className="chip" onClick={() => setAutoNpc((v) => !v)}>
            {autoNpc ? 'NPC on' : 'NPC off'}
          </button>
        </div>
      </div>
      <div className="seats">
        {HOUSEMATES.map((h) => (
          <button
            key={h.id}
            className={`seat ${me === h.id ? 'on' : ''}`}
            style={{ '--hue': h.hue }}
            onClick={() => setMe(h.id)}
          >
            <span className="avatar">{h.initial}</span>
            <span>{h.name}</span>
          </button>
        ))}
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

function Welcome({ me, setMe, onStart }) {
  const grocery = ITEMS.filter((i) => i.receipt === 'grocery').reduce((s, i) => s + i.price, 0)
  return (
    <section className="screen welcome">
      <p className="kicker">Synchronous colocated settlement</p>
      <h1>The Weekly Split</h1>
      <p className="lede">
        Sunday night, one table, ten minutes. A sharehouse ritual that lets the app be the bad guy so nobody else has to.
      </p>
      <div className="receipt-mini">
        <div className="receipt-head">
          <span>This week</span>
          <span>SUN  SETTLEMENT</span>
        </div>
        {ITEMS.map((item) => (
          <div key={item.id} className="receipt-line">
            <span>{item.name}</span>
            <span>{money(item.price)}</span>
          </div>
        ))}
        <div className="receipt-line total">
          <span>Groceries + pizza</span>
          <span>{money(grocery + 80)}</span>
        </div>
      </div>
      <p className="prompt">Who are you tonight?</p>
      <div className="seat-grid">
        {HOUSEMATES.map((h) => (
          <button
            key={h.id}
            className={`seat-card ${me === h.id ? 'on' : ''}`}
            style={{ '--hue': h.hue }}
            onClick={() => setMe(h.id)}
          >
            <span className="avatar lg">{h.initial}</span>
            <strong>{h.name}</strong>
          </button>
        ))}
      </div>
      <button className="primary" onClick={onStart}>
        Deal the receipt
      </button>
      <p className="hint">
        Solo demo: tap an avatar to switch phones. Other housemates auto-swipe unless you turn that off. Play a Veto Card later to see the review phase.
      </p>
    </section>
  )
}

function Draft({ me, item, itemIndex, votes, showSplit, onVote }) {
  const mine = votes[item.id]?.[me]
  const people = claimers(votes, item.id)
  const done = allVoted(votes, item.id)
  const orphan = done && people.length === 0
  const share = people.length ? item.price / people.length : 0

  return (
    <section className="screen draft">
      <p className="progress">
        Receipt draft · {itemIndex + 1}/{ITEMS.length}
      </p>
      <p className="sub">Swipe right to Claim · left to Pass</p>
      <SwipeCard key={item.id} locked={Boolean(mine) || showSplit} onClaim={() => onVote('claim')} onPass={() => onVote('pass')}>
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
        <button className="ghost pass" disabled={Boolean(mine)} onClick={() => onVote('pass')}>
          Pass
        </button>
        <button className="ghost claim" disabled={Boolean(mine)} onClick={() => onVote('claim')}>
          Claim
        </button>
      </div>
      <ul className="live-votes">
        {HOUSEMATES.map((h) => {
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
      {showSplit && (
        <div className={`split-toast ${orphan ? 'orphan' : ''}`}>
          {orphan
            ? 'Nobody claimed it · this is an Orphan'
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

function Orphan({ item, onDone }) {
  const [winnerPick] = useState(() => HOUSEMATES[Math.floor(Math.random() * HOUSEMATES.length)])
  const [time, setTime] = useState(10)
  const [spinning, setSpinning] = useState(true)
  const [winner, setWinner] = useState(null)
  const [deg, setDeg] = useState(0)

  useEffect(() => {
    const pick = winnerPick
    const extra = 360 * 6
    const land = 315 - HOUSEMATES.findIndex((h) => h.id === pick.id) * 90
    const start = requestAnimationFrame(() => setDeg(extra + land))
    const tick = setInterval(() => setTime((t) => (t > 0 ? t - 1 : 0)), 1000)
    const stop = setTimeout(() => {
      setSpinning(false)
      setWinner(pick)
      clearInterval(tick)
    }, 10000)
    return () => {
      cancelAnimationFrame(start)
      clearInterval(tick)
      clearTimeout(stop)
    }
  }, [winnerPick])

  return (
    <section className="screen orphan">
      <p className="kicker warn">Orphan item penalty</p>
      <h2>{item.name}</h2>
      <p className="price">{money(item.price)}</p>
      <p className="lede tight">
        Everyone passed. A 10-second spinner decides who pays — or who does the chore.
      </p>
      <div className="wheel-wrap">
        <div className="needle" />
        <div className="wheel" style={{ transform: `rotate(${deg}deg)`, transition: spinning ? 'transform 10s cubic-bezier(.12,.7,.08,1)' : 'none' }} />
        <div className="timer">{time}</div>
      </div>
      <ul className="wheel-legend">
        {HOUSEMATES.map((h) => (
          <li key={h.id}>
            <span style={{ background: h.hue }} />
            {h.name}
          </li>
        ))}
      </ul>
      {winner && (
        <div className="orphan-result">
          <p>{winner.name} got tagged</p>
          <div className="vote-row">
            <button className="ghost pass" onClick={() => onDone(winner.id, 'pay')}>
              Absorb the cost
            </button>
            <button className="ghost claim" onClick={() => onDone(winner.id, 'chore')}>
              {item.chore || 'Do the chore'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function Veto({ me, settlement, vetoVotes, onVote }) {
  const mine = vetoVotes[me]
  const waiting = HOUSEMATES.filter((h) => !vetoVotes[h.id]).length
  return (
    <section className="screen veto">
      <p className="kicker">Before we lock</p>
      <h2>Does this look fair?</h2>
      <p className="lede tight">Input stays anonymous. A veto never names you — the app takes the heat.</p>
      <ul className="bill-list">
        {HOUSEMATES.map((h) => (
          <li key={h.id}>
            <span className="who">
              <span className="avatar sm" style={{ background: h.hue }}>
                {h.initial}
              </span>
              {h.name}
            </span>
            <span className="mono">{money(settlement.shares[h.id])}</span>
          </li>
        ))}
      </ul>
      <p className="hint">
        Drew floated groceries {money(settlement.groceryTotal)} · Casey floated pizza {money(settlement.pizzaTotal)}
      </p>
      <div className="veto-actions">
        <button className="primary fair" disabled={Boolean(mine)} onClick={() => onVote('fair')}>
          Looks Fair
        </button>
        <button className="primary veto-btn" disabled={Boolean(mine)} onClick={() => onVote('veto')}>
          Play Veto Card
        </button>
      </div>
      <p className="waiting">
        {mine
          ? waiting
            ? `In. Waiting on ${waiting}`
            : 'Everyone is in'
          : `Confirming on ${person(me).name}'s phone`}
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

function Review({ me, item, reviewIndex, total, reviewVotes, showResult, onVote }) {
  const mine = reviewVotes[item.id]?.[me]
  const resolved = showResult ? resolveReview(item, reviewVotes) : null
  const isSlider = item.tag === 'shareable'
  const [sliderVal, setSliderVal] = useState(typeof mine === 'number' ? mine : 25)

  useEffect(() => {
    setSliderVal(typeof mine === 'number' ? mine : 25)
  }, [item.id, mine])

  return (
    <section className={`screen review ${showResult ? 'revealed' : ''}`}>
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
              disabled={mine !== undefined}
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
            />
            <div className="slider-labels">
              <span>Nibble 10%</span>
              <span>Average 25%</span>
              <span>Feral 50%</span>
            </div>
            {mine === undefined && (
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
            <button className="ghost claim" disabled={mine !== undefined} onClick={() => onVote('communal')}>
              Communal
            </button>
            <button className="ghost pass" disabled={mine !== undefined} onClick={() => onVote('personal')}>
              Personal
            </button>
          </div>
        </>
      )}

      {showResult && resolved && (
        <div className="split-toast review-toast">
          {resolved.type === 'slider' && (
            <div>
              <p>Recut by appetite</p>
              <ul>
                {HOUSEMATES.map((h) => (
                  <li key={h.id}>
                    {h.name} · {money(resolved.shares[h.id])}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resolved.type === 'personal' && (
            <p>
              The tribe has spoken: Personal. Assigned to {person(resolved.owner).name}.
              <br />
              <small>
                {resolved.tally.personal} personal · {resolved.tally.communal} communal
              </small>
            </p>
          )}
          {resolved.type === 'communal' && (
            <p>
              The tribe says Communal. It stays split.
              <br />
              <small>
                {resolved.tally.communal} communal · {resolved.tally.personal} personal
              </small>
            </p>
          )}
        </div>
      )}
    </section>
  )
}

function Bounty({ me, settlement, bounties, draftBounty, onPropose, onVote, onSkip }) {
  const net = settlement.nets[me]
  const myVote = draftBounty?.votes[me]
  const isProposer = draftBounty?.from === me

  return (
    <section className="screen bounty">
      <p className="kicker">Barter · Bounty card</p>
      <h2>Chores can settle debt</h2>
      <p className="lede tight">
        {net > 0
          ? `You still owe ${money(net)}. Play a bounty card and trade labour for relief.`
          : 'You are owed this week. Vote on proposals, or lock the bill.'}
      </p>
      <ul className="bill-list compact">
        {HOUSEMATES.map((h) => (
          <li key={h.id}>
            <span>{h.name}</span>
            <span className={settlement.nets[h.id] > 0 ? 'owe' : 'owed'}>
              {settlement.nets[h.id] > 0.009
                ? `owes ${money(settlement.nets[h.id])}`
                : settlement.nets[h.id] < -0.009
                  ? `owed ${money(-settlement.nets[h.id])}`
                  : 'even'}
            </span>
          </li>
        ))}
      </ul>

      {bounties.map((b, i) => (
        <p key={i} className={`bounty-note ${b.accepted ? 'yes' : 'no'}`}>
          {person(b.from).name} · {b.chore.label} · {money(b.amount)} · {b.accepted ? 'accepted' : 'rejected'}
        </p>
      ))}

      {!draftBounty && (
        <div className="chore-list">
          {CHORES.map((c) => (
            <button key={c.id} className="chore" onClick={() => onPropose(c)}>
              <strong>{c.label}</strong>
              <span>Forgive {money(c.amount)}</span>
            </button>
          ))}
        </div>
      )}

      {draftBounty && (
        <div className="proposal">
          <p>
            {person(draftBounty.from).name} proposes: {draftBounty.chore.label} / {money(draftBounty.amount)}
          </p>
          {!isProposer && !myVote && (
            <div className="vote-row">
              <button className="ghost claim" onClick={() => onVote('accept')}>
                Accept
              </button>
              <button className="ghost pass" onClick={() => onVote('reject')}>
                Reject
              </button>
            </div>
          )}
          {(isProposer || myVote) && (
            <p className="waiting">Votes are in on the phones — no speech required.</p>
          )}
        </div>
      )}

      <button className="primary" onClick={onSkip}>
        Skip and lock the bill
      </button>
    </section>
  )
}

function Locked({ settlement, bounties, onReset }) {
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
        {HOUSEMATES.map((h) => (
          <article key={h.id}>
            <header>
              <span className="avatar sm" style={{ background: h.hue }}>
                {h.initial}
              </span>
              <div>
                <strong>{h.name}</strong>
                <p>
                  Share {money(settlement.shares[h.id])} · paid {money(settlement.paid[h.id])}
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
        .map((b) => (
          <p key={b.chore.id} className="bounty-note yes">
            Bounty on: {person(b.from).name} · {b.chore.label}
          </p>
        ))}
      <p className="hint">
        Floated by {person(PAYERS.grocery).name} (groceries) and {person(PAYERS.pizza).name} (pizza)
      </p>
      <button className="primary" onClick={onReset}>
        Play next Sunday
      </button>
    </section>
  )
}
