import { defineConfig } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: env.baseUrl,
  },
});