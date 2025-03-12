import {BasePage} from "./BasePage";
export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.email = page.locator('#UserName');
        this.password = page.locator('#Password');
        this.submitButton = page.locator('.btn.w-full.btn-primary.mr-6');
    }

    async fillLoginForm() {
        await this.email.fill(process.env.LOGIN_EMAIL);
        await this.password.fill(process.env.LOGIN_PASSWORD);
    }
    
    async clickLoginButton() {
        await this.submitButton.click();
    }
}