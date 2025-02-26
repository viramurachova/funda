import {BasePage} from "./BasePage";

export class FindAgentPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.url = '/makelaar-zoeken'
        this.buyWizardButton = page.getByTestId('intend-aankoop');
        this.citySuggestionList = page.locator('[role="listbox"]');
        this.firstSuggestedCity = page.locator('[data-testid="area-suggestions-0"]');
        this.buyButton = page.locator('#headlessui-tabs-tab-v-0-0-0');
        this.wizardStepOneSection = page.getByTestId('wizard-step-one');
        this.buyWizardButton = this.wizardStepOneSection.getByTestId('intend-aankoop');
        this.wizardStepTwoSection = page.getByTestId('wizard-step-two');
        this.searchBrokerInput = this.wizardStepTwoSection.locator('#AreaSearch-input');
        this.searchButton = page.getByTestId('search-button');
        this.citySearchResults = page.locator('p.mb-1.py-1');
    }

    /**
     * Click the search button
     * @returns {Promise<void>}
     */
    async clickSearchButton() {
        await this.searchButton.click();
    }

    /**
     * Select the 'Buy Wizard' option
     * @returns {Promise<void>}
     */
    async selectBuyWizardOption() {
        await this.buyWizardButton.hover();
        await this.buyWizardButton.click();
    }

    /**
     * Fill in the office name (city) in the search field
     * @param {string} city - The city name to input
     * @returns {Promise<void>}
     */
    async fillInOfficeName(city) {
        await this.searchBrokerInput.pressSequentially(city.toString())
    }

    /**
     * Get and select the first suggested city from the list
     * @returns {Promise<void>}
     */
    async selectFirstCity() {
        await this.citySuggestionList.waitFor();
        await this.firstSuggestedCity.click();
    }

    /**
     * Get all city names from the search results
     * @returns {Promise<string[]>} - An array of city names
     */
    async getAllCityNames() {
        await this.citySearchResults.first().waitFor(); // Ensure results are loaded
        return await this.citySearchResults.allTextContents();
    }
}
