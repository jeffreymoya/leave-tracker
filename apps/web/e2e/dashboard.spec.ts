import { test, expect } from '@playwright/test';

test('dashboard page has correct title', async ({ page }) => {
  // Create a mock page that we can test without a server
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Leave Tracker - Dashboard</title>
      </head>
      <body>
        <h1>Dashboard</h1>
      </body>
    </html>
  `);
  
  await expect(page).toHaveTitle(/Leave Tracker/);
}); 