import { expect, test } from "../../fixtures/pageFixtures";
import { getEnv } from "../../helpers/env";

const USER_NAME = getEnv("USER_NAME");
const PASSWORD = getEnv("PASSWORD");
const BLOCKED_USER_NAME = getEnv("BLOCKED_USER_NAME");
const error = "Epic sadface: Sorry, this user has been locked out.";

const invalidLoginScenarios = [
  {
    USER_NAME: "",
    PASSWORD,
    Scenario: "Empty userName",
    error: "Epic sadface: Username is required",
  },
  {
    USER_NAME,
    PASSWORD: "",
    Scenario: "Empty Password",
    error: "Epic sadface: Password is required",
  },
  {
    USER_NAME: "WrongUserName",
    PASSWORD,
    Scenario: "Wrong userName",
    error:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    USER_NAME,
    PASSWORD: "WrongPassword",
    Scenario: "Wrong Password",
    error:
      "Epic sadface: Username and password do not match any user in this service",
  },
];
test.describe("Authentication scenarios", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openLoginPage();
  });

  invalidLoginScenarios.forEach(
    async ({ USER_NAME, PASSWORD, Scenario, error }) => {
      test(`Should not be able to login with ${Scenario}`, async ({
        loginPage,
      }) => {
        await loginPage.login(USER_NAME, PASSWORD);
        expect(loginPage.getErrorMessage).toHaveText(error);
      });
    },
  );

  test("Should not be able to login with Blocked user", async ({
    loginPage,
  }) => {
    await loginPage.login(BLOCKED_USER_NAME, PASSWORD);
    expect(loginPage.getErrorMessage).toHaveText(error);
  });
});
