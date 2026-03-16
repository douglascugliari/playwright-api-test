import { defineConfig } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: env.baseUrl,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'html' }],
    ['json', { outputFile: 'results.json' }],
    ['junit', { outputFile: 'results.xml' }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false
    }]
  ],
  outputDir: 'test-results',
});