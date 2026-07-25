import type { Page } from "@playwright/test";

/** Shipping/profile forms label their inputs visually but don't set htmlFor/id, so match by adjacent label text. */
export async function fillByLabel(page: Page, label: string, value: string) {
  await page
    .locator("xpath=//label[contains(., \"" + label + "\")]/following-sibling::input")
    .first()
    .fill(value);
}

export const TEST_SHIPPING_ADDRESS = {
  firstName: "Test",
  lastName: "Buyer",
  email: `ayindematthew2003@gmail.com`,
  line1: "1 Test Street",
  city: "London",
  postalCode: "SW1A 1AA",
};
