export class BasePage {
    constructor(page) {
        this.page = page;
        this.acceptCookies = this.page.locator('#didomi-notice-agree-button');
        this.loginButton = this.page.locator('.flex.h-full.cursor-pointer.flex-col.items-center.justify-center.px-1.text-white').nth(1);
    }

    async openLoginPage() {
        await this.page.waitForRequest(request => request.url().includes('https://api.seg.funda.nl/v1/t'));
        await this.loginButton.click();
    }
}
