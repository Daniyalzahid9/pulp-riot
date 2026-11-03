import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

async function smoothScroll(page, targetY, durationMs = 1200) {
  await page.evaluate(async ({ targetY, durationMs }) => {
    return new Promise(resolve => {
      const startY = window.scrollY;
      const diff = targetY - startY;
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + diff * ease);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  }, { targetY, durationMs });
}

async function moveCursorAndClick(page, selectorOrPoint, textToType = null) {
  let targetX, targetY;

  if (typeof selectorOrPoint === 'string') {
    const el = page.locator(selectorOrPoint).first();
    await el.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const box = await el.boundingBox();
    if (!box) return;
    targetX = box.x + box.width / 2;
    targetY = box.y + box.height / 2;
  } else {
    targetX = selectorOrPoint.x;
    targetY = selectorOrPoint.y;
  }

  await page.evaluate(({ x, y }) => {
    let cursor = document.getElementById('cinematic-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'cinematic-cursor';
      cursor.innerHTML = `
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 0 10px #ccff00);">
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" fill="#ccff00" stroke="#000" stroke-width="1.8"/>
        </svg>
      `;
      cursor.style.position = 'fixed';
      cursor.style.pointerEvents = 'none';
      cursor.style.zIndex = '999999';
      cursor.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s';
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      document.body.appendChild(cursor);
    } else {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, { x: targetX, y: targetY });

  await page.waitForTimeout(400);

  // Click ripple effect
  await page.evaluate(({ x, y }) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '16px';
    ripple.style.height = '16px';
    ripple.style.border = '3px solid #ff0055';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '999998';
    ripple.style.transform = 'translate(-50%, -50%) scale(0.5)';
    ripple.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
    document.body.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(3.5)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 450);
  }, { x: targetX, y: targetY });

  if (typeof selectorOrPoint === 'string') {
    const el = page.locator(selectorOrPoint).first();
    await el.click().catch(() => {});
    if (textToType) {
      await el.fill('');
      for (const char of textToType) {
        await page.keyboard.type(char, { delay: 35 });
      }
    }
  } else {
    await page.mouse.click(targetX, targetY);
  }
}

async function runTutorialRecording() {
  const videoDir = path.resolve('./temp_tutorial/raw');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  console.log('Launching browser for tutorial video recording...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 900 }
    }
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:4321...');
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // ==========================================
  // CHAPTER 1: Hero Stage & Splash Detonation (11.5s)
  // ==========================================
  console.log('Chapter 1: Hero & Liquid Splash...');
  await moveCursorAndClick(page, { x: 720, y: 400 });
  await page.waitForTimeout(2500);
  await moveCursorAndClick(page, { x: 850, y: 350 });
  await page.waitForTimeout(3000);
  await moveCursorAndClick(page, { x: 620, y: 450 });
  await page.waitForTimeout(4500);

  // ==========================================
  // CHAPTER 2: Flavor Voltage Switcher (11.2s)
  // ==========================================
  console.log('Chapter 2: Flavor Voltage Switcher...');
  const yuzuPos = await page.locator('button[data-flavor-id="RIOT-02"]').boundingBox();
  if (yuzuPos) {
    await smoothScroll(page, Math.max(0, yuzuPos.y - 250), 800);
    await page.waitForTimeout(600);
    await moveCursorAndClick(page, 'button[data-flavor-id="RIOT-02"]');
    await page.waitForTimeout(2800);
  }

  const comaBtn = page.locator('button[data-flavor-id="RIOT-03"]');
  if (await comaBtn.isVisible()) {
    await moveCursorAndClick(page, 'button[data-flavor-id="RIOT-03"]');
    await page.waitForTimeout(2800);
  }

  const mangoBtn = page.locator('button[data-flavor-id="RIOT-01"]');
  if (await mangoBtn.isVisible()) {
    await moveCursorAndClick(page, 'button[data-flavor-id="RIOT-01"]');
    await page.waitForTimeout(3200);
  }

  // ==========================================
  // CHAPTER 3: Hydraulic Mix Lab & Blender (14.0s)
  // ==========================================
  console.log('Chapter 3: Hydraulic Mix Lab...');
  const mixerSection = page.locator('#lab-riot');
  const mixerBox = await mixerSection.boundingBox();
  if (mixerBox) {
    await smoothScroll(page, mixerBox.y, 1000);
  }
  await page.waitForTimeout(1000);

  await moveCursorAndClick(page, 'button[data-ing-id="ing-mango"]');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, 'button[data-ing-id="ing-yuzu"]');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, 'button[data-ing-id="ing-ginger"]');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, 'button[data-ing-id="ing-pitaya"]');
  await page.waitForTimeout(1200);

  await moveCursorAndClick(page, '#custom-potion-name', 'NEON OVERDRIVE #9');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, '#lock-potion-btn');
  await page.waitForTimeout(4000);

  // ==========================================
  // CHAPTER 4: Syndicate Crate Builder & Bulk Discounts (9.5s)
  // ==========================================
  console.log('Chapter 4: Crate Drawer...');
  await page.waitForTimeout(6000); // viewing crate contents with -15% discount
  await moveCursorAndClick(page, '#close-crate-btn');
  await page.waitForTimeout(2500);

  // ==========================================
  // CHAPTER 5: Wholesale Customs Manifest & Approval Stamp (14.0s)
  // ==========================================
  console.log('Chapter 5: Wholesale Manifest & Stamp...');
  const manifestSection = page.locator('#manifest-hotline');
  const manifestBox = await manifestSection.boundingBox();
  if (manifestBox) {
    await smoothScroll(page, manifestBox.y, 1200);
  }
  await page.waitForTimeout(1000);

  await moveCursorAndClick(page, '#manifest-name', 'BODEGA RIOT NYC // MANHATTAN');
  await moveCursorAndClick(page, '#manifest-email', 'DISPATCH@BODEGARIOTNYC.COM');
  await moveCursorAndClick(page, '#manifest-notes', 'PRIORITY DROP: 100 CRATES BEFORE 06:00 EST');
  await page.waitForTimeout(800);

  await moveCursorAndClick(page, 'button[type="submit"]');
  await page.waitForTimeout(4500);

  console.log('Tutorial recording complete. Finalizing...');
  await page.close();
  await context.close();
  await browser.close();

  const files = fs.readdirSync(videoDir);
  const webmFiles = files.filter(f => f.endsWith('.webm'));
  if (webmFiles.length > 0) {
    const sorted = webmFiles.map(f => ({
      file: f,
      mtime: fs.statSync(path.join(videoDir, f)).mtime
    })).sort((a, b) => b.mtime - a.mtime);

    const latest = sorted[0].file;
    const targetWebm = path.join(videoDir, 'tutorial-raw.webm');
    if (fs.existsSync(targetWebm)) fs.unlinkSync(targetWebm);
    fs.renameSync(path.join(videoDir, latest), targetWebm);
    console.log(`Tutorial raw video saved to: ${targetWebm}`);
  }
}

runTutorialRecording().catch(err => {
  console.error('Tutorial recording failed:', err);
  process.exit(1);
});
