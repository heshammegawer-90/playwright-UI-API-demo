import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  private readonly productNameSelector: Locator;
  private readonly productPriceSelector: Locator;
  private readonly finishButtonSelecotr: Locator;

  constructor(private page: Page) {
    this.productNameSelector = page.locator(
      '[data-test="inventory-item-name"]',
    );
    this.productPriceSelector = page.locator(
      '[data-test="inventory-item-price"]',
    );
    this.finishButtonSelecotr = page.locator('[data-test="finish"]');
  }

  async verifyProductInformation(productName: string, productPrice: string) {
    await expect(this.page).toHaveURL(/checkout-step-two/);
    await expect(this.productNameSelector).toHaveText(productName);
    await expect(this.productPriceSelector).toHaveText(productPrice);
  }

  async finishThePurschse() {
    await this.finishButtonSelecotr.click();
    await expect(this.page).toHaveURL(/complete/);
  }
}
