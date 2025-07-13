interface DataPageType {
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
declare class DataPage implements DataPageType {
    #private;
    get _total_entries(): number;
    set _total_entries(value: number);
    get _entries_per_page(): number;
    set _entries_per_page(value: number);
    get _current_page(): number;
    set _current_page(value: number);
    get _pages_per_pageset(): number;
    set _pages_per_pageset(value: number);
    constructor(total_entries?: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number);
    /**
     * @method entries_per_page
     * @param {Number|null}
     */
    entries_per_page(val?: number): number;
    /**
     * @method current_page
     * @param {Number|null}
     */
    current_page(val?: number): number;
    /**
     * @method total_entries
     * @param {Number|null}
     */
    total_entries(val?: number): number;
    /**
     * @method entries_on_this_page
     */
    entries_on_this_page(): number;
    /**
     * @method first_page
     */
    first_page(): number;
    /**
     * @method last_page
     */
    last_page(): number;
    /**
     * @method first
     */
    first(): number;
    /**
     * @method last
     */
    last(): number;
    /**
     * @method previous_page
     */
    previous_page(): number | undefined;
    /**
     * @method next_page
     */
    next_page(): number | undefined;
    /**
     * @method pages_per_pageset
     * @param {Number|null}
     */
    pages_per_pageset(val?: number): number;
    /**
     * @method pageset
     * @param {Number|null}
     */
    pageset(): number[];
    /**
     * @method has_next_pageset
     */
    has_next_pageset(): boolean;
    /**
     * @method has_previous_pageset
     */
    has_previous_pageset(): boolean;
    parseVal(val: any): number;
    parseUnsignedInt(val: any): number;
}
export default DataPage;
export type { DataPageType };
//# sourceMappingURL=datapage.d.ts.map