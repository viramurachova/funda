import {BasePage} from "./BasePage";

export class ContactBrokerPage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
        this.sendMessageButton = page.locator('button[class*="cursor-pointer"]').nth(2);
        this.showPhoneNumperButton = page.locator('div.group.px-6');
        this.questionInput = page.locator('#questionInput');
        this.emailAddressInput = page.locator('#emailAddress');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.phoneNumberInput = page.locator('#phoneNumber');

}
    async viewPhoneNumber(){
        await this.showPhoneNumperButton.click();
    }

}