/*
 * datapage
 * Simple Pagination Data Object
 * https://github.com/trapple/datapagejs.git
 * Copyright 2013 trapple
 * Version: 1.3.4
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DataPage = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var _DataPageImpl_total_entries, _DataPageImpl_entries_per_page, _DataPageImpl_current_page, _DataPageImpl_pages_per_pageset;
    // ES6 Class実装
    class DataPageImpl {
        // 後方互換性のためのpublicプロパティ
        get _total_entries() { return __classPrivateFieldGet(this, _DataPageImpl_total_entries, "f"); }
        set _total_entries(value) { __classPrivateFieldSet(this, _DataPageImpl_total_entries, value, "f"); }
        get _entries_per_page() { return __classPrivateFieldGet(this, _DataPageImpl_entries_per_page, "f"); }
        set _entries_per_page(value) { __classPrivateFieldSet(this, _DataPageImpl_entries_per_page, value, "f"); }
        get _current_page() { return __classPrivateFieldGet(this, _DataPageImpl_current_page, "f"); }
        set _current_page(value) { __classPrivateFieldSet(this, _DataPageImpl_current_page, value, "f"); }
        get _pages_per_pageset() { return __classPrivateFieldGet(this, _DataPageImpl_pages_per_pageset, "f"); }
        set _pages_per_pageset(value) { __classPrivateFieldSet(this, _DataPageImpl_pages_per_pageset, value, "f"); }
        constructor(total_entries, entries_per_page, current_page, pages_per_pageset) {
            _DataPageImpl_total_entries.set(this, void 0);
            _DataPageImpl_entries_per_page.set(this, void 0);
            _DataPageImpl_current_page.set(this, void 0);
            _DataPageImpl_pages_per_pageset.set(this, void 0);
            __classPrivateFieldSet(this, _DataPageImpl_total_entries, total_entries || 0, "f");
            __classPrivateFieldSet(this, _DataPageImpl_entries_per_page, entries_per_page || 10, "f");
            __classPrivateFieldSet(this, _DataPageImpl_current_page, current_page || 1, "f");
            __classPrivateFieldSet(this, _DataPageImpl_pages_per_pageset, pages_per_pageset || 10, "f");
            __classPrivateFieldSet(this, _DataPageImpl_total_entries, this.parseUnsignedInt(__classPrivateFieldGet(this, _DataPageImpl_total_entries, "f")), "f");
            __classPrivateFieldSet(this, _DataPageImpl_entries_per_page, this.parseVal(__classPrivateFieldGet(this, _DataPageImpl_entries_per_page, "f")), "f");
            __classPrivateFieldSet(this, _DataPageImpl_current_page, this.parseVal(__classPrivateFieldGet(this, _DataPageImpl_current_page, "f")), "f");
            __classPrivateFieldSet(this, _DataPageImpl_pages_per_pageset, this.parseVal(__classPrivateFieldGet(this, _DataPageImpl_pages_per_pageset, "f")), "f");
        }
        /**
         * @method entries_per_page
         * @param {Number|null}
         */
        entries_per_page(val) {
            if (val !== undefined) {
                this._entries_per_page = this.parseVal(val);
            }
            return this._entries_per_page;
        }
        /**
         * @method current_page
         * @param {Number|null}
         */
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
        /**
         * @method total_entries
         * @param {Number|null}
         */
        total_entries(val) {
            if (val !== undefined)
                this._total_entries = this.parseUnsignedInt(val);
            return this._total_entries;
        }
        /**
         * @method entries_on_this_page
         */
        entries_on_this_page() {
            if (this.total_entries() === 0) {
                return 0;
            }
            else {
                return this.last() - this.first() + 1;
            }
        }
        /**
         * @method first_page
         */
        first_page() {
            return 1;
        }
        /**
         * @method last_page
         */
        last_page() {
            const pages = this.total_entries() / this.entries_per_page();
            let last_page;
            if (pages == parseInt(pages.toString())) {
                last_page = pages;
            }
            else {
                last_page = 1 + parseInt(pages.toString());
            }
            if (last_page < 1)
                last_page = 1;
            return last_page;
        }
        /**
         * @method first
         */
        first() {
            if (this.total_entries() === 0) {
                return 0;
            }
            else {
                return ((this.current_page() - 1) * this.entries_per_page()) + 1;
            }
        }
        /**
         * @method last
         */
        last() {
            if (this.current_page() == this.last_page()) {
                return this.total_entries();
            }
            else {
                return (this.current_page() * this.entries_per_page());
            }
        }
        /**
         * @method previous_page
         */
        previous_page() {
            if (this.current_page() > 1) {
                return this.current_page() - 1;
            }
            else {
                return undefined;
            }
        }
        /**
         * @method next_page
         */
        next_page() {
            return this.current_page() < this.last_page() ? this.current_page() + 1 : undefined;
        }
        /**
         * @method pages_per_pageset
         * @param {Number|null}
         */
        pages_per_pageset(val) {
            if (val !== undefined) {
                this._pages_per_pageset = this.parseVal(val);
                if (this._pages_per_pageset > this.last_page())
                    this._pages_per_pageset = this.last_page();
            }
            return this._pages_per_pageset;
        }
        /**
         * @method pageset
         * @param {Number|null}
         */
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
        /**
         * @method has_next_pageset
         */
        has_next_pageset() {
            return (this.pageset()[this.pages_per_pageset() - 1] !== this.last_page());
        }
        /**
         * @method has_previous_pageset
         */
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
    _DataPageImpl_total_entries = new WeakMap(), _DataPageImpl_entries_per_page = new WeakMap(), _DataPageImpl_current_page = new WeakMap(), _DataPageImpl_pages_per_pageset = new WeakMap();

    return DataPageImpl;

}));
//# sourceMappingURL=datapage.js.map
