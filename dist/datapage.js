/*
 * datapage
 * Simple Pagenation Data Object
 * https://github.com/trapple/datapagejs.git
 * Copyright 2013 trapple
 * Version: 1.3.3
 */
(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.DataPage = factory();
    }
}(this, function() {


    var DataPage = function(total_entries, entries_per_page, current_page, pages_per_pageset) {
        this._total_entries = total_entries || 0;
        this._entries_per_page = entries_per_page || 10;
        this._current_page = current_page || 1;
        this._pages_per_pageset = pages_per_pageset || 10;

        this._total_entries = this.parseUnsignedInt(this._total_entries);
        this._entries_per_page = this.parseVal(this._entries_per_page);
        this._current_page = this.parseVal(this._current_page);
        this._pages_per_pageset = this.parseVal(this._pages_per_pageset);
    };

    /*
     * @method entries_per_page
     * @param {Number|null}
     */
    DataPage.prototype.entries_per_page = function(val) {
        if (val !== undefined) {
            this._entries_per_page = this.parseVal(val);
        }
        return this._entries_per_page;
    };

    /*
     * @method current_page
     * @param {Number|null}
     */
    DataPage.prototype.current_page = function(val) {
        if (val !== undefined) {
            val = this.parseVal(val);
            this._current_page = val;
            if (val > this.last_page())
                this._current_page = this.last_page();
            return this._current_page;
        }
        return this._current_page;
    };

    /*
     * @method total_entries
     * @param {Number|null}
     */
    DataPage.prototype.total_entries = function(val) {
        if (val !== undefined)
            this._total_entries = this.parseUnsignedInt(val);
        return this._total_entries;
    };

    /*
     * @method entries_on_this_page
     */
    DataPage.prototype.entries_on_this_page = function() {
        if (this.total_entries() === 0) {
            return 0;
        } else {
            return this.last() - this.first() + 1; //
        }
    };

    /*
     * @method first_page
     */
    DataPage.prototype.first_page = function() {
        return 1;
    };

    /*
     * @method last_page
     */
    DataPage.prototype.last_page = function() {
        var pages = this.total_entries() / this.entries_per_page();
        var last_page;
        if (pages == parseInt(pages)) {
            last_page = pages;
        } else {
            last_page = 1 + parseInt(pages);
        }
        if (last_page < 1)
            last_page = 1;
        return last_page;
    };

    /*
     * @method first
     */
    DataPage.prototype.first = function() {
        if (this.total_entries() === 0) {
            return 0;
        } else {
            return ((this.current_page() - 1) * this.entries_per_page()) + 1;
        }
    };

    /*
     * @method last
     */
    DataPage.prototype.last = function() {
        if (this.current_page() == this.last_page()) {
            return this.total_entries();
        } else {
            return (this.current_page() * this.entries_per_page());
        }
    };

    /*
     * @method previous_page
     */
    DataPage.prototype.previous_page = function() {
        if (this.current_page() > 1) {
            return this.current_page() - 1;
        } else {
            return;
        }
    };

    /*
     * @method next_page
     */
    DataPage.prototype.next_page = function() {
        return this.current_page() < this.last_page() ? this.current_page() + 1 : undefined;
    };

    /*
     * @method pages_per_pageset
     * @param {Number|null}
     */
    DataPage.prototype.pages_per_pageset = function(val) {
        if (val !== undefined) {
            this._pages_per_pageset = this.parseVal(val);
            if (this._pages_per_pageset > this.last_page())
                this._pages_per_pageset = this.last_page();
        }
        return this._pages_per_pageset;
    };

    /*
     * @method pageset
     * @param {Number|null}
     */
    DataPage.prototype.pageset = function() {
        var page_all = [];
        var page_set = [];
        var i;
        var splice_start = 0;
        var len = this.pages_per_pageset();

        for (i = this.first_page(); i <= this.last_page(); i++) {
            page_all.push(i);
        }
        if (this.current_page() > parseInt(len / 2)) {
            splice_start = this.current_page() - parseInt(len / 2) - 1;
        }

        if (this.current_page() + parseInt(len / 2) > this.last_page()) {
            splice_start = this.last_page() - len;
        }

        if (page_all.length > len) {
            page_all = page_all.splice(splice_start, len);
        }

        return page_all;
    };

    /*
     * @method has_next_pageset
     */
    DataPage.prototype.has_next_pageset = function() {
        return (this.pageset()[this.pages_per_pageset() - 1] !== this.last_page());
    };

    /*
     * @method has_previous_pageset
     */
    DataPage.prototype.has_previous_pageset = function() {
        return (this.first_page() !== this.pageset()[0]);
    };

    DataPage.prototype.parseVal = function(val) {
        val = parseInt(val);
        if (typeof val !== 'number' || isNaN(val)) {
            throw new Error('no number');
        }
        if (val < 1) {
            throw new Error('no int');
        }
        return val;
    };

    DataPage.prototype.parseUnsignedInt = function(val) {
        val = parseInt(val);
        if (typeof val !== 'number' || isNaN(val))
            throw new Error('no number');
        return val;
    };

    return DataPage;
}));
