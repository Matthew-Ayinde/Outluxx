import { test, expect } from "@playwright/test";
import { fillByLabel, TEST_SHIPPING_ADDRESS } from "./utils";

const SIMULATION_MODE = process.env.STRIPE_SIMULATION === "true";
const PRODUCT_SLUG = "supima-classic-crew-tee";

test.describe("guest checkout", () => {
  test.skip(
    SIMULATION_MODE,
    "STRIPE_SIMULATION=true returns a fake client secret that Stripe Elements rejects client-side — " +
      "set STRIPE_SIMULATION=false with real sk_test/pk_test keys to run this test."
  );

  test("cart -> shipping -> payment -> confirmation with a Stripe test card", async ({ page }) => {
    await page.goto(`/products/${PRODUCT_SLUG}`);
    await page.getByRole("button", { name: "M", exact: true }).click();
    await page.getByRole("button", { name: "White", exact: true }).click();
    await page.getByRole("button", { name: "Add to Bag" }).click();
    await expect(page.getByRole("button", { name: /Added to Bag/i })).toBeVisible();

    await page.goto("/cart");
    await page.getByRole("link", { name: /Proceed to Checkout/i }).click();

    await expect(page).toHaveURL(/\/checkout\/shipping/);
    await fillByLabel(page, "First name", TEST_SHIPPING_ADDRESS.firstName);
    await fillByLabel(page, "Last name", TEST_SHIPPING_ADDRESS.lastName);
    await fillByLabel(page, "Email address", TEST_SHIPPING_ADDRESS.email);
    await fillByLabel(page, "Address line 1", TEST_SHIPPING_ADDRESS.line1);
    await fillByLabel(page, "City", TEST_SHIPPING_ADDRESS.city);
    await fillByLabel(page, "Postcode", TEST_SHIPPING_ADDRESS.postalCode);
    await page.getByRole("button", { name: /Continue to Payment/i }).click();

    await expect(page).toHaveURL(/\/checkout\/payment/, { timeout: 20_000 });

    // Typing into the card iframe directly is unreliable here — Stripe's
    // background fraud check (hCaptcha-invisible) delays the real input
    // fields mounting. Stripe's own test-mode Developer Tools panel exposes
    // a "Magic fill" action built exactly for automated testing; use that
    // instead of racing the iframe.
    const easel = page.frameLocator('iframe[src*="elements-inner-easel"]');
    await easel.locator('button[aria-label="Open Stripe Developer Tools"]').click();
    await easel.getByText(/Magic fill/i).first().click();
    await expect(easel.getByText(/Successful card/i)).toBeVisible();

    await page.getByRole("button", { name: /Place Order/i }).click();

    // /api/checkout/confirm awaits SMTP email delivery synchronously before
    // responding, so this can be considerably slower than the rest of checkout.
    await expect(page).toHaveURL(/\/checkout\/confirmation/, { timeout: 45_000 });
    await expect(page.getByText(/order/i).first()).toBeVisible();
  });
});
