import { BasePage } from '../pages/BasePage';
import { expect } from '@playwright/test';


export class AdvisorsPage extends BasePage {
    constructor(page) {
        super(page);

        this.selectors = { 
            // advisorImage: 'img[alt]',
            advisorImage: 'img[src*="/advisors/"]',
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
        console.log('🔍 Starting Advisor Image and LinkedIn URL verification for all advisors...');

        //Check all advisor images
        const advisorImages = await this.page.locator(this.selectors.advisorImage);
        const linkedInURLs = await this.page.locator(this.selectors.linkedInLink);

        const imageCount = await advisorImages.count();
        const linkCount = await linkedInURLs.count();
        
        console.log(`Found ${imageCount} advisor images.`);

        if (imageCount === 0) {
            console.warn('⚠️ No advisor images found on the advisors page.');
        } else {
            for (let i = 0; i < imageCount; i++) {
                const image = advisorImages.nth(i);
                const altText = await image.getAttribute('alt');
                const src = await image.getAttribute('src');
                if (altText && altText.trim() !== '') {
                    await expect(image).toBeVisible();
                    console.log(`✅ Image "${altText} : ${src}" is visible.`);   

                }   else {
                    console.warn(`⚠️ Image ${i + 1} is missing alt text.`);
                }
            }
        }

        //Get Advisor Images and  LinkedIn URL's
        
        console.log(`\nFound ${linkCount} LinkedIn URLs.`);

        if (linkCount === 0) {
            console.warn('⚠️ No LinkedIn URLs found on the advisors page.');
            return;
        }
        
        const hrefs = [];
        for (let i = 0; i < linkCount; i++) {
        
            const link = linkedInURLs.nth(i);
            const hrefA = await link.getAttribute('href');

          // Validate that each link is properly formatted
          hrefs.push(hrefA);
        }

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