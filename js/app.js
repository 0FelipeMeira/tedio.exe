// ---------- Persistência ----------
const STORAGE_KEY = "figurinhas.colecao.v1";

function carregarEstado() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("vazio");
    const parsed = JSON.parse(raw);
    return {
      colecao: parsed.colecao || {}, // { cardId: quantidade }
      pacotesAbertos: parsed.pacotesAbertos || 0,
    };
  } catch {
    return { colecao: {}, pacotesAbertos: 0 };
  }
}

function salvarEstado() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
}

let estado = carregarEstado();

// ---------- Sorteio ----------
function sortearRaridade(pool) {
  const total = pool.reduce((sum, r) => sum + RARITIES[r].weight, 0);
  let roll = Math.random() * total;
  for (const r of pool) {
    roll -= RARITIES[r].weight;
    if (roll <= 0) return r;
  }
  return pool[pool.length - 1];
}

function sortearCarta(raridade) {
  const grupo = CARDS_BY_RARITY[raridade];
  return grupo[Math.floor(Math.random() * grupo.length)];
}

const PACK_SIZE = 5;

function abrirPacote() {
  const cartas = [];
  // 4 cartas com raridade normal
  for (let i = 0; i < PACK_SIZE - 1; i++) {
    const raridade = sortearRaridade(RARITY_ORDER);
    cartas.push(sortearCarta(raridade));
  }
  // última carta: garantida incomum ou melhor (mecânica de "pity")
  const raridadeGarantida = sortearRaridade(RARITY_ORDER.filter((r) => r !== "comum"));
  cartas.push(sortearCarta(raridadeGarantida));

  return cartas;
}

function registrarCartas(cartas) {
  const novas = [];
  cartas.forEach((carta) => {
    const jaTinha = !!estado.colecao[carta.id];
    estado.colecao[carta.id] = (estado.colecao[carta.id] || 0) + 1;
    if (!jaTinha) novas.push(carta.id);
  });
  estado.pacotesAbertos += 1;
  salvarEstado();
  return novas;
}

// ---------- UI: elementos ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const packArea = $("#pack-area");
const packButton = $("#pack-button");
const revealArea = $("#reveal-area");
const tabButtons = $$(".tab-btn");
const views = $$(".view");
const collectionGrid = $("#collection-grid");
const statsCollected = $("#stats-collected");
const statsTotal = $("#stats-total");
const statsPacks = $("#stats-packs");
const progressFill = $("#progress-fill");
const resetBtn = $("#reset-btn");
const toast = $("#toast");

// ---------- Navegação entre abas ----------
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.tab;
    views.forEach((v) => v.classList.toggle("active", v.id === `view-${target}`));
    if (target === "colecao") renderizarColecao();
  });
});

// ---------- Abertura de pacote ----------
let abrindo = false;

packButton.addEventListener("click", () => {
  if (abrindo) return;
  abrindo = true;
  packButton.disabled = true;
  packButton.classList.add("hidden");
  packArea.classList.add("shaking");

  setTimeout(() => {
    packArea.classList.remove("shaking");
    packArea.classList.add("opened");
    const cartas = abrirPacote();
    const novasIds = registrarCartas(cartas);
    mostrarCartas(cartas, novasIds);
  }, 700);
});

function mostrarCartas(cartas, novasIds) {
  revealArea.innerHTML = "";
  revealArea.classList.add("visible");

  cartas.forEach((carta, idx) => {
    const isNova = novasIds.includes(carta.id);
    const cardEl = document.createElement("div");
    cardEl.className = `card rarity-${carta.raridade} flip-in`;
    cardEl.style.animationDelay = `${idx * 0.18}s`;
    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">
          <span class="card-back-glyph">?</span>
        </div>
        <div class="card-face card-front">
          ${isNova ? '<span class="badge-new">NOVA!</span>' : ""}
          <img class="card-img" src="${carta.src}" alt="" />
          <div class="card-rarity">${RARITIES[carta.raridade].label}</div>
        </div>
      </div>
    `;
    revealArea.appendChild(cardEl);
  });

  const resumoBtn = document.createElement("button");
  resumoBtn.id = "abrir-outro-btn";
  resumoBtn.className = "primary-btn";
  resumoBtn.textContent = "Abrir outro pacote";
  resumoBtn.addEventListener("click", () => {
    revealArea.classList.remove("visible");
    packButton.classList.remove("hidden");
    revealArea.innerHTML = "";
    packArea.classList.remove("opened");
    packButton.disabled = false;
    abrindo = false;
  });
  revealArea.appendChild(resumoBtn);

  if (novasIds.length > 0) {
    mostrarToast(`+${novasIds.length} nova(s) figurinha(s) descoberta(s)!`);
  }

  atualizarStatsResumo();
}

function mostrarToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(mostrarToast._t);
  mostrarToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

// ---------- Coleção ----------
function renderizarColecao() {
  collectionGrid.innerHTML = "";

  RARITY_ORDER.forEach((raridade) => {
    const grupo = CARDS_BY_RARITY[raridade];
    const secao = document.createElement("section");
    secao.className = "rarity-section";
    secao.innerHTML = `<h3 class="rarity-title rarity-${raridade}-text">${RARITIES[raridade].label}</h3>`;

    const grid = document.createElement("div");
    grid.className = "mini-grid";

    grupo.forEach((carta) => {
      const qtd = estado.colecao[carta.id] || 0;
      const owned = qtd > 0;
      const item = document.createElement("div");
      item.className = `mini-card rarity-${carta.raridade} ${owned ? "owned" : "locked"}`;
      item.innerHTML = owned
        ? `
          <img class="mini-img" src="${carta.src}" alt="" />
          ${qtd > 1 ? `<div class="mini-qty">x${qtd}</div>` : ""}
        `
        : `
          <div class="mini-emoji locked-glyph">❓</div>
          <div class="mini-name">???</div>
        `;
      grid.appendChild(item);
    });

    secao.appendChild(grid);
    collectionGrid.appendChild(secao);
  });

  atualizarStatsResumo();
}

function atualizarStatsResumo() {
  const totalCartas = CARD_POOL.length;
  const colecionadas = Object.keys(estado.colecao).length;
  statsCollected.textContent = colecionadas;
  statsTotal.textContent = totalCartas;
  statsPacks.textContent = estado.pacotesAbertos;
  const pct = totalCartas === 0 ? 0 : Math.round((colecionadas / totalCartas) * 100);
  progressFill.style.width = `${pct}%`;
  progressFill.textContent = `${pct}%`;
}

// ---------- Reset ----------
resetBtn.addEventListener("click", () => {
  if (!confirm("Isso vai apagar toda a sua coleção. Tem certeza?")) return;
  estado = { colecao: {}, pacotesAbertos: 0 };
  salvarEstado();
  atualizarStatsResumo();
  renderizarColecao();
  mostrarToast("Coleção reiniciada.");
});

// ---------- Inicialização ----------
atualizarStatsResumo();
