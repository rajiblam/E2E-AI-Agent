const { test: base } = require('@playwright/test');
const { SearchPage } = require('../pages/searchPage');
const { HomePage }   = require('../pages/homePage');
const { LoginPage }  = require('../pages/loginPage');
const { NavBar }     = require('../pages/components/navBar');
const { Modal }      = require('../pages/components/modal');
const { ApiHelper }  = require('../utils/apiHelper');

// Standard fixtures (no auth)
const test = base.extend({
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
  modal: async ({ page }, use) => {
    await use(new Modal(page));
  },
  apiHelper: async ({ request }, use) => {
    await use(new ApiHelper(request));
  },
});

// Authenticated fixtures — reuses saved storageState from global setup
const authenticatedTest = base.extend({
  storageState: 'fixtures/auth.json',
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
  modal: async ({ page }, use) => {
    await use(new Modal(page));
  },
  apiHelper: async ({ request }, use) => {
    await use(new ApiHelper(request));
  },
});

module.exports = { test, authenticatedTest };
