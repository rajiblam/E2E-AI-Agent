const baseURL = process.env.BASE_URL || 'http://localhost:3000';
const apiBaseURL = process.env.API_URL || baseURL;

const URLS = {
  home:         process.env.HOME_URL || `${baseURL}/`,
  search:       process.env.SEARCH_URL || `${baseURL}/search`,
  login:        process.env.LOGIN_URL || `${baseURL}/login`,
  loggedInSuccessfully: process.env.LOGGED_IN_SUCCESS_URL || `${baseURL}/logged-in-successfully/`,
  registration: process.env.REGISTRATION_URL || `${baseURL}/Register.html`,
  orangeHrmLogin: process.env.ORANGEHRM_LOGIN_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  orangeHrmDashboard: process.env.ORANGEHRM_DASHBOARD_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
  api: {
    users:  `${apiBaseURL}/api/users`,
    search: `${apiBaseURL}/api/search`,
  },
};

module.exports = { URLS };
