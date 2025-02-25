import { test } from '../../src/utils/test-config.js';
import {BasePage} from '../../src/page-objects/BasePage'
import logger from "../../src/utils/logger";
import {LoginPage} from "../../src/page-objects/LoginPage";
import { expect } from '@playwright/test';
import {AccountPage} from "../../src/page-objects/AccountPage";
import staticData from "../../src/test-data/test-data.json";
import {BuyPropertySearchPage} from "../../src/page-objects/BuyPropertySearchPage";

test('Search and Apply Filters for Buying Properties', async ({ page }) => {

    const basePage = new BasePage(page);
    const selectedCity = staticData.city;
    const buyPropertySearchPage = new BuyPropertySearchPage(page);

    logger.info('Navigating to Funda homepage');
    await basePage.navigate();

    logger.info('Accept cookies');
    await basePage.acceptCookies.click();

    logger.info('Enter city');
    await basePage.enterCityName(selectedCity);

    logger.info('Choose city from suggestion list');
    await basePage.selectFirstCity();

    logger.info('Verify correct City search');
    await expect(buyPropertySearchPage.selectedCityName).toHaveText(selectedCity);
    await expect(buyPropertySearchPage.buyTab).toBeVisible();

    logger.info('Enter price range');
    await buyPropertySearchPage.enterPriceRange();

    logger.info('Select sorting: Price - low to high');
    await buyPropertySearchPage.setSorting();

    logger.info('Fetching search results');
    const listingDetails = await buyPropertySearchPage.getFirstListingTitleAndPrice();
    const resultCities = await buyPropertySearchPage.getResultsCities();
    const resultPrices = await buyPropertySearchPage.getResultsPrices();

    // **Assertions**
    logger.info('Verify all listings belong to selected city');
    for (const city of resultCities) {
        expect(city).toContain(selectedCity);
    }

    logger.info('Verify all listings are within the selected price range');
    for (const price of resultPrices) {
        expect(price).toBeGreaterThanOrEqual(75000);
        expect(price).toBeLessThanOrEqual(100000);
    }

    logger.info('Verify listings have been sorted correctly');
    const sortedPrices = [...resultPrices].sort((a, b) => a - b);
    expect(resultPrices).toEqual(sortedPrices);

    logger.info('Test completed successfully');
});
