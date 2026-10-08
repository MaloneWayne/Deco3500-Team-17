const HOUSEMATES = [
  { id: "you", name: "You", initial: "Y", color: "#2d6cdf" },
  { id: "alex", name: "Alex", initial: "A", color: "#e65454" },
  { id: "sam", name: "Sam", initial: "S", color: "#15998c" },
  { id: "jordan", name: "Jordan", initial: "J", color: "#dda72d" },
];

const ITEMS = [
  { id: "cheese", name: "Fancy Cheese", price: 12, emoji: "🧀", detail: "Three housemates claimed it", npc: ["alex", "sam", "jordan"] },
  { id: "protein", name: "Protein Powder", price: 22, emoji: "🥛", detail: "Added to the cart by Jordan", npc: ["jordan"] },
];

const FLOW = [
  ["draft", "Claim"],
  ["review", "Review"],
  ["wheel", "Wheel"],
  ["portion", "Portion"],
  ["trade", "Trade"],
  ["summary", "Save"],
];

const screen = document.querySelector("#screen");
const statusEl = document.querySelector("#app-status");
const flowMap = document.querySelector("#flow-map");
const backButton = document.querySelector("#back-button");
const restartButton = document.querySelector("#restart-button");

function freshState() {
  return {
    view: "draft",
    history: [],
    itemIndex: 0,
    decisions: {},
    reveal: false,
    proteinType: null,
    wheelSpinning: false,
    wheelWinner: null,
    portion: 1,
    trade: null,
    saved: false,
  };
}

let state = freshState();

function money(value) { return `$${value.toFixed(2)}`; }
function avatar(person) { return `<span class="avatar" style="--avatar:${person.color}" aria-label="${person.name}" title="${person.name}">${person.initial}</span>`; }
function flowIndex() { return state.view === "dispute" ? 1 : FLOW.findIndex(([id]) => id === state.view); }
function setView(view) { state.history.push(state.view); state.view = view; render(); }
function goBack() { const previous = state.history.pop(); if (previous) { state.view = previous; render(); } }
function reset() { state = freshState(); render(); }

function itemShare(item) {
  if (item.id === "protein" && state.proteinType === "personal") return 0;
  if (state.decisions[item.id] !== "claim") return 0;
  return item.price / (item.npc.length + 1);
}

function pizzaShare() { return [8, 20, 40][state.portion]; }
function userTotal() {
  const claimed = ITEMS.reduce((sum, item) => sum + itemShare(item), 0);
  const wheelCost = state.wheelWinner === "You" ? 14 : 0;
  return claimed + wheelCost + pizzaShare();
}

function flowMarkup() {
  const active = flowIndex();
  flowMap.innerHTML = FLOW.map(([, label], index) => `<li class="${index < active ? "done" : index === active ? "active" : ""}">${label}</li>`).join("");
}

function draftScreen() {
  const item = ITEMS[state.itemIndex];
  const claimers = item.npc.map((id) => HOUSEMATES.find((person) => person.id === id));
  const decision = state.decisions[item.id];
  const share = itemShare(item);
  return `<div class="stack">
    <div class="item-progress"><span>Sunday receipt</span><strong>${state.itemIndex + 1} / ${ITEMS.length}</strong></div>
    <article class="item-card">
      <div class="item-emoji" aria-hidden="true">${item.emoji}</div>
      <h2>${item.name}</h2>
      <p class="item-price">${money(item.price)}</p>
      <p class="item-detail">${item.detail}</p>
      <div class="claim-row">${claimers.map(avatar).join("")}<small>${claimers.length} claimed</small></div>
    </article>
    ${state.reveal
      ? `<div class="result-banner"><strong>${decision === "claim" ? `Your share: ${money(share)}` : "Passed — $0.00"}</strong><span>${decision === "claim" ? `Split between ${item.npc.length + 1} people` : "Not added to your total"}</span></div><button class="primary-button" data-action="next">${state.itemIndex === ITEMS.length - 1 ? "Review my total" : "Next item"}</button>`
      : `<div class="button-row"><button class="choice-button pass" data-action="decide" data-value="pass">Pass<small>I did not use it</small></button><button class="choice-button claim" data-action="decide" data-value="claim">Claim<small>Add my share</small></button></div>`}
  </div>`;
}

