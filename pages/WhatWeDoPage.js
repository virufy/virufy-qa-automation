import { BasePage } from '../pages/BasePage';

export class WhatWeDoPage extends BasePage {
    constructor(page) {
        super(page);

        // --- Headings ---
        this.mainHeading = page.getByRole('heading', { level: 1 });
        this.sectionHeading = page.getByRole('heading', { level: 2 });

        // --- Body ---
        this.introBody = page.locator('h1 + p');
        this.firstCardBody = page.locator('#panel-technology p').nth(0);
        this.secondCardBody = page.locator('#panel-technology p').nth(1);
    }

    async navigateToWhatWeDo() {
        await this.navigateTo('/en/ai/');
    }

    async verifyPageTitle(expectedTitle) {
        await this.assertPageTitle(expectedTitle);
    }

    async verifyMainHeading(expectedText) {
        await this.assertElementText(this.mainHeading, expectedText);
    }

    async verifySectionHeading(expectedText) {
        await this.assertElementText(this.sectionHeading, expectedText);
    }

    async verifyIntroBody(expectedText) {
        await this.assertElementText(this.introBody, expectedText);
    }

    async verifyFirstCardBody(expectedText) {
        await this.assertElementText(this.firstCardBody, expectedText);
    }

    async verifySecondCardBody(expectedText) {
        await this.assertElementText(this.secondCardBody, expectedText);
    }
}
