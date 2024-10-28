import { test, expect, Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import generalFormTest from './util';

async function fillFeedbackForm(page: Page, name: string) {
  // Wait for the form to load
  await page.waitForSelector('input[name="firstName"]');

  // Fill in the first and last names
  await page.fill('input[name="firstName"]', name);
  await page.fill('input[name="lastName"]', 'Doe');

  // Fill in the email and mobile number
  await page.fill('input[name="email"]', 'johndoe@example.com');
  await page.fill('input[name="mobile"]', '412345678');

  // Select "Feedback & Compliments" as the enquiry type
  await page.selectOption('select[name="enquiryType"]', 'feedback');

  // Fill in the home phone number (optional)
  await page.fill('input[name="homePhone"]', '98765432');

  // Address fields
  await page.fill('input[name="apartment"]', 'Apt 101');
  await page.fill('input[name="street"]', '123 Main St');
  await page.fill('input[name="suburb"]', 'Melbourne');
  await page.selectOption('select[name="state"]', 'VIC');
  await page.fill('input[name="postcode"]', '3000');

  // Feedback specific fields
  await page.fill('input[name="feedbackProgramName"]', 'Community Wellness Program');
  await page.fill('textarea[name="feedbackMessage"]', 'This is a feedback message for the program.');

  // Repeat the first action as per your requirement
  await page.fill('input[name="firstName"]', name);
}

test('Fill out and submit a general inquiry form', async ({ page }) => {
  await generalFormTest(page, "home", "inquiry", fillFeedbackForm);
});

