import {BasePage} from "./BasePage";
export class ContactBrokerPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.sendMessageButton = page.locator('button[class*="cursor-pointer"]').nth(2);
        this.showPhoneNumberButton = page.locator('div.group.px-6');
        this.questionInput = page.locator('#questionInput');
        this.emailAddressInput = page.locator('#emailAddress');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.phoneNumberInput = page.locator('#phoneNumber');
        this.contactBrokerForm = page.locator('.flex.flex-col.divide-y.divide-neutral-20');
    }

    async viewPhoneNumber() {
        await this.contactBrokerForm.waitFor();
        await this.showPhoneNumberButton.click();
    }
}