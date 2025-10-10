import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }
    // go to url
    async navigateTo(url) {
        await this.page.goto(url);
        // Handle cookies immediately after page loads, before waiting for networkidle
        await this.acceptCookies();
        await this.waitForPageLoad();
        // Check for cookies again in case they appeared after page load
        await this.acceptCookies();
    }

    //wait for page load
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async acceptCookies() {
        try {
            // Check immediately for popup without waiting
            const cookieButtons = [
                this.page.getByRole('button', { name: 'Accept and close' }),
                this.page.getByRole('button', { name: 'Accept' }),
                this.page.getByRole('button', { name: 'Accept all' })
            ];

            for (const button of cookieButtons) {
                if (await button.isVisible({ timeout: 500 })) {
                    await button.click();
                    // Wait for popup to disappear before continuing
                    await this.page.waitForTimeout(300);
                    return;
                }
            }

            // If no button found immediately, wait a bit and try again
            await this.page.waitForTimeout(1000);
            for (const button of cookieButtons) {
                if (await button.isVisible({ timeout: 1000 })) {
                    await button.click();
                    await this.page.waitForTimeout(300);
                    return;
                }
            }
        } catch (error) {
            // Continue if no popup found
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
