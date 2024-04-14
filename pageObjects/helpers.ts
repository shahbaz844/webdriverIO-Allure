
export default class Helpers {

    protected async open(path: string): Promise<void> {
        await browser.maximizeWindow();
        await browser.url(path);
    }

    protected async getElement(element: string): Promise<WebdriverIO.Element> {
        return browser.$(element)
    }

    protected async clickElement(element: string, waitTime?: number) {
        if (waitTime) await (await this.getElement(element)).waitForClickable({ timeout: waitTime })
        await (await this.getElement(element)).click();
    }

    protected async setData(element: string, value: string | number, waitTime?: number) {
        if (waitTime) await (await this.getElement(element)).waitForEnabled({ timeout: waitTime })
        await (await this.getElement(element)).clearValue();
        await (await this.getElement(element)).setValue(value);
    }

    protected async scrollToElement(element: string) {
        await (await this.getElement(element)).scrollIntoView();
    }

    protected async selectDropdownByText(element: string, text: string) {
        await (await this.getElement(element)).selectByVisibleText(text);
    }
}
