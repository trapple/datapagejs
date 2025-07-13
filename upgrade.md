# DataPage.js アップグレード計画

## 現状の問題点

### 1. 依存関係の問題

- **Grunt v0.4.4** (2014年) - 最新版は v1.6.1 (2023年)
- **Karma v0.12.9** (2014年) - 最新版は v6.4.2 (2023年)
- **PhantomJS** - 2018年に開発中止、セキュリティ脆弱性あり
- **JSHint** - ESLintがより機能豊富で主流に

### 2. 廃止された技術

- **Bower** - 2017年に開発終了、npmが標準に
- **PhantomJS** - 2018年に開発中止、Chrome Headlessに置き換え推奨

### 3. 古いプラクティス

- ES5構文のみ
- UMDパターン（現在はES Modules + CJS両対応が標準）
- 手動のコード品質チェック

## アップグレード計画

### Phase 1: 基盤の現代化 ✅

1. **Node.js環境の更新** ✅
   - Node.js 18+ LTS対応 ✅
   - package.jsonのengines設定追加 ✅

2. **ビルドツールの移行** ✅
   - **Phase 1.2a**: JSHint → ESLint + Prettier ✅
   - **Phase 1.2b**: Karma + PhantomJS → Vitest ✅
   - **Phase 1.2c**: Grunt → Vite/Rollup ✅

   **現在のGruntタスク分析:**
   - `grunt dev`: jshint → jsbeautifier → karma → concat
   - `grunt dist`: dev → uglify
   - `grunt` (default): watch (ファイル変更監視)

   **各タスクの役割:**
   - jshint: コード品質チェック
   - jsbeautifier: コード整形
   - karma: テスト実行（PhantomJS使用）
   - concat: src/datapage.js → dist/datapage.js（バナー付きコピー）
   - uglify: dist/datapage.js → dist/datapage.min.js（圧縮版生成）
   - watch: ファイル変更監視と自動ビルド

   **Phase 1.2詳細分割:**

   **Phase 1.2a: JSHint → ESLint + Prettier** ✅
   - 作業内容: JSHint削除、ESLint + Prettierインストール、設定ファイル作成
   - リスク: 低（既存ビルドに影響なし）
   - 完了: eslint.config.js、.prettierrc作成、package.jsonスクリプト追加

   **Phase 1.2b: Karma + PhantomJS → Vitest** ✅
   - 作業内容: Karma・PhantomJS削除、Vitestインストール、テスト設定移行
   - リスク: 中（テスト実行環境の変更）
   - 完了: vitest.config.js作成、ES Module対応テストファイル（datapage.esm.js）作成
   - 注意: 一時的にUMD（datapage.js）とESM（datapage.esm.js）の2ファイル構成

   **Phase 1.2c: Grunt → Vite/Rollup** ✅
   - 作業内容: Gruntタスク完全置き換え、ビルド設定作成、出力互換性確保
   - リスク: 高（ビルドプロセス全体の変更）
   - 完了: vite.config.js、rollup.config.js作成、package.json更新、Grunt依存関係削除
   - 出力: UMD（datapage.js）、minified（datapage.min.js）、ESM（datapage.esm.js）の3形式対応
   - 新ビルドコマンド: `npm run build`（Rollup）、`npm run dev`（lint+test+build）

3. **依存関係の整理** ✅
   - Bower完全削除（bower.json削除） ✅
   - 全devDependenciesの最新版への更新 ✅
   - セキュリティ脆弱性の解消 ✅

### Phase 2: コードの現代化

#### Phase 2.1: ES Modules対応（詳細分割）

**Phase 2.1a: TypeScript環境セットアップ** ✅

- リスク: 低（既存コードに影響なし）
- 作業内容:
  - TypeScript + 型定義ファイルのインストール ✅
  - tsconfig.json作成 ✅
  - package.json の型定義エントリ追加 ✅
- 成果物: TypeScript開発環境の構築 ✅

**Phase 2.1b: 現在のコードの段階的TypeScript化** ✅

- リスク: 中（既存APIは完全維持）
- 作業内容:
  - `src/datapage.js` → `src/datapage.ts` への変換 ✅
  - UMDパターンを維持しながら型定義を追加 ✅
  - コンストラクタ関数の型安全化 ✅
- 成果物: 型安全なDataPageクラス（API互換性維持） ✅

