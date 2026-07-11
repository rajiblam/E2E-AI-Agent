class Modal {
  constructor(page) {
    this.page       = page;
    this.modalBody  = page.getByTestId('modal-body');
    this.closeBtn   = page.getByTestId('modal-close-btn');
    this.acceptBtn  = page.getByTestId('modal-accept-btn');
    this.cancelBtn  = page.getByTestId('modal-cancel-btn');
  }

  async isVisible() {
    return this.modalBody.isVisible();
  }

  async close() {
    await this.closeBtn.click();
  }

  async accept() {
    await this.acceptBtn.click();
  }

  async cancel() {
    await this.cancelBtn.click();
  }

  async getText() {
    return this.modalBody.textContent();
  }
}

module.exports = { Modal };
