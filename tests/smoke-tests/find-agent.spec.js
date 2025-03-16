import {test} from '../../src/utils/test-config.js';
import {FindAgentPage} from "../../src/page-objects/FindAgentPage";
import logger from "../../src/utils/logger";
import {expect} from '@playwright/test';
import staticData from '../../src/test-data/test-data.json';
import {HomePage} from "../../src/page-objects/HomePage";

test('Find an NVM agent', async ({page}) => {
    const homePage = new HomePage(page);
    const findAgentPage = new FindAgentPage(page);
    const selectedCity = staticData.city;

    logger.info('Navigating to Funda homepage');
    await homePage.navigate();

    logger.info('Accept cookies');
    await homePage.acceptCookies.click();

    logger.info('Navigating to Find an NVM agent page');
    await homePage.openFindNVMAgentPage();

    logger.info('Select Buy option');
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
});
