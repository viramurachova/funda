export class BasePage {
    constructor(page) {
        this.page = page;
        this.acceptCookies = page.locator('#didomi-notice-agree-button');
        this.searchInputField = page.locator('#headlessui-combobox-input-v-0-0-0-0');
        this.loginButton = page.locator('.flex.h-full.cursor-pointer.flex-col.items-center.justify-center.px-1.text-white').nth(1);
        this.profileMenuButton = page.locator('#headlessui-menu-button-v-0-34');
        this.searchButton = page.locator('button.absolute.right-0');
        this.findNVMAgentLink = page.locator('a[href*="/makelaar-zoeken"]').nth(4);
        this.cityNameSuggestionList = page.locator('[role="listbox"]');
        this.firstCityNameSuggested = page.getByTestId('SearchBox-location-suggestion').first();
    }

    async navigate() {
        await this.page.goto('/');
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
        await this.cityNameSuggestionList.waitFor();
        await this.firstCityNameSuggested.click();
    }

}