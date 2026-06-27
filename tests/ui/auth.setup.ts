import { expect, test as setup } from "../../fixtures/pageFixtures";
import { getEnv } from "../../helpers/env";

const USER_NAME = getEnv("USER_NAME");
const PASSWORD = getEnv("PASSWORD");
setup(
  "Should be able to login and save session",
  async ({ loginPage, page }) => {
    await loginPage.openLoginPage();
    await loginPage.login(USER_NAME, PASSWORD);
    await expect(page).toHaveURL(/inventory/);
    await page.context().storageState({ path: "playwright/.auth/user.json" });
  },
);
