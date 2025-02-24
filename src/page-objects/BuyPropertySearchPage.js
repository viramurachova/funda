import {BasePage} from "./BasePage";

export class BuyPropertySearchPage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
        this.url = '/zoeken/koop'
        this.buyButton = page.locator('#headlessui-tabs-tab-v-0-0-0');
        this.resultsAddress = page.getByTestId('listingDetailsAddress').first();
    }

    async openFirstProperty() {
        await this.resultsAddress.waitFor();
        await this.resultsAddress.click();
    }


}

