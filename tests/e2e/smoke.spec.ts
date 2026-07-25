import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/./);
});

test("product listing and PDP load", async ({ page }) => {
  await page.goto("/tshirts");
  // The product-card image is one big <a> that overlaps a "Quick View" hover
  // trigger and swallows the click; the plain title link underneath doesn't.
  const titleLink = page.locator("h3").first().locator("xpath=ancestor::a[1]");
  await expect(titleLink).toBeVisible();
  await titleLink.click();
  await expect(page).toHaveURL(/\/products\//);
  await expect(page.getByRole("button", { name: /Add to Bag/i })).toBeVisible();
});
