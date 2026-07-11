# Jira Steps Artifact

## Ticket
- Ticket ID: SCRUM-3
- Summary: Verify login functionality with valid credentials
- Source: https://arpanlama2024.atlassian.net/browse/SCRUM-3

## Objective
Validate that a user can successfully log in with valid credentials and then complete the expected post-login flow without errors.

## Extracted Steps
1. Open the login page for the Practice Test Automation app.
2. Enter a valid username and password.
3. Submit the login form.
4. Verify that the application redirects to the logged-in success page or displays the authenticated state.
5. Verify that the logout option is visible and that the user can log out cleanly.

## Acceptance Criteria
- User is able to authenticate with valid credentials.
- The application shows evidence of a successful login state.
- The user can log out and return to the login page state.

## Notes
- This is a high-priority smoke scenario.
- It depends on the login page and standard credentials from the test environment.
- It uses existing framework fixtures and page objects.
