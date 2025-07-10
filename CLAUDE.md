# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際のClaude Code（claude.ai/code）へのガイダンスを提供します。

## コマンド

### ビルド
```bash
npm run build
```
これはGruntタスクを実行し、開発タスク（jshint、karma、concat、jsbeautifier）を実行してからuglifyを実行します。

### テスト
```bash
npm test
```
Karmaを使用してテストスイートを実行します。

### 開発コマンド
```bash
grunt dev
```
開発用タスクを実行します（jshint、karma、concat、jsbeautifier）。

## プロジェクト構造

このプロジェクトは**DataPage**というシンプルなページネーションライブラリです。

### アーキテクチャ
- **UMD（Universal Module Definition）パターン**を使用してNode.jsとブラウザ環境の両方をサポート
- **単一クラス設計**：DataPageクラス1つでページネーション機能を提供
- **Gruntベースのビルドシステム**：開発からディストリビューションまでの完全なビルドパイプライン

### 主要ファイル
- `src/datapage.js` - メインのDataPageクラス実装
- `spec/datapage.spec.js` - Jasmineテストスイート
- `Gruntfile.js` - ビルド設定のエントリポイント
- `grunt/` - 各Gruntタスクの設定ファイル

### 主要機能
DataPageクラスは以下の機能を提供します：
- ページネーション計算（総エントリ数、1ページあたりのエントリ数、現在のページ）
- ページセット生成（表示するページ番号の配列）
- 前後のページセット存在チェック
- 現在のページでのエントリ数計算

### 開発ワークフロー
1. `src/datapage.js`でコードを変更
2. `npm test`でテストを実行
3. `npm run build`でビルドを実行し、`dist/`フォルダにビルド結果を生成