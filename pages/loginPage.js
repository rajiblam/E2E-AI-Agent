const { expect } = require('@playwright/test');
const { BasePage } = require('./base/basePage');
const { URLS } = require('../constants/urls');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"], input[name="email"], input[data-testid="login-email"]');
    this.passwordInput = page.locator('input[name="password"], input[data-testid="login-password"]');
    this.loginButton = page.locator('button[type="submit"], button[data-testid="login-btn"], button:has-text("Login"), button:has-text("Submit")');
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
    this.loginError = page.locator('div#error');
    this.emailError = page.locator('div#error');
    this.orangeHrmError = page.locator('div.oxd-alert-content');
    this.userMenu = page.locator('button#menu-toggle');
    this.profileMenuButton = page.locator('span.oxd-userdropdown-tab').first();
    this.logoutOption = page.locator('a[href*="logout"], a:has-text("Logout"), a:has-text("Log out")').first();
  }

  async open() {
    await this.navigate(URLS.login);
  }

  async openOrangeHrmLogin(url = URLS.orangeHrmLogin) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async login(username, password, testInfo) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.takeScreenshot('login-successful', testInfo);
  }

  async loginOrangeHrm(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectDashboardVisible(expectedText = 'Dashboard') {
    await expect(this.page.locator('body')).toContainText(expectedText, { timeout: 15_000 });
  }

  async expectLoginTextVisible(expectedText = 'Login') {
    await expect(this.page.locator('body')).toContainText(expectedText, { timeout: 15_000 });
  }

  async expectInvalidCredentialsErrorVisible(expectedText = 'Invalid credentials') {
    await expect(this.orangeHrmError).toContainText(expectedText, { timeout: 15_000 });
  }

  async getErrorMessage(testId) {
    const locator = testId === 'login-error' ? this.loginError : this.emailError;
    return locator.textContent();
  }

  async isLoggedIn() {
    await this.page.waitForURL(URLS.loggedInSuccessfully);
    return this.page.url().includes('logged-in-successfully') && (await this.logoutButton.isVisible());
  }

  async logout(testInfo) {
    await this.logoutButton.click();
    await this.takeScreenshot('logout-successful', testInfo);
  }

  async logoutOrangeHrm() {
    await this.profileMenuButton.click();
    await expect(this.logoutOption).toBeVisible({ timeout: 10_000 });
    await this.logoutOption.click();
  }
}

module.exports = { LoginPage };
