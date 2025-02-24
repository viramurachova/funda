import dotenv from 'dotenv';
import { test as base } from '@playwright/test';

// Load environment variables from .env
dotenv.config();

export const config = {
    baseUrl: process.env.BASE_URL || 'https://www.funda.nl/',
    headless: process.env.HEADLESS === 'true',  // Convert string to boolean
    userAgent: process.env.USER_AGENT || 'default-user-agent',

    testUserEmail: process.env.TEST_USER_EMAIL,
    testUserPassword: process.env.TEST_USER_PASSWORD,
    testUsername: process.env.TEST_USERNAME,
};

// 🔹 Custom test setup that applies security settings like User-Agent
export const test = base.extend({
    page: async ({ browser }, use) => {
        const context = await browser.newContext({
            userAgent: config.userAgent,
            extraHTTPHeaders: {
                'User-Agent': config.userAgent,
            },
        });

        const page = await context.newPage();
        await use(page);
        await context.close();
    },
});