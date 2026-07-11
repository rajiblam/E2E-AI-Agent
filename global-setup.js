const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const baseURL = config.use?.baseURL || config.projects?.[0]?.use?.baseURL || process.env.BASE_URL;

  const authDir = path.resolve(__dirname, 'fixtures');
  fs.mkdirSync(authDir, { recursive: true });

  try {
    await page.goto(`${baseURL}/login`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.fill('[data-testid="login-email"]', process.env.TEST_USERNAME || '');
    await page.fill('[data-testid="login-password"]', process.env.TEST_PASSWORD || '');
    await page.click('[data-testid="login-btn"]');
    await page.waitForLoadState('networkidle').catch(() => {});
  } catch (error) {
    console.warn('Global setup could not sign in; using empty storage state instead.', error.message);
  } finally {
    await context.storageState({ path: path.resolve(authDir, 'auth.json') });
    await browser.close();
  }
}

module.exports = globalSetup;
