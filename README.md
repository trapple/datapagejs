[![npm version](https://badge.fury.io/js/datapage.svg)](https://badge.fury.io/js/datapage)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![ES6](https://img.shields.io/badge/ES6-Class-green.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
[![License](https://img.shields.io/badge/License-Artistic-blue.svg)](LICENSE)

# DataPage.js - Simple Pagination Data Object

**[📖 日本語](README-ja.md)**

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

### Architecture: Interface and Implementation Separation

DataPage.js follows a clean separation between interface and implementation:

- **`DataPage` Interface**: Internal contract for pagination functionality
- **`DataPageType` Interface**: Public interface for consumers
- **`DataPageImpl` Class**: Concrete implementation with private fields

```typescript
// Internal interface defines the core contract
interface DataPage {
  current_page(val?: number): number;
  total_entries(val?: number): number;
  pageset(): number[];
  // ... other methods
}

// Public interface for consumers
export interface DataPageType extends DataPage {}

// Implementation class with modern ES6 features
class DataPageImpl implements DataPage {
  // Private fields using # syntax
  #total_entries: number;
  #entries_per_page: number;
  // ... implementation details
}

// Users get DataPageImpl through constructor but type it as DataPageType
export default DataPageImpl as unknown as DataPageConstructor;
```

This design provides several benefits:
- **Type Safety**: Clear contracts through interfaces
- **Encapsulation**: Private fields ensure data integrity
- **Maintainability**: Implementation can evolve without breaking the API
- **Modern JavaScript**: Uses ES6+ features while maintaining compatibility

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
- 🏗️ **Clean Architecture**: Interface and implementation separation for better maintainability
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

The library is built in multiple formats to support different environments:

```
dist/datapage.js         # UMD format (universal, IE11+ compatible)
dist/datapage.min.js     # UMD format minified (production ready)
dist/datapage.esm.js     # ES Module format (modern bundlers)
dist/datapage.d.ts       # TypeScript type definitions
dist/*.map               # Source maps for all formats
```

**Format Details:**
- **UMD (`datapage.js`)**: Universal Module Definition for broad compatibility
- **UMD Minified (`datapage.min.js`)**: Compressed version for production use
- **ES Module (`datapage.esm.js`)**: Modern ES6 module format for bundlers

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