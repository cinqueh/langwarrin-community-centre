import { test, expect, Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import generalFormTest from './util';


async function fillProgramSignupForm(page: Page, name: string) {
  // Wait for the form to load by checking the first field
  await page.waitForSelector('input[name="firstName"]');

  // Program Information
  await page.selectOption('select[name="programName"]', 'Ukulele Classes for Adult Beginners'); // Example program
  await page.fill('input[name="courseSource"]', 'Online search');

  // Contact Information
  await page.selectOption('select[name="title"]', 'Mr');
  await page.fill('input[name="firstName"]', name);
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="mobile"]', '412345678');
  await page.fill('input[name="homePhone"]', '98765432');
  await page.fill('input[name="email"]', 'johndoe@example.com');
  await page.selectOption('select[name="gender"]', 'Male');
  await page.fill('input[name="dob"]', '1990-01-01'); // Example date of birth

  // Emergency Contact Information
  await page.fill('input[name="emergencyFirstName"]', 'Jane');
  await page.fill('input[name="emergencyLastName"]', 'Doe');
  await page.fill('input[name="emergencyMobile"]', '423456789');

  // Address Information
  await page.fill('input[name="unitNo"]', '10');
  await page.fill('input[name="streetName"]', 'Main Street');
  await page.fill('input[name="city"]', 'Melbourne');
  await page.fill('input[name="postalCode"]', '3000');
  await page.selectOption('select[name="state"]', 'VIC');

  // Accept terms and conditions
  await page.check('input[name="termsAccepted"]');
  await page.check('input[name="promotionAccepted"]');
  await page.check('input[name="ageConfirmed"]');

  // Repeat the first action as specified
  await page.fill('input[name="firstName"]', name);
}

test('Fill out and submit a program inquiry form', async ({ page }) => {
  await generalFormTest(page, "programs/program-enrolment", "inquiry", fillProgramSignupForm);
});

