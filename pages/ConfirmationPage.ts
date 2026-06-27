import { Locator, Page } from "@playwright/test";

export class ConfirmationPage {
  private readonly successMessage: Locator;

  constructor(page: Page) {
    this.successMessage = page.locator('[data-test="complete-header"]');
  }

  get verifySuccessMessage() {
    return this.successMessage;
  }
}
