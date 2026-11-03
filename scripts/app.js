/* ==========================================================================
   PULP RIOT™ — INTERACTIVE MAXIMALIST ENGINE (scripts/app.js)
   - Canvas 2D Liquid Splash Physics
   - Live Theme Voltage Switcher
   - "Lab Riot" Custom Potion Blender & Dynamic FDA Nutrition Receipt
   - 6-Pack Crate Cart Drawer with 15% Bundle Discount Logic
   - Draggable Holographic & Starburst Stickers
   - Bodega Truck Radar & Rubber-Stamp Customs Manifest Form
   ========================================================================== */

// 1. SIGNATURE FLAVOR VAULT DATA
const FLAVOR_VAULT = [
  {
    id: 'RIOT-01',
    name: 'NAPALM MANGO',
    badge: 'CULT FAVORITE',
    category: 'sweet-heat',
    price: 8.50,
    calories: 140,
    vitC: '240%',
    heat: 88,
    acid: 65,
    voltage: 95,
    primaryColor: '#FF9F1C',
    secondaryColor: '#CCFF00',
    hotColor: '#FF0055',
    image: 'assets/images/hero-napalm-mango.png',
    specs: '500ML // 12-TON COLD PRESS // SCOVILLE: 18,000',
    notes: 'Alphonso Mango crushed with Ghost Pepper Agave, raw Key Lime juice, and a volcanic Tajín sea-salt snap.'
  },
  {
    id: 'RIOT-02',
    name: 'VENOM YUZU',
    badge: 'BRAIN VOLTAGE',
    category: 'nootropic',
    price: 9.00,
    calories: 110,
    vitC: '310%',
    heat: 35,
    acid: 96,
    voltage: 100,
    primaryColor: '#CCFF00',
    secondaryColor: '#00F0FF',
    hotColor: '#FF007F',
    image: 'assets/images/flavor-venom-yuzu.png',
    specs: '500ML // L-THEANINE + MATCHA // 160MG NAT CAFFEINE',
    notes: 'Electric Japanese Yuzu citrus collided with Uji ceremonial matcha, tart Granny Smith apple, and blue spirulina.'
  },
  {
    id: 'RIOT-03',
    name: 'MAGENTA COMA',
    badge: 'LIMITED DROP',
    category: 'acid-sour',
    price: 8.50,
    calories: 135,
    vitC: '280%',
    heat: 45,
    acid: 85,
    voltage: 90,
    primaryColor: '#FF007F',
    secondaryColor: '#FFE600',
    hotColor: '#00F0FF',
    image: 'assets/images/flavor-magenta-coma.png',
    specs: '500ML // RED PITAYA + HIBISCUS // ELECTROLYTE BOMB',
    notes: 'Neon Red Pitaya Dragonfruit, Sicilian Blood Orange, steeped sour hibiscus flowers, and cracked Peruvian ginger.'
  },
  {
    id: 'RIOT-04',
    name: 'VOID CHARCOAL',
    badge: 'HEAVY DETOX',
    category: 'detox-void',
    price: 9.50,
    calories: 95,
    vitC: '190%',
    heat: 50,
    acid: 80,
    voltage: 88,
    primaryColor: '#9D00FF',
    secondaryColor: '#00F0FF',
    hotColor: '#CCFF00',
    image: 'assets/images/hero-napalm-mango.png',
    svgArt: 'void',
    specs: '500ML // ACTIVATED COCONUT CHARCOAL // ZERO SUGAR SPIKE',
    notes: 'Activated black coconut shell charcoal, charred golden pineapple, Meyer lemon venom, and arctic peppermint oil.'
  },
  {
    id: 'RIOT-05',
    name: 'ACID GUAVA',
    badge: 'SOUR PUNCH',
    category: 'acid-sour',
    price: 8.00,
    calories: 130,
    vitC: '350%',
    heat: 60,
    acid: 99,
    voltage: 92,
    primaryColor: '#FF4D00',
    secondaryColor: '#CCFF00',
    hotColor: '#9D00FF',
    image: 'assets/images/flavor-magenta-coma.png',
    svgArt: 'guava',
    specs: '500ML // PINK GUAVA + CALAMANSI // PH LEVEL: 2.8',
    notes: 'Oaxaca Pink Guava nectar, raw passionfruit seeds, hyper-sour Philippine Calamansi lime, and smoked flake salt.'
  },
  {
    id: 'RIOT-06',
    name: 'TURBO BEET',
    badge: 'NITRO STAMINA',
    category: 'nootropic',
    price: 9.00,
    calories: 125,
    vitC: '210%',
    heat: 78,
    acid: 70,
    voltage: 98,
    primaryColor: '#FF0055',
    secondaryColor: '#FFE600',
    hotColor: '#00F0FF',
    image: 'assets/images/flavor-venom-yuzu.png',
    svgArt: 'beet',
    specs: '500ML // NITRIC OXIDE + CORDYCEPS // PRE-RIOT FUEL',
    notes: 'Cold-pressed crimson beet, tart pomegranate molasses, freshly grated horseradish root kick, and Lion’s Mane + Cordyceps.'
  }
];

