import {BasePage} from "./BasePage";

export class AccountPage extends BasePage{
    constructor(page) {
        super(page);
        this.page = page;
        this.url = '/account'
        this.accountButton = page.locator('#headlessui-menu-button-v-0-34');
        this.myAccountButton = page.locator('#headlessui-menu-item-v-0-40');
        this.welcomeMessage = page.locator('h1.text-2xl');
        this.logoutButton = page.locator('#headlessui-menu-item-v-0-41');
    }

    async navigateToMyAccountPage() {
        await this.accountButton.click();
        await this.myAccountButton.click();
    }

    async logout() {
        await this.accountButton.click();
        await this.logoutButton.click();
    }

}