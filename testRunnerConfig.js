import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default {
  files: 'src/tests/**/*.test.js',
  nodeResolve: true,
  coverage: true,
  browsers: [
    puppeteerLauncher(),
  ],
  testFramework: {
    config: {
      timeout: '3000'
    }
  }
};
