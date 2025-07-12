import { test, expect } from "@playwright/test";

// Assumes seeded user exists with email test@test.com and password test123
const USER_EMAIL = "test@test.com";
const USER_PASS = "test123";

test("upgrade onboarding flow persists", async ({ page }) => {
  await page.goto("/login");
  await page.fill("input[name=email]", USER_EMAIL);
  await page.fill("input[name=password]", USER_PASS);
  await page.click("button[type=submit]");

  await page.waitForURL("/dashboard");
  await page.goto("/dashboard/onboarding");

  // complete branding
  await page.click("text=Complete");
  // complete domain
  await page.click("text=Complete");
  // complete analytics
  await page.click("text=Complete");

  await expect(page.locator("text=Help us improve")).toBeVisible();
  await page.fill("textarea", "looks good");
  await page.click("text=Send");
  await expect(page.locator("text=Thanks for your feedback!")).toBeVisible();

  await page.reload();
  await expect(page.locator("input[type=checkbox]").nth(0)).toBeChecked();
  await expect(page.locator("input[type=checkbox]").nth(1)).toBeChecked();
  await expect(page.locator("input[type=checkbox]").nth(2)).toBeChecked();
});
