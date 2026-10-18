import { useEffect, useState, useSyncExternalStore } from 'react'
import { RoomSession } from './room.js'

class SessionHolder {
  session = null
  version = 0
  listeners = new Set()

  subscribe = (fn) => {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  snapshot = () => this.version

  bump = () => {
    this.version += 1
    this.listeners.forEach((fn) => fn())
  }

  attach(session) {
    this.session = session
    this.bump()
  }

  detach(session) {
    if (this.session !== session) return
    this.session = null
    this.bump()
  }
}

/** Connects this phone to a table. Re-renders whenever the shared state or connection status changes. */
export function useRoom({ code, create, selfId, attempt }) {
  const [holder] = useState(() => new SessionHolder())
  useSyncExternalStore(holder.subscribe, holder.snapshot)

  useEffect(() => {
    if (!code) return undefined
    const session = new RoomSession({
      code,
      selfId,
      storage: window.sessionStorage,
      create,
      onChange: holder.bump,
    })
    holder.attach(session)
    session.start()
    return () => {
      session.stop()
      holder.detach(session)
    }
  }, [code, create, selfId, attempt, holder])

  return code ? holder.session : null
}
