import Helpers from '../helpers';

export class HomePage extends Helpers {

    private readonly signIn = '.fa-sign-in';

    async clickOnSignIn() {
        await this.clickElement(this.signIn)
    }
}
