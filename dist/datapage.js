/*
 * datapage
 * Simple Pagination Data Object
 * https://github.com/trapple/datapagejs.git
 * Copyright 2013 trapple
 * Version: 1.3.4
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DataPage = {}));
})(this, (function (exports) { 'use strict';

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

    var _DataPage_totalEntries, _DataPage_entriesPerPage, _DataPage_currentPage, _DataPage_pagesPerPageset;
    // ES6 Class実装
    class DataPage {
        constructor(total_entries, entries_per_page, current_page, pages_per_pageset) {
            _DataPage_totalEntries.set(this, void 0);
            _DataPage_entriesPerPage.set(this, void 0);
            _DataPage_currentPage.set(this, void 0);
            _DataPage_pagesPerPageset.set(this, void 0);
            __classPrivateFieldSet(this, _DataPage_totalEntries, total_entries || 0, "f");
            __classPrivateFieldSet(this, _DataPage_entriesPerPage, entries_per_page || 10, "f");
            __classPrivateFieldSet(this, _DataPage_currentPage, current_page || 1, "f");
            __classPrivateFieldSet(this, _DataPage_pagesPerPageset, pages_per_pageset || 10, "f");
            __classPrivateFieldSet(this, _DataPage_totalEntries, this.parseUnsignedInt(__classPrivateFieldGet(this, _DataPage_totalEntries, "f")), "f");
            __classPrivateFieldSet(this, _DataPage_entriesPerPage, this.parseVal(__classPrivateFieldGet(this, _DataPage_entriesPerPage, "f")), "f");
            __classPrivateFieldSet(this, _DataPage_currentPage, this.parseVal(__classPrivateFieldGet(this, _DataPage_currentPage, "f")), "f");
            __classPrivateFieldSet(this, _DataPage_pagesPerPageset, this.parseVal(__classPrivateFieldGet(this, _DataPage_pagesPerPageset, "f")), "f");
        }
        /**
         * @method entriesPerPage
         * @param {Number|null}
         */
        entriesPerPage(val) {
            if (val !== undefined) {
                __classPrivateFieldSet(this, _DataPage_entriesPerPage, this.parseVal(val), "f");
            }
            return __classPrivateFieldGet(this, _DataPage_entriesPerPage, "f");
        }
        /**
         * @method currentPage
         * @param {Number|null}
         */
        currentPage(val) {
            if (val !== undefined) {
                const parsedVal = this.parseVal(val);
                __classPrivateFieldSet(this, _DataPage_currentPage, parsedVal, "f");
                if (parsedVal > this.lastPage())
                    __classPrivateFieldSet(this, _DataPage_currentPage, this.lastPage(), "f");
                return __classPrivateFieldGet(this, _DataPage_currentPage, "f");
            }
            return __classPrivateFieldGet(this, _DataPage_currentPage, "f");
        }
        /**
         * @method totalEntries
         * @param {Number|null}
         */
        totalEntries(val) {
            if (val !== undefined)
                __classPrivateFieldSet(this, _DataPage_totalEntries, this.parseUnsignedInt(val), "f");
            return __classPrivateFieldGet(this, _DataPage_totalEntries, "f");
        }
        /**
         * @method entriesOnThisPage
         */
        entriesOnThisPage() {
            if (__classPrivateFieldGet(this, _DataPage_totalEntries, "f") === 0) {
                return 0;
            }
            else {
                return this.last() - this.first() + 1;
            }
        }
        /**
         * @method firstPage
         */
        firstPage() {
            return 1;
        }
        /**
         * @method lastPage
         */
        lastPage() {
            const pages = __classPrivateFieldGet(this, _DataPage_totalEntries, "f") / __classPrivateFieldGet(this, _DataPage_entriesPerPage, "f");
            let lastPage;
            if (pages == parseInt(pages.toString())) {
                lastPage = pages;
            }
            else {
                lastPage = 1 + parseInt(pages.toString());
            }
            if (lastPage < 1)
                lastPage = 1;
            return lastPage;
        }
        /**
         * @method first
         */
        first() {
            if (__classPrivateFieldGet(this, _DataPage_totalEntries, "f") === 0) {
                return 0;
            }
            else {
                return ((__classPrivateFieldGet(this, _DataPage_currentPage, "f") - 1) * __classPrivateFieldGet(this, _DataPage_entriesPerPage, "f")) + 1;
            }
        }
        /**
         * @method last
         */
        last() {
            if (__classPrivateFieldGet(this, _DataPage_currentPage, "f") == this.lastPage()) {
                return __classPrivateFieldGet(this, _DataPage_totalEntries, "f");
            }
            else {
                return (__classPrivateFieldGet(this, _DataPage_currentPage, "f") * __classPrivateFieldGet(this, _DataPage_entriesPerPage, "f"));
            }
        }
        /**
         * @method previousPage
         */
        previousPage() {
            if (__classPrivateFieldGet(this, _DataPage_currentPage, "f") > 1) {
                return __classPrivateFieldGet(this, _DataPage_currentPage, "f") - 1;
            }
            else {
                return undefined;
            }
        }
        /**
         * @method nextPage
         */
        nextPage() {
            return __classPrivateFieldGet(this, _DataPage_currentPage, "f") < this.lastPage() ? __classPrivateFieldGet(this, _DataPage_currentPage, "f") + 1 : undefined;
        }
        /**
         * @method pagesPerPageset
         * @param {Number|null}
         */
        pagesPerPageset(val) {
            if (val !== undefined) {
                __classPrivateFieldSet(this, _DataPage_pagesPerPageset, this.parseVal(val), "f");
                if (__classPrivateFieldGet(this, _DataPage_pagesPerPageset, "f") > this.lastPage())
                    __classPrivateFieldSet(this, _DataPage_pagesPerPageset, this.lastPage(), "f");
            }
            return __classPrivateFieldGet(this, _DataPage_pagesPerPageset, "f");
        }
        /**
         * @method pageset
         * @param {Number|null}
         */
        pageset() {
            let pageAll = [];
            let i;
            let spliceStart = 0;
            const len = __classPrivateFieldGet(this, _DataPage_pagesPerPageset, "f");
            for (i = this.firstPage(); i <= this.lastPage(); i++) {
                pageAll.push(i);
            }
            if (__classPrivateFieldGet(this, _DataPage_currentPage, "f") > parseInt((len / 2).toString())) {
                spliceStart = __classPrivateFieldGet(this, _DataPage_currentPage, "f") - parseInt((len / 2).toString()) - 1;
            }
            if (__classPrivateFieldGet(this, _DataPage_currentPage, "f") + parseInt((len / 2).toString()) > this.lastPage()) {
                spliceStart = this.lastPage() - len;
            }
            if (pageAll.length > len) {
                pageAll = pageAll.splice(spliceStart, len);
            }
            return pageAll;
        }
        /**
         * @method hasNextPageset
         */
        hasNextPageset() {
            return (this.pageset()[__classPrivateFieldGet(this, _DataPage_pagesPerPageset, "f") - 1] !== this.lastPage());
        }
        /**
         * @method hasPreviousPageset
         */
        hasPreviousPageset() {
            return (this.firstPage() !== this.pageset()[0]);
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
    _DataPage_totalEntries = new WeakMap(), _DataPage_entriesPerPage = new WeakMap(), _DataPage_currentPage = new WeakMap(), _DataPage_pagesPerPageset = new WeakMap();

    exports.default = DataPage;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=datapage.js.map
