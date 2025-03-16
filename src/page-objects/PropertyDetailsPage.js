import {BasePage} from "./BasePage";

export class PropertyDetailsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.contactAgentButton = this.page.locator('a[href*="makelaar-contact"]').first();
        this.propertyInfo = this.page.locator('#about');
        this.propertyTitle = this.page.locator('h1 span').first();
        this.propertyAddress = this.page.locator('h1 span').last();
        this.propertyPrice = this.propertyInfo.locator('ul + div div div').or(this.propertyInfo.locator('ul + div div[class=""]'));
        this.showPhoneNumberButton = this.page.locator('div.group.px-6');
        this.contactBrokerForm = this.page.locator('.flex.flex-col.divide-y.divide-neutral-20');
    }

    async viewPhoneNumber() {
        await this.contactBrokerForm.waitFor({state: 'visible'});
        await this.showPhoneNumberButton.click();
    }

    async openContactBrokerForm() {
        await this.contactAgentButton.waitFor({state: 'visible'});
        await this.contactAgentButton.click();
    }
}
