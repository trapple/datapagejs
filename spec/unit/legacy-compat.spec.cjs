// vitestのglobalsを使用
const { describe, it, expect } = globalThis;

// 古いNode.js/バンドラーでのrequire()パターン動作確認テスト

describe('CommonJS Compatibility Tests (Modern API)', () => {
  
  it('should work with direct require pattern', () => {
    const DataPage = require('../../');
    const pager = new DataPage(100, 10, 3);
    
    expect(pager.firstPage()).toBe(1);
    expect(pager.currentPage()).toBe(3);
    expect(pager.first()).toBe(21);
    expect(pager.last()).toBe(30);
  });
  
  it('should work with destructuring require pattern', () => {
    const { DataPage } = require('../../');
    const pager = new DataPage(250, 20, 5);
    
    expect(pager.firstPage()).toBe(1);
    expect(pager.currentPage()).toBe(5);
    expect(pager.entriesPerPage()).toBe(20);
    expect(pager.totalEntries()).toBe(250);
  });
  
  it('should work with .default require pattern', () => {
    const DataPage = require('../../').default;
    const pager = new DataPage(300, 15, 2);
    
    expect(pager.firstPage()).toBe(1);
    expect(pager.lastPage()).toBe(20);
    expect(pager.first()).toBe(16);
    expect(pager.last()).toBe(30);
  });
  
  it('should work with modern API methods', () => {
    const DataPage = require('../../');
    const pager = new DataPage(500, 25, 10);
    
    // モダンAPIメソッドの動作確認
    expect(pager.totalEntries()).toBe(500);
    expect(pager.entriesPerPage()).toBe(25);
    expect(pager.currentPage()).toBe(10);
    
    // セッターメソッドの動作確認
    pager.totalEntries(600);
    expect(pager.totalEntries()).toBe(600);
  });
  
  it('should work consistently across all require patterns', () => {
    const DataPage1 = require('../../');
    const { DataPage: DataPage2 } = require('../../');
    const DataPage3 = require('../../').default;
    
    const pager1 = new DataPage1(100, 10, 5);
    const pager2 = new DataPage2(100, 10, 5);
    const pager3 = new DataPage3(100, 10, 5);
    
    // 全パターンで同じ結果が返ることを確認
    expect(pager1.pageset()).toEqual(pager2.pageset());
    expect(pager2.pageset()).toEqual(pager3.pageset());
    
    expect(pager1.first()).toBe(pager2.first());
    expect(pager2.first()).toBe(pager3.first());
    
    expect(pager1.last()).toBe(pager2.last());
    expect(pager2.last()).toBe(pager3.last());
  });
  
});