function reviewScreen() {
  const rows = ITEMS.filter((item) => itemShare(item) > 0).map((item) => `<li><span>${item.name}</span><strong>${money(itemShare(item))}</strong></li>`).join("");
  return `<div class="stack loose">
    <div><p class="kicker">Review</p><h2>Your current share</h2><p class="body-copy">Check these items before continuing.</p></div>
    <div class="total-card"><span>Current subtotal</span><strong>${money(ITEMS.reduce((sum, item) => sum + itemShare(item), 0))}</strong></div>
    <ul class="cost-list">${rows || `<li><span>No items claimed</span><strong>$0.00</strong></li>`}</ul>
    <button class="primary-button teal" data-action="continue-wheel">Looks fair</button>
    <button class="secondary-button" data-action="flag">Flag protein powder anonymously</button>
  </div>`;
}

function disputeScreen() {
  return `<div class="stack loose">
    <div><p class="kicker">Anonymous review</p><h2>Shared or personal?</h2><p class="body-copy">Only the final decision is shown.</p></div>
    <div class="privacy-card"><strong>Protein powder was flagged</strong><p>No housemate name is attached.</p></div>
    <div class="surface-card vote-item"><div class="item-emoji" aria-hidden="true">🥛</div><div><h3>$22.00 Protein Powder</h3><p>Added by Jordan</p></div></div>
    <div class="button-row"><button class="choice-button shared" data-action="resolve" data-value="shared">Shared<small>Split by claim</small></button><button class="choice-button personal" data-action="resolve" data-value="personal">Personal<small>Jordan pays</small></button></div>
  </div>`;
}

function wheelScreen() {
  return `<div class="stack">
    <div><p class="kicker">Unclaimed item</p><h2>$14 Dishwasher Pods</h2><p class="body-copy">Nobody claimed them. Spin once to assign the cost.</p></div>
    <div class="wheel-wrap">
      <div class="wheel-pointer"></div>
      <div class="wheel ${state.wheelSpinning ? "spinning" : ""}"><span class="wheel-name n1">Alex</span><span class="wheel-name n2">Sam</span><span class="wheel-name n3">Jordan</span><span class="wheel-name n4">You</span></div>
      <div class="wheel-centre">$14</div>
    </div>
    ${state.wheelWinner
      ? `<div class="result-banner"><strong>${state.wheelWinner} was selected</strong><span>The result is added to the settlement.</span></div><button class="primary-button" data-action="to-portion">Continue</button>`
      : `<button class="primary-button" data-action="spin" ${state.wheelSpinning ? "disabled" : ""}>${state.wheelSpinning ? "Spinning…" : "Spin the wheel"}</button>`}
  </div>`;
}

function portionScreen() {
  const levels = [{ name: "Nibble", value: 8 }, { name: "Average", value: 20 }, { name: "Hungry", value: 40 }];
  const selected = levels[state.portion];
  return `<div class="stack loose">
    <div><p class="kicker">Pizza portion</p><h2>How much did you have?</h2><p class="body-copy">Choose one simple portion level.</p></div>
    <div class="surface-card portion-item"><div class="item-emoji" aria-hidden="true">🍕</div><div><h3>Friday Pizza</h3><p>$80.00 total</p></div></div>
    <div class="slider-card"><strong>Your share: ${money(selected.value)}</strong><input id="portion-slider" type="range" min="0" max="2" step="1" value="${state.portion}" aria-label="Choose pizza portion" /><div class="slider-labels">${levels.map((level) => `<span>${level.name}<small>${money(level.value)}</small></span>`).join("")}</div></div>
    <button class="primary-button teal" data-action="lock-portion">Lock portion</button>
  </div>`;
}

