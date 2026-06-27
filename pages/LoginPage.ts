import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly userNameSelector: Locator;
  private readonly passwordSelector: Locator;
  private readonly loginButtonSelector: Locator;
  private readonly errorSelector: Locator;

  constructor(private page: Page) {
    this.userNameSelector = page.locator('[data-test="username"]');
    this.passwordSelector = page.locator('[data-test="password"]');
    this.loginButtonSelector = page.locator('[data-test="login-button"]');
    this.errorSelector = page.locator('[data-test="error"]');
  }

  async openLoginPage() {
    await this.page.goto("");
  }

  async login(username: string, password: string) {
    await this.userNameSelector.fill(username);
    await this.passwordSelector.fill(password);
    await this.loginButtonSelector.click();
  }

  get getErrorMessage() {
    return this.errorSelector;
  }
}
