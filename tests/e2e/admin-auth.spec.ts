import { test, expect } from "@playwright/test";

// Deliberately NOT process.env.ADMIN_EMAIL — in this app that var is the
// order-notification recipient, not the seeded admin login. Use dedicated
// E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD (or the seed-admin.ts defaults) instead.
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL || "admin@outluxx.com";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || "Admin1234!";

test.describe("route protection", () => {
  test("unauthenticated visitor is redirected away from /admin", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/account\/sign-in/);
  });

  test("unauthenticated visitor is redirected away from /account/orders", async ({ page }) => {
    await page.goto("/account/orders");
    await expect(page).toHaveURL(/\/account\/sign-in/);
  });
});

test.describe("admin login", () => {
  test("seeded admin can sign in and reach the dashboard", async ({ page }) => {
    await page.goto("/account/sign-in");
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: /Sign In/i }).click();

    await expect(page).toHaveURL(/\/admin/, { timeout: 10_000 });
    await expect(page.getByRole("heading", { name: /Dashboard|Outlxx/i }).first()).toBeVisible();
  });

  test("wrong password is rejected", async ({ page }) => {
    await page.goto("/account/sign-in");
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill("not-the-password");
    await page.getByRole("button", { name: /Sign In/i }).click();

    await expect(page.getByText(/failed|invalid|incorrect/i)).toBeVisible({ timeout: 10_000 });
    await expect(page).toHaveURL(/\/account\/sign-in/);
  });
});
