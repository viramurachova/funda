import { test } from '../../src/utils/test-config.js';
import {BasePage} from '../../src/page-objects/BasePage'
import logger from "../../src/utils/logger";
import {LoginPage} from "../../src/page-objects/LoginPage";
import { expect } from '@playwright/test';
import {AccountPage} from "../../src/page-objects/AccountPage";

test('Login & Logout', async ({ page }) => {

    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    logger.info('Navigating to Funda homepage');
    await basePage.navigate();

    logger.info('Accept cookies');
    await basePage.acceptCookies.click()

    logger.info('Clicking Login');
    await basePage.loginButton.click();

    logger.info('Verify LoginPage is opened');
    await expect(page).toHaveURL(/login\.funda\.nl\/account\/login/);
    await expect(loginPage.submitButton).toBeVisible();

    logger.info('Fill in Login Form');
    await loginPage.fillLoginForm();

    logger.info('Clicking login button');
    await loginPage.clickLoginButton();

    logger.info('Verifying user is logged in');
    await accountPage.navigateToMyAccountPage();
    await expect(accountPage.welcomeMessage).toBeVisible();
    await expect(page).toHaveURL(/funda\.nl\/account|funda\.nl\//);

    logger.info('Clicking logout button');
    await page.waitForTimeout(1000);
    await accountPage.logout();

    logger.info('Verifying user is logged out');
    await expect(page).toHaveURL(/login\.funda\.nl\/account\/login/);
    await expect(loginPage.submitButton).toBeVisible();

    logger.info({ message: 'Test completed successfully' });
 });
