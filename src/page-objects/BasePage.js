export class BasePage {
    constructor(page) {
        this.page = page;
        this.acceptCookies = page.locator('#didomi-notice-agree-button');
        this.loginButton = page.locator('.flex.h-full.cursor-pointer.flex-col.items-center.justify-center.px-1.text-white').nth(1);
        this.profileMenuButton = page.locator('#headlessui-menu-button-v-0-34');
        this.searchButton = page.locator('button.absolute.right-0');

    }

    async navigate() {
        await this.page.goto('/');
    }

    async emptySearchSubmit() {
        await this.searchButton.click();
    }







}