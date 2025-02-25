import { test } from '../../src/utils/test-config.js';
import {BasePage} from '../../src/page-objects/BasePage'
import {FindAgentPage} from "../../src/page-objects/FindAgentPage";
import logger from "../../src/utils/logger";
import { expect } from '@playwright/test';
import staticData from '../../src/utils/test-data.json';
import {generateTestData} from "../../src/utils/test-data";

test('Find an NVM agent', async ({ page }) => {
    const basePage = new BasePage(page);
    const findAgentPage = new FindAgentPage(page);
    const testData= generateTestData();
    const selectedCity = staticData.city; // Load city from test data

    logger.info({ message: 'Navigating to Funda homepage' });
    await basePage.navigate();

    logger.info({ message: 'Accept cookies' });
    await basePage.acceptCookies.click();

    logger.info({ message: 'Navigating to Find an NVM agent page' });
    await basePage.openFindNVMAgentPage();

    logger.info({ message: 'Select Buy option' });
    await findAgentPage.selectBuyWizardOption();

    logger.info({ message: `Filling in office name: ${selectedCity}` });
    await findAgentPage.fillInOfficeName(selectedCity);

    logger.info({ message: 'Selecting first city suggestion' });
    await findAgentPage.selectFirstCity();

    logger.info({ message: 'Clicking search button' });
    await findAgentPage.clickSearchButton();

    logger.info({ message: 'Fetching all search result cities' });
    const cities = await findAgentPage.getAllCityNames();

    logger.info({ message: 'Verifying search results match the selected city' });
    for (const city of cities) {
        expect(city.toLowerCase().trim()).toContain(selectedCity.toLowerCase());
    }

    logger.info({ message: 'Test completed successfully' });
});