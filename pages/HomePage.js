import { BasePage } from '../pages/BasePage';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

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

        // --- Footer ---
        this.footer = page.getByRole('contentinfo').or(page.locator('footer'));
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
        await this.page.waitForTimeout(1500);

        const expectedItems = ['Advisors', 'Our Supporters', 'One Young World'];
        for (const text of expectedItems) {
            // Try menuitem first, fallback to link if menuitem role is not available
            const itemLocator = this.page.getByRole('menuitem', { name: new RegExp(text, 'i') })
                .or(this.page.getByRole('link', { name: new RegExp(text, 'i') }));
            await expect(itemLocator).toBeVisible();
        }

        await this.page.mouse.move(0, 0);
    }

    async verifyTopActionButtons() {
        await expect(this.joinUsButton).toBeVisible();

        // Donate button may be link or button
        const donateButtons = await this.page.getByRole('button', { name: /Donate/i }).all();
        let visibleFound = false;
        for (const button of donateButtons) {
            if (await button.isVisible()) {
                visibleFound = true;
                break;
            }
        }
        expect(visibleFound).toBe(true);
    }

    async verifyFooterLinks() {
        await this.footer.scrollIntoViewIfNeeded();
        await expect(this.cookiePolicy).toBeVisible();
        await expect(this.privacyPolicy).toBeVisible();
        await expect(this.doNotSellInfo).toBeVisible();
    }
}
