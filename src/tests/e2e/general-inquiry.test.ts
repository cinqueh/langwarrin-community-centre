import { test, expect, Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import generalFormTest from './util';

async function fillGeneralInquiryForm(page: Page, name: string) {
  
  await page.waitForSelector('input[name="firstName"]');
  // Fill in the first and last names
  await page.fill('input[name="firstName"]', name);
  await page.fill('input[name="lastName"]', 'Doe');
  // Fill in the email and mobile number
  await page.fill('input[name="email"]', 'johndoe@example.com');
  await page.fill('input[name="mobile"]', '412345678');

  // Select an enquiry type
  // await page.selectOption('select[name="enquiryType"]', 'feedback'); // 'feedback' is the value for Feedback & Compliments

  // Fill in the home phone number (optional)
  await page.fill('input[name="homePhone"]', '98765432');
  // Fill in the message
  await page.fill('textarea[name="message"]', 'This is a test message for the Contact Us form.');

  await page.fill('input[name="firstName"]', name);
}

test('Fill out and submit a general inquiry form', async ({ page }) => {
  await generalFormTest(page, "home", "inquiry", fillGeneralInquiryForm);
});

