// CommonJS compatibility wrapper
// Support all CommonJS import patterns:
// 1. const DataPage = require("datapage")
// 2. const { DataPage } = require("datapage") 
// 3. const DataPage = require("datapage").default

// Synchronous wrapper for the DataPage class
class DataPageSync {
  constructor(total_entries, entries_per_page, current_page, pages_per_pageset) {
    this._total_entries = total_entries || 0;
    this._entries_per_page = entries_per_page || 10;
    this._current_page = current_page || 1;
    this._pages_per_pageset = pages_per_pageset || 10;

    this._total_entries = this.parseUnsignedInt(this._total_entries);
    this._entries_per_page = this.parseVal(this._entries_per_page);
    this._current_page = this.parseVal(this._current_page);
    this._pages_per_pageset = this.parseVal(this._pages_per_pageset);
  }

  entries_per_page(val) {
    if (val !== undefined) {
      this._entries_per_page = this.parseVal(val);
    }
    return this._entries_per_page;
  }

  current_page(val) {
    if (val !== undefined) {
      const parsedVal = this.parseVal(val);
      this._current_page = parsedVal;
      if (parsedVal > this.last_page())
        this._current_page = this.last_page();
      return this._current_page;
    }
    return this._current_page;
  }

  total_entries(val) {
    if (val !== undefined)
      this._total_entries = this.parseUnsignedInt(val);
    return this._total_entries;
  }

  entries_on_this_page() {
    if (this.total_entries() === 0) {
      return 0;
    } else {
      return this.last() - this.first() + 1;
    }
  }

  first_page() {
    return 1;
  }

  last_page() {
    const pages = this.total_entries() / this.entries_per_page();
    let last_page;
    if (pages == parseInt(pages.toString())) {
      last_page = pages;
    } else {
      last_page = 1 + parseInt(pages.toString());
    }
    if (last_page < 1)
      last_page = 1;
    return last_page;
  }

  first() {
    if (this.total_entries() === 0) {
      return 0;
    } else {
      return ((this.current_page() - 1) * this.entries_per_page()) + 1;
    }
  }

  last() {
    if (this.current_page() == this.last_page()) {
      return this.total_entries();
    } else {
      return (this.current_page() * this.entries_per_page());
    }
  }

  previous_page() {
    if (this.current_page() > 1) {
      return this.current_page() - 1;
    } else {
      return undefined;
    }
  }

  next_page() {
    return this.current_page() < this.last_page() ? this.current_page() + 1 : undefined;
  }

  pages_per_pageset(val) {
    if (val !== undefined) {
      this._pages_per_pageset = this.parseVal(val);
      if (this._pages_per_pageset > this.last_page())
        this._pages_per_pageset = this.last_page();
    }
    return this._pages_per_pageset;
  }

  pageset() {
    let page_all = [];
    let i;
    let splice_start = 0;
    const len = this.pages_per_pageset();

    for (i = this.first_page(); i <= this.last_page(); i++) {
      page_all.push(i);
    }
    if (this.current_page() > parseInt((len / 2).toString())) {
      splice_start = this.current_page() - parseInt((len / 2).toString()) - 1;
    }

    if (this.current_page() + parseInt((len / 2).toString()) > this.last_page()) {
      splice_start = this.last_page() - len;
    }

    if (page_all.length > len) {
      page_all = page_all.splice(splice_start, len);
    }

    return page_all;
  }

  has_next_pageset() {
    return (this.pageset()[this.pages_per_pageset() - 1] !== this.last_page());
  }

  has_previous_pageset() {
    return (this.first_page() !== this.pageset()[0]);
  }

  parseVal(val) {
    const parsed = parseInt(val);
    if (isNaN(parsed)) {
      throw new Error(`Invalid number: ${val}`);
    }
    if (parsed < 1) {
      throw new Error(`Number must be positive: ${parsed}`);
    }
    return parsed;
  }

  parseUnsignedInt(val) {
    const parsed = parseInt(val);
    if (isNaN(parsed))
      throw new Error(`Invalid number: ${val}`);
    return parsed;
  }
}

// Export for all patterns
module.exports = DataPageSync;
module.exports.DataPage = DataPageSync;
module.exports.default = DataPageSync;