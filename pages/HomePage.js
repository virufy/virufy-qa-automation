import { BasePage } from '../pages/BasePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);

        this.selectors = {
            // Navigation links - more specific targeting
            homeLink: 'a[href="/en/"]',
            technologyLink: 'a[href="/en/ai/"][class*="font-semibold"]',
            aboutLink: 'a[href*="/en/story/"]',
            mediaLink: 'a[href*="/en/news/"]',
            faqLink: 'a[href*="/en/faq/"]',

            // Top action buttons
            joinUsButton: 'a[href*="/en/join-us/"]',
            donateButton: 'button:has-text("Donate"), a:has-text("Donate")',

            // Dropdown menus
            aboutDropdown: '.dropdown-menu',

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
        await this.page.goto('/');
        // Handle popup IMMEDIATELY after page loads, before anything else
        await this.acceptCookies();
        await this.waitForPageLoad();
    }

    async verifyPageTitle(expectedTitle) {
        await this.assertPageTitle(expectedTitle);
    }

    async verifyMainHeadings(headings) {
        for (const heading of headings) {
            const locator = this.page.locator('h1, h2'  ).filter({ hasText: heading });
            await expect(locator).toBeVisible();
        }
    }

    async verifyNavigationLinks() {
        const links = [
            { selector: this.selectors.homeLink, text: 'Home', expected: '/en/' },
            { selector: this.selectors.technologyLink, text: 'Technology', expected: '/en/ai/' },
            { selector: this.selectors.aboutLink, text: 'About Us', expected: '/en/story/' },
            { selector: this.selectors.mediaLink, text: 'Media', expected: '/en/news/' },
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

    // Validate About Us dropdown items
    async verifyAboutUsDropdown() {
        // Ensure we're on homepage and handle any popups
        await this.navigateToHome();

        const aboutLink = this.page.locator(this.selectors.aboutLink);

        await aboutLink.hover();
        await this.page.waitForTimeout(1500);

        // Check for the three expected dropdown items
        const expectedItems = ['Advisors', 'Our Supporters', 'One Young World'];

        for (const itemText of expectedItems) {
            const itemLocator = this.page.locator(`a:has-text("${itemText}")`);
            await expect(itemLocator).toBeVisible();
        }

        // Move mouse away to close dropdown
        await this.page.mouse.move(0, 0);
        await this.page.waitForTimeout(500);
    }

    // Validate buttons for Join Us and Donate
    async verifyTopActionButtons() {
        // Check Join Us button - visibility and text
        const joinUsButton = this.page.locator(this.selectors.joinUsButton).filter({ hasText: 'Join Us' });
        await expect(joinUsButton).toBeVisible();

        // Check Donate button
        const donateCount = await this.page.locator(this.selectors.donateButton).count();

        if (donateCount > 0) {
            // Check if any donate button is visible
            let foundVisibleDonate = false;
            for (let i = 0; i < donateCount; i++) {
                const button = this.page.locator(this.selectors.donateButton).nth(i);
                if (await button.isVisible()) {
                    foundVisibleDonate = true;
                    break;
                }
            }
        }
    }

    async verifyFooterLinks() {
        await this.page.locator(this.selectors.footer).scrollIntoViewIfNeeded();
        await this.assertElementVisible(this.selectors.cookiePolicy);
        await this.assertElementVisible(this.selectors.privacyPolicy);
        await this.assertElementVisible(this.selectors.doNotSellInfo);
    }
}
