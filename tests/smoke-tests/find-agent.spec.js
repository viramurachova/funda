import { test } from '../../src/utils/test-config.js';
import {BasePage} from '../../src/page-objects/BasePage'
import {FindAgentPage} from "../../src/page-objects/FindAgentPage";
import logger from "../../src/utils/logger";
import { expect } from '@playwright/test';
import staticData from '../../src/test-data/test-data.json';
import {generateTestData} from "../../src/test-data/test-data";

test('Find an NVM agent', async ({ page }) => {
    const basePage = new BasePage(page);
    const findAgentPage = new FindAgentPage(page);
    const testData= generateTestData();
    const selectedCity = staticData.city; // Load city from test data

    logger.info( 'Navigating to Funda homepage' );
    await basePage.navigate();

    logger.info( 'Accept cookies' );
    await basePage.acceptCookies.click();

    logger.info( 'Navigating to Find an NVM agent page' );
    await basePage.openFindNVMAgentPage();

    logger.info( 'Select Buy option' );
    await findAgentPage.selectBuyWizardOption();

    logger.info('Filling in city');
    await findAgentPage.fillInOfficeName(selectedCity);

    logger.info('Selecting first city suggestion');
    await findAgentPage.selectFirstCity();

    logger.info('Clicking search button');
    await findAgentPage.clickSearchButton();

    logger.info('Fetching all search result cities');
    const cities = await findAgentPage.getAllCityNames();

    logger.info('Verifying search results match the selected city');
    for (const city of cities) {
        expect(city.toLowerCase().trim()).toContain(selectedCity.toLowerCase());
    }

    logger.info('Test completed successfully');
});