**Phase 2.1c: ES6 Class構文への移行** ✅

- リスク: 高（コード構造の大幅変更）
- 作業内容:
  - プロトタイプベースから `class DataPage` への変換 ✅
  - メソッドの型定義追加 ✅
  - プライベートフィールドの導入（#記法） ✅
- 成果物: 現代的なES6クラス実装 ✅

**Phase 2.1d: ビルド設定の調整** ✅

- リスク: 中（ビルドプロセスの変更）
- 作業内容:
  - Rollupの設定でTypeScriptサポート追加 ✅
  - 型定義ファイル（.d.ts）の自動生成 ✅
  - 複数出力形式の維持（UMD + ESM + minified） ✅
  - ソースマップ生成対応 ✅
  - ビルド警告98%減少 ✅
- 成果物: TypeScript対応ビルドシステム ✅

**Phase 2.1e: テストの型安全化** ✅

- リスク: 低（テスト品質向上）
- 作業内容:
  - `spec/datapage.spec.js` → `spec/datapage.spec.ts` への変換 ✅
  - 型チェック付きテストの作成 ✅
  - ESLint TypeScript対応設定 ✅
  - UMD/ESM互換性問題の解決 ✅
- 成果物: 型安全なテストスイート ✅

#### Phase 2.3: 追加機能

- Jasmine → Vitest ✅（完了済み）
- ブラウザテストの追加（Playwright）
- pre-commit hooks (husky)

#### Phase 2.4: コード品質向上

- ESLint設定 ✅（完了済み）
- Prettier設定 ✅（完了済み）

### Phase 3: 機能拡張

1. **Tree-shaking対応**
   - ES Modules形式での配布
   - 個別メソッドのimport対応

2. **TypeScript完全対応**
   - TypeScriptで書き直し
   - 型定義ファイルの生成

3. **CI/CD整備**
   - GitHub Actions
   - 自動テスト・ビルド・リリース

## 実装優先度

### 高優先度（セキュリティ・互換性）

1. PhantomJS除去
2. 依存関係の脆弱性修正
3. Node.js最新LTS対応

### 中優先度（開発体験）

1. ビルドツール移行
2. TypeScript導入
3. 現代的なテストフレームワーク

### 低優先度（機能拡張）

1. 追加機能の実装
2. パフォーマンス最適化
3. ドキュメント拡充

## 移行スケジュール

### Week 1-2: 基盤整備

- 依存関係の更新
- ビルドツールの移行
- テスト環境の構築

### Week 3-4: コード移行

- TypeScript導入
- ES Modules化
- テストの書き直し

### Week 5-6: 品質向上

- CI/CD設定
- ドキュメント更新
- パフォーマンステスト

## 後方互換性の維持

- 既存のAPI仕様を完全に維持
- UMD形式での配布も継続
- 段階的な移行をサポート

## 最終目標

現代的なJavaScriptライブラリとして：

- TypeScript完全対応
- ES Modules + CommonJS両対応
- 自動テスト・ビルド・リリース
- 優れた開発者体験
- 継続的なメンテナンス体制

## Phase 2での改善予定

### モジュール形式の統一

現在の2ファイル構成（UMD + ESM）を以下のように改善予定：

1. **TypeScript化** → ビルド時に複数形式を自動生成
2. **Vite/Rollup** → UMD + ESM + CJS の自動ビルド
3. **package.json** → `"main"`（CJS）、`"module"`（ESM）、`"browser"`（UMD）の分離

これにより、テスト用の一時的なdatapage.esm.jsファイルは不要になります。

## 現在の進捗（2024年末時点）

### ✅ 完了済み - Phase 1: 基盤の現代化

**Phase 1.1: Node.js環境の更新**

- Node.js 18+ LTS対応
- package.jsonのengines設定追加

**Phase 1.2: ビルドツールの移行**

- **1.2a**: JSHint → ESLint + Prettier
- **1.2b**: Karma + PhantomJS → Vitest
- **1.2c**: Grunt → Vite/Rollup

**Phase 1.3: 依存関係の整理**

- Bower完全削除（bower.json削除）
- devDependencies最新版更新
- セキュリティ脆弱性完全解消

**成果:**

