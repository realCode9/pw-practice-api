import { test, expect } from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('https://conduit.bondaracademy.com/')
})

test('Login and get token from the API response', async ({page, request}) => {

        const createArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
            data: {
                article: {title: "Title of the first API Article", description: "Description of the first API Article", body: "Body of the first API Article", tagList: []}
            }
        })
    expect(createArticle.status()).toEqual(201)

    const createArticleResponse = await createArticle.json()
    const createdArticleSlugId = createArticleResponse.article.slug
    const deleteCreatedArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${createdArticleSlugId}`)

    await page.getByText('Global Feed').click()
    expect(deleteCreatedArticle.status()).toEqual(204)
    await expect(page.locator('app-article-list h1').first()).not.toContainText('Title of the first API Article')
})

test('Delete the item created from backend', async ({page, request}) => {

    const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {title: "Article 11 title", description: "Article 11 description", body: "Article 11 body", tagList: []}
        }
    })
    expect(newArticleResponse.status()).toEqual(201)
    await page.getByText('Global Feed').click();
    await page.reload()
    await expect(page.locator('app-article-list h1').first()).toHaveText("Article 11 title");

    const newArticleResponseBody = await newArticleResponse.json()
    const articleSlugId = newArticleResponseBody.article.slug

    const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlugId}`)
    expect(deleteArticle.status()).toEqual(204)
    await page.getByText('Global Feed').click();
    await expect(page.locator('app-article-list h1').first()).not.toContainText('Article 11 title')
})

/*&& denotes tests are running SEQUENTIALLY and 
    & in between tests denotes tests are running PARALLEL*/