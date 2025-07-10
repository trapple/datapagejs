# DataPage.js - Simple Pagination Data Object

[![npm version](https://badge.fury.io/js/datapage.svg)](https://badge.fury.io/js/datapage)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![ES6](https://img.shields.io/badge/ES6-Class-green.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
[![License](https://img.shields.io/badge/License-Artistic-blue.svg)](LICENSE)

**[📖 日本語](README-ja.md)**

A modern TypeScript-ready simple pagination library that works in both browser and Node.js environments.

## Overview

DataPage.js is a simple and lightweight pagination library with full TypeScript support. It provides all the essential pagination functionality you need with a clean, intuitive API.

### Basic Usage

```javascript
// JavaScript
const pager = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
pager.first_page();  // 1
pager.last_page();   // last page number
pager.first();       // first entry number of current page
pager.last();        // last entry number of current page
pager.pageset();     // [1,2,3,4,5...] page set array
```

```typescript
// TypeScript
import DataPage, { DataPageType } from 'datapage';

const pager: DataPageType = new DataPage(300, 10, 2, 5);
const pageNumbers: number[] = pager.pageset();
```

**Default values:**
- `total_entries`: 0
- `entries_per_page`: 10  
- `current_page`: 1
- `pages_per_pageset`: 10

## Installation

### npm (Recommended)

```bash
npm install datapage
```

### Import Methods

#### ES Modules (Recommended)
```javascript
// ES6 import
import DataPage from 'datapage';

// TypeScript import
import DataPage, { DataPageType } from 'datapage';
```

#### CommonJS
```javascript
// Node.js require
const DataPage = require('datapage');
```

#### Browser (UMD)
```html
<script src="node_modules/datapage/dist/datapage.min.js"></script>
<script>
  const pager = new DataPage(100, 10, 1, 5);
</script>
```

### TypeScript Support

TypeScript type definitions are automatically available:

```typescript
import DataPage, { DataPageType } from 'datapage';

// Full type safety
const pager: DataPageType = new DataPage(300, 10, 1, 5);
const currentPage: number = pager.current_page();
const pageSet: number[] = pager.pageset();
```

## API Reference

### Constructor

```typescript
new DataPage()
new DataPage(total_entries: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number)
```

**Parameters:**
- `total_entries`: Total number of entries (default: 0)
- `entries_per_page`: Number of entries per page (default: 10)
- `current_page`: Current page number (default: 1)
- `pages_per_pageset`: Number of pages per pageset (default: 10)

```typescript
// Example
const pager = new DataPage(300, 10, 1, 5);
```

### entries_per_page(val?: number): number

Sets or gets the number of entries per page.

```typescript
// Set
pager.entries_per_page(15);
// Get
const entriesPerPage: number = pager.entries_per_page();
```

### current_page(val?: number): number

Sets or gets the current page number.

```typescript
// Set
pager.current_page(2);
// Get
const currentPage: number = pager.current_page();
```

### total_entries(val?: number): number

Sets or gets the total number of entries.

```typescript
// Set
pager.total_entries(300);
// Get
const totalEntries: number = pager.total_entries();
```

### entries_on_this_page(): number

Returns the number of entries on the current page.

```typescript
// Normal page
const pager = new DataPage(300, 10, 2, 5);
pager.entries_on_this_page(); // returns 10

// Last page with remainder
const pager2 = new DataPage(317, 10, 32, 5);
pager2.entries_on_this_page(); // returns 7
```

### first_page(): number

Always returns 1.

```typescript
pager.first_page(); // 1
```

### last_page(): number

Returns the last page number.

```typescript
const pager = new DataPage(500, 30, 1);
pager.last_page(); // returns 17
```

### first(): number

Returns the first entry number of the current page.

```typescript
const pager = new DataPage(100, 10, 3);
pager.first(); // returns 21
```

### last(): number

Returns the last entry number of the current page.

```typescript
const pager = new DataPage(100, 10, 3);
pager.last(); // returns 30
```

### previous_page(): number | undefined

Returns the previous page number, or `undefined` if on the first page.

```typescript
const pager = new DataPage(100, 10, 3);
pager.previous_page(); // returns 2

const pager2 = new DataPage(100, 10, 1);
pager2.previous_page(); // returns undefined
```

### next_page(): number | undefined

Returns the next page number, or `undefined` if on the last page.

```typescript
const pager = new DataPage(100, 10, 3);
pager.next_page(); // returns 4

const pager2 = new DataPage(100, 10, 10);
pager2.next_page(); // returns undefined
```

### pages_per_pageset(val?: number): number

Sets or gets the number of pages per pageset.

```typescript
// Set
pager.pages_per_pageset(5);
// Get
const pagesPerPageset: number = pager.pages_per_pageset();
```

### pageset(): number[]

Returns an array of page numbers for the current pageset.

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.pageset(); // returns [5, 6, 7, 8, 9]
```

### has_next_pageset(): boolean

Returns whether there is a next pageset.

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.has_next_pageset(); // returns true or false
```

### has_previous_pageset(): boolean

Returns whether there is a previous pageset.

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.has_previous_pageset(); // returns true or false
```

## Features

- 🔧 **Full TypeScript Support**: Complete type definitions included
- 🎯 **ES6 Classes**: Modern ES6 class syntax with private fields
- 📦 **Multiple Formats**: UMD, ES Modules, and CommonJS support
- 🧪 **Well Tested**: Comprehensive test suite with 18 test cases
- 🔄 **100% Backward Compatible**: Existing JavaScript APIs fully maintained
- 📊 **Source Maps**: Full source map support for all builds
- 🚀 **Lightweight**: Only 4KB minified

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (ES6+ features)
- **Legacy Support**: IE11+ (via UMD build)
- **Node.js**: 18+ LTS

## Build Outputs

```
dist/datapage.js         # UMD version (IE11+ compatible, 11.5KB)
dist/datapage.esm.js     # ES Module version (10.3KB)
dist/datapage.min.js     # Production minified version (4.0KB)
dist/datapage.d.ts       # TypeScript type definitions (1.1KB)
dist/*.map               # Source maps for all formats
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build all formats
npm run build

# Development mode (lint + test + build)
npm run dev

# Code formatting
npm run format

# Linting
npm run lint:fix
```

## SEE ALSO

This software has been ported from [Data::Page](http://search.cpan.org/~lbrocard/Data-Page/lib/Data/Page.pm)

## COPYRIGHT

© 2014 trapple

## LICENSE

The "Artistic License"