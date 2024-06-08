import { test as setup } from '@playwright/test'

setup('Create new article', async ({request}) => {
    const createArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {title: "Like article", description: "Description of the Like article", body: "Like article", tagList: []}
        }
    })
    const createResponse = await createArticle.json()
    const slugId = createResponse.article.slug
    process.env['SLUG_ID'] = slugId 
})