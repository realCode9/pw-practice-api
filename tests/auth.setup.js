import { test as setup } from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const pathFile = '.auth/user.json'

setup('authentication', async ({request}) => {

//Best way to authenticate to the application using following API request and saving token to auth.user.json file 
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": "test3333@example.com", "password": "welcome"}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(pathFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken

//This was the traditional way or common way of doing authentication
    // await page.getByText('Sign in').click();
    // await page.getByPlaceholder('Email').fill('test3333@example.com');
    // await page.getByPlaceholder('Password').fill('welcome');
    // await page.getByRole('button').click();
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // await page.context().storageState({path: pathFile})
})