// 2. LAB RIOT CUSTOM BLENDER INGREDIENTS
const LAB_INGREDIENTS = [
  { id: 'ing-mango', name: 'Ghost Mango', color: '#FF9F1C', price: 2.00, cal: 45, vitC: 65, scoville: 6000, tag: 'SWEET HEAT' },
  { id: 'ing-yuzu', name: 'Venom Yuzu', color: '#CCFF00', price: 2.25, cal: 20, vitC: 90, scoville: 0, tag: 'SOUR VOLTAGE' },
  { id: 'ing-pitaya', name: 'Neon Pitaya', color: '#FF007F', price: 2.00, cal: 40, vitC: 55, scoville: 0, tag: 'ELECTRIC PINK' },
  { id: 'ing-charcoal', name: 'Void Charcoal', color: '#1A0033', price: 2.50, cal: 5, vitC: 10, scoville: 500, tag: 'TOXIN BIND' },
  { id: 'ing-ginger', name: 'Ginger Napalm', color: '#FFE600', price: 1.75, cal: 15, vitC: 35, scoville: 12000, tag: 'THROAT BURN' },
  { id: 'ing-guava', name: 'Acid Guava', color: '#FF4D00', price: 2.00, cal: 35, vitC: 110, scoville: 1500, tag: 'TROPICAL PUNCH' },
  { id: 'ing-spirulina', name: 'Cyber Spirulina', color: '#00F0FF', price: 2.50, cal: 10, vitC: 45, scoville: 0, tag: 'BRAIN NOOTROPIC' },
  { id: 'ing-beet', name: 'Nitro Beet', color: '#9D00FF', price: 1.75, cal: 30, vitC: 50, scoville: 3000, tag: 'BLOOD FLOW' }
];

// APPLICATION STATE
let currentBlenderShots = [LAB_INGREDIENTS[0], LAB_INGREDIENTS[1], LAB_INGREDIENTS[4]];
let crateCart = [
  { id: 'RIOT-01', name: 'NAPALM MANGO', price: 8.50, qty: 2, notes: '500ML // CULT FAVORITE' },
  { id: 'RIOT-02', name: 'VENOM YUZU', price: 9.00, qty: 1, notes: '500ML // BRAIN VOLTAGE' }
];
let activeParticleColor = '#CCFF00';

