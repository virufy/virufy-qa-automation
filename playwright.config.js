import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// Ensure BASE_URL is loaded
const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) {
    throw new Error(
        'BASE_URL is not defined. Please create a .env file with BASE_URL=https://virufy.org/en/'
    );
}

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 0,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results' }]
    ],
    use: {
        headless: true,
        baseURL: BASE_URL, // <-- Use the constant
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
    },
    projects: (() => {
        const browser = process.env.BROWSER || 'chromium';
        const allProjects = [
            { name: 'Desktop Chromium', use: { ...devices['Desktop Chrome'] } },
            { name: 'Desktop Firefox', use: { ...devices['Desktop Firefox'] } },
            { name: 'Desktop Webkit', use: { ...devices['Desktop Safari'] } },
        ];

        // If BROWSER is set to 'all', run all projects
        if (browser.toLowerCase() === 'all') {
            return allProjects;
        }

        // Otherwise, filter to only the specified browser
        const browserMap = {
            'chromium': 'Desktop Chromium',
            'firefox': 'Desktop Firefox',
            'webkit': 'Desktop Webkit'
        };

        const projectName = browserMap[browser.toLowerCase()];
        if (!projectName) {
            console.warn(`Unknown browser: ${browser}. Defaulting to Chromium.`);
            return allProjects.filter(p => p.name === 'Desktop Chromium');
        }

        return allProjects.filter(p => p.name === projectName);
    })(),
});
