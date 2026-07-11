const fs = require('fs');
const path = require('path');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path) {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name, testInfo) {
    const screenshotsDir = path.resolve(__dirname, '../../reports/screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const screenshotPath = path.join(screenshotsDir, `${name}.png`);
    await this.page.screenshot({ path: screenshotPath });

    if (testInfo && typeof testInfo.attach === 'function') {
      await testInfo.attach(name, {
        path: screenshotPath,
        contentType: 'image/png',
      });
    }
  }

  async scrollToElement(locator) {
    await locator.scrollIntoViewIfNeeded();
  }
}

module.exports = { BasePage };
