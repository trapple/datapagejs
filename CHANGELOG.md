# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-07-13

### Changed

- **BREAKING CHANGE**: すべてのメソッド名をsnake_caseからcamelCaseに変更
  - `total_entries()` → `totalEntries()`
  - `entries_per_page()` → `entriesPerPage()`
  - `current_page()` → `currentPage()`
  - `entries_on_this_page()` → `entriesOnThisPage()`
  - `first_page()` → `firstPage()`
  - `last_page()` → `lastPage()`
  - `previous_page()` → `previousPage()`
  - `next_page()` → `nextPage()`
  - `pages_per_pageset()` → `pagesPerPageset()`
  - `has_next_pageset()` → `hasNextPageset()`
  - `has_previous_pageset()` → `hasPreviousPageset()`
  - `parse_val()` → `parseVal()`
  - `parse_unsigned_int()` → `parseUnsignedInt()`

- **BREAKING CHANGE**: コンストラクタパラメータ名をcamelCaseに変更
  - `total_entries` → `totalEntries`
  - `entries_per_page` → `entriesPerPage`
  - `current_page` → `currentPage`
  - `pages_per_pageset` → `pagesPerPageset`

### Technical Changes

- ES2022プライベートフィールド（#syntax）を採用
- TypeScriptインターフェース（DataPageType）をcamelCase命名に更新
- TDD（Test-Driven Development）手法を使用して段階的にリファクタリング実施

### Migration Guide

v1.x からv2.0.0への移行方法：

```javascript
// v1.x (旧)
const page = new DataPage(100, 10, 1, 5);
const total = page.total_entries();
const perPage = page.entries_per_page();
const current = page.current_page();

// v2.0.0 (新)
const page = new DataPage(100, 10, 1, 5);
const total = page.totalEntries();
const perPage = page.entriesPerPage();
const current = page.currentPage();
```

## [1.3.4] - Previous Release

### Added
- Initial TypeScript support
- Multiple build formats (UMD, CJS, ESM)
- Comprehensive test suite