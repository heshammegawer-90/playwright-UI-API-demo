import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  private readonly titleSelector: Locator;
  private readonly firstProductNameSelector: Locator;
  private readonly FirstProductPriceSelector: Locator;
  private readonly addToCartSelector: Locator;
  private readonly cartBadgeSelector: Locator;

  constructor(private page: Page) {
    this.titleSelector = page.locator('[data-test="title"]');
    this.firstProductNameSelector = page
      .locator('[data-test="inventory-item-name"]')
      .first();
    this.FirstProductPriceSelector = page
      .locator('[data-test="inventory-item-price"]')
      .first();
    this.addToCartSelector = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    this.cartBadgeSelector = page.locator('[data-test="shopping-cart-badge"]');
  }

  async getFirstProductName() {
    return await this.firstProductNameSelector.textContent();
  }

  async getFirstProductPrice() {
    return await this.FirstProductPriceSelector.textContent();
  }

  async addProductToCart() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.titleSelector).toHaveText(/Products/);
    await expect(this.cartBadgeSelector).toBeHidden();
    await this.addToCartSelector.click();
    await expect(this.cartBadgeSelector).toBeVisible();
  }

  async verifyCartBadgeCount(count: string) {
    await expect(this.cartBadgeSelector).toHaveText(count);
  }

  async moveToTheCartPage() {
    await this.cartBadgeSelector.click();
    await expect(this.page).toHaveURL(/cart/);
  }
}
