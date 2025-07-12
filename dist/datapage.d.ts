interface DataPage {
    _total_entries: number;
    _entries_per_page: number;
    _current_page: number;
    _pages_per_pageset: number;
    entries_per_page(val?: number): number;
    current_page(val?: number): number;
    total_entries(val?: number): number;
    entries_on_this_page(): number;
    first_page(): number;
    last_page(): number;
    first(): number;
    last(): number;
    previous_page(): number | undefined;
    next_page(): number | undefined;
    pages_per_pageset(val?: number): number;
    pageset(): number[];
    has_next_pageset(): boolean;
    has_previous_pageset(): boolean;
    parseVal(val: any): number;
    parseUnsignedInt(val: any): number;
}
interface DataPageConstructor {
    new (total_entries?: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number): DataPage;
    prototype: DataPage;
}
declare const _default: DataPageConstructor;
export default _default;
//# sourceMappingURL=datapage.d.ts.map