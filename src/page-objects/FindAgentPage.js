import {BasePage} from "./BasePage";
export class FindAgentPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
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

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async selectBuyWizardOption() {
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
        await this.buyWizardButton.waitFor({state: 'attached'});
        await this.buyWizardButton.click();
    }

    async fillInOfficeName(city) {
        //await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
        await this.searchBrokerInput.waitFor({state: 'attached'});
        await this.searchBrokerInput.pressSequentially(city.toString())
    }

    async selectFirstCity() {
        await this.citySuggestionList.waitFor({state: 'visible'});
        await this.firstSuggestedCity.click();
    }

    async getAllCityNames() {
        await this.citySearchResults.first().waitFor(); 
        return await this.citySearchResults.allTextContents();
    }
}
