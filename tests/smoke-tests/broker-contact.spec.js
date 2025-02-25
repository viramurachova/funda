import { test } from '../../src/utils/test-config.js';
import {BasePage} from '../../src/page-objects/BasePage'
import logger from "../../src/utils/logger";
import { expect } from '@playwright/test';
import {BuyPropertySearchPage} from "../../src/page-objects/BuyPropertySearchPage";
import {PropertyDetailsPage} from "../../src/page-objects/PropertyDetailsPage";
import {ContactBrokerPage} from "../../src/page-objects/ContactBrokerPage";
import {generateTestData} from "../../src/test-data/test-data";

test('Contact Broker', async ({ page }) => {

    const basePage = new BasePage(page);
    const buyPropertySearchPage = new BuyPropertySearchPage(page);
    const propertyDetailsPage = new PropertyDetailsPage(page);
    const contactBrokerPage = new ContactBrokerPage(page);
    const testData = generateTestData();

    logger.info('Navigating to Funda homepage');
    await basePage.navigate();

    logger.info('Accept cookies');
    await basePage.acceptCookies.click()

    logger.info('Navigate to the Search page without filters applied (city, country)');
    await basePage.emptySearchSubmit();

    logger.info('Verify Buy Property Search Page is opened');
    await expect(page).toHaveURL(/\/zoeken\/koop\/$/);
    await expect(buyPropertySearchPage.buyTab).toBeVisible();

    logger.info('Open the first property on the page');
    await page.waitForTimeout(1000);
    await buyPropertySearchPage.openFirstProperty();

    logger.info('Verify Property Details Page is opened');
    await page.waitForTimeout(10000);
    await expect(propertyDetailsPage.contactAgentButton).toBeVisible();

    logger.info('Open the first property on the page');
    await propertyDetailsPage.openContactBrokerForm();

    logger.info('Verify Contact Broker Page is opened');
    await expect(contactBrokerPage.sendMessageButton).toBeVisible();

    logger.info(' View Broker phone number');
    await contactBrokerPage.viewPhoneNumber();
    await expect(page.locator('div.group.px-6')).toHaveClass(/is-clicked/);

    logger.info('Fill Contact broker form');
    await contactBrokerPage.questionInput.fill(testData.question);
    await contactBrokerPage.emailAddressInput.fill(testData.email);
    await contactBrokerPage.firstNameInput.fill(testData.firstName);
    await contactBrokerPage.lastNameInput.fill(testData.lastName);
    await contactBrokerPage.phoneNumberInput.fill(testData.phoneNumber);

    logger.info('Verify Contact broker form is filled');
    await expect(contactBrokerPage.firstNameInput).toHaveValue(testData.firstName);
    await expect(contactBrokerPage.lastNameInput).toHaveValue(testData.lastName);
    await expect(contactBrokerPage.emailAddressInput).toHaveValue(testData.email);
    await expect(contactBrokerPage.phoneNumberInput).toHaveValue(testData.phoneNumber);
    await expect(contactBrokerPage.questionInput).toHaveValue(testData.question);

    //logger.info('Submit Contact Broker Form');
    //await contactBrokerPage.sendMessageButton();

    logger.info('Test completed successfully');
});