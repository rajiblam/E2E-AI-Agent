class NavBar {
  constructor(page) {
    this.page        = page;
    this.searchInput = page.getByTestId('nav-search-input');
    this.userMenu    = page.getByTestId('nav-user-menu');
  }

  async search(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }

  async openUserMenu() {
    await this.userMenu.click();
  }
}

module.exports = { NavBar };
