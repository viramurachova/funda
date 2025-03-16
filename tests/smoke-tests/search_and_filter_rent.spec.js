import {test} from '../../src/utils/test-config.js';
import logger from "../../src/utils/logger";
import {expect} from '@playwright/test';
import staticData from "../../src/test-data/test-data.json";
import {RentPropertySearchPage} from "../../src/page-objects/RentPropertySearchPage";
import {BuyPropertySearchPage} from "../../src/page-objects/BuyPropertySearchPage";
import {PropertyDetailsPage} from "../../src/page-objects/PropertyDetailsPage";
import {formatRentPrice} from "../../src/utils/priceHelper";
import {HomePage} from "../../src/page-objects/HomePage";

test('Search and Apply Filters for Renting Properties', async ({page}) => {
    const homePage = new HomePage(page);
    const selectedCity = staticData.city;
    const buyPropertySearchPage = new BuyPropertySearchPage(page);
    const rentPropertySearchPage = new RentPropertySearchPage(page);
    const propertyDetailsPage = new PropertyDetailsPage(page);
    const priceFrom = 2000;
    const priceTo = 3000;

    logger.info('Navigating to Funda homepage');
    await homePage.navigate();

    logger.info('Accept cookies');
    await homePage.acceptCookies.click();

    logger.info('Select Rent tab');
    await homePage.selectForRentTab();

    logger.info('Enter city');
    await homePage.enterCityName(selectedCity);
    await homePage.selectFirstCity();

    logger.info('Verify correct City search');
    await expect(rentPropertySearchPage.selectedCityName).toHaveText(selectedCity);
    await expect(rentPropertySearchPage.rentTab).toBeVisible();

    logger.info(`Enter price range: ${priceFrom} - ${priceTo}`);
    await rentPropertySearchPage.fillInPriceFrom(priceFrom);
    await rentPropertySearchPage.fillInPriceTo(priceTo);
    await expect(page.url()).toContain(`price=%22${priceFrom}-${priceTo}%22`);

    logger.info('Fetching search results');
    const resultCities = await rentPropertySearchPage.getResultsCities();
    const resultPrices = await rentPropertySearchPage.getResultsPrices();

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
    await rentPropertySearchPage.applySorting();


    logger.info('Getting updated property prices after sorting.');
    const pricesAfterSorting = await rentPropertySearchPage.getResultsPrices();

    logger.info('Verify listings have been sorted correctly');
    const sortedPrices = [...pricesAfterSorting].sort((a, b) => a - b);
    expect(pricesAfterSorting).toEqual(sortedPrices);

    logger.info('Getting title and price of the first property listing');
    const {apartmentTitle, apartmentPrice} = await rentPropertySearchPage.getFirstListingTitleAndPrice();

    logger.info('Click to the first listing');
    await buyPropertySearchPage.openFirstProperty();

    logger.info('Verifying property details');
    await expect(propertyDetailsPage.propertyTitle).toContainText(apartmentTitle);
    await expect(propertyDetailsPage.propertyAddress).toContainText(selectedCity);
    await expect(propertyDetailsPage.propertyPrice).toContainText(formatRentPrice(apartmentPrice))
});
