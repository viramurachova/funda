import {BasePage} from "./BasePage";

export class BuyPropertySearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.url = '/zoeken/koop'
        this.selectedCityName = page.getByTestId('searchBoxSuggestions-mobile').getByText('Amsterdam').first();
        this.buyTab = page.locator('#headlessui-tabs-tab-v-0-0-0');
        this.firstAddressSearchResult = page.getByTestId('listingDetailsAddress').first();
        this.priceToInput = page.locator('#price_to');
        this.priceFromInput = page.locator('#price_from');
        this.sortButton = page.locator('select.absolute');
        this.allAddressesSearchResalt = page.getByTestId('listingDetailsAddress');
        this.resultsPrices = page.locator('h2 + div div.truncate');
        this.priceOption = page.locator('#headlessui-combobox-option-v-0-0-6');

    }


    async openFirstProperty() {
        await this.firstAddressSearchResult.waitFor();
        await this.firstAddressSearchResult.click();
    }


    async setSorting() {
        await this.sortButton.click();
        await this.sortButton.selectOption({testId: 'SortButton-option-publish_date_utc_asc'});
    }

    /**
     * Fill in 'Price From' input and select from the dropdown
     * @param {number} price
     */
    async fillInPriceFrom(price) {
        await this.priceFromInput.fill(price.toString());
        await this.page.keyboard.press('Enter');
        await this.priceDropdown.first().waitFor({ state: 'visible' });
        await this.page.locator(`ul[role="listbox"] li[role="option"]:has-text("${price.toLocaleString()}")`).click();
    }

    /**
     * Fill in 'Price To' input and select from the dropdown
     * @param {number} price
     */
    async fillInPriceTo(price) {
        await this.priceToInput.fill(price.toString());
        await this.page.keyboard.press('Enter');
        await this.priceDropdown.first().waitFor({ state: 'visible' });
        await this.page.locator(`ul[role="listbox"] li[role="option"]:has-text("${price.toLocaleString()}")`).click();
    }

    async getFirstListingTitleAndPrice() {
        const [linkText, priceText] = await Promise.all([
            this.allAddressesSearchResalt.first().locator('span').first().textContent(),
            this.resultsPrices.first().textContent()
        ]);

        return {
            apartmentTitle: linkText.trim(),
            apartmentPrice: priceText.trim(),
        };
    }

    async getResultsCities() {
        const addresses = await this.allAddressesSearchResalt.all();
        return Promise.all(addresses.map(async (address) => {
            const addressText = await address.locator('div').last().textContent();
            return addressText.split(' ').at(1).trim();
        }));
    }

    async getResultsPrices() {
        const prices = await this.resultsPrices.allTextContents();
        return prices.map(price => parseInt(price.replace(/[^0-9]/g, ''), 10)).filter(Number.isFinite);
    }
}