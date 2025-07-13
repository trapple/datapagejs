// CommonJS import pattern tests
// vitestのglobalsを使用
const { describe, it, expect } = globalThis;

describe('CommonJS imports', () => {
  describe('require("datapage")', () => {
    it('should import DataPage class correctly', () => {
      const DataPage = require('../index.cjs');
      expect(typeof DataPage).toBe('function');
      
      const instance = new DataPage(100, 10, 1, 5);
      expect(instance.constructor.name).toBe('DataPage');
      expect(instance.currentPage()).toBe(1);
      expect(instance.totalEntries()).toBe(100);
      expect(instance.entriesPerPage()).toBe(10);
    });

    it('should work with all methods', () => {
      const DataPage = require('../index.cjs');
      const pager = new DataPage(50, 10, 3, 5);
      
      expect(pager.firstPage()).toBe(1);
      expect(pager.lastPage()).toBe(5);
      expect(pager.first()).toBe(21);
      expect(pager.last()).toBe(30);
      expect(pager.previousPage()).toBe(2);
      expect(pager.nextPage()).toBe(4);
      expect(pager.entriesOnThisPage()).toBe(10);
      expect(Array.isArray(pager.pageset())).toBe(true);
      expect(typeof pager.hasNextPageset()).toBe('boolean');
      expect(typeof pager.hasPreviousPageset()).toBe('boolean');
    });
  });

  describe('const { DataPage } = require("datapage")', () => {
    it('should import DataPage via destructuring', () => {
      const { DataPage } = require('../index.cjs');
      expect(typeof DataPage).toBe('function');
      
      const instance = new DataPage(200, 20, 2, 10);
      expect(instance.constructor.name).toBe('DataPage');
      expect(instance.currentPage()).toBe(2);
      expect(instance.totalEntries()).toBe(200);
      expect(instance.entriesPerPage()).toBe(20);
    });

    it('should have the same functionality as direct import', () => {
      const { DataPage } = require('../index.cjs');
      const DirectDataPage = require('../index.cjs');
      
      const instance1 = new DataPage(100, 10, 1, 5);
      const instance2 = new DirectDataPage(100, 10, 1, 5);
      
      expect(instance1.constructor).toBe(instance2.constructor);
      expect(instance1.currentPage()).toBe(instance2.currentPage());
    });
  });

  describe('require("datapage").default', () => {
    it('should import DataPage via .default property', () => {
      const DataPage = require('../index.cjs').default;
      expect(typeof DataPage).toBe('function');
      
      const instance = new DataPage(300, 15, 5, 7);
      expect(instance.constructor.name).toBe('DataPage');
      expect(instance.currentPage()).toBe(5);
      expect(instance.totalEntries()).toBe(300);
      expect(instance.entriesPerPage()).toBe(15);
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
      
      expect(instance1.currentPage()).toBe(instance2.currentPage());
      expect(instance2.currentPage()).toBe(instance3.currentPage());
      
      expect(instance1.pageset()).toEqual(instance2.pageset());
      expect(instance2.pageset()).toEqual(instance3.pageset());
    });
  });
});