import {BasePage} from "./BasePage";

export class RentPropertySearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.selectedCityName = this.page.getByTestId('searchBoxSuggestions-mobile').getByText('Amsterdam').first();
        this.rentTab = this.page.locator('#headlessui-tabs-tab-v-0-0-1');
        this.firstAddressSearchResult = this.page.getByTestId('listingDetailsAddress').first();
        this.sortButton = this.page.locator('button select')
        this.allAddressesSearchResult = this.page.getByTestId('listingDetailsAddress');
        this.resultsPrices = this.page.locator('h2 + div div.truncate');
        this.priceToInput = this.page.locator('#price_to');
        this.priceFromInput = this.page.locator('#price_from');
    }

    async applySorting() {
        await this.sortButton.selectOption({index: 3});
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
    }

    async fillInPriceFrom(price) {
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
        await this.priceFromInput.waitFor({state: 'attached'});
        await this.priceFromInput.waitFor({state: 'visible'});
        await this.priceFromInput.click();
        await this.page.keyboard.type(price.toString(), {delay: 100});
        await this.page.keyboard.press('Enter');
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
    }

    async fillInPriceTo(price) {
        await this.priceToInput.waitFor({state: 'attached'});
        await this.priceToInput.waitFor({state: 'visible'});
        await this.priceToInput.click();
        await this.page.keyboard.type(price.toString(), {delay: 100});
        await this.page.keyboard.press('Enter');
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
    }

    async getFirstListingTitleAndPrice() {
        await this.allAddressesSearchResult.last().scrollIntoViewIfNeeded({timeout: 10000});
        const [linkText, priceText] = await Promise.all([this.allAddressesSearchResult.first().locator('span').first().textContent({timeout: 10000}), this.resultsPrices.first().textContent({timeout: 10000})]);

        return {
            apartmentTitle: linkText.trim(), apartmentPrice: priceText.trim(),
        };
    }

    async getResultsCities() {
        const addresses = await this.allAddressesSearchResult.all();

        return Promise.all(addresses.map(async (address) => {
            const addressText = await address.locator('div').last().textContent();
            return addressText.split(' ').at(1).trim();
        }));
    }

    async getResultsPrices() {
        const prices = await this.resultsPrices.all();

        return Promise.all(prices.map(async (price) => {
            const priceText = await price.textContent();
            const match = priceText.match(/€\s*([\d.,]+)\s*\/\s*maand/);
            if (match) {
                return Number(match[1].replace(/\./g, '').replace(',', '.'));
            }

            return null;
        })).then((prices) => prices.filter((price) => price !== null));
    }
}
