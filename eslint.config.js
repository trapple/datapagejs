import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
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
      'no-var': 'warn'
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
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
        // テスト環境
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-unused-vars': 'off', // TypeScript版を使用
      'no-console': 'off',
      'prefer-const': 'error'
    }
  }
];
