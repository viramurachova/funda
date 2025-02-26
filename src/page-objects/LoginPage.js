import {BasePage} from "./BasePage";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.url = '/account/login';
        this.email = page.locator('#UserName');
        this.password = page.locator('#Password');
        this.submitButton = page.locator('.btn.w-full.btn-primary.mr-6');
    }

    /**
     * Fill in the login form with credentials
     * @returns {Promise<void>}
     */
    async fillLoginForm() {
        await this.email.fill(process.env.LOGIN_EMAIL);
        await this.password.fill(process.env.LOGIN_PASSWORD);
    }

    /**
     * Click the login button
     * @returns {Promise<void>}
     */
    async clickLoginButton() {
        await this.submitButton.click();
    }
}