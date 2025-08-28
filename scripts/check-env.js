import fs from 'fs';
if (!fs.existsSync('.env')) {
    console.warn('\n  No .env file found. Please copy .env.example -> .env\n');
}