- 🚫 PhantomJS完全除去（セキュリティリスク解消）
- 🚫 Bower完全削除（レガシー依存関係解消）
- 🔧 現代的なビルドシステム（Vite + Rollup）
- 🧪 高速テスト環境（Vitest）
- 📦 複数出力形式対応（UMD、ESM、minified）
- ✨ コード品質ツール（ESLint + Prettier）

**新しい開発コマンド:**

```bash
npm run build        # 統合ビルド（types + rollup）
npm run build:types  # TypeScript型定義ファイル生成
npm run build:rollup # Rollupビルド（全形式）
npm run dev          # lint + test + build
npm run test         # Vitestテスト実行
npm run lint:fix     # ESLint自動修正
npm run format       # Prettier整形
```

**ビルド出力品質:**

- UMD: 11.5KB（完全互換、ソースマップ付き）
- ESM: 10.3KB（モダンブラウザ対応）
- minified: 4.0KB（本番用、バナー保持）
- 型定義: 1.1KB（TypeScript開発者向け）

### 🎯 次のステップ - Phase 2: コードの現代化

#### 推奨実行順序

**Phase 2.1: ES Modules対応（段階的実施）** ✅

1. **Phase 2.1a**: TypeScript環境セットアップ（リスク：低） ✅
2. **Phase 2.1b**: 段階的TypeScript化（リスク：中） ✅
3. **Phase 2.1c**: ES6 Class構文移行（リスク：高） ✅
4. **Phase 2.1d**: ビルド設定調整（リスク：中） ✅
5. **Phase 2.1e**: テストの型安全化（リスク：低） ✅

**Phase 2.2: モダンJS命名規約への移行** ✅

- snake_case → camelCase API移行（TDD方式）
- v2.0.0リリース（破壊的変更）
- ドキュメント完全同期

**Phase 2.3: ブラウザテスト完全実装** ✅

- ブラウザテストの追加（Playwright） ✅
- テストファイル構造の整理（Vitest/Playwright分離） ✅
- pre-commit hooks (husky) ✅

**Phase 2.4: コード統一** ✅

- 一時的な2ファイル構成（datapage.js + datapage.esm.js）の解消 ✅
- 単一ソースからの多形式出力 ✅

**Phase 2.5: CI/CD整備**

- GitHub Actions設定
- 自動テスト・ビルド・リリース

## Phase 2.1 完了記録 - TypeScript + ES6 現代化

### ✅ 達成した成果（2025年1月）

**技術的アップグレード:**

- 🔧 **TypeScript完全導入**: JavaScript → TypeScript移行完了
- 🎯 **ES6 Class構文**: prototype → class構文移行完了
- 🔒 **Private Fields**: ES6プライベートフィールド（#記法）導入
- 📦 **型定義自動生成**: .d.ts + .d.ts.mapファイル対応
- 🧪 **型安全テスト**: 全18テストが型安全環境で実行
- 🔍 **ESLint TypeScript**: TypeScript専用lint規則適用

**ビルドシステム改善:**

- 📊 **ソースマップ対応**: 全出力形式でソースマップ生成
- ⚠️ **警告大幅削減**: UMD警告を context: 'this' で解決
- 🏗️ **Rollup TypeScript**: @rollup/plugin-typescript統合
- 🔄 **ESM/UMD互換**: 完全な後方互換性維持

**品質保証:**

- ✅ **全テスト通過**: 18/18テストが型安全環境で正常動作
- 🎯 **型チェック**: コンパイル時型エラー検出
- 📝 **インターフェース定義**: DataPageType型で完全な型安全性
- 🔧 **開発体験**: IDEでの自動補完・型ヒント対応

**ファイル構成（Phase 2.1完了時点）:**

```
src/datapage.ts          # TypeScript ES6 Class実装
spec/datapage.spec.ts    # 型安全テストスイート
dist/datapage.js         # UMD版（IE11+対応）
dist/datapage.esm.js     # ES Module版
dist/datapage.min.js     # 本番用minified版
dist/datapage.d.ts       # TypeScript型定義
dist/*.map               # 全形式ソースマップ
```

**型安全性の詳細:**

- DataPageType インターフェース定義
- 全メソッドの戻り値型指定
- オプショナル引数の型安全性
- プライベートフィールドの完全encapsulation
- as any キャストによる適切な型アサーション（テスト用）

**互換性保証（Phase 2.1時点）:**

