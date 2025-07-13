// 型定義ファイルの検証用テスト
import DataPage from './dist/datapage.esm.js';
import type { DataPageType } from './dist/datapage.d.ts';

// 型チェック用のテスト関数
function testTypeDefinitions() {
  // インスタンス作成
  const pager: DataPageType = new DataPage(100, 10, 1, 5);
  
  // キャメルケースメソッドの型チェック
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
  
  // セッターメソッドの型チェック
  pager.totalEntries(200);
  pager.entriesPerPage(20);
  pager.currentPage(2);
  pager.pagesPerPageset(10);
  
  console.log('✅ 型定義ファイルの検証完了');
}

testTypeDefinitions();