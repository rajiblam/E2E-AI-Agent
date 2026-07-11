# Automation Test Plan

## Ticket
- Ticket ID: SCRUM-5
- Repository: rajiblam/E2E-AI-Agent
- Target Framework: Playwright + Page Object Model

## Scope
Implement a Playwright regression spec for the OrangeHRM login/logout flow described in the SCRUM-5 task.

## Recommended Automation Scenarios
### Smoke / Regression
- Scenario 1: Open the OrangeHRM login URL and verify the login form is available.
- Scenario 2: Sign in with Admin / admin123 and verify that the Dashboard appears.
- Scenario 3: Open the profile menu, trigger logout, and verify that the Login text appears again.

### Data Prerequisites
- Username: Admin
- Password: admin123
- Login URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Mapping to Framework Components
- Page Objects: pages/loginPage.js, pages/base/basePage.js
- Selectors / Constants: constants/urls.js
- Test Spec: tests/e2e/SCRUM-5-login.spec.js

## Execution Strategy
1. Reuse the existing login page object and extend it with OrangeHRM-specific logout helpers.
2. Add a SCRUM-5 regression spec under tests/e2e that covers login, dashboard validation, logout, and post-logout validation.
3. Execute the spec in Chromium and repair selectors or assertions until the run is green.
4. Capture the exact pass/fail evidence from the test run.
