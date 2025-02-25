import { test } from '../../src/utils/test-config.js';
import {BasePage} from '../../src/page-objects/BasePage'
import logger from "../../src/utils/logger";
import { expect } from '@playwright/test';
import staticData from "../../src/test-data/test-data.json";
import {BuyPropertySearchPage} from "../../src/page-objects/BuyPropertySearchPage";
import {PropertyDetailsPage} from "../../src/page-objects/PropertyDetailsPage";

test('Search and Apply Filters for Buying Properties', async ({ page }) => {

    const basePage = new BasePage(page);
    const selectedCity = staticData.city;
    const buyPropertySearchPage = new BuyPropertySearchPage(page);
    const propertyDetailsPage = new PropertyDetailsPage(page);
    const priceFrom = 100000;
    const priceTo = 125000;
    const getListingPrice = await buyPropertySearchPage.getResultsPrices();

    logger.info('Navigating to Funda homepage');
    await basePage.navigate();

    logger.info('Accept cookies');
    await basePage.acceptCookies.click();

    logger.info('Enter city');
    await basePage.enterCityName(selectedCity);
    await basePage.selectFirstCity();

    logger.info('Verify correct City search');
    await expect(buyPropertySearchPage.selectedCityName).toHaveText(selectedCity);
    await expect(buyPropertySearchPage.buyTab).toBeVisible();

    logger.info(`Enter price range: ${priceFrom} - ${priceTo}`);
    await buyPropertySearchPage.fillInPriceFrom(priceFrom);
    await buyPropertySearchPage.fillInPriceTo(priceTo);

    logger.info('Fetching search results');
    const resultCities = await buyPropertySearchPage.getResultsCities();
    const resultPrices = await buyPropertySearchPage.getResultsPrices();

    logger.info('Verify all listings belong to selected city');
    for (const city of resultCities) {
        expect(city).toContain(selectedCity);
    }

    logger.info(`Verify all listings are within the selected price range (${priceFrom} - ${priceTo})`);
    for (const price of resultPrices) {
        expect(price).toBeGreaterThanOrEqual(priceFrom);
        expect(price).toBeLessThanOrEqual(priceTo);
    }

    logger.info('Apply sorting');
    await buyPropertySearchPage.applySorting();
    await page.waitForTimeout(5000)

    logger.info('Getting updated property prices after sorting.');
    const pricesAfterSorting = await buyPropertySearchPage.getResultsPrices();

    logger.info('Verify listings have been sorted correctly');
    const sortedPrices = [...pricesAfterSorting].sort((a, b) => a - b);
    expect(pricesAfterSorting).toEqual(sortedPrices);

    logger.info('Getting title and price of the first property listing');
    const { apartmentTitle, apartmentPrice } = await buyPropertySearchPage.getFirstListingTitleAndPrice();

    logger.info('Click to the first listing');
    await buyPropertySearchPage.openFirstProperty();

    logger.info('Verifying property details');
    await expect(propertyDetailsPage.propertyTitle).toContainText(apartmentTitle);
    await expect(propertyDetailsPage.propertyAddress).toContainText(selectedCity);
    await expect(propertyDetailsPage.propertyPrice).toContainText(apartmentPrice);

    logger.info('Test completed successfully');
});