- 既存JavaScript APIの100%互換性維持
- UMDパターンでのブラウザ・Node.js両対応
- ES6 Private Fields + getter/setter による後方互換アクセス

**注意：Phase 2.2で破壊的変更実施**
Phase 2.2（v2.0.0）では、モダンJS命名規約への移行により、上記の後方互換性は廃止されました。

## Phase 2.2: モダンJS命名規約への移行

### 🎯 現在の課題

現在のDataPageクラスは機能的には現代化されましたが、APIの命名がモダンなJavaScriptの標準と異なります：

**問題のある命名パターン:**

- スネークケースメソッド名（`entries_per_page()` など）
- アンダースコアプレフィックス付きプロパティ（`_total_entries` など）
- 一般的でない命名規則

### 📋 移行対象一覧

#### 1. メソッド名の変更（スネークケース → キャメルケース）

| 現在                     | 変更後                 |
| ------------------------ | ---------------------- |
| `entries_per_page()`     | `entriesPerPage()`     |
| `current_page()`         | `currentPage()`        |
| `total_entries()`        | `totalEntries()`       |
| `first_page()`           | `firstPage()`          |
| `last_page()`            | `lastPage()`           |
| `previous_page()`        | `previousPage()`       |
| `next_page()`            | `nextPage()`           |
| `pages_per_pageset()`    | `pagesPerPageset()`    |
| `entries_on_this_page()` | `entriesOnThisPage()`  |
| `has_next_pageset()`     | `hasNextPageset()`     |
| `has_previous_pageset()` | `hasPreviousPageset()` |

#### 2. プロパティ名の変更（アンダースコア → キャメルケース）

| 現在                 | 変更後            |
| -------------------- | ----------------- |
| `_total_entries`     | `totalEntries`    |
| `_entries_per_page`  | `entriesPerPage`  |
| `_current_page`      | `currentPage`     |
| `_pages_per_pageset` | `pagesPerPageset` |

#### 3. 内部実装の統一

- 内部変数名をキャメルケースに統一
- プライベートフィールド（`#`）の命名も統一
- TypeScript型定義の更新

### 🚀 実装戦略

#### 🎯 採用戦略: Phase 2.2b - 破壊的変更による一気移行

**方針決定理由:**

- メジャーバージョンアップ（v2.0.0）での実施
- 段階的移行期間を設けずに一気に変更
- 明確で分かりやすいAPI仕様への統一

#### 実装内容

1. **API名の完全変更**
   - スネークケースメソッド → キャメルケースメソッド
   - アンダースコアプレフィックスプロパティ → キャメルケースプロパティ
   - **古いAPIは完全削除（Phase 2.1の後方互換性も廃止）**

2. **メジャーバージョンアップ**
   - semverに従い、メジャーバージョンを上げる（v2.0.0）
   - BREAKING CHANGESをCHANGELOGに明記
   - 移行ガイドを提供
   - **注意：v1.xからv2.0.0への移行には必ずコード変更が必要**

### 📋 実装チェックリスト

#### Phase 2.2b: 破壊的変更による一気移行（TDD方式採用）

**🔴 Red Phase: テスト先行変更**

1. ✅ テストファイルを新しいキャメルケースAPI仕様に更新（Red状態作成）
2. ✅ テスト実行で失敗を確認（Red状態確認）

**🟢 Green Phase: 実装変更** 3. ✅ TypeScript型定義（DataPageType）をキャメルケース命名に更新4. ✅ DataPageクラスのメソッド名をキャメルケースに変更5. ✅ DataPageクラスのプロパティ名をキャメルケースに変更  
6. ✅ 内部変数名をキャメルケースに統一 7. ✅ テスト実行で成功を確認（Green状態確認）

**🔵 Blue Phase: 仕上げ** 8. ✅ ビルドとテストの実行確認9. ✅ 型定義ファイル（.d.ts）の更新確認10. ✅ package.jsonバージョン更新（v2.0.0）11. ✅ CHANGELOGの更新

### 🧪 テスト戦略（TDD方式）

**Red → Green → Refactor サイクル**

1. **Red Phase: テスト先行**
   - 新しいキャメルケースAPIを使用するテストを作成
   - テスト実行して意図的に失敗させる（Red状態）
   - 失敗理由が期待通り（メソッド未定義エラーなど）であることを確認

