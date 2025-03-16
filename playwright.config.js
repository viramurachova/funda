import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 5 : 1,
    reporter: 'html',
    use: {
        baseURL: 'https://www.funda.nl/en',
        userAgent: process.env.USER_AGENT || 'default-user-agent',
        headless: true,
        screenshot: 'only-on-failure',
        reuseExistingServer: true
    },
    projects: [{
        name: 'chromium', use: {
            ...devices['Desktop Chrome'], viewport: {width: 1920, height: 1080},
        },
    },],
});