// ==========================================================================
// 3. CANVAS 2D LIQUID SPLASH PHYSICS ENGINE
// ==========================================================================
class SplashEngine {
  constructor() {
    this.canvas = document.getElementById('splash-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Spawn splash burst on click anywhere interactive
    window.addEventListener('pointerdown', (e) => {
      this.spawnBurst(e.clientX, e.clientY, 16);
    });

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawnBurst(x, y, count = 18, customColor = null) {
    const palette = [
      customColor || activeParticleColor,
      '#FF0055',
      '#CCFF00',
      '#00F0FF',
      '#FFE600',
      '#070707'
    ];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 3 + Math.random() * 9;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        radius: 5 + Math.random() * 11,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        gravity: 0.28
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.radius *= 0.96;
      p.alpha -= 0.022;

      if (p.alpha <= 0.05 || p.radius <= 1) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.strokeStyle = '#070707';
      this.ctx.lineWidth = 2.5;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();
    }
    requestAnimationFrame(() => this.animate());
  }
}

let splashFX;

// ==========================================================================
// 4. HERO FLAVOR VOLTAGE SWITCHER
// ==========================================================================
function initVoltageSwitcher() {
  const pillsContainer = document.getElementById('voltage-pills');
  if (!pillsContainer) return;

  pillsContainer.innerHTML = FLAVOR_VAULT.map((f, idx) => `
    <button class="voltage-pill ${idx === 0 ? 'active' : ''}" data-flavor-id="${f.id}">
      <span class="swatch-dot" style="background:${f.primaryColor}"></span>
      <span>${f.name.split(' ')[1]}</span>
    </button>
  `).join('');

  pillsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.voltage-pill');
    if (!btn) return;
    const flavor = FLAVOR_VAULT.find(item => item.id === btn.dataset.flavorId);
    if (!flavor) return;

    document.querySelectorAll('.voltage-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');

    // Update CSS Custom Properties live
    document.documentElement.style.setProperty('--theme-primary', flavor.primaryColor);
    document.documentElement.style.setProperty('--theme-secondary', flavor.secondaryColor);
    document.documentElement.style.setProperty('--theme-hot', flavor.hotColor);
    activeParticleColor = flavor.secondaryColor;

    // Trigger screen shake
    document.body.classList.remove('shake-riot');
    void document.body.offsetWidth;
    document.body.classList.add('shake-riot');

    // Swap Hero Poster details
    const heroImg = document.getElementById('hero-showcase-img');
    const heroTitle = document.getElementById('hud-flavor-title');
    const heroSpecs = document.getElementById('hud-flavor-specs');
    const heroQuickAdd = document.getElementById('hero-quick-add');

    if (heroImg) heroImg.src = flavor.image;
    if (heroTitle) heroTitle.textContent = `${flavor.id} // ${flavor.name}`;
    if (heroSpecs) heroSpecs.textContent = `$${flavor.price.toFixed(2)} — ${flavor.badge}`;
    if (heroQuickAdd) {
      heroQuickAdd.dataset.flavorId = flavor.id;
      heroQuickAdd.textContent = `+ THROW ${flavor.name} IN CRATE ($${flavor.price.toFixed(2)})`;
    }

    if (splashFX) {
      const rect = btn.getBoundingClientRect();
      splashFX.spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 26, flavor.primaryColor);
    }
  });

  // Hero quick add button
  const heroQuickAdd = document.getElementById('hero-quick-add');
  if (heroQuickAdd) {
    heroQuickAdd.addEventListener('click', () => {
      const id = heroQuickAdd.dataset.flavorId || 'RIOT-01';
      const flavor = FLAVOR_VAULT.find(f => f.id === id);
      if (flavor) addToCrate(flavor.id, flavor.name, flavor.price, `500ML // ${flavor.badge}`);
    });
  }
}

