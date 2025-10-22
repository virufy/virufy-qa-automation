import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { AdvisorsPage } from '../pages/AdvisorsPage';

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

    advisors: async ({ page }, use) => {
        // Create AdvisorsPage object
        const advisorsPage = new AdvisorsPage(page);

        // Automatically load the app before each test
        await page.goto('/en/advisors/');
        await advisorsPage.waitForPageLoad();

        // Pass the initialized object to the test
        await use(advisorsPage);
    },
});


