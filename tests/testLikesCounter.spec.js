import { test, expect } from '@playwright/test'

test("Validate like counter increment and decrement ", async ({page}) => {
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Global Feed').click();
    const likesCounter = page.locator('app-article-preview').first().getByRole('button');
    await expect(likesCounter).toContainText('0')
    await likesCounter.click();
    await expect(likesCounter).toContainText('1')
})