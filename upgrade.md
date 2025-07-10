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

**Phase 2.1e: テストの型安全化**
- リスク: 低（テスト品質向上）
- 作業内容:
  - `spec/datapage.spec.js` の TypeScript化
  - 型チェック付きテストの作成
- 成果物: 型安全なテストスイート

#### Phase 2.2: テストフレームワーク移行
- Jasmine → Vitest ✅（完了済み）
- ブラウザテストの追加（Playwright）

#### Phase 2.3: コード品質向上
- ESLint設定 ✅（完了済み）
- Prettier設定 ✅（完了済み）
- pre-commit hooks (husky)

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

**Phase 2.1: ES Modules対応（段階的実施）**
1. **Phase 2.1a**: TypeScript環境セットアップ（リスク：低） ✅
2. **Phase 2.1b**: 段階的TypeScript化（リスク：中） ✅
3. **Phase 2.1c**: ES6 Class構文移行（リスク：高） ✅
4. **Phase 2.1d**: ビルド設定調整（リスク：中） ✅
5. **Phase 2.1e**: テストの型安全化（リスク：低）

**Phase 2.2: 追加機能**
- ブラウザテストの追加（Playwright）
- pre-commit hooks (husky)

**Phase 2.3: コード統一**
- 一時的な2ファイル構成（datapage.js + datapage.esm.js）の解消
- 単一ソースからの多形式出力

**Phase 2.4: CI/CD整備**
- GitHub Actions設定
- 自動テスト・ビルド・リリース