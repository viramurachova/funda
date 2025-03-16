import {BasePage} from "./BasePage";

export class FindAgentPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.buyWizardButton = this.page.getByTestId('intend-aankoop');
        this.citySuggestionList = this.page.locator('[role="listbox"]');
        this.firstSuggestedCity = this.page.locator('[data-testid="area-suggestions-0"]');
        this.wizardStepOneSection = this.page.getByTestId('wizard-step-one');
        this.buyWizardButton = this.wizardStepOneSection.getByTestId('intend-aankoop');
        this.wizardStepTwoSection = this.page.getByTestId('wizard-step-two');
        this.searchBrokerInput = this.wizardStepTwoSection.locator('#AreaSearch-input');
        this.searchButton = this.page.getByTestId('search-button');
        this.citySearchResults = this.page.locator('p.mb-1.py-1');
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async selectBuyWizardOption() {
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
        await this.buyWizardButton.waitFor({state: 'attached', timeout: 10000});
        await this.buyWizardButton.waitFor({state: 'visible', timeout: 10000});
        await this.buyWizardButton.click();
    }


    async fillInOfficeName(city) {
        await this.searchBrokerInput.waitFor({state: 'attached', timeout: 15000});
        await this.searchBrokerInput.waitFor({state: 'visible', timeout: 15000});
        await this.searchBrokerInput.pressSequentially(city.toString())
    }

    async selectFirstCity() {
        await this.citySuggestionList.waitFor({state: 'attached', timeout: 10000});
        await this.citySuggestionList.waitFor({state: 'visible', timeout: 10000});
        await this.firstSuggestedCity.click();
    }

    async getAllCityNames() {
        await this.citySearchResults.first().waitFor();
        return await this.citySearchResults.allTextContents();
    }
}
