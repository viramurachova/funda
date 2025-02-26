export class BasePage {
    constructor(page) {
        this.page = page;
        this.acceptCookies = page.locator('#didomi-notice-agree-button');
        this.searchInputField = page.locator('#headlessui-combobox-input-v-0-0-0-0');
        this.loginButton = page.locator('.flex.h-full.cursor-pointer.flex-col.items-center.justify-center.px-1.text-white').nth(1);
        this.searchButton = page.locator('button.absolute.right-0');
        this.findNVMAgentLink = page.locator('a[href*="/makelaar-zoeken"]').nth(4);
        this.cityNameSuggestionList = page.locator('[role="listbox"]');
        this.firstCityNameSuggested = page.getByTestId('SearchBox-location-suggestion').first();
        this.forSaleButton = page.locator('button.tab-item.border-transparent').nth(0);
    }

    /**
     * Navigate to the homepage
     * @returns {Promise<void>}
     */
    async navigate() {
        await this.page.goto('/');
    }

    /**
     * Select the 'For Sale' tab
     * @returns {Promise<void>}
     */
    async selectForSaleTab() {
        await this.forSaleButton.click();
    }

    /**
     * Submit an empty search
     * @returns {Promise<void>}
     */
    async emptySearchSubmit() {
        await this.searchButton.click();
    }

    /**
     * Open the 'Find NVM Agent' page
     * @returns {Promise<void>}
     */
    async openFindNVMAgentPage() {
        await this.findNVMAgentLink.click();
    }

    /**
     * Enter a city name in the search field
     * @param {string} city - The name of the city to enter
     * @returns {Promise<void>}
     */
    async enterCityName(city) {
        await this.searchInputField.pressSequentially(city.toString())
    }

    /**
     * Get and select the first suggested city from the list
     * @returns {Promise<void>}
     */
    async selectFirstCity() {
        await this.cityNameSuggestionList.waitFor();
        await this.firstCityNameSuggested.click();
    }

}