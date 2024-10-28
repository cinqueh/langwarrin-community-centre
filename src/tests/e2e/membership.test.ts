import { test, expect, Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import generalFormTest from './util';

/**
 * Fills out the membership form on the page.
 */
async function fillMembershipForm(page: Page, name: string) {
    await page.waitForSelector('select[name="title"]');
    await page.selectOption('select[name="title"]', 'Mr');
    await page.fill('input[name="firstName"]', name);
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="mobile"]', '412345678');
    await page.fill('input[name="homePhone"]', '98765432');
    await page.fill('input[name="email"]', 'fake@fake.fake');
    await page.fill('input[name="occupation"]', 'Engineer');
    await page.fill('input[name="apartment"]', 'Apt 101');
    await page.fill('input[name="address"]', '123 Main St');
    await page.fill('input[name="suburb"]', 'Melbourne');
    await page.selectOption('select[name="state"]', 'VIC');
    await page.fill('input[name="postcode"]', '3000');
    await page.selectOption('select[name="title"]', 'Mr');
    await page.check('input[name="termsAccepted"]');
}

test('Fill out and submit a membership form', async ({ page }) => {
  await generalFormTest(page, "membership", "member", fillMembershipForm);
});
