export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.acceptCookiesButton = '#didomi-notice-agree-button';
        this.loginButton = '.flex.h-full.cursor-pointer.flex-col.items-center.justify-center.px-1.text-white';
    }

    async navigate() {
        await this.page.goto('/');
    }

    async acceptCookies() {
        await this.page.locator(this.acceptCookiesButton).click();
    }


}