// ==========================================================================
// 5. "LAB RIOT" — CUSTOM POTION BLENDER & LIVE NUTRITION FACTS RECEIPT
// ==========================================================================
function initCustomBlender() {
  const ingGrid = document.getElementById('ingredient-grid');
  const flushBtn = document.getElementById('flush-vessel-btn');
  const lockPotionBtn = document.getElementById('lock-potion-btn');
  const shakePotionBtn = document.getElementById('shake-vessel-btn');

  if (!ingGrid) return;

  ingGrid.innerHTML = LAB_INGREDIENTS.map(ing => `
    <button class="ingredient-btn" data-ing-id="${ing.id}">
      <div class="ing-top">
        <span>${ing.name}</span>
        <span class="swatch-dot" style="background:${ing.color}"></span>
      </div>
      <div class="ing-meta">+${ing.cal} CAL // VIT-C ${ing.vitC}% // +$${ing.price.toFixed(2)}</div>
      <div class="ing-meta" style="color:#000; font-weight:700;">[${ing.tag}]</div>
    </button>
  `).join('');

  ingGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.ingredient-btn');
    if (!btn) return;
    if (currentBlenderShots.length >= 5) {
      alert('VESSEL AT MAXIMUM 5-SHOT CAPACITY! HIT PRESS OR REMOVE A SHOT.');
      return;
    }
    const ing = LAB_INGREDIENTS.find(i => i.id === btn.dataset.ingId);
    if (ing) {
      currentBlenderShots.push(ing);
      renderBlenderState();
      if (splashFX) {
        const r = btn.getBoundingClientRect();
        splashFX.spawnBurst(r.left + r.width / 2, r.top, 18, ing.color);
      }
    }
  });

  if (flushBtn) {
    flushBtn.addEventListener('click', () => {
      currentBlenderShots = [];
      renderBlenderState();
    });
  }

  if (shakePotionBtn) {
    shakePotionBtn.addEventListener('click', () => {
      // Randomize 4 shots
      currentBlenderShots = [];
      for (let i = 0; i < 4; i++) {
        const rand = LAB_INGREDIENTS[Math.floor(Math.random() * LAB_INGREDIENTS.length)];
        currentBlenderShots.push(rand);
      }
      document.body.classList.remove('shake-riot');
      void document.body.offsetWidth;
      document.body.classList.add('shake-riot');
      renderBlenderState();
    });
  }

  if (lockPotionBtn) {
    lockPotionBtn.addEventListener('click', () => {
      if (currentBlenderShots.length === 0) {
        alert('ADD AT LEAST 1 SHOT TO YOUR HYDRAULIC VESSEL FIRST!');
        return;
      }
      const nameInput = document.getElementById('custom-potion-name');
      const customName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim().toUpperCase() : 'CUSTOM RIOT BREW';
      const basePrice = 4.50;
      const total = basePrice + currentBlenderShots.reduce((acc, s) => acc + s.price, 0);
      const comboNotes = currentBlenderShots.map(s => s.name).join(' + ');

      addToCrate(`CUSTOM-${Date.now()}`, `LAB: ${customName}`, total, comboNotes);
    });
  }

  renderBlenderState();
}

function renderBlenderState() {
  const slotsBar = document.getElementById('shot-slots-bar');
  const liquidRect = document.getElementById('blender-liquid-fill');
  const wavePath = document.getElementById('blender-wave-path');
  const fillPctLabel = document.getElementById('vessel-fill-pct');

  // Calculate metrics
  const count = currentBlenderShots.length;
  const pct = Math.min(100, count * 20);
  const basePrice = 4.50;
  const totalPrice = count === 0 ? 0 : basePrice + currentBlenderShots.reduce((s, i) => s + i.price, 0);
  const totalCal = currentBlenderShots.reduce((s, i) => s + i.cal, 0);
  const totalVitC = currentBlenderShots.reduce((s, i) => s + i.vitC, 0);
  const totalScoville = currentBlenderShots.reduce((s, i) => s + i.scoville, 0);

  // Pick top liquid color
  const topColor = count > 0 ? currentBlenderShots[count - 1].color : '#CCFF00';

  // Update SVG liquid height (y goes from 290 empty to 60 full)
  const maxH = 230;
  const currentH = (pct / 100) * maxH;
  const currentY = 290 - currentH;

  if (liquidRect) {
    liquidRect.setAttribute('y', currentY);
    liquidRect.setAttribute('height', currentH);
    liquidRect.setAttribute('fill', topColor);
  }
  if (wavePath) {
    wavePath.setAttribute('fill', topColor);
    wavePath.setAttribute('transform', `translate(0, ${currentY - 12})`);
  }
  if (fillPctLabel) {
    fillPctLabel.textContent = `${pct}% CAPACITANCE (${count}/5 SHOTS)`;
  }

  // Render removable chips
  if (slotsBar) {
    if (count === 0) {
      slotsBar.innerHTML = `<span style="font-family:var(--font-mono);font-size:0.8rem;color:#aaa;">[VESSEL EMPTY — TAP INGREDIENTS TO LOAD]</span>`;
    } else {
      slotsBar.innerHTML = currentBlenderShots.map((s, idx) => `
        <span class="shot-chip" data-remove-idx="${idx}" title="Click to remove shot">
          <span class="swatch-dot" style="background:${s.color};width:10px;height:10px;"></span>
          ${s.name} [×]
        </span>
      `).join('');

      slotsBar.querySelectorAll('.shot-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const idx = parseInt(chip.dataset.removeIdx, 10);
          currentBlenderShots.splice(idx, 1);
          renderBlenderState();
        });
      });
    }
  }

  // Update Live Nutrition Facts Receipt
  const elCal = document.getElementById('nut-cal');
  const elVitC = document.getElementById('nut-vitc');
  const elScoville = document.getElementById('nut-scoville');
  const elChaos = document.getElementById('nut-chaos');
  const elIngredients = document.getElementById('nut-ingredients-list');
  const lockBtn = document.getElementById('lock-potion-btn');

  if (elCal) elCal.textContent = totalCal;
  if (elVitC) elVitC.textContent = `${totalVitC}%`;
  if (elScoville) elScoville.textContent = `${totalScoville.toLocaleString()} SHU`;
  if (elChaos) {
    const chaosLabel = count >= 5 ? 'CRITICAL OVERDRIVE' : count >= 3 ? 'HIGH VOLTAGE' : count >= 1 ? 'MILD RIOT' : 'DORMANT';
    elChaos.textContent = chaosLabel;
  }
  if (elIngredients) {
    elIngredients.textContent = count > 0
      ? currentBlenderShots.map(s => s.name.toUpperCase()).join(', ') + ', RAW COLD-PRESSED COCONUT WATER BASE.'
      : 'NONE SELECTED.';
  }
  if (lockBtn) {
    lockBtn.textContent = `LOCK IN & THROW IN CRATE — $${totalPrice.toFixed(2)}`;
  }
}

