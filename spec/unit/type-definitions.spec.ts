// 型定義ファイルの検証テスト
import DataPage, { DataPageType } from '../../src/datapage.js';

describe('TypeScript Type Definitions', () => {
  it('should have correct interface types', () => {
    const pager: DataPageType = new DataPage(100, 10, 1, 5);

    // 型推論の検証（コンパイル時チェック）
    const totalEntries: number = pager.totalEntries();
    const entriesPerPage: number = pager.entriesPerPage();
    const currentPage: number = pager.currentPage();
    const firstPage: number = pager.firstPage();
    const lastPage: number = pager.lastPage();
    const previousPage: number | undefined = pager.previousPage();
    const nextPage: number | undefined = pager.nextPage();
    const pagesPerPageset: number = pager.pagesPerPageset();
    const entriesOnThisPage: number = pager.entriesOnThisPage();
    const pageset: number[] = pager.pageset();
    const hasNextPageset: boolean = pager.hasNextPageset();
    const hasPreviousPageset: boolean = pager.hasPreviousPageset();

    // 実際の値の検証
    expect(typeof totalEntries).toBe('number');
    expect(typeof entriesPerPage).toBe('number');
    expect(typeof currentPage).toBe('number');
    expect(typeof firstPage).toBe('number');
    expect(typeof lastPage).toBe('number');
    expect(typeof pagesPerPageset).toBe('number');
    expect(typeof entriesOnThisPage).toBe('number');
    expect(Array.isArray(pageset)).toBe(true);
    expect(typeof hasNextPageset).toBe('boolean');
    expect(typeof hasPreviousPageset).toBe('boolean');

    // previousPage/nextPageはundefinedまたはnumber
    expect(previousPage === undefined || typeof previousPage === 'number').toBe(
      true
    );
    expect(nextPage === undefined || typeof nextPage === 'number').toBe(true);
  });

  it('should support method chaining with setter methods', () => {
    const pager: DataPageType = new DataPage();

    // セッターメソッドの戻り値型チェック
    const result1: number = pager.totalEntries(200);
    const result2: number = pager.entriesPerPage(20);
    const result3: number = pager.currentPage(2);
    const result4: number = pager.pagesPerPageset(10);

    expect(typeof result1).toBe('number');
    expect(typeof result2).toBe('number');
    expect(typeof result3).toBe('number');
    expect(typeof result4).toBe('number');
  });

  it('should work with constructor parameter types', () => {
    // コンストラクタのオプショナル引数の型チェック
    const pager1: DataPageType = new DataPage();
    const pager2: DataPageType = new DataPage(100);
    const pager3: DataPageType = new DataPage(100, 10);
    const pager4: DataPageType = new DataPage(100, 10, 1);
    const pager5: DataPageType = new DataPage(100, 10, 1, 5);

    expect(pager1).toBeInstanceOf(DataPage);
    expect(pager2).toBeInstanceOf(DataPage);
    expect(pager3).toBeInstanceOf(DataPage);
    expect(pager4).toBeInstanceOf(DataPage);
    expect(pager5).toBeInstanceOf(DataPage);
  });

  it('should have correct export types', () => {
    // デフォルトエクスポートの型チェック
    expect(typeof DataPage).toBe('function');
    expect(DataPage.name).toBe('DataPage');

    // インスタンスの型チェック
    const instance = new DataPage();
    expect(instance).toBeInstanceOf(DataPage);
    expect(instance.constructor).toBe(DataPage);
  });

  it('should work with all camelCase method names', () => {
    const pager = new DataPage(100, 10, 5, 5);

    // 全キャメルケースメソッドが存在することを確認
    expect(typeof pager.totalEntries).toBe('function');
    expect(typeof pager.entriesPerPage).toBe('function');
    expect(typeof pager.currentPage).toBe('function');
    expect(typeof pager.firstPage).toBe('function');
    expect(typeof pager.lastPage).toBe('function');
    expect(typeof pager.previousPage).toBe('function');
    expect(typeof pager.nextPage).toBe('function');
    expect(typeof pager.pagesPerPageset).toBe('function');
    expect(typeof pager.entriesOnThisPage).toBe('function');
    expect(typeof pager.pageset).toBe('function');
    expect(typeof pager.hasNextPageset).toBe('function');
    expect(typeof pager.hasPreviousPageset).toBe('function');
    expect(typeof pager.first).toBe('function');
    expect(typeof pager.last).toBe('function');
  });

  it('should not have old snake_case methods', () => {
    const pager = new DataPage() as any;

    // 古いスネークケースメソッドが存在しないことを確認
    expect(pager.total_entries).toBeUndefined();
    expect(pager.entries_per_page).toBeUndefined();
    expect(pager.current_page).toBeUndefined();
    expect(pager.first_page).toBeUndefined();
    expect(pager.last_page).toBeUndefined();
    expect(pager.previous_page).toBeUndefined();
    expect(pager.next_page).toBeUndefined();
    expect(pager.pages_per_pageset).toBeUndefined();
    expect(pager.entries_on_this_page).toBeUndefined();
    expect(pager.has_next_pageset).toBeUndefined();
    expect(pager.has_previous_pageset).toBeUndefined();
  });
});
