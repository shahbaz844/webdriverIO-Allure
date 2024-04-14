import Helpers from '../helpers';

export class LoginPage extends Helpers {

    private readonly usernameInput = '#email';
    private readonly passwordInput= '#password';
    private readonly submit = 'button[type="submit"]';

    async openLoginPage() {
        await super.open('/');
    }

    async performLogin(username: string, password: string) {
        await this.setData(this.usernameInput, username);
        await this.setData(this.passwordInput, password);
        await this.clickElement(this.submit);
    }
}
