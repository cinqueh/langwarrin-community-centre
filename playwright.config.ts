// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests/e2e',
  use: {
    baseURL: 'http://localhost:3000', // Set to your Next.js app URL
    headless: true,
  },
  webServer: {
    command: 'npm run dev', // Start your Next.js app for testing
    port: 3000,
  },
});