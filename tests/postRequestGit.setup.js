import { test as setup } from '@playwright/test'

setup('Create post request', async ({request}) => {
    request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            article: {title: "Git wala article", description: "Description of the Git wala article", body: "Git wala article body", tagList: []}
        },
        headers: {
            Authorization: `Token ${process.env.ACCESS_TOKEN}}`
        }
    })
})