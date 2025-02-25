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

    async enterPriceRange() {
        await this.priceFromInput.fill('75000', { force: true });
        await this.priceToInput.fill('100000', { force: true });
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