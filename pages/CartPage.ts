import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  private readonly productNameSelector: Locator;
  private readonly productPriceSelector: Locator;
  private readonly continueButtonSelector: Locator;

  constructor(private page: Page) {
    this.productNameSelector = page.locator(
      '[data-test="inventory-item-name"]',
    );
    this.productPriceSelector = page.locator(
      '[data-test="inventory-item-price"]',
    );
    this.continueButtonSelector = page.locator('[data-test="checkout"]');
  }

  async verifyProductInformation(productname: string, productprice: string) {
    await expect(this.productNameSelector).toHaveText(productname);
    await expect(this.productPriceSelector).toHaveText(productprice);
  }

  async moveToPersonalDataPage() {
    await this.continueButtonSelector.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