// ==========================================================================
// 6. THE FLAVOR VAULT MENU & CATEGORY FILTERING
// ==========================================================================
function initFlavorVault() {
  const vaultGrid = document.getElementById('vault-grid');
  const filterBar = document.getElementById('vault-filter-bar');
  if (!vaultGrid) return;

  function renderCards(filter = 'all') {
    const list = filter === 'all'
      ? FLAVOR_VAULT
      : FLAVOR_VAULT.filter(item => item.category === filter);

    vaultGrid.innerHTML = list.map(flavor => `
      <article class="flavor-card" data-category="${flavor.category}">
        <div class="card-badge-corner" style="background:${flavor.hotColor}">${flavor.badge}</div>
        <div class="card-visual-stage" style="background:${flavor.primaryColor}">
          <img src="${flavor.image}" alt="${flavor.name}" loading="lazy" />
          <div class="price-burst">$${flavor.price.toFixed(2)}</div>
        </div>
        <div class="card-body">
          <div style="font-family:var(--font-mono);font-size:0.75rem;font-weight:700;background:#070707;color:${flavor.secondaryColor};padding:4px 8px;align-self:flex-start;">
            ${flavor.specs}
          </div>
          <h3 class="card-title">${flavor.name}</h3>
          <p class="card-notes">${flavor.notes}</p>
          <div class="meter-bars">
            <div class="meter-line">
              <span style="width:68px;">ACIDITY</span>
              <div class="meter-track"><div class="meter-fill" style="width:${flavor.acid}%;background:${flavor.primaryColor}"></div></div>
              <span>${flavor.acid}%</span>
            </div>
            <div class="meter-line">
              <span style="width:68px;">HEAT KICK</span>
              <div class="meter-track"><div class="meter-fill" style="width:${flavor.heat}%;background:${flavor.hotColor}"></div></div>
              <span>${flavor.heat}%</span>
            </div>
            <div class="meter-line">
              <span style="width:68px;">VOLTAGE</span>
              <div class="meter-track"><div class="meter-fill" style="width:${flavor.voltage}%;background:#070707"></div></div>
              <span>${flavor.voltage}%</span>
            </div>
          </div>
          <div class="card-actions">
            <button class="btn-brutal primary add-vault-btn" data-id="${flavor.id}" style="padding:12px 16px;font-size:0.9rem;justify-content:center;">
              + THROW IN CRATE
            </button>
          </div>
        </div>
      </article>
    `).join('');

    vaultGrid.querySelectorAll('.add-vault-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const flavor = FLAVOR_VAULT.find(f => f.id === btn.dataset.id);
        if (flavor) {
          addToCrate(flavor.id, flavor.name, flavor.price, `500ML // ${flavor.badge}`);
        }
      });
    });
  }

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  }

  renderCards('all');
}

