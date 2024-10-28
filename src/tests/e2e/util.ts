import { createClient } from "@supabase/supabase-js";
import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from `.env.local`
dotenv.config({ path: '.env.local' });

// Initialize the Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL || "", 
    process.env.SUPABASE_ANON_KEY || ""
  );
  
  /**
   * Generates a random string of specified length.
   */
  function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }

export default async function generalFormTest(page: Page, url: string, tableName: string,
    fillForm: (page: Page, name: string) => Promise<void>
  ) {
      test.setTimeout(40000);
      // Generate a random name to use in the form
      const name = generateRandomString(10);
  
      // Navigate to the membership form
      await page.goto(`http://localhost:3000/${url}`);
  
      await fillForm(page, name);
      await page.click('button[type="submit"]');
  
      await expect(page.locator('p.alertSuccess')).toHaveText(
        'Form submitted and emails sent successfully!', 
        { timeout: 30000 }
      );
  
      // Verify the database entry has been added
      const { data, error } = await supabase
      .from('person')
      .select(`
        *,
        ${tableName} (
          *
        )
      `)
      .eq('firstname', name)
      .single();
  
      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect((data as any)?.firstname).toBe(name);
  }