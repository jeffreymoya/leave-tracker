import { test, expect } from '@playwright/test';

test('should render themed components correctly', async ({ page }) => {
  await page.goto('/dashboard')
  
  // Verify FAB theming
  const fab = page.getByTestId('fab-new-request')
  await expect(fab).toHaveCSS('background-color', 'rgb(26, 26, 26)')
  
  // Verify header theming
  const header = page.locator('nav')
  await expect(header).toHaveCSS('background-color', 'rgb(236, 108, 26)')
  
  // Verify font family
  const body = page.locator('body')
  await expect(body).toHaveCSS('font-family', /Inter var/)
})
