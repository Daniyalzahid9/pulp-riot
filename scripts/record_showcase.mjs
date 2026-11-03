import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

async function record() {
  const videoDir = path.resolve('./assets/videos');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  console.log('Launching browser with video recording...');
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
  await page.waitForTimeout(2000);

  // 1. Click on Flavor Voltage Switcher buttons
  console.log('Interacting with Voltage Switcher...');
  const yuzuBtn = page.locator('button[data-flavor-id="RIOT-02"]');
  if (await yuzuBtn.isVisible()) {
    await yuzuBtn.click();
    await page.waitForTimeout(1500);
  }

  const comaBtn = page.locator('button[data-flavor-id="RIOT-03"]');
  if (await comaBtn.isVisible()) {
    await comaBtn.click();
    await page.waitForTimeout(1500);
  }

  const mangoBtn = page.locator('button[data-flavor-id="RIOT-01"]');
  if (await mangoBtn.isVisible()) {
    await mangoBtn.click();
    await page.waitForTimeout(1500);
  }

  // 2. Scroll to High Voltage Strip and Mixer Section
  console.log('Scrolling to Mixer section...');
  await page.locator('#lab-riot').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  // Click on random riot or ingredients
  const randomBtn = page.locator('#shake-vessel-btn');
  if (await randomBtn.isVisible()) {
    await randomBtn.click();
    await page.waitForTimeout(1200);
  }

  // Click lock in
  const lockBtn = page.locator('#lock-potion-btn');
  if (await lockBtn.isVisible()) {
    await lockBtn.click();
    await page.waitForTimeout(1800);
  }

  // Close crate drawer
  const closeDrawerBtn = page.locator('#close-crate-btn');
  if (await closeDrawerBtn.isVisible()) {
    await closeDrawerBtn.click();
    await page.waitForTimeout(1000);
  }

  // 3. Scroll to Flavor Vault
  console.log('Scrolling to Flavor Vault...');
  await page.locator('#flavor-vault').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  // Filter pills
  const acidFilter = page.locator('button[data-filter="acid-sour"]');
  if (await acidFilter.isVisible()) {
    await acidFilter.click();
    await page.waitForTimeout(1200);
  }
  const allFilter = page.locator('button[data-filter="all"]');
  if (await allFilter.isVisible()) {
    await allFilter.click();
    await page.waitForTimeout(1200);
  }

  // 4. Scroll to Zine and Radar
  console.log('Scrolling to Zine and Radar...');
  await page.locator('#hydraulic-zine').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  await page.locator('#riot-club').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  // Click radar pin
  const pin = page.locator('.truck-pin').first();
  if (await pin.isVisible()) {
    await pin.click();
    await page.waitForTimeout(1200);
  }

  // 5. Scroll to Customs Manifest
  console.log('Scrolling to Customs Manifest...');
  await page.locator('#manifest-hotline').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  console.log('Closing page to finalize video...');
  await page.close();
  await context.close();
  await browser.close();

  // Find generated video and rename to standard name
  const files = fs.readdirSync(videoDir);
  const webmFiles = files.filter(f => f.endsWith('.webm') && f !== 'pulp-riot-demo.webm');
  if (webmFiles.length > 0) {
    const latest = webmFiles[0];
    const targetPath = path.join(videoDir, 'pulp-riot-demo.webm');
    fs.renameSync(path.join(videoDir, latest), targetPath);
    console.log(`Video successfully recorded & saved to: ${targetPath}`);
  }
}

record().catch(err => {
  console.error('Recording error:', err);
  process.exit(1);
});
