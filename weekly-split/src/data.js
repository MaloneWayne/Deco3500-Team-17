export const SEATS = [
  { id: 'a', name: 'A', initial: 'A', hue: '#c45c3e' },
  { id: 'b', name: 'B', initial: 'B', hue: '#3d5a40' },
  { id: 'c', name: 'C', initial: 'C', hue: '#2c4a6e' },
  { id: 'd', name: 'D', initial: 'D', hue: '#b5812a' },
  { id: 'e', name: 'E', initial: 'E', hue: '#6b3d6a' },
  { id: 'f', name: 'F', initial: 'F', hue: '#1f6f6b' },
  { id: 'g', name: 'G', initial: 'G', hue: '#8a4b2a' },
  { id: 'h', name: 'H', initial: 'H', hue: '#a03c62' },
]

export const MIN_SEATS = 2
export const MAX_SEATS = SEATS.length

export function clampSize(size) {
  const n = Math.round(Number(size))
  return Number.isFinite(n) ? Math.min(MAX_SEATS, Math.max(MIN_SEATS, n)) : 4
}

/** Default four-person house. */
export const HOUSEMATES = SEATS.slice(0, 4)

export function houseOf(size = 4) {
  return SEATS.slice(0, clampSize(size))
}

/** One-tap demo receipt for test sessions. Whoever added an item paid for it. NPC scripts below are keyed to these item ids. */
export const SAMPLE_RECEIPT = { name: 'Woolies run + Friday pizza' }

export const SAMPLE_ITEMS = [
  { id: 'basket', name: 'Communal Basket', detail: 'Milk, eggs, bread, veg, rice', price: 66.8, addedBy: 'b', emoji: '🧺' },
  { id: 'cheese', name: 'Fancy Cheese', detail: 'Imported brie 200g', price: 12, addedBy: 'a', emoji: '🧀' },
  { id: 'protein', name: 'Premium Protein', detail: 'D dropped this in the cart', price: 22, addedBy: 'd', emoji: '🥤' },
  { id: 'chicken', name: 'Chicken Thighs', detail: 'Family pack 1.2kg', price: 18.9, addedBy: 'c', emoji: '🍗' },
  { id: 'cleaner', name: 'Heavy-Duty Cleaner', detail: 'The cleaning supply nobody wants', price: 14.5, addedBy: 'b', emoji: '🧴' },
  { id: 'coffee', name: 'Specialty Coffee', detail: 'Light roast single origin 250g', price: 15.8, addedBy: 'a', emoji: '☕' },
  { id: 'pizza', name: 'Pizza Delivery Feast', detail: 'Three larges', price: 80, addedBy: 'c', emoji: '🍕' },
]

export const RECEIPT_LIMITS = { name: 40, itemName: 40, items: 40, maxPrice: 5000 }

/** Optional real name a housemate can attach to their seat. Shown only in the "Who you pay" part of Detail. */
export const PERSON_NAME_MAX = 20

/** `pitch` completes the bounty card sentence "I will … to offset $X of my debt." */
export const CHORES = [
  { id: 'bins', label: 'Bin Duty & Recycling', pitch: 'take out all the bins and sort recycling for the next 2 weeks', amount: 10 },
  { id: 'bath', label: 'Bathroom Deep-Clean', pitch: 'deep-clean the bathroom this weekend', amount: 12 },
  { id: 'dishes', label: 'Dish Duty', pitch: 'wash every dish for a full week', amount: 8 },
  { id: 'kitchen', label: 'Kitchen Duty', pitch: 'wipe down and tidy the kitchen every night for a week', amount: 10 },
]

export const VETO_TOKENS_PER_MONTH = 3

/** Words shown under the review slider; `upTo` is the highest percent that still earns the label. */
export const SLIDER_MOODS = [
  { upTo: 0, label: 'None of it' },
  { upTo: 15, label: 'Just a Nibble' },
  { upTo: 35, label: 'Average' },
  { upTo: 60, label: 'Hungry' },
  { upTo: 100, label: 'Feral' },
]

export function sliderMood(percent) {
  return SLIDER_MOODS.find((m) => percent <= m.upTo)?.label || SLIDER_MOODS[SLIDER_MOODS.length - 1].label
}

export function npcVote(itemId, playerId) {
  const script = {
    basket: { a: 'claim', b: 'claim', c: 'claim', d: 'claim', e: 'claim' },
    cheese: { a: 'claim', b: 'claim', c: 'claim', d: 'pass', e: 'pass' },
    protein: { a: 'claim', b: 'claim', c: 'claim', d: 'claim', e: 'pass' },
    chicken: { a: 'claim', b: 'claim', c: 'claim', d: 'claim', e: 'claim' },
    cleaner: { a: 'pass', b: 'pass', c: 'pass', d: 'pass', e: 'pass' },
    coffee: { a: 'claim', b: 'pass', c: 'pass', d: 'claim', e: 'claim' },
    pizza: { a: 'claim', b: 'claim', c: 'claim', d: 'claim', e: 'claim' },
  }
  return script[itemId]?.[playerId] ?? 'claim'
}

/** Percent of an item an NPC says it used during review. */
export function npcReview(itemId, playerId) {
  const script = {
    protein: { a: 5, b: 5, c: 5, d: 80, e: 5 },
    pizza: { a: 25, b: 10, c: 50, d: 10, e: 10 },
  }
  return script[itemId]?.[playerId] ?? 25
}

export function npcVeto(playerId, me) {
  if (playerId === me) return null
  return playerId === 'a' && me !== 'a' ? 'veto' : 'fair'
}
