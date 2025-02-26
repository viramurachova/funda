import {BasePage} from "./BasePage";

export class RentPropertySearchPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.url = '/zoeken/huur'
        this.selectedCityName = page.getByTestId('searchBoxSuggestions-mobile').getByText('Amsterdam').first();
        this.rentTab = page.locator('#headlessui-tabs-tab-v-0-0-1');
        this.firstAddressSearchResult = page.getByTestId('listingDetailsAddress').first();
        this.sortButton = page.locator('button select')
        this.allAddressesSearchResalt = page.getByTestId('listingDetailsAddress');
        this.resultsPrices = page.locator('h2 + div div.truncate');
    }

    /**
     * Apply sorting to the search results
     * @returns {Promise<void>}
     */
    async applySorting() {
        await this.sortButton.selectOption({index: 3});
    }

    /**
     * Fill in 'Price From' input and select from the dropdown
     * @param {number} price
     */
    async fillInPriceFrom(price) {
        const url = new URL(this.page.url());
        let priceParam = url.searchParams.get('price') || '"0-"';
        let [currentFrom, currentTo] = priceParam.replace(/"/g, '').split('-');
        currentTo = currentTo ? currentTo : '';
        url.searchParams.set('price', `"${price}-${currentTo}"`);
        await this.page.goto(url.toString());
    }

    /**
     * Fill in 'Price To' input and select from the dropdown
     * @param {number} price
     */
    async fillInPriceTo(price) {
        const url = new URL(this.page.url());
        let priceParam = url.searchParams.get('price') || '"-0"';
        let [currentFrom, currentTo] = priceParam.replace(/"/g, '').split('-');
        currentFrom = currentFrom ? currentFrom : '0';
        url.searchParams.set('price', `"${currentFrom}-${price}"`);
        await this.page.goto(url.toString());
    }

    /**
     * Get the title and price of the first listing in the search results
     * @returns {Promise<{apartmentTitle: string, apartmentPrice: string}>}
     */
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

    /**
     * Get a list of city names from the search results
     * @returns {Promise<string[]>} - An array of city names
     */
    async getResultsCities() {
        const addresses = await this.allAddressesSearchResalt.all();

        return Promise.all(addresses.map(async (address) => {
            const addressText = await address.locator('div').last().textContent();
            return addressText.split(' ').at(1).trim();
        }));
    }

    /**
     * Get a list of apartment prices from the search results
     * @returns {Promise<number[]>} - An array of apartment prices as numbers
     */
    async getResultsPrices() {
        const prices = await this.resultsPrices.all();

        return Promise.all(
            prices.map(async (price) => {
                const priceText = await price.textContent();
                const match = priceText.match(/€\s*([\d.,]+)/);
                return Number(match[1].replace(/\./g, '').replace(',', '.'));
            })
        );
    }
}