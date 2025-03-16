export class BasePage {
    constructor(page) {
        this.page = page;
        this.acceptCookies = this.page.locator('#didomi-notice-agree-button');
        this.searchInputField = this.page.locator('#headlessui-combobox-input-v-0-0-0-0');
        this.loginButton = this.page.locator('.flex.h-full.cursor-pointer.flex-col.items-center.justify-center.px-1.text-white').nth(1);
        this.searchButton = this.page.locator('button.absolute.right-0');
        this.findNVMAgentLink = this.page.locator('a[href*="/makelaar-zoeken"]').nth(4);
        this.cityNameSuggestionList = this.page.locator('[role="listbox"]');
        this.firstCityNameSuggested = this.page.getByTestId('SearchBox-location-suggestion').first();
        this.forRentButton = this.page.locator('button.tab-item.border-transparent').nth(0);
    }
    async openLoginPage() {
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
        await this.loginButton.click();
    }

    async navigate() {
        await this.page.goto('/');
    }

    async selectForRentTab() {
        await this.forRentButton.waitFor({state: "attached"});
        await this.forRentButton.waitFor({state: "visible"});
        await this.forRentButton.click();
    }

    async emptySearchSubmit() {
        await this.searchButton.click();
        await this.page.waitForNavigation();
    }

    async openFindNVMAgentPage() {
        await this.findNVMAgentLink.click();
    }

    async enterCityName(city) {
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'), { timeout: 1000 });
        await this.searchInputField.pressSequentially(city.toString())
    }

    async selectFirstCity() {
        await this.firstCityNameSuggested.waitFor({state: "visible"});
        await this.firstCityNameSuggested.click();
    }

}
