export const SEATS = [
  { id: 'alex', name: 'Alex', initial: 'A', hue: '#c45c3e' },
  { id: 'bailey', name: 'Bailey', initial: 'B', hue: '#3d5a40' },
  { id: 'casey', name: 'Casey', initial: 'C', hue: '#2c4a6e' },
  { id: 'drew', name: 'Drew', initial: 'D', hue: '#b5812a' },
  { id: 'eden', name: 'Eden', initial: 'E', hue: '#6b3d6a' },
]

/** Default four-person house. Use houseOf(5) for five. */
export const HOUSEMATES = SEATS.slice(0, 4)

export function houseOf(size = 4) {
  return SEATS.slice(0, size === 5 ? 5 : 4)
}

export const ITEMS = [
  {
    id: 'basket',
    name: 'Communal Basket',
    detail: 'Milk, eggs, bread, veg, rice',
    price: 66.8,
    tag: 'communal',
    receipt: 'grocery',
    addedBy: 'bailey',
    emoji: '🧺',
  },
  {
    id: 'cheese',
    name: 'Fancy Cheese',
    detail: 'Imported brie 200g',
    price: 12,
    tag: 'luxury',
    receipt: 'grocery',
    addedBy: 'alex',
    emoji: '🧀',
  },
  {
    id: 'protein',
    name: 'Premium Protein',
    detail: 'Drew dropped this in the cart',
    price: 22,
    tag: 'luxury',
    receipt: 'grocery',
    addedBy: 'drew',
    emoji: '🥤',
  },
  {
    id: 'chicken',
    name: 'Chicken Thighs',
    detail: 'Family pack 1.2kg',
    price: 18.9,
    tag: 'communal',
    receipt: 'grocery',
    addedBy: 'casey',
    emoji: '🍗',
  },
  {
    id: 'cleaner',
    name: 'Heavy-Duty Cleaner',
    detail: 'The cleaning supply nobody wants',
    price: 14.5,
    tag: 'chore',
    receipt: 'grocery',
    addedBy: 'bailey',
    emoji: '🧴',
  },
  {
    id: 'coffee',
    name: 'Specialty Coffee',
    detail: 'Light roast single origin 250g',
    price: 15.8,
    tag: 'luxury',
    receipt: 'grocery',
    addedBy: 'alex',
    emoji: '☕',
  },
  {
    id: 'pizza',
    name: 'Pizza Delivery Feast',
    detail: 'Three larges · split by appetite',
    price: 80,
    tag: 'shareable',
    receipt: 'pizza',
    addedBy: 'casey',
    emoji: '🍕',
  },
]

export const PAYERS = {
  grocery: 'drew',
  pizza: 'casey',
}

/** `pitch` completes the bounty card sentence "I will … to offset $X of my debt." */
export const CHORES = [
  { id: 'bins', label: 'Bin Duty & Recycling', pitch: 'take out all the bins and sort recycling for the next 2 weeks', amount: 10 },
  { id: 'bath', label: 'Bathroom Deep-Clean', pitch: 'deep-clean the bathroom this weekend', amount: 12 },
  { id: 'dishes', label: 'Dish Duty', pitch: 'wash every dish for a full week', amount: 8 },
  { id: 'kitchen', label: 'Kitchen Duty', pitch: 'wipe down and tidy the kitchen every night for a week', amount: 10 },
]

export const VETO_TOKENS_PER_MONTH = 3

export const SLIDER_STOPS = [
  { value: 10, label: 'Just a Nibble' },
  { value: 25, label: 'Average' },
  { value: 50, label: 'Feral' },
]

export function npcVote(itemId, playerId) {
  const script = {
    basket: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim', eden: 'claim' },
    cheese: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'pass', eden: 'pass' },
    protein: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim', eden: 'pass' },
    chicken: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim', eden: 'claim' },
    cleaner: { alex: 'pass', bailey: 'pass', casey: 'pass', drew: 'pass', eden: 'pass' },
    coffee: { alex: 'claim', bailey: 'pass', casey: 'pass', drew: 'claim', eden: 'claim' },
    pizza: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim', eden: 'claim' },
  }
  return script[itemId]?.[playerId] ?? 'claim'
}

export function npcReview(itemId, playerId) {
  if (itemId === 'protein') {
    return playerId === 'drew' ? 'communal' : 'personal'
  }
  if (itemId === 'pizza') {
    return { alex: 25, bailey: 10, casey: 50, drew: 10, eden: 10 }[playerId] ?? 25
  }
  return 'communal'
}

export function npcVeto(playerId, me) {
  if (playerId === me) return null
  return playerId === 'alex' && me !== 'alex' ? 'veto' : 'fair'
}
