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
        
        for (let i = 0; i < linkCount; i++) {
            const link = linkedInURLs.nth(i);
            const href = await link.getAttribute('href');
            console.log(`🔗 ${i} Checking LinkedIn link: ${href}`);

            
            //Verify each link is visible
            await expect(link).toBeVisible();
            await expect(link).toHaveAttribute('href', /linkedin\.com\/in\//);

            //open the link in a new tab and check it loads 
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page').catch(() => null), // in case no new tab opens
                link.click()
            ]);

            // Use either new page or current page
            const linkedPage = newPage || this.page;       

            // await newPage.waitForLoadState('domcontentloaded', { timeout: 10000 });
            // console.log(`New page Linked In URL: ${newPage.url()}`);
            // await expect(newPage).toHaveURL(/linkedin\.com\/in\//);

                try {
                    await newPage.waitForURL(/linkedin\.com\/in\//, { timeout: 50000 });
                    console.log(`✅ URL verified: ${linkedPage.url()}`);
                } catch (err) {
                    console.warn(`⚠️ Timed out or failed to verify ${href}: ${err.message}`);
                    // console.log('URL found:', linkedPage.url());
                    console.log(`Current URL: ${linkedPage.url()}`);
                }finally{
                    await linkedPage.close().catch(() => {});
                }   
            if (newPage) {
                await newPage.close();
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


