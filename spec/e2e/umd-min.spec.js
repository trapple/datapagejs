// @ts-check
import { test, expect } from '@playwright/test';

test.describe('DataPage UMD Minified Build', () => {
  test('should load and work correctly in minified UMD format', async ({
    page,
  }) => {
    await page.goto('/spec/fixtures/umd-min-test.html');

    await page.waitForFunction(
      () => {
        return window.getTestResults && window.getTestResults() !== null;
      },
      { timeout: 60000 }
    );

    const results = await page.evaluate(() => window.getTestResults());

    expect(results).toBeTruthy();
    expect(results.passed).toBeGreaterThan(0);
    expect(results.passed).toBe(results.total);

    const errorElements = await page.locator('.error').count();
    expect(errorElements).toBe(0);

    const hasDataPage = await page.evaluate(() => {
      return typeof window.DataPage === 'function';
    });
    expect(hasDataPage).toBe(true);
  });

  test('should have all camelCase API methods available in minified UMD', async ({
    page,
  }) => {
    await page.goto('/spec/fixtures/umd-min-test.html');

    const methodTests = await page.evaluate(() => {
      if (typeof window.DataPage !== 'function') {
        throw new Error(
          `DataPage is ${typeof window.DataPage}, not a function`
        );
      }
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

    for (const methodTest of methodTests) {
      expect(
        methodTest.exists,
        `Method ${methodTest.method} should exist`
      ).toBe(true);
    }
  });

  test('should produce identical results to non-minified UMD build', async ({
    page,
  }) => {
    await page.goto('/spec/fixtures/umd-min-test.html');

    const results = await page.evaluate(() => {
      const pager = new window.DataPage(317, 15, 5, 5);
      return {
        totalEntries: pager.totalEntries(),
        entriesPerPage: pager.entriesPerPage(),
        currentPage: pager.currentPage(),
        firstPage: pager.firstPage(),
        lastPage: pager.lastPage(),
        first: pager.first(),
        last: pager.last(),
        previousPage: pager.previousPage(),
        nextPage: pager.nextPage(),
        entriesOnThisPage: pager.entriesOnThisPage(),
        pageset: pager.pageset(),
        hasNextPageset: pager.hasNextPageset(),
        hasPreviousPageset: pager.hasPreviousPageset(),
      };
    });

    expect(results.totalEntries).toBe(317);
    expect(results.entriesPerPage).toBe(15);
    expect(results.currentPage).toBe(5);
    expect(results.firstPage).toBe(1);
    expect(results.lastPage).toBe(22);
    expect(results.first).toBe(61);
    expect(results.last).toBe(75);
    expect(results.previousPage).toBe(4);
    expect(results.nextPage).toBe(6);
    expect(results.entriesOnThisPage).toBe(15);
    expect(results.pageset).toEqual([3, 4, 5, 6, 7]);
    expect(results.hasNextPageset).toBe(true);
    expect(results.hasPreviousPageset).toBe(true);
  });
});
