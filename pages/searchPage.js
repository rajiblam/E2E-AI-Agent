const { BasePage } = require('./base/basePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput  = page.getByTestId('search-input');
    this.searchButton = page.getByTestId('search-btn');
    this.resultsList  = page.getByTestId('results-list');
    this.noResultsMsg = page.getByTestId('no-results');
  }

  async search(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await this.resultsList.waitFor({ state: 'visible' });
  }

  async getResultCount() {
    return this.resultsList.locator('li').count();
  }

  async isNoResultsVisible() {
    return this.noResultsMsg.isVisible();
  }
}

module.exports = { SearchPage };
