import {BasePage} from "./BasePage";

export class AccountPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.accountButton = this.page.locator('#headlessui-menu-button-v-0-34');
        this.myAccountButton = this.page.locator('#headlessui-menu-item-v-0-40');
        this.logoutButton = this.page.locator('#headlessui-menu-item-v-0-41');
        this.accountDropDownMenu = this.page.locator('#headlessui-menu-items-v-0-35')
    }

    async openAccountDropDownMenu() {
        await this.accountButton.waitFor({state: "attached", timeout: 30000});
        await this.accountButton.waitFor({state: "visible", timeout: 10000});
        await this.accountButton.click();
    }

    async logout() {
        await this.logoutButton.waitFor({state: "attached"});
        await this.logoutButton.waitFor({state: "visible"});
        await this.logoutButton.click();
        await this.page.waitForNavigation();
    }

}
