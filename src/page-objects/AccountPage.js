import {BasePage} from "./BasePage";
export class AccountPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.accountButton = page.locator('#headlessui-menu-button-v-0-34');
        this.myAccountButton = page.locator('#headlessui-menu-item-v-0-40');
        this.logoutButton = page.locator('#headlessui-menu-item-v-0-41');
        this.accountDropDownMenu = page.locator('#headlessui-menu-items-v-0-35')
    }

    async openAccountDropDownMenu() {
        await this.accountButton.click();
    }

    async logout() {
        await this.logoutButton.waitFor({state: "visible"});
        await this.logoutButton.click();
    }

}