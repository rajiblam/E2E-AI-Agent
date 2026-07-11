const { BasePage } = require('./base/basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByTestId('home-heading');
    this.navBar  = page.getByTestId('nav');
  }

  async isLoaded() {
    return this.heading.isVisible();
  }
}

module.exports = { HomePage };
