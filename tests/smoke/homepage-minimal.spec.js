import { test } from '../../fixtures/appFixtures';
import * as allure from "allure-js-commons";

test.describe('Homepage Smoke Tests', () => {

    test('smoke: homepage loads with correct title', async ({ home }) => {
        await allure.feature('Smoke Tests');
        await allure.severity('critical');
        await allure.tag('smoke');
        await home.verifyPageTitle('Virufy | AI-Powered Respiratory Health Screening');
    });

    test('smoke: main content sections are visible', async ({ home }) => {
        await allure.feature('Smoke Tests');
        await allure.severity('critical');
        await allure.tag('smoke');
        await home.verifyMainHeadings([
            'Welcome to Virufy',
            'Your Digital Health Companion',
            'Your Health, Our Priority'
        ]);
    });

    test('smoke: basic navigation works', async ({ home }) => {
        await allure.feature('Smoke Tests');
        await allure.severity('critical');
        await allure.tag('smoke');
        await home.verifyNavigationLinks();
    });

    test('smoke: footer section is present', async ({ home }) => {
        await allure.feature('Smoke Tests');
        await allure.severity('critical');
        await allure.tag('smoke');
        await home.verifyFooterLinks();
    });
});
