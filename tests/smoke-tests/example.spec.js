
import { test } from '../../src/utils/test-config.js';
import { expect } from '@playwright/test';
import logger from '../../src/utils/logger.js';




// test.beforeEach(async ({ browser }) => {
//   await page.setExtraHTTPHeaders({User-Agent: process.});
// });
// await page.setExtraHTTPHeaders({'User-Agent': process.env.USER_AGENT})

// Test 1: Search & Apply Filters (Buy)
test('Search & Apply Filters (Buy)', async ({page}) => { 
  // Create a new page in the browser context and navigate to target URL
    await page.setExtraHTTPHeaders({'User-Agent': process.env.USER_AGENT})
    logger.info('Navigating to Funda homepage');
    await page.goto('/en');
    
    await page.locator('#didomi-notice-agree-button').click();

    logger.info('Selecting "For Sale" tab');
    await page.locator('button[data-text="For sale"]').click();
    
    logger.info('Entering search location: Amsterdam');
    await page.locator('#headlessui-combobox-input-v-0-0-0-0').fill('Amsterdam');
    await page.locator('[data-testid="SearchBox-location-suggestion"]').nth(0).click(); 

    
    
    // logger.info('Clicking search button');
    logger.info('Verifying search results appear');
    await expect(await page.getByTestId('searchBoxSuggestions-mobile').getByText('Amsterdam').first()).toBeVisible();
    await expect(await page.locator('#headlessui-tabs-tab-v-0-0-0')).toBeVisible();
    

    logger.info('Applying critical filters: Price Range and Sorting');
    // await page.locator('#price_to').focus()
    await page.locator('#price_to').fill('100000', {force: true});
    // await page.locator('#price_from').focus()
    await page.locator('#price_from').fill('75000', {force: true});
    // expect(await page.locator('#price_to')).toHaveValue('10000');
    // expect(await page.locator('#headlessui-combobox-option-v-0-0-3')).toBeVisible();
    await page.locator('select.absolute').selectOption('Price - low to high');

    //await page.getByRole('button', {'Sort: Relevance Relevance'})

    

    
//    // await page.locator('').click();

    logger.info('Verifying filtered results');
    // await page.getByTestId('SelectedFilterprice').toBeVisible();
    const textValue = await page.locator('div.truncate').textContent();
    const numericValue = parseFloat(textValue.replace(/[^0-9]/g, '')); // Extract only numeric part

    console.log('Extracted Value:', numericValue);

    expect(numericValue).toBeLessThan(100000);
        
//     // Add assertions

//     logger.info('Clicking first property in results');
//     // Add code to click first result

//     logger.info('Verifying property details page loads correctly');
//     // Add assertions for property details
// });

// // Test 2: Search & Apply Filters (Rent)
// test('Search & Apply Filters (Rent)', async ({ page }) => {
//     logger.info('Navigating to Funda homepage');
//     await page.goto('https://www.funda.nl');

//     logger.info('Selecting Rent property type');
//     // Add code to select Rent

//     logger.info('Entering search location: Rotterdam');
//     // Add code to enter Rotterdam

//     logger.info('Clicking search button');
//     // Add code to click search

//     logger.info('Verifying search results appear');
//     // Add assertions

//     logger.info('Applying critical filters: Price Range and Sorting');
//     // Add code to apply filters

//     logger.info('Verifying filtered results');
//     // Add assertions

//     logger.info('Clicking first property in results');
//     // Add code to click first result

//     logger.info('Verifying property details page loads correctly');
//     // Add assertions
});

// Test 4: Find NVM Broker
test('Find NVM Broker', async ({ page }) => {
    logger.info('Navigating to Funda homepage');
    await page.goto('https://www.funda.nl');

    logger.info('Clicking Find an NVM Broker');
    // Add code to click link

    logger.info('Verifying NVM broker search page appears');
    // Add assertion

    logger.info('Selecting Buy as help category');
    // Add code to select Buy

    logger.info('Entering search location: The Hague');
    // Add code to enter location

    logger.info('Clicking search button');
    // Add code to search

    logger.info('Verifying broker listings appear');
    // Add assertion
});

