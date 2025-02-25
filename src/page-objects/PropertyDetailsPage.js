import {BasePage} from "./BasePage";

export class PropertyDetailsPage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
        this.contactAgentButton = page.locator('a[href*="makelaar-contact"]').first();
    }

    async openContactBrokerForm(){
       await this.contactAgentButton.click();
    }
}