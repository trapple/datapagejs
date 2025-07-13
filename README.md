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
const pager = new DataPage(
  totalEntries,
  entriesPerPage,
  currentPage,
  pagesPerPageset
);
pager.firstPage(); // 1
pager.lastPage(); // last page number
pager.first(); // first entry number of current page
pager.last(); // last entry number of current page
pager.pageset(); // [1,2,3,4,5...] page set array
```

```typescript
// TypeScript
import DataPage, { DataPageType } from 'datapage';

const pager: DataPageType = new DataPage(300, 10, 2, 5);
const pageNumbers: number[] = pager.pageset();

// Modern camelCase API
console.log(pager.currentPage()); // 2
pager.totalEntries(400); // Set total entries
```

**Default values:**

- `totalEntries`: 0
- `entriesPerPage`: 10
- `currentPage`: 1
- `pagesPerPageset`: 10

## Installation

### npm (Recommended)

```bash
npm install datapage
```

### Import Methods

#### ES Modules (Recommended)

```javascript
// Default import (recommended)
import DataPage from 'datapage';

// TypeScript with types
import DataPage, { DataPageType } from 'datapage';
// Type usage example
const pager: DataPageType = new DataPage(100, 10, 1, 5);
```

#### CommonJS (Legacy Support)

```javascript
// All patterns supported:
const DataPage = require('datapage');
const { DataPage } = require('datapage');
const DataPage = require('datapage').default;
```

#### Browser (UMD)

```html
<script src="path/to/datapage.min.js"></script>
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
const currentPage: number = pager.currentPage();
const pageSet: number[] = pager.pageset();
```

### Architecture: Interface and Implementation Separation

DataPage.js follows a clean separation between interface and implementation:

- **`DataPageType` Interface**: Public contract for pagination functionality
- **`DataPage` Class**: Concrete implementation with private fields and backward compatibility

```typescript
// Public interface defines the complete contract
interface DataPageType {
  // Core pagination methods (camelCase API)
  currentPage(val?: number): number;
  totalEntries(val?: number): number;
  entriesPerPage(val?: number): number;
  entriesOnThisPage(): number;
  firstPage(): number;
  lastPage(): number;
  first(): number;
  last(): number;
  previousPage(): number | undefined;
  nextPage(): number | undefined;
  pagesPerPageset(val?: number): number;
  pageset(): number[];
  hasNextPageset(): boolean;
  hasPreviousPageset(): boolean;

  // Utility methods
  parseVal(val: any): number;
  parseUnsignedInt(val: any): number;
}

// Implementation class with modern ES6 features
class DataPage implements DataPageType {
  // Private fields using # syntax for true encapsulation
  #totalEntries: number;
  #entriesPerPage: number;
  #currentPage: number;
  #pagesPerPageset: number;

  constructor(
    totalEntries?: number,
    entriesPerPage?: number,
    currentPage?: number,
    pagesPerPageset?: number
  ) {
    // Implementation details...
  }

  // Modern camelCase API methods
  currentPage(val?: number): number {
    /* ... */
  }
  totalEntries(val?: number): number {
    /* ... */
  }
  // ... other methods
}

// Clean exports
export default DataPage;
export type { DataPageType };
```

This design provides several benefits:

- **Type Safety**: Clear contracts through interfaces
- **Encapsulation**: Private fields ensure data integrity
- **Modern API**: Clean camelCase method names following JavaScript conventions
- **Maintainability**: Implementation can evolve independently from interface
- **Modern JavaScript**: Uses ES6+ features including private fields and ES2022 syntax

## API Reference

### Constructor

```typescript
new DataPage()
new DataPage(totalEntries: number, entriesPerPage?: number, currentPage?: number, pagesPerPageset?: number)
```

**Parameters:**

- `totalEntries`: Total number of entries (default: 0)
- `entriesPerPage`: Number of entries per page (default: 10)
- `currentPage`: Current page number (default: 1)
- `pagesPerPageset`: Number of pages per pageset (default: 10)

```typescript
// Example
const pager = new DataPage(300, 10, 1, 5);
```

### entriesPerPage(val?: number): number

Sets or gets the number of entries per page.

```typescript
// Set
pager.entriesPerPage(15);
// Get
const entriesPerPage: number = pager.entriesPerPage();
```

### currentPage(val?: number): number

Sets or gets the current page number.

```typescript
// Set
pager.currentPage(2);
// Get
const currentPage: number = pager.currentPage();
```

### totalEntries(val?: number): number

Sets or gets the total number of entries.

```typescript
// Set
pager.totalEntries(300);
// Get
const totalEntries: number = pager.totalEntries();
```

### entriesOnThisPage(): number

Returns the number of entries on the current page.

```typescript
// Normal page
const pager = new DataPage(300, 10, 2, 5);
pager.entriesOnThisPage(); // returns 10

