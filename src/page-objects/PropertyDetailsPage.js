import {BasePage} from "./BasePage";

export class PropertyDetailsPage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
        this.contactAgentButton = page.locator('a[href*="makelaar-contact"]').first();
        this.propertyInfo = page.locator('#about');
        this.propertyTitle = page.locator('h1 span').first();
        this.propertyAddress = page.locator('h1 span').last();
        this.propertyPrice = this.propertyInfo.locator('ul + div div div').or(this.propertyInfo.locator('ul + div div[class=""]'));
    }
    async getListingPrice() {
         return this.propertyPrice.textContent();
     }

    async openContactBrokerForm(){
       await this.contactAgentButton.click();
    }
}


