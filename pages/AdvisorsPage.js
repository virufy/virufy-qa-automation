import { BasePage } from '../pages/BasePage';
import { expect } from '@playwright/test';


export class AdvisorsPage extends BasePage {
    constructor(page) {
        super(page);

        this.selectors = { 
            advisorImage: 'img[alt]',
            advisorName: 'h3, h2, [class*="text-black font-bold "]',
            linkedInLink: 'a[href*="https://www.linkedin.com/in/"]',

            // Footer
            footer: 'footer',
            cookiePolicy: 'a[href="/en/cookie-policy/"]',
            privacyPolicy: 'a[href="/en/privacy-policy/"]',
            doNotSellInfo: 'a[href="/en/do-not-sell-my-data/"]',
            // intellectualProperty: 'a[href="/en/Intellectual-Property/"]',
        };
    }

    async navigateToAdvisors() {
        await this.page.goto('/en/advisors/');
        await this.waitForPageLoad();
        // Handle popup IMMEDIATELY after page loads, before anything else
        await this.acceptCookies();
        await this.waitForPageLoad();
    }


    // AdvisorsPage Methods to Verify Title
     async verifyAdvisorTitle(expectedTitle) {
        await this.assertPageTitle(expectedTitle);
    }


    async verifyAdvisorPageHeading(headings) {
        for (const heading of headings) {
            const locator = this.page.locator('h1').filter({ hasText: heading });
             await expect(locator).toBeVisible();
        }   
    }


    async verifyAdvisorsLinkAndImages() {
        console.log('🔍 Starting LinkedIn URL verification for all advisors...');

        //Get LinkedIn URL's
        const linkedInURLs = await this.page.locator(this.selectors.linkedInLink);
        const linkCount = await linkedInURLs.count();

        console.log(`Found ${linkCount} LinkedIn URLs.`);

        if (linkCount === 0) {
            console.warn('⚠️ No LinkedIn URLs found on the advisors page.');
            return;
        }
        

        const hrefs = [];
        for (let i = 0; i < linkCount; i++) {
            const link = linkedInURLs.nth(i);
            const href = await link.getAttribute('href');
            if (href) {
                hrefs.push(href);
            }
        }

        console.log('✅ Collected LinkedIn URLs:', hrefs);

          // Validate that each link is properly formatted

         for (const href of hrefs) {
            console.log(`🔗 Checking LinkedIn link: ${href}`);

            if (!href.startsWith('https://www.linkedin.com/in/')) {
                console.warn(`⚠️ Invalid LinkedIn URL format: ${href}`);
                continue;
            }else {
                console.log(`✅ Valid LinkedIn URL format: ${href}`);
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


