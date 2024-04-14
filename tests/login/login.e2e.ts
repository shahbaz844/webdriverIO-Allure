import { LoginPage } from '../../pageObjects/login/login.page';
import { HomePage } from "../../pageObjects/home/home.page";
import allureReporter from "@wdio/allure-reporter"

describe('Login application', () => {

    const homePage = new HomePage();
    const loginPage = new LoginPage();

    it('should login with valid credentials', async () => {
        console.log("aaaaaaaa", process.env.USERNAME)
        console.log("bbbbbbbb", process.env.PASSWORD)
        
        await loginPage.openLoginPage();
        await browser.pause(10000);
        await homePage.clickOnSignIn();
        allureReporter.addSeverity("Critical")
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        await browser.pause(5000);
    });
});
