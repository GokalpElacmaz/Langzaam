import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:5173', headless: true, viewport: { width: 1440, height: 1100 }, launchOptions: { channel: 'chromium' } },
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:5173', reuseExistingServer: true, timeout: 60_000 },
  reporter: 'list',
  timeout: 45000,
});
