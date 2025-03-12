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

    async navigate() {
        await this.page.goto('/');
    }

    async selectForSaleTab() {
        await this.forSaleButton.click();
    }

    async emptySearchSubmit() {
        await this.searchButton.click();
    }

    async openFindNVMAgentPage() {
        await this.findNVMAgentLink.click();
    }

    async enterCityName(city) {
        await this.searchInputField.pressSequentially(city.toString())
    }

    async selectFirstCity() {
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
        await this.firstCityNameSuggested.click();
    }

}