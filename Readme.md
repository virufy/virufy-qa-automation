# Virufy Test Automation

This repository contains the Playwright-based automation testing framework for Virufy.  
It follows the Page Object Model (POM) design pattern for scalability, readability, and maintainability.

## Tech Stack
- Playwright Test Runner
- Node.js
- Page Object Model (POM) design pattern
- dotenv for environment configuration
- ESLint + Prettier for code quality

## Usage
- Write tests under the `tests/` directory.  
- Use page classes from `pages/` for consistency.  
- Store shared fixtures in `fixtures/`.  
- Configure environment variables in `.env`. 

## Installation & Setup (Run Your First Test)
1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd <repo-folder/path>
   ```
   Repo URL: [virufy-qa-automation](https://github.com/virufy/virufy-qa-automation)
2. **Create a `.env` file** in the project root and add the following:
   ```env
   BASE_URL=https://virufy.org/en/
   BROWSER=chromium
   ```
   > Replace the URL with your staging or production environment as needed.  
   > You can also change `BROWSER` to `chromium`, `firefox`, `webkit`, or `all`.

3. **Install dependencies & Playwright browsers**
   ```bash
   npm run setup
   ```
4. **Run the first test**
   ```bash
   npm run test:chromium
   ```
   > This runs the test in chrome browser in headeless mode, to run in headed mode use:
   ```
   npm run test:chromium -- --headed
   ```
5. **View the report**
   ```bash
   npx playwright show-report
   ```

## Allure Reporting
Generate allure test reports with detailed dashboard:

Step 0. Run the tests

Step a. This generates the allure-report
```bash
npm run allure:generate
```

Step b. This opens the allure-report dashboard
```bash
npm run allure:open
```
## Scripts
Common npm commands:
- `npm test` – run all tests  
- `npm run test:smoke` – run smoke suite  
- `npm run test:chromium` – run tests in chrome browser
- `npm run test:chromium -- --headed` – run tests in chrome browser in headed mode
- `npm run test:all-browsers` – run tests in all browsers  
- `npm run allure:generate` – generate allure report
- `npm run allure:open` – open allure report
- `npm run lint` – check code quality  
- `npm run format` – auto-format code 

## Notes
- Add your environment settings in `.env` before running tests
- View test results with `npx playwright show-report`  
- Tests follow a POM structure for easy maintenance  
