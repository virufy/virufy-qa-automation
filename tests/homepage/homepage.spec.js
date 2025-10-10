import { test } from '../../fixtures/appFixtures';

test.describe('Homepage Validation', () => {

    test('should load homepage with correct title', async ({ home }) => {
        await home.verifyPageTitle('Virufy | AI-Powered Respiratory Health Screening');
    });

    test('should display main content sections', async ({ home }) => {
        await home.verifyMainHeadings([
            'Welcome to Virufy',
            'Your Digital Health Companion',
            'Your Health, Our Priority'
        ]);
    });

    test('should have working main navigation links', async ({ home }) => {
        await home.verifyNavigationLinks();
    });

    test('should have working About Us dropdown on hover', async ({ home }) => {
        await home.verifyAboutUsDropdown();
    });

    test('should have working top action buttons', async ({ home }) => {
        await home.verifyTopActionButtons();
    });

    test('should have working footer section and links', async ({ home }) => {
        await home.verifyFooterLinks();
    });
});
