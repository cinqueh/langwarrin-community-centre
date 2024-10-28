// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('should redirect to sign in page when logged out', async ({ page }) => {
  await page.goto('/admin');
  const title = await page.textContent('h1');
  expect(title).toBe('Sign in');
});


