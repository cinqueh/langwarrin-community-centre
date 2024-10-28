// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('should display the home page', async ({ page }) => {
  await page.goto('/');
  const title = await page.textContent('h1');
  expect(title).toBe('LANGWARRIN');
});

test('should display the programs page', async ({ page }) => {
  await page.goto('/programs');
  const title = await page.textContent('h2');
  expect(title).toBe('Programs');
});

test('should display the childcare page', async ({ page }) => {
  await page.goto('/childcare');
  const title = await page.textContent('h2');
  expect(title).toBe('Childcare');
});

test('should display the room hire page', async ({ page }) => {
  await page.goto('/room-hire');
  const title = await page.textContent('h2');
  expect(title).toBe('Room Hire');
});

test('should display the forms page', async ({ page }) => {
  await page.goto('/forms');
  const title = await page.textContent('h2');
  expect(title).toBe('Forms and Information');
});

test('should display the about us page', async ({ page }) => {
  await page.goto('/about-us');
  const title = await page.textContent('h2');
  expect(title).toBe('About Us');
});

test('should display the membership page', async ({ page }) => {
  await page.goto('/membership');
  const title = await page.textContent('h2');
  expect(title).toBe('Membership');
});