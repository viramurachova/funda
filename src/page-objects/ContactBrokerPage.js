import {BasePage} from "./BasePage";

export class ContactBrokerPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.sendMessageButton = this.page.locator('button[class*="cursor-pointer"]').nth(2);
        this.showPhoneNumberButton = this.page.locator('div.group.px-6');
        this.questionInput = this.page.locator('#questionInput');
        this.emailAddressInput = this.page.locator('#emailAddress');
        this.firstNameInput = this.page.locator('#firstName');
        this.lastNameInput = this.page.locator('#lastName');
        this.phoneNumberInput = this.page.locator('#phoneNumber');
    }
}
