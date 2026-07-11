# Jira Steps Artifact

## Ticket
- Ticket ID: SCRUM-2
- Summary: Validate Invalid Login
- Source: Jira issue description viewed directly from the ticket.

## Objective
Automate the invalid login validation flow for OrangeHRM so the test confirms that incorrect credentials display the expected error and keep the user on the login page.

## Extracted Steps
1. Open URL: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
2. Enter Username: Admin
3. Enter Password: wrongPassword
4. Submit the login form.
5. Validate that the page shows the error message: Invalid credentials.

## Acceptance Criteria
- The OrangeHRM login page loads successfully.
- Entering invalid credentials does not navigate the user to the dashboard.
- The login page remains available and shows the invalid credentials error message.

## Notes
- This scenario is negative-path validation, not successful authentication.
- The expected assertion is an error banner containing Invalid credentials.
