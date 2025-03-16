import {test} from '../../src/utils/test-config.js';
import logger from "../../src/utils/logger";
import {expect} from '@playwright/test';
import {BuyPropertySearchPage} from "../../src/page-objects/BuyPropertySearchPage";
import {PropertyDetailsPage} from "../../src/page-objects/PropertyDetailsPage";
import {ContactBrokerPage} from "../../src/page-objects/ContactBrokerPage";
import {generateTestData} from "../../src/test-data/test-data";
import {HomePage} from "../../src/page-objects/HomePage";

test('Contact Broker', async ({page}) => {
    const homePage = new HomePage(page);
    const buyPropertySearchPage = new BuyPropertySearchPage(page);
    const propertyDetailsPage = new PropertyDetailsPage(page);
    const contactBrokerPage = new ContactBrokerPage(page);
    const testData = generateTestData();

    logger.info('Navigating to Funda homepage');
    await homePage.navigate();

    logger.info('Accept cookies');
    await homePage.acceptCookies.click()

    logger.info('Navigate to the Search page without filters applied (city, country)');
    await homePage.emptySearchSubmit();

    logger.info('Open the first property on the page');
    await buyPropertySearchPage.openFirstProperty();

    logger.info('View Broker phone number');
    await propertyDetailsPage.viewPhoneNumber();
    await expect(page.locator('div.group.px-6')).toHaveClass(/is-clicked/);

    logger.info('Open Contact Broker Form');
    await propertyDetailsPage.openContactBrokerForm();
    await expect(contactBrokerPage.sendMessageButton).toBeVisible({timeout: 10000});

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
});
