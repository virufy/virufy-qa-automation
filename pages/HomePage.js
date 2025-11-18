import { BasePage } from '../pages/BasePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);

        // --- Navigation ---
        this.homeLink = page.getByRole('link', { name: /^Home$/i });
        this.technologyLink = page.getByRole('link', { name: /^Technology$/i });
        this.aboutLink = page.getByRole('link', { name: /^About Us$/i });
        this.mediaLink = page.getByRole('link', { name: /^Media$/i });
        this.faqLink = page.getByRole('link', { name: /^FAQ$/i });

        // --- Action Buttons ---
        this.joinUsButton = page.getByRole('link', { name: /Join Us/i });
        this.donateButton = page.getByRole('button', { name: /Donate/i });

        // --- Dropdown / Menus ---
        this.aboutDropdownItems = page.getByRole('menu');

        // 'About Us' Dropdown Items
        this.advisorsLink = this.page.getByRole('link', { name: 'Advisors' });
        this.supportersLink = this.page.getByRole('link', { name: 'Our Supporters' });
        this.oneYoungWorldLink = this.page.getByRole('link', { name: 'One Young World' });

        // --- Footer ---
        this.footer = page.getByRole('contentinfo');
        this.cookiePolicy = page.getByRole('link', { name: /Cookie Policy/i });
        this.privacyPolicy = page.getByRole('link', { name: /Privacy Policy/i });
        this.doNotSellInfo = page.getByRole('link', { name: /Do Not Sell/i });

        // --- Headings ---
        this.mainHeadings = page.locator('h1, h2');
    }

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
            const headingLocator = this.mainHeadings.filter({ hasText: heading });
            await expect(headingLocator).toBeVisible();
        }
    }

    async verifyNavigationLinks() {
        const links = [
            { locator: this.homeLink, expected: '/en/' },
            { locator: this.technologyLink, expected: '/en/ai/' },
            { locator: this.aboutLink, expected: '/en/story/' },
            { locator: this.mediaLink, expected: '/en/news/' },
            { locator: this.faqLink, expected: '/en/faq/' },
        ];

        for (const link of links) {
            await link.locator.click();
            await this.waitForPageLoad();
            await expect(this.page).toHaveURL(new RegExp(link.expected));
            await this.navigateToHome();
        }
    }

    async verifyAboutUsDropdown() {
        await this.navigateToHome();
        await this.aboutLink.hover();
        await expect(this.advisorsLink).toBeVisible();
        await expect(this.supportersLink).toBeVisible();
        await expect(this.oneYoungWorldLink).toBeVisible();

        await this.page.mouse.move(0, 0);
    }

    async verifyTopActionButtons() {
        await expect(this.joinUsButton).toBeVisible();
        // the donate us button was removed recently so this check is obsolete
        //await expect(this.donateButton).toBeVisible();
    }

    async verifyFooterLinks() {
        await expect(this.cookiePolicy).toBeVisible();
        await expect(this.privacyPolicy).toBeVisible();
        await expect(this.doNotSellInfo).toBeVisible();
    }
}