// ==========================================================================
// 7. 6-PACK CRATE CART DRAWER & BUNDLE DISCOUNT ENGINE
// ==========================================================================
function addToCrate(id, name, price, notes) {
  const existing = crateCart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    crateCart.push({ id, name, price, qty: 1, notes });
  }
  updateCrateUI();
  openCrateDrawer();
}

function updateCrateUI() {
  const totalBottles = crateCart.reduce((sum, item) => sum + item.qty, 0);
  const rawSubtotal = crateCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const hasBundleDiscount = totalBottles >= 6;
  const discountAmount = hasBundleDiscount ? rawSubtotal * 0.15 : 0;
  const finalTotal = rawSubtotal - discountAmount;

  // Update header & mobile badges
  document.querySelectorAll('.crate-count-val').forEach(el => {
    el.textContent = totalBottles;
  });

  // Update 6-pack slot indicator dots
  const slotDots = document.querySelectorAll('.slot-dot');
  slotDots.forEach((dot, idx) => {
    dot.classList.toggle('filled', idx < totalBottles);
  });

  const statusText = document.getElementById('crate-bundle-status');
  if (statusText) {
    statusText.textContent = hasBundleDiscount
      ? '🔥 6-PACK RIOT UNLOCKED (15% OFF APPLIED!)'
      : `PACK ${Math.max(0, 6 - totalBottles)} MORE FOR 15% OFF`;
  }

  // Render Drawer Items
  const listEl = document.getElementById('drawer-items-list');
  if (listEl) {
    if (crateCart.length === 0) {
      listEl.innerHTML = `<div style="padding:32px;text-align:center;font-family:var(--font-mono);font-weight:700;">YOUR CRATE IS BONE DRY. THROW SOME BOTTLES IN!</div>`;
    } else {
      listEl.innerHTML = crateCart.map((item, idx) => `
        <div class="crate-item">
          <div>
            <div style="font-family:var(--font-display);font-size:1rem;">${item.name}</div>
            <div style="font-family:var(--font-mono);font-size:0.75rem;color:#444;">${item.notes}</div>
            <div style="font-family:var(--font-mono);font-weight:700;margin-top:4px;">$${(item.price * item.qty).toFixed(2)} ($${item.price.toFixed(2)} ea)</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <button class="nav-btn qty-btn" data-idx="${idx}" data-delta="-1" style="padding:4px 10px;">-</button>
            <span style="font-family:var(--font-mono);font-weight:700;min-width:22px;text-align:center;">${item.qty}</span>
            <button class="nav-btn qty-btn" data-idx="${idx}" data-delta="1" style="padding:4px 10px;">+</button>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.idx, 10);
          const d = parseInt(btn.dataset.delta, 10);
          crateCart[i].qty += d;
          if (crateCart[i].qty <= 0) crateCart.splice(i, 1);
          updateCrateUI();
        });
      });
    }
  }

  const elSub = document.getElementById('drawer-subtotal');
  const elDisc = document.getElementById('drawer-discount');
  const elTotal = document.getElementById('drawer-total');

  if (elSub) elSub.textContent = `$${rawSubtotal.toFixed(2)}`;
  if (elDisc) elDisc.textContent = hasBundleDiscount ? `-$${discountAmount.toFixed(2)} (15% RIOT PACK)` : '$0.00 (ADD 6 FOR 15% OFF)';
  if (elTotal) elTotal.textContent = `$${finalTotal.toFixed(2)}`;
}

function openCrateDrawer() {
  document.getElementById('crate-backdrop')?.classList.add('open');
  document.getElementById('crate-drawer')?.classList.add('open');
}

function closeCrateDrawer() {
  document.getElementById('crate-backdrop')?.classList.remove('open');
  document.getElementById('crate-drawer')?.classList.remove('open');
}

function initCrateControls() {
  document.querySelectorAll('.open-crate-trigger').forEach(btn => {
    btn.addEventListener('click', openCrateDrawer);
  });
  document.getElementById('close-crate-btn')?.addEventListener('click', closeCrateDrawer);
  document.getElementById('crate-backdrop')?.addEventListener('click', closeCrateDrawer);

  // Escape key closes drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCrateDrawer();
  });

  document.getElementById('checkout-riot-btn')?.addEventListener('click', () => {
    if (crateCart.length === 0) return;
    alert('⚡ ORDER DISPATCHED TO HYDRAULIC PRESS! COLD-CHAIN COURIER LOCKED IN.');
    crateCart = [];
    updateCrateUI();
    closeCrateDrawer();
  });

  updateCrateUI();
}

// ==========================================================================
// 8. DRAGGABLE STICKER BOMB ENGINE
// ==========================================================================
function initDraggableStickers() {
  const stickers = document.querySelectorAll('.sticker');
  stickers.forEach(sticker => {
    let isDragging = false;
    let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

    sticker.addEventListener('pointerdown', (e) => {
      isDragging = true;
      sticker.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = sticker.offsetLeft;
      initialTop = sticker.offsetTop;
    });

    sticker.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      sticker.style.left = `${initialLeft + dx}px`;
      sticker.style.top = `${initialTop + dy}px`;
    });

    sticker.addEventListener('pointerup', () => {
      isDragging = false;
    });
  });
}

// ==========================================================================
// 9. RIOT CLUB SUBSCRIPTION & BODEGA RADAR PINS
// ==========================================================================
function initClubAndRadar() {
  const freqButtons = document.querySelectorAll('.freq-btn');
  const clubPriceEl = document.getElementById('club-price-display');
  const joinClubBtn = document.getElementById('join-club-btn');

  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (clubPriceEl) {
        clubPriceEl.textContent = btn.dataset.plan === 'weekly'
          ? '$42.00 / WEEK (SAVE 22%)'
          : '$45.00 / BI-WEEKLY (SAVE 15%)';
      }
    });
  });

  if (joinClubBtn) {
    joinClubBtn.addEventListener('click', () => {
      addToCrate('SUB-RIOT-6', 'RIOT CLUB 6-PACK SUBSCRIPTION', 42.00, 'VIP COLD-CHAIN DROP + SECRET FLAVOR');
    });
  }

  // Bodega Truck Radar Pins
  const radarReadout = document.getElementById('radar-telemetry-readout');
  document.querySelectorAll('.truck-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      if (radarReadout) {
        radarReadout.textContent = `>> LOCKED UNIT: ${pin.dataset.unit} // STOCK: ${pin.dataset.stock} // ETA: LIVE NOW`;
      }
    });
  });
}

