import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Extend the base Playwright test
export const test = base.extend({
    home: async ({ page }, use) => {
        // Create HomePage object
        const homePage = new HomePage(page);

        // Automatically load the app before each test
        await page.goto('/');
        await homePage.waitForPageLoad();

        // Pass the initialized object to the test
        await use(homePage);
    },
});
