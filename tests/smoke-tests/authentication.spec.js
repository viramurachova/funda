import {test} from '../../src/utils/test-config.js';
import logger from "../../src/utils/logger";
import {LoginPage} from "../../src/page-objects/LoginPage";
import {expect} from '@playwright/test';
import {AccountPage} from "../../src/page-objects/AccountPage";
import {HomePage} from "../../src/page-objects/HomePage";

test('Login & Logout', async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    logger.info('Navigating to Funda homepage');
    await homePage.navigate();

    logger.info('Accept cookies');
    await homePage.acceptCookies.click();

    logger.info('Opening Login Page');
    await homePage.openLoginPage();

    logger.info('Fill in Login Form');
    await loginPage.fillLoginForm();

    logger.info('Clicking login button');
    await loginPage.clickLoginButton();

    logger.info('Verifying user is logged in');
    await accountPage.openAccountDropDownMenu();
    await expect(accountPage.accountDropDownMenu).toBeVisible();

    logger.info('Clicking logout button');
    await accountPage.logout();

    logger.info('Verifying user is logged out');
    await homePage.loginButton.click();
    await expect(page).toHaveURL(/\/account\/login/);
    await expect(loginPage.submitButton).toBeVisible();
});
