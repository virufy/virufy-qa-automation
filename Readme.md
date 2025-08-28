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

## Notes
- Add your environment settings in `.env` before running tests  
- View test results with `npx playwright show-report`  
- Tests follow a POM structure for easy maintenance  
