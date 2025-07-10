import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js環境
        global: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        // ブラウザ環境
        window: 'readonly',
        document: 'readonly',
        // UMD pattern
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        // テスト内でのDataPageアクセス
        DataPage: 'readonly',
        // テスト環境
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        jasmine: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'warn'  // ES5コードなので警告レベルに変更
    }
  }
];
