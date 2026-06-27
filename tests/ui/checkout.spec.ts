import { expect, test } from "../../fixtures/pageFixtures";
import { getEnv } from "../../helpers/env";

const FIRST_NAME = getEnv("FIRST_NAME");
const LAST_NAME = getEnv("LAST_NAME");
const POSTAL_CODE = getEnv("POSTAL_CODE");

const invalidPersonalDataScenarios = [
  {
    FIRST_NAME: "",
    LAST_NAME,
    POSTAL_CODE,
    Scenario: "Empty First Name",
    error: "Error: First Name is required",
  },
  {
    FIRST_NAME,
    LAST_NAME: "",
    POSTAL_CODE,
    Scenario: "Empty Last Name",
    error: "Error: Last Name is required",
  },
  {
    FIRST_NAME,
    LAST_NAME,
    POSTAL_CODE: "",
    Scenario: "Empty Postal Code",
    error: "Error: Postal Code is required",
  },
];

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Checkout tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("inventory.html");
  });

  test("Should be able to complete pursche", async ({
    inventoryPage,
    cartPage,
    personalDataPage,
    checkoutPage,
    confirmationPage,
  }) => {
    const productName = await inventoryPage.getFirstProductName();
    const productPrice = await inventoryPage.getFirstProductPrice();
    const successMessage = "Thank you for your order!";
    await inventoryPage.addProductToCart();
    await inventoryPage.verifyCartBadgeCount("1");
    await inventoryPage.moveToTheCartPage();

    await cartPage.verifyProductInformation(productName!, productPrice!);
    await cartPage.moveToPersonalDataPage();

    await personalDataPage.fillPersonalData(FIRST_NAME, LAST_NAME, POSTAL_CODE);

    await checkoutPage.verifyProductInformation(productName!, productPrice!);
    await checkoutPage.finishThePurschse();
    await expect(confirmationPage.verifySuccessMessage).toHaveText(
      successMessage,
    );
  });

  invalidPersonalDataScenarios.forEach(
    async ({ FIRST_NAME, LAST_NAME, POSTAL_CODE, Scenario, error }) => {
      test(`Should not be able to proceed with ${Scenario}`, async ({
        inventoryPage,
        cartPage,
        personalDataPage,
      }) => {
        await inventoryPage.addProductToCart();
        await inventoryPage.moveToTheCartPage();
        await cartPage.moveToPersonalDataPage();
        await personalDataPage.fillPersonalData(
          FIRST_NAME,
          LAST_NAME,
          POSTAL_CODE,
        );
        await expect(personalDataPage.errorMessage).toHaveText(error);
      });
    },
  );
});
