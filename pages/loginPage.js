const { BasePage } = require('./base/basePage');
const { URLS } = require('../constants/urls');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Submit' });
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
    this.loginError = page.locator('div#error');
    this.emailError = page.locator('div#error');
    this.userMenu = page.locator('button#menu-toggle');
    this.logoutOption = page.getByRole('link', { name: 'Logout' });
  }

  async open() {
    await this.navigate(URLS.login);
  }

  async login(username, password, testInfo) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.takeScreenshot('login-successful', testInfo);
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
}

module.exports = { LoginPage };
