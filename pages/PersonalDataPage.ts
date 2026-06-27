import { Locator, Page } from "@playwright/test";

export class PersonalDataPage {
  private readonly firstNameSelector: Locator;
  private readonly lastNameSelector: Locator;
  private readonly postalCodeSelector: Locator;
  private readonly checkoutButtonSelector: Locator;
  private readonly errorSelector: Locator;

  constructor(page: Page) {
    this.firstNameSelector = page.locator('[data-test="firstName"]');
    this.lastNameSelector = page.locator('[data-test="lastName"]');
    this.postalCodeSelector = page.locator('[data-test="postalCode"]');
    this.checkoutButtonSelector = page.locator('[data-test="continue"]');
    this.errorSelector = page.locator('[data-test="error"]');
  }

  async fillPersonalData(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameSelector.fill(firstName);
    await this.lastNameSelector.fill(lastName);
    await this.postalCodeSelector.fill(postalCode);
    await this.checkoutButtonSelector.click();
  }

  get errorMessage() {
    return this.errorSelector;
  }
}
