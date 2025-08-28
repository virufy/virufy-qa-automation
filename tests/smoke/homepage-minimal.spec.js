import { test } from '../../fixtures/appFixtures';

test.describe('Minimal Homepage Validation', () => {

    test('should load homepage with correct title', async ({ home }) => {
        await home.verifyPageTitle('Virufy: Developing Cutting Edge AI Technology in Healthcare');
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

    test('should have working footer section and links', async ({ home }) => {
        await home.verifyFooterLinks();
    });
});
