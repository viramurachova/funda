import {test} from '../../src/utils/test-config.js';
import {BasePage} from '../../src/page-objects/BasePage'
import logger from "../../src/utils/logger";
import {LoginPage} from "../../src/page-objects/LoginPage";
import {expect} from '@playwright/test';
    import {AccountPage} from "../../src/page-objects/AccountPage";

    test('Login & Logout', async ({page}) => {

    const basePage = new BasePage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    logger.info('Navigating to Funda homepage');
    await basePage.navigate();

    logger.info('Accept cookies');
    await basePage.acceptCookies.click();

    logger.info('Opening Login Page');
    await basePage.openLoginPage();
    await expect(loginPage.submitButton).toBeVisible({ timeout: 5000 });

    logger.info('Fill in Login Form');
    await loginPage.fillLoginForm();

    logger.info('Clicking login button');
    await loginPage.clickLoginButton();

    logger.info('Verifying user is logged in');
    await accountPage.openAccountDropDownMenu();
    await expect(accountPage.accountDropDownMenu).toBeVisible({ timeout: 5000 });

    logger.info('Clicking logout button');
    await accountPage.logout();

    logger.info('Verifying user is logged out');
    await basePage.loginButton.click();
    await expect(page).toHaveURL(/\/account\/login/);
    await expect(loginPage.submitButton).toBeVisible();

    logger.info('Test completed successfully');
});
