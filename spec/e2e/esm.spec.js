// @ts-check
import { test, expect } from '@playwright/test';

test.describe('DataPage ESM Build', () => {
  test('should load and work correctly in ESM format', async ({ page }) => {
    // Navigate to ESM test page
    await page.goto('/spec/fixtures/esm-test.html');

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

    // Check for any error states
    const errorElements = await page.locator('.error').count();
    expect(errorElements).toBe(0);
  });

  test('should properly import as ES module', async ({ page }) => {
    await page.goto('/spec/fixtures/esm-test.html');

    // Verify ES module import worked
    const moduleImportTest = await page.evaluate(async () => {
      try {
        // Try dynamic import
        const { default: DataPageDynamic } = await import(
          '../../dist/datapage.esm.js'
        );
        const pager = new DataPageDynamic(200, 20, 3);

        return {
          success: true,
          totalEntries: pager.totalEntries(),
          entriesPerPage: pager.entriesPerPage(),
          currentPage: pager.currentPage(),
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    });

    expect(moduleImportTest.success).toBe(true);
    expect(moduleImportTest.totalEntries).toBe(200);
    expect(moduleImportTest.entriesPerPage).toBe(20);
    expect(moduleImportTest.currentPage).toBe(3);
  });

  test('should maintain clean module scope', async ({ page }) => {
    await page.goto('/spec/fixtures/esm-test.html');

    // Verify that ESM doesn't pollute global scope
    const globalScopeTest = await page.evaluate(() => {
      // DataPage should not be available globally in ESM
      return typeof window.DataPage === 'undefined';
    });

    expect(globalScopeTest).toBe(true);
  });

  test('should support tree-shaking compatible exports', async ({ page }) => {
    await page.goto('/spec/fixtures/esm-test.html');

    // Test that the module has proper exports structure
    const exportTest = await page.evaluate(async () => {
      const module = await import('../../dist/datapage.esm.js');

      return {
        hasDefaultExport: typeof module.default === 'function',
        defaultIsConstructor: module.default.name === 'DataPage',
        hasNamedExports: Object.keys(module).length > 1,
      };
    });

    expect(exportTest.hasDefaultExport).toBe(true);
    expect(exportTest.defaultIsConstructor).toBe(true);
  });
});
