import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // jsdomを使用してブラウザ環境をシミュレート
    environment: 'jsdom',
    
    // テストファイルのパターン（legacy-compat.spec.cjsのみ含む）
    include: ['spec/**/*.spec.ts', 'spec/**/*.spec.js', 'spec/**/*.test.ts', 'spec/**/*.test.js', 'spec/legacy-compat.spec.cjs'],
    
    // グローバルにテスト関数を利用可能にする
    globals: true,
    
    // カバレッジ設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.js'],
      exclude: ['node_modules/', 'dist/', 'spec/']
    },
    
    // テストの詳細出力
    reporter: ['verbose']
  }
});