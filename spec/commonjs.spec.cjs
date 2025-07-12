// CommonJS import pattern tests
const assert = require('assert');

// Simple test runner for CommonJS
function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function it(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.error(`    ${error.message}`);
    process.exit(1);
  }
}

function expect(actual) {
  return {
    toBe: (expected) => {
      assert.strictEqual(actual, expected);
    },
    toEqual: (expected) => {
      assert.deepStrictEqual(actual, expected);
    }
  };
}

describe('CommonJS imports', () => {
  describe('require("datapage")', () => {
    it('should import DataPage class correctly', () => {
      const DataPage = require('../index.cjs');
      expect(typeof DataPage).toBe('function');
      
      const instance = new DataPage(100, 10, 1, 5);
      expect(instance.constructor.name).toBe('DataPage');
      expect(instance.current_page()).toBe(1);
      expect(instance.total_entries()).toBe(100);
      expect(instance.entries_per_page()).toBe(10);
    });

    it('should work with all methods', () => {
      const DataPage = require('../index.cjs');
      const pager = new DataPage(50, 10, 3, 5);
      
      expect(pager.first_page()).toBe(1);
      expect(pager.last_page()).toBe(5);
      expect(pager.first()).toBe(21);
      expect(pager.last()).toBe(30);
      expect(pager.previous_page()).toBe(2);
      expect(pager.next_page()).toBe(4);
      expect(pager.entries_on_this_page()).toBe(10);
      expect(Array.isArray(pager.pageset())).toBe(true);
      expect(typeof pager.has_next_pageset()).toBe('boolean');
      expect(typeof pager.has_previous_pageset()).toBe('boolean');
    });
  });

  describe('const { DataPage } = require("datapage")', () => {
    it('should import DataPage via destructuring', () => {
      const { DataPage } = require('../index.cjs');
      expect(typeof DataPage).toBe('function');
      
      const instance = new DataPage(200, 20, 2, 10);
      expect(instance.constructor.name).toBe('DataPage');
      expect(instance.current_page()).toBe(2);
      expect(instance.total_entries()).toBe(200);
      expect(instance.entries_per_page()).toBe(20);
    });

    it('should have the same functionality as direct import', () => {
      const { DataPage } = require('../index.cjs');
      const DirectDataPage = require('../index.cjs');
      
      const instance1 = new DataPage(100, 10, 1, 5);
      const instance2 = new DirectDataPage(100, 10, 1, 5);
      
      expect(instance1.constructor).toBe(instance2.constructor);
      expect(instance1.current_page()).toBe(instance2.current_page());
    });
  });

  describe('require("datapage").default', () => {
    it('should import DataPage via .default property', () => {
      const DataPage = require('../index.cjs').default;
      expect(typeof DataPage).toBe('function');
      
      const instance = new DataPage(300, 15, 5, 7);
      expect(instance.constructor.name).toBe('DataPage');
      expect(instance.current_page()).toBe(5);
      expect(instance.total_entries()).toBe(300);
      expect(instance.entries_per_page()).toBe(15);
    });

    it('should be identical to direct import', () => {
      const DefaultDataPage = require('../index.cjs').default;
      const DirectDataPage = require('../index.cjs');
      
      expect(DefaultDataPage).toBe(DirectDataPage);
    });
  });

  describe('Cross-pattern consistency', () => {
    it('should create identical instances across all import patterns', () => {
      const DataPage1 = require('../index.cjs');
      const { DataPage: DataPage2 } = require('../index.cjs');
      const DataPage3 = require('../index.cjs').default;
      
      const instance1 = new DataPage1(100, 10, 3, 5);
      const instance2 = new DataPage2(100, 10, 3, 5);
      const instance3 = new DataPage3(100, 10, 3, 5);
      
      expect(instance1.constructor).toBe(instance2.constructor);
      expect(instance2.constructor).toBe(instance3.constructor);
      
      expect(instance1.current_page()).toBe(instance2.current_page());
      expect(instance2.current_page()).toBe(instance3.current_page());
      
      expect(instance1.pageset()).toEqual(instance2.pageset());
      expect(instance2.pageset()).toEqual(instance3.pageset());
    });
  });
});