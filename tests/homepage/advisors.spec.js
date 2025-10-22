import { test } from '../../fixtures/appFixtures';
import * as allure from "allure-js-commons";

test.describe('Advisors Page Validation', () => {

     /* test('Advisors Page should have correct Title', async ({ advisors }) => {
        await allure.feature('Advisors');
        await allure.severity('critical');
        await allure.tag('Advisors');
        await advisors.verifyAdvisorTitle('Virufy Advisors | Global Experts Supporting AI in Healthcare');
        
    });

     test('Advisors Page Heading should be correct', async ({ advisors }) => {
        await allure.feature('Advisors');
        await allure.severity('critical');
        await allure.tag('Advisors');
        await advisors.navigateToAdvisors();
        await advisors.verifyAdvisorPageHeading([
            'We unite from across the world to defeat infectious diseases one cough at a time.'
        ]); 
        
    });*/

    test('should have working Advisors links', async ({ advisors }) => {
        await allure.feature('Advisors');
        await allure.severity('critical');
        await allure.tag('Advisors');
        await advisors.navigateToAdvisors();
        // test.setTimeout(60000);
        await advisors.verifyAdvisorsLinkAndImages();
    });

    /*test('should have working footer section and links on Advisors Page', async ({ advisors }) => {
        await allure.feature('Advisors');
        await allure.severity('critical');
        await allure.tag('Advisors');
        await advisors.navigateToAdvisors();
        await advisors.verifyFooterLinks();
    });*/
});
