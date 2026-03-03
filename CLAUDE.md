# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際のClaude Code（claude.ai/code）へのガイダンスを提供します。
詳細なAPI仕様・コマンド・アーキテクチャはREADME.mdを参照。

## 主要ファイル

- `src/datapage.ts` - メインのDataPageクラス実装
- `spec/unit/datapage.spec.ts` - Vitestユニットテスト
- `spec/e2e/` - PlaywrightによるブラウザE2Eテスト
- `rollup.config.js` - Rollupビルド設定
- `tsconfig.json` - TypeScript設定

## 開発ワークフロー

1. `src/datapage.ts`でコードを変更
2. `npm test`でテストを実行
3. `npm run build`でビルドを実行し、`dist/`フォルダにビルド結果を生成
