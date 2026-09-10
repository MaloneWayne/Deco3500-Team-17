export const HOUSEMATES = [
  { id: 'alex', name: 'Alex', initial: 'A', hue: '#c45c3e' },
  { id: 'bailey', name: 'Bailey', initial: 'B', hue: '#3d5a40' },
  { id: 'casey', name: 'Casey', initial: 'C', hue: '#2c4a6e' },
  { id: 'drew', name: 'Drew', initial: 'D', hue: '#b5812a' },
]

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
    chore: 'Kitchen duty for a week',
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

export const CHORES = [
  { id: 'bins', label: 'Bins & recycling for two weeks', amount: 10 },
  { id: 'bath', label: 'Deep-clean the bathroom', amount: 12 },
  { id: 'dishes', label: 'Dishes for a full week', amount: 8 },
  { id: 'kitchen', label: 'Kitchen duty for a week', amount: 10 },
]

export function npcVote(itemId, playerId) {
  const script = {
    basket: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim' },
    cheese: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'pass' },
    protein: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim' },
    chicken: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim' },
    cleaner: { alex: 'pass', bailey: 'pass', casey: 'pass', drew: 'pass' },
    coffee: { alex: 'claim', bailey: 'pass', casey: 'pass', drew: 'claim' },
    pizza: { alex: 'claim', bailey: 'claim', casey: 'claim', drew: 'claim' },
  }
  return script[itemId]?.[playerId] ?? 'claim'
}

export function npcReview(itemId, playerId) {
  if (itemId === 'protein') {
    return playerId === 'drew' ? 'communal' : 'personal'
  }
  if (itemId === 'pizza') {
    return { alex: 25, bailey: 10, casey: 50, drew: 25 }[playerId]
  }
  return 'communal'
}

export function npcVeto(playerId, me) {
  if (playerId === me) return null
  return playerId === 'alex' && me !== 'alex' ? 'veto' : 'fair'
}