function tradeScreen() {
  return `<div class="stack loose">
    <div><p class="kicker">House trade</p><h2>Accept Alex’s offer?</h2><p class="body-copy">Alex wants to offset $10 with a household task.</p></div>
    <div class="trade-card"><span>$10 debt offset</span><h3>Bins & recycling</h3><p>Alex will handle the bins for the next two weeks.</p></div>
    ${state.trade
      ? `<div class="result-banner"><strong>Trade ${state.trade}</strong><span>${state.trade === "accepted" ? "The task is recorded in the final result." : "The original cash amount stays."}</span></div><button class="primary-button" data-action="to-summary">View final result</button>`
      : `<div class="button-row"><button class="choice-button claim" data-action="trade" data-value="accepted">Accept<small>Approve the task</small></button><button class="choice-button pass" data-action="trade" data-value="declined">Decline<small>Keep cash payment</small></button></div>`}
  </div>`;
}

function summaryScreen() {
  return `<div class="stack loose">
    <div class="summary-hero"><p class="kicker" style="color:#a8e6dd">Final result</p><h2>The split is ready.</h2><p class="body-copy">Review once, then save this session.</p></div>
    <div class="total-card"><span>Your final share</span><strong>${money(userTotal())}</strong></div>
    <ul class="decision-list">
      <li><span>Dishwasher pods</span><strong>${state.wheelWinner}</strong></li>
      <li><span>Pizza portion</span><strong>${["Nibble", "Average", "Hungry"][state.portion]}</strong></li>
      <li><span>Alex’s chore trade</span><strong>${state.trade}</strong></li>
    </ul>
    ${state.saved
      ? `<div class="saved-state">✓ Session saved on this device</div><button class="secondary-button" data-action="restart">Run demo again</button>`
      : `<button class="primary-button teal" data-action="save">Save settlement</button>`}
    <p class="helper">Prototype only — no payment is processed.</p>
  </div>`;
}

const views = { draft: draftScreen, review: reviewScreen, dispute: disputeScreen, wheel: wheelScreen, portion: portionScreen, trade: tradeScreen, summary: summaryScreen };

function render() {
  const index = flowIndex();
  flowMarkup();
  statusEl.textContent = state.view === "dispute" ? "Resolve" : FLOW[index][1];
  backButton.hidden = state.view === "draft" || state.view === "summary";
  screen.classList.remove("enter");
  screen.innerHTML = views[state.view]();
  screen.scrollTop = 0;
  requestAnimationFrame(() => screen.classList.add("enter"));
}

screen.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, value } = button.dataset;
  if (action === "decide") { state.decisions[ITEMS[state.itemIndex].id] = value; state.reveal = true; render(); }
  if (action === "next") {
    if (state.itemIndex < ITEMS.length - 1) { state.itemIndex += 1; state.reveal = false; render(); }
    else setView("review");
  }
  if (action === "continue-wheel") setView("wheel");
  if (action === "flag") setView("dispute");
  if (action === "resolve") { state.proteinType = value; setView("wheel"); }
  if (action === "spin" && !state.wheelSpinning) {
    state.wheelSpinning = true;
    render();
    window.setTimeout(() => { state.wheelSpinning = false; state.wheelWinner = "Alex"; render(); }, 1800);
  }
  if (action === "to-portion") setView("portion");
  if (action === "lock-portion") setView("trade");
  if (action === "trade") { state.trade = value; render(); }
  if (action === "to-summary") setView("summary");
  if (action === "save") {
    state.saved = true;
    localStorage.setItem("weeklySplitDemo", JSON.stringify({ savedAt: new Date().toISOString(), share: userTotal(), wheelWinner: state.wheelWinner, portion: state.portion, trade: state.trade }));
    render();
  }
  if (action === "restart") reset();
});

screen.addEventListener("input", (event) => {
  if (event.target.id === "portion-slider") { state.portion = Number(event.target.value); render(); }
});

restartButton.addEventListener("click", reset);
backButton.addEventListener("click", goBack);

function registerWebMcpTool() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  try {
    Promise.resolve(context.registerTool({
      name: "read_weekly_split_status",
      title: "Read Weekly Split status",
      description: "Return the current demo stage and estimated share without changing the session.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() { return { stage: state.view, estimatedShare: userTotal(), decisions: { ...state.decisions }, wheelWinner: state.wheelWinner, portion: state.portion, trade: state.trade, saved: state.saved }; },
    })).catch(() => {});
  } catch (_) { /* Optional browser feature. */ }
}

registerWebMcpTool();
render();
