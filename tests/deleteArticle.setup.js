import { expect, test as setup } from '@playwright/test'

setup('Deleting article with slup id', async ({request}) => {
    const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUG_ID}`)
    expect(deleteArticle.status()).toEqual(204)
})