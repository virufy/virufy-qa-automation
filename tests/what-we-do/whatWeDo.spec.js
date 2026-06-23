import { test } from '../../fixtures/appFixtures';
import * as allure from "allure-js-commons";

test.describe('What We Do Page Validation', () => {

    test('should load with correct page title', { tag: ['@smoke'] }, async ({ whatWeDo }) => {
        await allure.feature('What We Do');
        await allure.severity('critical');
        await allure.tag('what-we-do');
        await whatWeDo.verifyPageTitle('Virufy | The Science Behind AI Disease Detection');
    });

    test('should display correct main heading', { tag: ['@smoke'] }, async ({ whatWeDo }) => {
        await allure.feature('What We Do');
        await allure.severity('critical');
        await allure.tag('what-we-do');
        await whatWeDo.verifyMainHeading('The science behind Virufy');
    });

    test('should display correct intro body text', { tag: ['@smoke'] }, async ({ whatWeDo }) => {
        await allure.feature('What We Do');
        await allure.severity('critical');
        await allure.tag('what-we-do');
        await whatWeDo.verifyIntroBody(
            'Artificial Intelligence (AI) can identify subtle differences in cough and breathing sounds associated with respiratory conditions.'
        );
    });

    test('should display correct AI section heading', { tag: ['@smoke'] }, async ({ whatWeDo }) => {
        await allure.feature('What We Do');
        await allure.severity('normal');
        await allure.tag('what-we-do');
        await whatWeDo.verifySectionHeading('How does AI work?');
    });

    test('should display correct first card body text', { tag: ['@smoke'] }, async ({ whatWeDo }) => {
        await allure.feature('What We Do');
        await allure.severity('normal');
        await allure.tag('what-we-do');
        await whatWeDo.verifyFirstCardBody(
            'Our groundbreaking app employs cutting-edge AI technology to analyze cough and breathing sounds using deep learning algorithms and audio signal processing techniques.'
        );
    });

    test('should display correct second card body text', { tag: ['@smoke'] }, async ({ whatWeDo }) => {
        await allure.feature('What We Do');
        await allure.severity('normal');
        await allure.tag('what-we-do');
        await whatWeDo.verifySecondCardBody(
            'The algorithm scrutinizes various elements of the cough, such as duration, frequency, and pitch. Leveraging a comprehensive database, the AI meticulously compares recorded cough patterns against known indicators of respiratory diseases, allowing to Identify signals associated with respiratory conditions.'
        );
    });
});
