import { defineConfig, devices } from "@playwright/test";
import path from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(__dirname, ".env.local"), quiet: true });

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["html", { open: "never" }]],
  timeout: 90_000,
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    // Dev-mode on-demand compilation made first navigations to each route
    // flaky under Playwright's default timeouts; a prod build is fast and
    // deterministic (this is also what the Next.js docs recommend for E2E).
    command: "npm run build && npm run start",
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
