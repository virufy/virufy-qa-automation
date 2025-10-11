import { test } from '../../fixtures/appFixtures';
import * as allure from "allure-js-commons";

test.describe('Homepage Validation', () => {

    test('should load homepage with correct title', async ({ home }) => {
        await allure.feature('Homepage');
        await allure.severity('critical');
        await allure.tag('homepage');
        await home.verifyPageTitle('Virufy | AI-Powered Respiratory Health Screening');
    });

    test('should display main content sections', async ({ home }) => {
        await allure.feature('Homepage');
        await allure.severity('critical');
        await allure.tag('homepage');
        await home.verifyMainHeadings([
            'Welcome to Virufy',
            'Your Digital Health Companion',
            'Your Health, Our Priority'
        ]);
    });

    test('should have working main navigation links', async ({ home }) => {
        await allure.feature('Homepage');
        await allure.severity('critical');
        await allure.tag('homepage');
        await home.verifyNavigationLinks();
    });

    test('should have working About Us dropdown on hover', async ({ home }) => {
        await allure.feature('Homepage');
        await allure.severity('critical');
        await allure.tag('homepage');
        await home.verifyAboutUsDropdown();
    });

    test('should have working top action buttons', async ({ home }) => {
        await allure.feature('Homepage');
        await allure.severity('critical');
        await allure.tag('homepage');
        await home.verifyTopActionButtons();
    });

    test('should have working footer section and links', async ({ home }) => {
        await allure.feature('Homepage');
        await allure.severity('critical');
        await allure.tag('homepage');
        await home.verifyFooterLinks();
    });
});
