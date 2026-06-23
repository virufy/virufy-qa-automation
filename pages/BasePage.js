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
            // Dismiss the overlay modal via JS click to avoid Playwright coverage/actionability issues
            const dismissed = await this.page.evaluate(() => {
                const btn = document.querySelector('button[aria-label="Close modal"]');
                if (btn) { btn.click(); return true; }
                return false;
            });
            if (dismissed) await this.page.waitForTimeout(500);
        } catch (error) {
            // Continue if no overlay modal found
        }

        try {
            // Check immediately for cookie popup without waiting
            const cookieButtons = [
                this.page.getByRole('button', { name: 'Accept and close' }),
                this.page.getByRole('button', { name: 'Accept' }),
                this.page.getByRole('button', { name: 'Accept all' })
            ];

            for (const button of cookieButtons) {
                if (await button.isVisible()) {
                    await button.click();
                    // Wait for popup to disappear before continuing
                    await this.page.waitForTimeout(300);
                    return;
                }
            }

            // If no button found immediately, wait a bit and try again
            await this.page.waitForTimeout(1000);
            for (const button of cookieButtons) {
                if (await button.isVisible()) {
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

    // assert an element has the expected text content
    async assertElementText(locator, expectedText) {
        await expect(locator).toHaveText(expectedText);
    }
}