2. **Green Phase: 最小実装**
   - テストを通すための最小限の実装変更
   - 全テストが通ることを確認（Green状態）
   - 機能的な動作確認

3. **Refactor Phase: 品質向上**
   - コードの整理・最適化
   - 型安全性の確認
   - ビルドテスト（UMD、ESM、minified版の正常生成確認）
   - 型定義ファイルの正常生成確認

### 📦 リリース計画

1. **v2.0.0**: 破壊的変更による一気移行
   - 新しいキャメルケースAPI
   - 完全なTypeScript対応
   - 詳細な移行ガイド提供

### 📖 ユーザー向けドキュメント

#### 移行ガイド作成予定

- 新しいAPIの使用方法
- 段階的移行の手順
- 破壊的変更の詳細説明
- 移行期間中のサポート情報

### 🎯 期待される効果

1. **開発者体験の向上**
   - モダンなJavaScript命名規約に準拠
   - IDEでの自動補完がより直感的に

2. **コード保守性の向上**
   - 一貫性のある命名規則
   - TypeScriptとの親和性向上

3. **ライブラリの現代化**
   - 2025年の標準に完全対応
   - 新規プロジェクトでの採用促進

## Phase 2.2 完了記録 - モダンJS命名規約移行

### ✅ 完了済み（2025年7月）

**🎯 破壊的変更による一気移行（v2.0.0）**

**実装完了内容:**

- 🔴 **Red Phase**: 全テストファイルの新キャメルケースAPI仕様への更新完了
- 🟢 **Green Phase**: DataPageクラス実装の完全キャメルケース化完了
- 🔵 **Blue Phase**: v2.0.0リリース準備完了（package.json更新、CHANGELOG作成）

**技術的成果:**

- 📝 **完全キャメルケース化**: 全13メソッドがスネークケース→キャメルケースに変更
- 🔒 **ES2022プライベートフィールド**: #syntax採用によるモダンなencapsulation
- 📦 **v2.0.0リリース**: semverに従った適切なメジャーバージョンアップ
- 📋 **包括的CHANGELOG**: 破壊的変更の詳細とマイグレーションガイド作成
- ✅ **全テスト通過**: 36テストがキャメルケースAPIで正常動作確認
- 🚨 **完全破壊的変更**: Phase 2.1の後方互換性を廃止し、レガシーAPIは一切利用不可

**APIの変更詳細:**

```javascript
// v1.x (旧スネークケース)
const page = new DataPage(100, 10, 1, 5);
page.total_entries(); // v1.x
page.entries_per_page(); // v1.x
page.current_page(); // v1.x

// v2.0.0 (新キャメルケース)
const page = new DataPage(100, 10, 1, 5);
page.totalEntries(); // v2.0.0
page.entriesPerPage(); // v2.0.0
page.currentPage(); // v2.0.0
```

**TDD方式の成功:**

- 先にテスト変更（Red状態作成）→ 実装変更（Green状態達成）の手法で安全な移行実現
- 段階的実装により品質保証と型安全性を両立
- 全工程で100%テストカバレッジ維持

**TypeScript対応強化:**

- キャメルケースDataPageTypeインターフェース完全対応
- ES2022プライベートフィールドによる完全なencapsulation
- ビルド時型定義ファイル（.d.ts）自動生成でIDEサポート強化

## Phase 2.3 完了記録 - ブラウザテスト完全実装

### ✅ 完了済み（2025年7月）

**🎯 ブラウザテスト完全実装とテストファイル構造整理**

**実装完了内容:**

- 🌐 **Playwrightブラウザテスト**: ESM/UMD両形式のブラウザ動作確認テスト完全実装
- 📁 **テストファイル構造整理**: Vitest(ユニット)とPlaywright(E2E)の完全分離
- 🔧 **テストコマンド体系整備**: 用途別テストコマンドの標準化

**技術的成果:**

