import { test, expect, Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import generalFormTest from './util';


async function fillChildcareForm(page: Page, name: string) {
  // Wait for the form to load by checking the first field
  await page.waitForSelector('input[name="firstName"]');
  // Parent Contact Information
  await page.fill('input[name="firstName"]', name);
  await page.selectOption('select[name="title"]', 'Ms');
  await page.fill('input[name="lastName"]', 'Smith');
  await page.fill('input[name="mobile"]', '412345678');
  await page.fill('input[name="homePhone"]', '98765432');
  await page.fill('input[name="email"]', 'parent@example.com');
  await page.fill('input[name="occupation"]', 'Engineer');

  // Child's Information
  await page.fill('input[name="childAge"]', '4');
  await page.fill('input[name="childFirstName"]', 'Charlie');
  await page.fill('input[name="childLastName"]', 'Smith');

  // Program Selection
  await page.selectOption('select[name="program"]', 'Koala Group');

  // Select Days
  // await page.check('input[value="Monday"]');
  // await page.check('input[value="Wednesday"]');
  // await page.check('input[value="Friday"]');

  // Additional Message
  await page.fill('textarea[name="message"]', 'This is a test enquiry for childcare.');

  // Repeat the first action as specified
  await page.fill('input[name="firstName"]', name);
}

test('Fill out and submit a childcare inquiry form', async ({ page }) => {
  await generalFormTest(page, "children/enquiry-for-childcare", "inquiry", fillChildcareForm);
});

