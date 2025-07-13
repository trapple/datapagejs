// @ts-check
import { test, expect } from '@playwright/test';

test.describe('DataPage UMD Build', () => {
  test('should load and work correctly in UMD format', async ({ page }) => {
    // Navigate to UMD test page
    await page.goto('/spec/fixtures/umd-test.html');

    // Debug: Check if DataPage is loaded
    const debugInfo = await page.evaluate(() => {
      return {
        hasDataPage: typeof window.DataPage !== 'undefined',
        dataPageType: typeof window.DataPage,
        windowKeys: Object.keys(window).filter((key) => key.includes('Data')),
        errors: window.console?.errors || 'No console errors tracked',
      };
    });
    console.log('UMD Debug Info:', debugInfo);

    // Wait for tests to complete
    await page.waitForFunction(
      () => {
        return window.getTestResults && window.getTestResults() !== null;
      },
      { timeout: 60000 }
    );

    // Check test results
    const results = await page.evaluate(() => window.getTestResults());

    // Assert all tests passed
    expect(results).toBeTruthy();
    expect(results.passed).toBeGreaterThan(0);
    expect(results.passed).toBe(results.total);

    // Verify specific functionality
    const testSummary = await page.textContent('#test-summary');
    expect(testSummary).toBeDefined();

    // Check for any error states
    const errorElements = await page.locator('.error').count();
    expect(errorElements).toBe(0);

    // Verify that DataPage is available globally
    const hasDataPage = await page.evaluate(() => {
      return typeof window.DataPage === 'function';
    });
    expect(hasDataPage).toBe(true);
  });

  test('should have all camelCase API methods available in UMD', async ({
    page,
  }) => {
    await page.goto('/spec/fixtures/umd-test.html');

    // Test that all expected camelCase methods exist
    const methodTests = await page.evaluate(() => {
      const pager = new window.DataPage(100, 10, 1, 5);
      const methods = [
        'totalEntries',
        'entriesPerPage',
        'currentPage',
        'entriesOnThisPage',
        'firstPage',
        'lastPage',
        'first',
        'last',
        'previousPage',
        'nextPage',
        'pagesPerPageset',
        'pageset',
        'hasNextPageset',
        'hasPreviousPageset',
        'parseVal',
        'parseUnsignedInt',
      ];

      return methods.map((method) => ({
        method,
        exists: typeof pager[method] === 'function',
      }));
    });

    // Verify all methods exist
    for (const methodTest of methodTests) {
      expect(
        methodTest.exists,
        `Method ${methodTest.method} should exist`
      ).toBe(true);
    }
  });

  test('should work with different browser contexts', async ({ page }) => {
    await page.goto('/spec/fixtures/umd-test.html');

    // Test in main context
    const mainContextResult = await page.evaluate(() => {
      const pager = new window.DataPage(50, 5, 2);
      return {
        totalEntries: pager.totalEntries(),
        currentPage: pager.currentPage(),
        lastPage: pager.lastPage(),
      };
    });

    expect(mainContextResult.totalEntries).toBe(50);
    expect(mainContextResult.currentPage).toBe(2);
    expect(mainContextResult.lastPage).toBe(10);
  });
});
