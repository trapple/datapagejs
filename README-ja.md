[![npm version](https://badge.fury.io/js/datapage.svg)](https://badge.fury.io/js/datapage)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![ES6](https://img.shields.io/badge/ES6-Class-green.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
[![License](https://img.shields.io/badge/License-Artistic-blue.svg)](LICENSE)

# DataPage.js - シンプルなページネーションデータオブジェクト

**[📖 English](README.md)**

## 概要

DataPage.jsはシンプルで軽量なページネーションライブラリです。TypeScript完全対応で、必要なページネーション機能をすべて提供する直感的なAPIを備えています。

### 基本的な使用方法

```javascript
// JavaScript
const pager = new DataPage(
  totalEntries,
  entriesPerPage,
  currentPage,
  pagesPerPageset
);
pager.firstPage(); // 1
pager.lastPage(); // 最終ページ番号
pager.first(); // このページの最初のエントリ番号
pager.last(); // このページの最後のエントリ番号
pager.pageset(); // [1,2,3,4,5...] ページセット配列
```

```typescript
// TypeScript
import DataPage, { DataPageType } from 'datapage';

const pager: DataPageType = new DataPage(300, 10, 2, 5);
const pageNumbers: number[] = pager.pageset();

// Modern camelCase API
console.log(pager.currentPage()); // 2
pager.totalEntries(400); // Set total entries
```

**デフォルト値:**

- `totalEntries`: 0
- `entriesPerPage`: 10
- `currentPage`: 1
- `pagesPerPageset`: 10

## インストール

### npm（推奨）

```bash
npm install datapage
```

### インポート方法

#### ES Modules（推奨）

```javascript
// デフォルトインポート（推奨）
import DataPage from 'datapage';

// TypeScript with 型定義
import DataPage, { DataPageType } from 'datapage';
// 型として使用する場合
const pager: DataPageType = new DataPage(100, 10, 1, 5);
```

#### CommonJS（レガシーサポート）

```javascript
// 全てのパターンをサポート:
const DataPage = require('datapage');
const { DataPage } = require('datapage');
const DataPage = require('datapage').default;
```

#### ブラウザ（UMD）

```html
<script src="path/to/datapage.min.js"></script>
<script>
  const pager = new DataPage(100, 10, 1, 5);
</script>
```

### TypeScript対応

TypeScript型定義が自動的に利用できます：

```typescript
import DataPage, { DataPageType } from 'datapage';

// 完全な型安全性
const pager: DataPageType = new DataPage(300, 10, 1, 5);
const currentPage: number = pager.currentPage();
const pageSet: number[] = pager.pageset();
```

### アーキテクチャ: インターフェースと実装の分離

DataPage.jsはインターフェースと実装の明確な分離に従っています：

- **`DataPageType` インターフェース**: ページネーション機能の公開契約
- **`DataPage` クラス**: プライベートフィールドと後方互換性を持つ具体的な実装

```typescript
// 公開インターフェースが完全な契約を定義
interface DataPageType {
  // コアページネーションメソッド（camelCase API）
  currentPage(val?: number): number;
  totalEntries(val?: number): number;
  entriesPerPage(val?: number): number;
  entriesOnThisPage(): number;
  firstPage(): number;
  lastPage(): number;
  first(): number;
  last(): number;
  previousPage(): number | undefined;
  nextPage(): number | undefined;
  pagesPerPageset(val?: number): number;
  pageset(): number[];
  hasNextPageset(): boolean;
  hasPreviousPageset(): boolean;

  // ユーティリティメソッド
  parseVal(val: any): number;
  parseUnsignedInt(val: any): number;
}

// 現代的なES6機能を使用した実装クラス
class DataPage implements DataPageType {
  // 真のカプセル化のための# 構文によるプライベートフィールド
  #totalEntries: number;
  #entriesPerPage: number;
  #currentPage: number;
  #pagesPerPageset: number;

  constructor(
    totalEntries?: number,
    entriesPerPage?: number,
    currentPage?: number,
    pagesPerPageset?: number
  ) {
    // Implementation details...
  }

  // Modern camelCase API methods
  currentPage(val?: number): number {
    /* ... */
  }
  totalEntries(val?: number): number {
    /* ... */
  }
  // ... other methods
}

// クリーンなエクスポート
export default DataPage;
export type { DataPageType };
```

この設計により、以下のような利点があります：

- **型安全性**: インターフェースによる明確な契約
- **カプセル化**: プライベートフィールドによるデータ整合性の保証
- **モダンAPI**: JavaScript標準に準拠したcamelCase メソッド名
- **保守性**: 実装がインターフェースから独立して進化可能
- **現代的なJavaScript**: ES6+機能およびES2022プライベートフィールドを活用

## APIリファレンス

### コンストラクタ

```typescript
new DataPage()
new DataPage(totalEntries: number, entriesPerPage?: number, currentPage?: number, pagesPerPageset?: number)
```

**パラメータ:**

- `totalEntries`: 総エントリ数（デフォルト: 0）
- `entriesPerPage`: 1ページあたりのエントリ数（デフォルト: 10）
- `currentPage`: 現在のページ番号（デフォルト: 1）
- `pagesPerPageset`: ページセットあたりのページ数（デフォルト: 10）

```typescript
// 例
const pager = new DataPage(300, 10, 1, 5);
```

### entriesPerPage(val?: number): number

1ページあたりのエントリ数を設定または取得します。

```typescript
// 設定
pager.entriesPerPage(15);
// 取得
const entriesPerPage: number = pager.entriesPerPage();
```

### currentPage(val?: number): number

現在のページ番号を設定または取得します。

```typescript
// 設定
pager.currentPage(2);
// 取得
const currentPage: number = pager.currentPage();
```

### totalEntries(val?: number): number

総エントリ数を設定または取得します。

```typescript
// 設定
pager.totalEntries(300);
// 取得
const totalEntries: number = pager.totalEntries();
```

### entriesOnThisPage(): number

現在のページのエントリ数を返します。

```typescript
// 通常ページの場合
const pager = new DataPage(300, 10, 2, 5);
pager.entriesOnThisPage(); // 10 を返す

// 最終ページで端数がある場合
const pager2 = new DataPage(317, 10, 32, 5);
pager2.entriesOnThisPage(); // 7 を返す
```

### firstPage(): number

常に 1 を返します。

```typescript
pager.firstPage(); // 1
```

### lastPage(): number

最終ページ番号を返します。

```typescript
const pager = new DataPage(500, 30, 1);
pager.lastPage(); // 17 を返す
```

### first(): number

現在のページの最初のエントリ番号を返します。

```typescript
const pager = new DataPage(100, 10, 3);
pager.first(); // 21 を返す
```

### last(): number

現在のページの最後のエントリ番号を返します。

```typescript
const pager = new DataPage(100, 10, 3);
pager.last(); // 30 を返す
```

### previousPage(): number | undefined

前のページ番号を返します。最初のページの場合は `undefined` を返します。

```typescript
const pager = new DataPage(100, 10, 3);
pager.previousPage(); // 2 を返す

const pager2 = new DataPage(100, 10, 1);
pager2.previousPage(); // undefined を返す
```

### nextPage(): number | undefined

次のページ番号を返します。最終ページの場合は `undefined` を返します。

```typescript
const pager = new DataPage(100, 10, 3);
pager.nextPage(); // 4 を返す

const pager2 = new DataPage(100, 10, 10);
pager2.nextPage(); // undefined を返す
```

### pagesPerPageset(val?: number): number

ページセットあたりのページ数を設定または取得します。

```typescript
// 設定
pager.pagesPerPageset(5);
// 取得
const pagesPerPageset: number = pager.pagesPerPageset();
```

### pageset(): number[]

現在のページセットのページ番号配列を返します。

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.pageset(); // [5, 6, 7, 8, 9] を返す
```

### hasNextPageset(): boolean

次のページセットが存在するかどうかを返します。

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.hasNextPageset(); // true または false を返す
```

### hasPreviousPageset(): boolean

前のページセットが存在するかどうかを返します。

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.hasPreviousPageset(); // true または false を返す
```

## 機能

- 🔧 **完全なTypeScript対応**: 完全な型定義を含む
- 🏗️ **クリーンアーキテクチャ**: 保守性を向上させるインターフェースと実装の分離
- 🎯 **ES6クラス**: プライベートフィールドを持つ現代的なES6クラス構文
- 📦 **複数フォーマット**: UMD、ES Modules、CommonJSサポート
- 🧪 **十分にテスト済み**: 36のユニットテストと6のブラウザテストによる包括的なテストスイート
- 🌐 **ブラウザテスト済み**: Playwrightによるマルチブラウザテスト（Chromium、Firefox、WebKit）
- 🚀 **モダンAPI**: JavaScript標準に準拠したcamelCase命名規約
- 📊 **ソースマップ**: 全ビルドでソースマップサポート
- 🎣 **品質保証**: ESLintとPrettierによるpre-commitフック
- 🚀 **軽量**: minified版は4KBのみ

## ブラウザサポート

- **モダンブラウザ**: Chrome、Firefox、Safari、Edge（ES6+機能）
- **レガシーサポート**: IE11+（UMDビルド経由）
- **Node.js**: 18+ LTS

## ビルド出力

ライブラリは異なる環境をサポートするために複数の形式でビルドされます：

```text
dist/datapage.js         # UMD形式（ユニバーサル、IE11+対応）
dist/datapage.min.js     # UMD形式 minified（本番用）
dist/datapage.esm.js     # ES Module形式（モダンバンドラー用）
dist/datapage.d.ts       # TypeScript型定義
dist/*.map               # 全形式のソースマップ
```

**形式の詳細:**

- **UMD (`datapage.js`)**: 幅広い互換性のためのUniversal Module Definition
- **UMD Minified (`datapage.min.js`)**: 本番用の圧縮版
- **ES Module (`datapage.esm.js`)**: バンドラー用のモダンES6モジュール形式

## 開発

```bash
# 依存関係のインストール
npm install

# 全テスト実行（ユニット + ブラウザ）
npm test

# ユニットテストのみ実行
npm run test:unit

# ブラウザテストのみ実行
npm run test:browser

# カバレッジ付きテスト実行
npm run test:coverage

# 全形式ビルド
npm run build

# 開発モード（lint + test + build）
npm run dev

# コード整形
npm run format

# リント
npm run lint:fix
```

## 参照

このソフトウェアは [Data::Page](http://search.cpan.org/~lbrocard/Data-Page/lib/Data/Page.pm) から移植されました。

## 著作権

© 2014 trapple

## ライセンス

"Artistic License"