// Last page with remainder
const pager2 = new DataPage(317, 10, 32, 5);
pager2.entriesOnThisPage(); // returns 7
```

### firstPage(): number

Always returns 1.

```typescript
pager.firstPage(); // 1
```

### lastPage(): number

Returns the last page number.

```typescript
const pager = new DataPage(500, 30, 1);
pager.lastPage(); // returns 17
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

### previousPage(): number | undefined

Returns the previous page number, or `undefined` if on the first page.

```typescript
const pager = new DataPage(100, 10, 3);
pager.previousPage(); // returns 2

const pager2 = new DataPage(100, 10, 1);
pager2.previousPage(); // returns undefined
```

### nextPage(): number | undefined

Returns the next page number, or `undefined` if on the last page.

```typescript
const pager = new DataPage(100, 10, 3);
pager.nextPage(); // returns 4

const pager2 = new DataPage(100, 10, 10);
pager2.nextPage(); // returns undefined
```

### pagesPerPageset(val?: number): number

Sets or gets the number of pages per pageset.

```typescript
// Set
pager.pagesPerPageset(5);
// Get
const pagesPerPageset: number = pager.pagesPerPageset();
```

### pageset(): number[]

Returns an array of page numbers for the current pageset.

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.pageset(); // returns [5, 6, 7, 8, 9]
```

### hasNextPageset(): boolean

Returns whether there is a next pageset.

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.hasNextPageset(); // returns true or false
```

### hasPreviousPageset(): boolean

Returns whether there is a previous pageset.

```typescript
const pager = new DataPage(500, 10, 7, 5);
pager.hasPreviousPageset(); // returns true or false
```

### parseVal(val: any): number

Parses and validates a positive integer value.

```typescript
const pager = new DataPage();
const validValue = pager.parseVal(5); // returns 5
const validString = pager.parseVal('10'); // returns 10
// pager.parseVal(-1); // throws Error: "Number must be positive: -1"
// pager.parseVal("abc"); // throws Error: "Invalid number: abc"
```

### parseUnsignedInt(val: any): number

Parses an integer value (allows zero and positive numbers).

```typescript
const pager = new DataPage();
const zeroValue = pager.parseUnsignedInt(0); // returns 0
const positiveValue = pager.parseUnsignedInt(100); // returns 100
const stringValue = pager.parseUnsignedInt('50'); // returns 50
// pager.parseUnsignedInt("abc"); // throws Error: "Invalid number: abc"
```

## Features

- 🔧 **Full TypeScript Support**: Complete type definitions included
- 🏗️ **Clean Architecture**: Interface and implementation separation for better maintainability
- 🎯 **ES6 Classes**: Modern ES6 class syntax with private fields
- 📦 **Multiple Formats**: UMD, ES Modules, and CommonJS support
- 🧪 **Well Tested**: Comprehensive test suite with 36 unit tests and 6 browser tests
- 🌐 **Browser Tested**: Multi-browser testing with Playwright (Chromium, Firefox, WebKit)
- 🚀 **Modern API**: Clean camelCase naming following JavaScript conventions
- 📊 **Source Maps**: Full source map support for all builds
- 🎣 **Quality Assured**: Pre-commit hooks with ESLint and Prettier
- 🚀 **Lightweight**: Only 4KB minified

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (ES6+ features)
- **Legacy Support**: IE11+ (via UMD build)
- **Node.js**: 18+ LTS

## Build Outputs

The library is built in multiple formats to support different environments:

```text
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

# Run all tests (unit + browser)
npm test

# Run unit tests only
npm run test:unit

# Run browser tests only
npm run test:browser

# Run tests with coverage
npm run test:coverage

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