- 🧪 **spec/unit/**: Vitestユニットテスト専用ディレクトリ作成・移行完了
- 🌐 **spec/e2e/**: Playwrightブラウザテスト専用ディレクトリ
- 📄 **spec/fixtures/**: テスト用HTMLファイル（ESM/UMD形式対応）
- ⚙️ **vitest.config.ts**: ユニットテスト対象をspec/unit/に限定
- 🎭 **playwright.config.js**: ブラウザテスト設定とローカルサーバー連携
- 🚫 **.gitignore**: Playwrightレポートディレクトリ除外設定追加

**テストコマンド体系:**

```bash
npm test              # ユニット + ブラウザテストの両方実行
npm run test:unit     # Vitestユニットテストのみ
npm run test:browser  # Playwrightブラウザテストのみ
npm run test:all      # 上記testコマンドと同等（互換性維持）
npm run test:coverage # カバレッジ付きユニットテスト
```

**ブラウザテスト対応内容:**

- ✅ **ESM形式テスト**: モダンブラウザでのES Module動作確認
- ✅ **UMD形式テスト**: レガシーブラウザでのUniversal Module動作確認
- ✅ **マルチブラウザ対応**: Chromium、Firefox、WebKit での横断テスト
- ✅ **APIテスト**: 全13キャメルケースメソッドのブラウザ動作確認
- ✅ **型安全性**: TypeScript型定義のブラウザ環境での動作確認

**ファイル構成（Phase 2.3完了時点）:**

```
spec/
├── unit/                     # Vitestユニットテスト
│   ├── datapage.spec.ts     # メインAPIテスト
│   ├── type-definitions.spec.ts # TypeScript型定義テスト
│   ├── commonjs.spec.cjs    # CommonJS互換性テスト
│   └── legacy-compat.spec.cjs # レガシー互換性テスト
├── e2e/                     # Playwrightブラウザテスト
│   ├── esm.spec.js         # ES Module形式テスト
│   └── umd.spec.js         # UMD形式テスト
└── fixtures/               # テスト用HTMLファイル
    ├── esm-test.html       # ES Module用テストページ
    └── umd-test.html       # UMD用テストページ
```

**品質保証成果:**

- 🎯 **36ユニットテスト**: 全てspec/unit/配下で型安全実行
- 🌐 **6ブラウザテスト**: ESM/UMD × 3ブラウザでの動作確認
- 🚫 **混在問題解決**: VitestがPlaywrightファイルを読み込んでエラーになる問題完全解決
- 📊 **テスト分離**: ユニットテストとブラウザテストの明確な責任分離
- 🔄 **CI/CD準備**: 各テスト種別を独立実行可能な構成

**npm test動作変更:**

- **変更前**: `vitest run`のみ（ユニットテストのみ）
- **変更後**: `npm run test:unit && npm run test:browser`（包括的テスト）

**開発体験向上:**

- 💡 **用途別実行**: 開発段階に応じた適切なテスト実行が可能
- ⚡ **高速フィードバック**: ユニットテストのみで迅速な開発確認
- 🔍 **包括的検証**: ブラウザテストで実際の動作環境確認
- 📈 **品質可視化**: 各テスト種別の成功/失敗状況が明確

**pre-commit hooks (husky) 完全実装:**

- 🎣 **huskyセットアップ**: Git hookの自動化システム構築完了
- 🚀 **lint-staged統合**: ステージングファイルのみに品質チェック適用
- 🔧 **自動修正機能**: ESLint --fix + Prettierによる自動フォーマット
- 🚫 **品質ゲート**: コード品質基準を満たさないコミットの自動阻止

**コミット時品質チェック内容:**

```bash
# TypeScript/JavaScript/CommonJSファイル
- ESLint --fix (構文・品質チェック + 自動修正)
- Prettier --write (コード整形)

# Markdown/JSONファイル
- Prettier --write (フォーマット統一)
```

**実装技術詳細:**

- 📦 **husky 9.1.7**: モダンなGit hooks管理
- 🎯 **lint-staged 16.1.2**: ステージングファイル対象の効率的処理
- ⚙️ **package.json統合**: 設定の一元管理
- 🔄 **prepare script**: npm install時の自動セットアップ

## Phase 2.4 完了記録 - コード統一

### ✅ 完了済み（2025年7月）

**🎯 単一ソース構成への完全移行**

**実装完了内容:**

- 🗂️ **2ファイル構成の解消**: レガシーESMファイル削除によるコード重複解消
- 📦 **単一ソースビルド**: `src/datapage.ts`から4形式の自動生成
- 🔧 **ビルドシステム統一**: Rollup設定による効率的な多形式出力

**技術的成果:**

- 🚫 **レガシーファイル削除**: `src/datapage.esm.js`の完全除去
- 📁 **クリーンな構成**: `src/datapage.ts`単一ソースファイル
- 🏗️ **効率的ビルド**: 単一入力から4形式出力（CJS、UMD、UMD minified、ESM）
- 📊 **型定義統合**: TypeScriptコンパイラによる`.d.ts`自動生成
- 🗺️ **ソースマップ完備**: 全出力形式でのデバッグサポート

**ファイル構成変更:**

**Before（Phase 2.3時点）:**

```
src/
├── datapage.ts          # メインのTypeScriptソース
└── datapage.esm.js      # レガシーESMファイル（重複）
```

**After（Phase 2.4完了時点）:**

```
src/
└── datapage.ts          # 単一のTypeScriptソース

dist/ (自動生成)
├── datapage.cjs         # CommonJS版
├── datapage.js          # UMD版
├── datapage.min.js      # UMD minified版
├── datapage.esm.js      # ES Module版（自動生成）
├── datapage.d.ts        # TypeScript型定義
└── *.map                # 全形式のソースマップ
```

**品質保証成果:**

- 🎯 **36ユニットテスト**: 単一ソース構成で全て通過
- 🌐 **21ブラウザテスト**: 3ブラウザ × 7テストで全形式動作確認
- 🔄 **ビルド安定性**: TypeScript → 多形式出力の確実な変換
- 📋 **保守性向上**: 1ファイル編集で全形式に反映

**ビルドプロセス最適化:**

```bash
# 単一コマンドで完全ビルド
npm run build
  ├── tsc --emitDeclarationOnly  # 型定義生成
  └── rollup -c                  # 4形式並列生成
    ├── dist/datapage.cjs       # CommonJS
    ├── dist/datapage.js        # UMD
    ├── dist/datapage.min.js    # UMD minified
    └── dist/datapage.esm.js    # ES Module
```

**メンテナンス負荷軽減:**

- 💡 **単一編集点**: `src/datapage.ts`のみ編集で全形式に反映
- 🚫 **重複管理不要**: レガシーファイルの同期作業完全廃止
- ⚡ **開発効率向上**: 1つのファイルでの集中開発
- 🔍 **デバッグ簡素化**: 単一ソースによるトレーサビリティ向上

## Phase 2.5: CI/CD整備

### 🎯 実装目標

**GitHub Actions によるCI/CDパイプライン構築**

- 自動テスト・ビルド・リリース
- 品質ゲートの自動化
- 開発効率とリリース品質の向上

### 📋 要件分析

#### 現在の開発環境（Phase 2.4完了時点）

**テスト環境:**

- 36ユニットテスト（Vitest）
- 21ブラウザテスト（Playwright: Chromium、Firefox、WebKit）
- テストコマンド体系完備（unit/browser/coverage）

**品質チェック:**

- ESLint + TypeScript対応（構文・品質チェック）
- Prettier（コード整形）
- TypeScript型チェック（tsc --noEmit）
- pre-commit hooks（husky + lint-staged）

**ビルドシステム:**

- TypeScript単一ソース（src/datapage.ts）
- 4形式自動出力（CJS、UMD、UMD minified、ESM）
- 型定義ファイル自動生成（.d.ts）
- ソースマップ全形式対応

**現在のコマンド:**

```bash
npm test              # ユニット + ブラウザテスト
npm run test:unit     # Vitestユニットテスト
npm run test:browser  # Playwrightブラウザテスト
npm run test:coverage # カバレッジ付きテスト
npm run build         # 型定義 + 4形式ビルド
npm run lint          # ESLint チェック
npm run lint:fix      # ESLint 自動修正
npm run format        # Prettier 整形
npm run format:check  # Prettier チェック
npm run dev           # lint + test + build
```

### 🏗️ CI/CDワークフロー設計

#### 1. **Pull Request検証ワークフロー（ci.yml）**

**トリガー条件:**

- Pull Request作成・更新（target: main/master branch）
- Push to main/master branch（マージ後の検証）

**実行ジョブ:**

```yaml
jobs:
  quality-check:
    # ESLint + Prettier + TypeScript型チェック
    runs-on: ubuntu-latest
    steps:
      - checkout, setup-node
      - npm run lint
      - npm run format:check
      - tsc --noEmit

  test:
    # クロスプラットフォーム・クロスバージョンテスト
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]
        os: [ubuntu-latest, windows-latest, macOS-latest]
    steps:
      - ユニットテスト実行
      - ブラウザテスト実行（Playwright）

  build:
    # ビルド成功確認とアーティファクト保存
    runs-on: ubuntu-latest
    steps:
      - npm run build
      - dist/ファイルのアップロード
      - ビルドサイズ確認
```

#### 2. **リリース自動化ワークフロー（release.yml）**

**トリガー条件:**

- Git tag push (`v*` pattern)

**実行内容:**

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - 品質チェック・テスト・ビルド実行
      - NPMパッケージ自動公開
      - GitHub Release自動作成
      - リリースノート自動生成
```

### 📊 実装計画詳細

#### **Phase 2.5a: 基本CI/CDワークフロー作成**

- `.github/workflows/ci.yml` 作成
- Node.js環境マトリックス設定（18.x, 20.x, 22.x）
- OS環境マトリックス設定（Ubuntu, Windows, macOS）
- 基本的な品質チェック・テスト・ビルド自動化

#### **Phase 2.5b: ブラウザテスト自動化**

- Playwright GitHub Action統合
- ブラウザテストの安定実行環境構築
- テスト結果の可視化

#### **Phase 2.5c: 品質ゲート強化**

- ESLint・Prettier・TypeScript型チェックの自動実行
- テストカバレッジレポート生成
- 品質基準未達時のPR自動ブロック

#### **Phase 2.5d: ビルド検証・アーティファクト管理**

- 全形式ビルドの自動検証
- ビルド成果物（dist/）の保存・ダウンロード機能
- Bundle size monitoring導入検討

#### **Phase 2.5e: リリース自動化**

- Git tagトリガーによるNPM自動公開
- GitHub Release自動作成
- セマンティックバージョニング対応

### ⚙️ 技術仕様

#### **使用GitHub Actions**

- `actions/checkout@v4`: リポジトリチェックアウト
- `actions/setup-node@v4`: Node.js環境セットアップ
- `microsoft/playwright-github-action@v1`: Playwright環境構築
- `actions/upload-artifact@v4`: ビルド成果物保存
- `actions/download-artifact@v4`: 成果物取得

#### **環境要件**

- **Node.js versions**: 18.x, 20.x, 22.x（現在のengines: >=20.17.0に対応）
- **OS platforms**: ubuntu-latest, windows-latest, macOS-latest
- **ブラウザ**: Chromium, Firefox, WebKit（Playwright管理）

#### **セキュリティ・認証**

- `NPM_TOKEN`: GitHub Secrets管理
- 依存関係脆弱性スキャン検討
- 最小権限の原則適用

### 🎯 期待される効果

#### **品質保証の自動化**

- Pull Request時の包括的品質チェック
- 複数環境での動作確認（Node.js版・OS・ブラウザ）
- 人的ミスの防止とリリース品質の向上

#### **開発効率の向上**

- 手動テスト・ビルド作業の完全自動化
- リリースプロセスの標準化
- 迅速なフィードバックサイクル

#### **メンテナンス負荷軽減**

- 一貫したCI/CDプロセス
- 自動化されたリリース管理
- 開発者の単調作業削減

### 🚀 実装優先度

#### **高優先度（基盤整備）**

1. 基本CI/CDワークフロー作成
2. 自動テスト実行（ユニット+ブラウザ）
3. 品質ゲート自動化

#### **中優先度（機能拡張）**

1. リリース自動化
2. ビルド成果物管理
3. クロスプラットフォーム対応強化

#### **低優先度（監視・改善）**

1. カバレッジレポート改善
2. Bundle size monitoring
3. 依存関係脆弱性スキャン

### 📅 実装スケジュール予定

- **Week 1**: Phase 2.5a-b（基本CI/CD + ブラウザテスト）
- **Week 2**: Phase 2.5c-d（品質ゲート + ビルド検証）
- **Week 3**: Phase 2.5e（リリース自動化）

### 🎉 完了時の成果物

#### **ワークフローファイル**

- `.github/workflows/ci.yml`: 継続的インテグレーション
- `.github/workflows/release.yml`: リリース自動化

#### **品質保証強化**

- Pull Request自動検証
- マルチ環境テスト
- 自動品質ゲート

#### **開発体験向上**

- ワンクリックリリース
- 包括的自動テスト
- 迅速なフィードバック