// ==========================================================================
// 10. CUSTOMS MANIFEST WHOLESALE / HOTLINE FORM + RUBBER STAMP SLAM
// ==========================================================================
function initManifestForm() {
  const form = document.getElementById('riot-manifest-form');
  const stampOverlay = document.getElementById('manifest-stamp-overlay');
  const resetBtn = document.getElementById('reset-manifest-btn');
  const receiptSummary = document.getElementById('manifest-receipt-summary');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const handle = document.getElementById('manifest-name')?.value || 'OPERATIVE';
    const mission = document.getElementById('manifest-type')?.value || 'BODEGA WHOLESALE';
    const crates = document.getElementById('manifest-volume')?.value || '25 CRATES';

    if (receiptSummary) {
      receiptSummary.textContent = `MANIFEST #904-X // OPERATIVE: ${handle.toUpperCase()} // MISSION: ${mission.toUpperCase()} // PAYLOAD: ${crates}`;
    }

    document.body.classList.remove('shake-riot');
    void document.body.offsetWidth;
    document.body.classList.add('shake-riot');

    stampOverlay?.classList.add('stamped');
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      stampOverlay?.classList.remove('stamped');
    });
  }
}

// 11. SCROLL-REVEAL MOTION ENGINE
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.section-banner, .arsenal-panel, .vessel-panel, .receipt-panel, .flavor-card, .zine-card, .club-box, .radar-box, .manifest-clipboard'
  );
  targets.forEach((el, idx) => {
    el.classList.add('reveal-item');
    el.style.transitionDelay = `${(idx % 4) * 65}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}

// ==========================================================================
// 12. LIVE HIGH VOLTAGE TELEMETRY & SYNDICATE ACTIVITY ENGINE
// ==========================================================================
function initLiveTelemetry() {
  const voltageEl = document.getElementById('telemetry-voltage');
  const timerEl = document.getElementById('telemetry-timer');
  const stockEl = document.getElementById('telemetry-stock');
  const toast = document.getElementById('syndicate-toast');
  const toastMsg = document.getElementById('toast-message');

  let remainingStock = 79;
  let secondsRemaining = 222; // 03:42

  // 1. Live Voltage Jitter & Countdown Timer
  setInterval(() => {
    // Jitter voltage
    if (voltageEl) {
      const v = 14200 + Math.floor(Math.random() * 180) - 90;
      voltageEl.textContent = `${v.toLocaleString()}V ACTIVE`;
    }

    // Timer countdown
    if (timerEl && secondsRemaining > 0) {
      secondsRemaining--;
      const m = Math.floor(secondsRemaining / 60);
      const s = secondsRemaining % 60;
      timerEl.textContent = `0${m}:${s < 10 ? '0' : ''}${s}`;
    }
  }, 1000);

  // 2. Periodic Live Stock Tick
  setInterval(() => {
    if (stockEl && remainingStock > 12) {
      if (Math.random() > 0.4) {
        remainingStock -= 1;
        stockEl.textContent = `${remainingStock} / 120 BOTTLES`;
      }
    }
  }, 14000);

  // 3. Live Syndicate Dispatch Feed Toasts
  const DISPATCH_FEED = [
    'Operative in Brooklyn claimed 2x Napalm Mango (18k SHU)',
    'Shibuya Crossing Pop-up restocked 18x Venom Yuzu',
    'Custom Potion "ACID VOLT #4" mixed & dispatched to Lower East Side',
    'Night Owl Deli Bodega grabbed 12-Pack Syndicate Crate',
    'Operative in Berlin ordered 6-Pack Riot Crate (15% Off Applied)',
    '12-Ton Press completed extraction cycle on 500KG Alphonso Mangoes'
  ];
  let feedIdx = 0;

  function showNextToast() {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = DISPATCH_FEED[feedIdx % DISPATCH_FEED.length];
    toast.classList.add('show');
    feedIdx++;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Trigger first after 3s, then every 9s
  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 9500);
  }, 3000);
}

// ==========================================================================
// 13. 60FPS HARDWARE-ACCELERATED MARQUEE REELS ENGINE
// ==========================================================================
function initMarqueeReels() {
  const tracks = document.querySelectorAll('.marquee-track');
  const reels = [];

  tracks.forEach((track, idx) => {
    // Duplicate content once more to ensure ultra-wide 4K screens never see a gap
    track.innerHTML = track.innerHTML + track.innerHTML;
    track.style.animation = 'none';
    track.style.willChange = 'transform';

    // Natural, normal standard marquee cruising speed (~1.15 - 1.35 px/frame)
    const speed = parseFloat(track.dataset.speed) || (idx === 1 ? 1.35 : 1.15);
    reels.push({
      el: track,
      offset: 0,
      speed
    });
  });

  function stepReels() {
    for (let i = 0; i < reels.length; i++) {
      const r = reels[i];
      r.offset += r.speed;
      const halfWidth = r.el.scrollWidth / 2;
      if (halfWidth > 0 && r.offset >= halfWidth) {
        r.offset -= halfWidth;
      }
      r.el.style.transform = `translate3d(-${r.offset}px, 0, 0)`;
    }
    requestAnimationFrame(stepReels);
  }

  requestAnimationFrame(stepReels);
}

// ==========================================================================
// 14. MOBILE 3-LINES HAMBURGER DRAWER ENGINE
// ==========================================================================
function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-open-btn');
  const closeBtn = document.getElementById('mobile-menu-close-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const navItems = document.querySelectorAll('.mobile-nav-item');

  function openMenu() {
    drawer?.classList.add('open');
    backdrop?.classList.add('open');
  }

  function closeMenu() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('open');
  }

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  navItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });
}

// BOOTSTRAP ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  splashFX = new SplashEngine();
  initMarqueeReels();
  initMobileMenu();
  initVoltageSwitcher();
  initCustomBlender();
  initFlavorVault();
  initCrateControls();
  initDraggableStickers();
  initClubAndRadar();
  initManifestForm();
  initScrollReveal();
});
