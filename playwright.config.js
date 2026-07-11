// @ts-check
const path = require('path');
const { defineConfig, devices } = require('@playwright/test');

const envName = process.env.ENV || 'dev';
require('dotenv').config({
  path: path.resolve(__dirname, 'config/environments', `${envName}.env`),
});

module.exports = defineConfig({
  testDir:       './tests',
  timeout:        30_000,
  retries:        process.env.CI ? 2 : 0,
  workers:        process.env.CI ? 4 : 2,
  fullyParallel:  false,
  forbidOnly:      !!process.env.CI,

  globalSetup:    './global-setup.js',
  globalTeardown: './global-teardown.js',

  use: {
    baseURL:           process.env.BASE_URL,
    headless:          false,
    screenshot:        'only-on-failure',
    video:             'retain-on-failure',
    trace:             'retain-on-failure',
    actionTimeout:     10_000,
    navigationTimeout: 15_000,
  },

  reporter: [
    ['html',  { outputFolder: 'reports/html', open: 'never' }],
    ['junit', { outputFile:   'reports/junit/results.xml'   }],
    ['list'],
  ],

  projects: [
    {
      name: 'chromium',
      use:  {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    // {
    //   name: 'firefox',
    //   use:  { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use:  { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'mobile-chrome',
    //   use:  { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'mobile-safari',
    //   use:  { ...devices['iPhone 13'] },
    // },
  ],
});

