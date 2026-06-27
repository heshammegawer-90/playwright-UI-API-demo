import { expect, test } from "@playwright/test";
import { getEnv } from "../../helpers/env";

const Key = getEnv("REQRES_API_KEY");
test.describe("API tests", () => {
  test("GET all users", async ({ request }) => {
    const response = await request.get("https://reqres.in/api/users?page=2", {
      headers: {
        "x-api-key": Key,
      },
    });

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");

    const body = await response.json();
    expect(body.page).toBe(2);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test("POST new user", async ({ request }) => {
    const response = await request.post("https://reqres.in/api/users", {
      headers: {
        "x-api-key": Key,
      },
      data: {
        first_name: "Hesham",
        last_name: "Megawer",
        email: "test@gmail.com",
      },
    });
    expect(response.status()).toBe(201);
    expect(response.statusText()).toBe("Created");

    const body = await response.json();

    expect(body.id).toBeTruthy();
    expect(body.first_name).toBe("Hesham");
    expect(body.last_name).toBe("Megawer");
    expect(body.email).toBe("test@gmail.com");
    expect(body.createdAt).toBeTruthy();
  });

  test("GET a single user", async ({ request }) => {
    const respnse = await request.get("https://reqres.in/api/users/3", {
      headers: {
        "x-api-key": Key,
      },
    });
    expect(respnse.status()).toBe(200);
    const body = await respnse.json();
    expect(body.data.id).toBe(3);
    expect(body.data.first_name).toBeTruthy();
    expect(body.data.last_name).toBeTruthy();

    expect(body.data.email).toBeTruthy();
  });

  test("Update user throguh PUT", async ({ request }) => {
    const response = await request.put("https://reqres.in/api/users/4", {
      headers: {
        "x-api-key": Key,
      },
      data: {
        id: 5,
        first_name: "New",
        last_name: "Old",
        email: "New.Old@gmail.com",
      },
    });
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");

    const body = await response.json();
    expect(body.id).toBe(5);
    expect(body.first_name).toBe("New");
    (expect(body.last_name).toBe("Old"),
      expect(body.email).toBe("New.Old@gmail.com"));
    expect(body.updatedAt).toBeTruthy();
  });

  test("DELETE an user", async ({ request }) => {
    const response = await request.delete("https://reqres.in/api/users/6", {
      headers: {
        "x-api-key": Key,
      },
    });
    expect(response.status()).toBe(204);
  });

  test("Negative Scenario - Should throw 401 when user is unauthorized", async ({
    request,
  }) => {
    const respnse = await request.get("https://reqres.in/api/login", {
      headers: {
        "x-api-test": Key,
      },
      data: {
        email: "test@gmail.com",
      },
    });
    expect(respnse.status()).toBe(401);
    const body = await respnse.json();
    expect(body.error).toBeTruthy();
  });
});
