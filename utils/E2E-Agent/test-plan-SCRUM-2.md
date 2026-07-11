# Automation Test Plan

## Ticket
- Ticket ID: SCRUM-2
- Repository: https://github.com/rajiblam/E2E-AI-Agent.git
- Target Framework: Playwright + Page Object Model

## Scope
Create a smoke automation scenario for the OrangeHRM invalid-login flow using the existing repository conventions and the login page object.

## Recommended Automation Scenarios
### Smoke
- Scenario 1: User opens the OrangeHRM login page and submits invalid credentials.
- Scenario 2: The page shows the Invalid credentials error banner and remains on the login screen.

### Regression
- Scenario 3: The login form stays visible for repeated invalid-login attempts.

## Mapping to Framework Components
- Page Objects: pages/loginPage.js, pages/base/basePage.js
- Constants: constants/urls.js
- Test Spec: tests/e2e/SCRUM-2-login.spec.js

## Execution Strategy
1. Reuse the existing login page object and add an OrangeHRM helper that asserts the error banner.
2. Implement the Playwright spec under tests/e2e.
3. Execute the relevant Playwright test and heal any failures until it passes.
4. Capture evidence from the Playwright run output and report.
