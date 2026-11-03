import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

// Smooth cubic easing for natural movement
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

async function smoothScroll(page, targetY, durationMs = 1200) {
  await page.evaluate(async ({ targetY, durationMs }) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();

    return new Promise(resolve => {
      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
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

  await page.waitForTimeout(durationMs + 200);
}

async function moveCursorAndClick(page, selectorOrPoint, textToType = null) {
  let x, y;
  if (typeof selectorOrPoint === 'string') {
    const loc = page.locator(selectorOrPoint).first();
    await loc.scrollIntoViewIfNeeded();
    const box = await loc.boundingBox();
    if (!box) return;
    x = box.x + box.width / 2;
    y = box.y + box.height / 2;
  } else {
    x = selectorOrPoint.x;
    y = selectorOrPoint.y;
  }

  // Smooth mouse move
  await page.mouse.move(x, y, { steps: 25 });
  await page.waitForTimeout(200);

  // Click
  await page.mouse.down();
  await page.waitForTimeout(100);
  await page.mouse.up();
  await page.waitForTimeout(400);

  if (textToType) {
    await page.keyboard.type(textToType, { delay: 45 });
    await page.waitForTimeout(300);
  }
}

async function runCinematicRecording() {
  const videoDir = path.resolve('./assets/videos');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  console.log('Launching browser for cinematic recording...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 900 }
    }
  });

  const page = await context.newPage();

  // Inject visible custom cursor for professional presentation
  await page.addInitScript(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const cursor = document.createElement('div');
      cursor.id = 'cinematic-cursor';
      cursor.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        background: #CCFF00;
        border: 3px solid #070707;
        border-radius: 50%;
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px rgba(204,255,0,0.8), 3px 3px 0 #070707;
        transition: width 0.15s, height 0.15s, background-color 0.15s;
      `;
      document.body.appendChild(cursor);

      window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });

      window.addEventListener('mousedown', () => {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.backgroundColor = '#FF0055';
      });

      window.addEventListener('mouseup', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.backgroundColor = '#CCFF00';
      });
    });
  });

  console.log('Navigating to http://localhost:4321...');
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // SCENE 1: Hero stage & Liquid Canvas Splash
  console.log('Scene 1: Hero stage & Splash Detonation...');
  await page.mouse.move(720, 450, { steps: 15 });
  await moveCursorAndClick(page, { x: 500, y: 350 });
  await page.waitForTimeout(400);
  await moveCursorAndClick(page, { x: 620, y: 400 });
  await page.waitForTimeout(600);

  // SCENE 2: Flavor Voltage Switcher
  console.log('Scene 2: Voltage Switcher Interaction...');
  await moveCursorAndClick(page, 'button[data-flavor-id="RIOT-02"]'); // YUZU
  await page.waitForTimeout(1800);

  await moveCursorAndClick(page, 'button[data-flavor-id="RIOT-03"]'); // COMA
  await page.waitForTimeout(1800);

  await moveCursorAndClick(page, 'button[data-flavor-id="RIOT-01"]'); // MANGO
  await page.waitForTimeout(1800);

  // SCENE 3: Smooth scroll past yellow caution strip to Lab Riot Blender
  console.log('Scene 3: Smooth scrolling to Lab Riot...');
  const mixerSection = page.locator('#lab-riot');
  const mixerBox = await mixerSection.boundingBox();
  if (mixerBox) {
    await smoothScroll(page, mixerBox.y, 1600);
  }
  await page.waitForTimeout(1000);

  // Load ingredients into blender
  console.log('Adding ingredients to hydraulic vessel...');
  await moveCursorAndClick(page, 'button[data-ing-id="ing-mango"]');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, 'button[data-ing-id="ing-yuzu"]');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, 'button[data-ing-id="ing-ginger"]');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, 'button[data-ing-id="ing-pitaya"]');
  await page.waitForTimeout(1200);

  // Type custom bottle name
  console.log('Naming custom potion...');
  const nameInput = page.locator('#custom-potion-name');
  await nameInput.fill('');
  await moveCursorAndClick(page, '#custom-potion-name', 'NEON OVERDRIVE #9');
  await page.waitForTimeout(800);

  // Lock in potion and open crate drawer
  console.log('Locking in potion & opening crate drawer...');
  await moveCursorAndClick(page, '#lock-potion-btn');
  await page.waitForTimeout(2500);

  // Close crate drawer
  console.log('Closing crate drawer...');
  await moveCursorAndClick(page, '#close-crate-btn');
  await page.waitForTimeout(1200);

  // SCENE 4: Flavor Vault
  console.log('Scene 4: Smooth scrolling to Flavor Vault...');
  const vaultSection = page.locator('#flavor-vault');
  const vaultBox = await vaultSection.boundingBox();
  if (vaultBox) {
    await smoothScroll(page, vaultBox.y, 1400);
  }
  await page.waitForTimeout(1200);

  // Filter categories
  await moveCursorAndClick(page, 'button[data-filter="acid-sour"]');
  await page.waitForTimeout(1200);
  await moveCursorAndClick(page, 'button[data-filter="nootropic"]');
  await page.waitForTimeout(1200);
  await moveCursorAndClick(page, 'button[data-filter="all"]');
  await page.waitForTimeout(1200);

  // Add flavor to crate
  await moveCursorAndClick(page, '.flavor-card:first-child .add-vault-btn');
  await page.waitForTimeout(1800);
  await moveCursorAndClick(page, '#close-crate-btn');
  await page.waitForTimeout(1000);

  // SCENE 5: Zine & Riot Club
  console.log('Scene 5: Zine & Riot Club...');
  const zineSection = page.locator('#hydraulic-zine');
  const zineBox = await zineSection.boundingBox();
  if (zineBox) {
    await smoothScroll(page, zineBox.y, 1500);
  }
  await page.waitForTimeout(2000);

  const clubSection = page.locator('#riot-club');
  const clubBox = await clubSection.boundingBox();
  if (clubBox) {
    await smoothScroll(page, clubBox.y, 1400);
  }
  await page.waitForTimeout(1000);
  await moveCursorAndClick(page, 'button[data-plan="biweekly"]');
  await page.waitForTimeout(800);
  await moveCursorAndClick(page, 'button[data-plan="weekly"]');
  await page.waitForTimeout(1200);

  // SCENE 6: Wholesale Customs Manifest & Rubber Stamp
  console.log('Scene 6: Wholesale Manifest & Stamp...');
  const manifestSection = page.locator('#manifest-hotline');
  const manifestBox = await manifestSection.boundingBox();
  if (manifestBox) {
    await smoothScroll(page, manifestBox.y, 1400);
  }
  await page.waitForTimeout(1200);

  await moveCursorAndClick(page, '#manifest-name', 'MARCO // BROOKLYN BODEGA');
  await moveCursorAndClick(page, '#manifest-email', 'MARCO@BROOKLYNBODEGA.COM');
  await moveCursorAndClick(page, '#manifest-notes', 'SEND 50 CRATES OF NAPALM MANGO TO OUR LOWER EAST SIDE DROP BEFORE 6AM.');
  await page.waitForTimeout(800);

  // Slam the stamp!
  console.log('Slamming rubber stamp...');
  await moveCursorAndClick(page, 'button[type="submit"]');
  await page.waitForTimeout(3000);

  // SCENE 7: Footer & Back to top
  console.log('Scene 7: Footer & Smooth return...');
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  await smoothScroll(page, scrollHeight, 1600);
  await page.waitForTimeout(2000);

  console.log('Finalizing video recording...');
  await page.close();
  await context.close();
  await browser.close();

  // Find newly recorded video
  const files = fs.readdirSync(videoDir);
  const webmFiles = files.filter(f => f.endsWith('.webm') && f !== 'pulp-riot-demo.webm');
  if (webmFiles.length > 0) {
    // Sort by creation time descending
    const sorted = webmFiles.map(f => ({
      file: f,
      mtime: fs.statSync(path.join(videoDir, f)).mtime
    })).sort((a, b) => b.mtime - a.mtime);

    const latest = sorted[0].file;
    const targetWebm = path.join(videoDir, 'pulp-riot-cinematic-walkthrough.webm');
    if (fs.existsSync(targetWebm)) fs.unlinkSync(targetWebm);
    fs.renameSync(path.join(videoDir, latest), targetWebm);
    console.log(`Cinematic video saved to: ${targetWebm}`);
  }
}

runCinematicRecording().catch(err => {
  console.error('Error during cinematic recording:', err);
  process.exit(1);
});
