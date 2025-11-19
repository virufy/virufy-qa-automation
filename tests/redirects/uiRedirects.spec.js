// tests/redirects/uiRedirects.spec.js
import { test, expect } from '@playwright/test';
import { redirects } from '../../fixtures/redirectsData.js';

const BASE_URL = 'https://virufy.org/';
const joinUrl = (base, path) => new URL(path.replace(/^\//, ''), base).toString();

const GOOGLE_HOSTS = [
    'docs.google.com',
    'forms.gle',
    'accounts.google.com',
    'consent.google.com',
    'presentation.google.com'
];

test.describe('UI Redirect and Page Validation Suite', () => {
    redirects.forEach((redirect, index) => {
        const { from, to, titleKeyword, external = false } = redirect;

        const counter = index + 1;
        const total = redirects.length;

        test(`[${counter}/${total}] Validate redirect: /${from}`, async ({ page }) => {
            const startUrl = joinUrl(BASE_URL, from);
            const isExternal = external || (to.startsWith('http') && !to.includes('virufy.org'));

            console.log(`\n → (${counter}) Checking redirect: ${startUrl}`);

            // Step1 – Visit start URL
            let finalUrl = '';
            try {
                await page.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
                await page.waitForTimeout(1500);
                finalUrl = page.url();
            } catch (err) {
                console.warn(` Navigation timeout for ${startUrl}, continuing with current URL`);
                finalUrl = page.url();
            }

            console.log(`   → Final URL: ${finalUrl}`);

            // Step2 – External vs internal logic
            if (isExternal) {
                const expectedDomain = new URL(to).hostname;
                const actualDomain = new URL(finalUrl).hostname;

                // If it’s a Google domain, allow any Google host
                const isGoogle = GOOGLE_HOSTS.some(h => actualDomain.includes(h)) || actualDomain.endsWith('google.com');
                if (isGoogle) {
                    const title = await page.title().catch(() => '');
                    console.log(`   → Page Title: ${title}`);
                    expect(title.toLowerCase()).toContain('google');
                    console.log(' Verified Google redirect via title check');
                    console.log(` ✔ Redirect validated successfully (${counter}/${total})`);
                    return; // exit early
                }

                // Normal external domain check (e.g., GoFundMe)
                expect(actualDomain).toBe(expectedDomain);
            } else {
                const cleanExpected = to.replace(/^\//, '').replace(/\/$/, '');
                expect(finalUrl).toContain(cleanExpected);
            }

            // Step3 – Internal pages: validate title
            const title = await page.title();
            console.log(`   → Page Title: ${title || '(none)'}`);

            expect(
                title && title.trim().length > 0 && !title.toLowerCase().includes('404'),
                `Page title missing or shows 404 for ${finalUrl}`
            ).toBeTruthy();

            if (titleKeyword) {
                expect(
                    title.toLowerCase(),
                    `Expected title to contain keyword: ${titleKeyword}`
                ).toContain(titleKeyword.toLowerCase());
            }

            // Step4 – Heading (fallback content check)
            const heading = await page.locator('h1, h2').first().textContent().catch(() => null);
            if (heading) console.log(`   → Found Heading: ${heading.trim()}`);

            console.log(` ✔ Redirect validated successfully (${counter}/${total})`);
        });
    });
});
