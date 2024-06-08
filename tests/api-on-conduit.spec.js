import { test, expect } from '@playwright/test';
import tags from '../resources/tags.json';

test.beforeEach(async ({page}) => {
  
  //This approach when wants your own data to be shown on the application UI with the help of API Mocking.
  await page.route('*/**/api/tags', async route => {

    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  await page.route('*/**/api/articles*', async route => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = 'This is the title of the first article'
    responseBody.articles[0].description = 'This is the description of first article'

    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
  })


  await page.goto('https://conduit.bondaracademy.com/');
})
test('Has logo text title', async ({ page }) => {
  await expect(page.locator('.logo-font').first()).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is the title of the first article')
  await expect(page.locator('app-article-list p').first()).toContainText('This is the description of first article')
});
