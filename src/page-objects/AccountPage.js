import {BasePage} from "./BasePage";

export class AccountPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.url = '/account'
        this.accountButton = page.locator('#headlessui-menu-button-v-0-34');
        this.myAccountButton = page.locator('#headlessui-menu-item-v-0-40');
        this.logoutButton = page.locator('#headlessui-menu-item-v-0-41');
        this.accountDropDownMenu = page.locator('#headlessui-menu-items-v-0-35')
    }

    /**
     * Open the account dropdown menu
     * @returns {Promise<void>}
     */
    async openAccountDropDownMenu() {
        await this.accountButton.click();
        await this.myAccountButton.waitFor()
    }

    /**
     * Log out from the account
     * @returns {Promise<void>}
     */
    async logout() {
        await this.logoutButton.waitFor({state: "visible"});
        await this.logoutButton.click();
    }

}