import { BasePage } from '../pages/BasePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);

        this.selectors = {
            // Navigation links
            homeLink: 'a[href="/en/"]',
            aboutLink: 'a[href*="/en/story/"]',
            faqLink: 'a[href*="/en/faq/"]',

            // Footer
            footer: 'footer',
            cookiePolicy: 'a[href="/en/cookie-policy/"]',
            privacyPolicy: 'a[href="/en/privacy-policy/"]',
            doNotSellInfo: 'a[href="/en/do-not-sell-my-data/"]',

            // Page headings
            mainHeadings: 'h1, h2',
        };
    }

    // HomePage Methods

    async navigateToHome() {
        await this.navigateTo('/');
        await this.waitForPageLoad();
    }

    async verifyPageTitle(expectedTitle) {
        await this.assertPageTitle(expectedTitle);
    }

    async verifyMainHeadings(headings) {
        for (const heading of headings) {
            const locator = this.page.locator('h1, h2').filter({ hasText: heading });
            await expect(locator).toBeVisible();
        }
    }

    async verifyNavigationLinks() {
        const links = [
            { selector: this.selectors.homeLink, text: 'Home', expected: '/en/' },
            { selector: this.selectors.aboutLink, text: 'About Us', expected: '/en/story/' },
            { selector: this.selectors.faqLink, text: 'FAQ', expected: '/en/faq/' }
        ];

        for (const link of links) {
            const locator = this.page.locator(link.selector).filter({ hasText: link.text });
            await locator.click();
            await this.waitForPageLoad();
            await expect(this.page).toHaveURL(new RegExp(link.expected));
            await this.navigateToHome();
        }
    }


    async verifyFooterLinks() {
        await this.page.locator(this.selectors.footer).scrollIntoViewIfNeeded();
        await this.assertElementVisible(this.selectors.cookiePolicy);
        await this.assertElementVisible(this.selectors.privacyPolicy);
        await this.assertElementVisible(this.selectors.doNotSellInfo);
    }
}
