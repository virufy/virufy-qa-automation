import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }
    // go to url
    async navigateTo(url) {
        await this.page.goto(url);
        await this.waitForPageLoad();
        await this.acceptCookies();
    }

    //wait for page load
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async acceptCookies() {
        const cookieAcceptButton = this.page.getByRole('button', { name: 'Accept and close' });
        if (await cookieAcceptButton.isVisible({ timeout: 2000 })) {
            await cookieAcceptButton.click();
        }
    }

    //wait for element to be visible
    async waitForElement(selector) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    // click on element
    async click(selector) {
        await this.page.locator(selector).click();
    }

    //get text of element
    async getText(selector) {
        return await this.page.locator(selector).textContent();
    }

    // assert element is visible
    async assertElementVisible(selector) {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    // assert page title is as expected
    async assertPageTitle(expectedTitle) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }
}
