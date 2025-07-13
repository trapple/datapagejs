interface DataPageType {
    entriesPerPage(val?: number): number;
    currentPage(val?: number): number;
    totalEntries(val?: number): number;
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
    parseVal(val: any): number;
    parseUnsignedInt(val: any): number;
}
declare class DataPage implements DataPageType {
    #private;
    constructor(total_entries?: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number);
    /**
     * @method entriesPerPage
     * @param {Number|null}
     */
    entriesPerPage(val?: number): number;
    /**
     * @method currentPage
     * @param {Number|null}
     */
    currentPage(val?: number): number;
    /**
     * @method totalEntries
     * @param {Number|null}
     */
    totalEntries(val?: number): number;
    /**
     * @method entriesOnThisPage
     */
    entriesOnThisPage(): number;
    /**
     * @method firstPage
     */
    firstPage(): number;
    /**
     * @method lastPage
     */
    lastPage(): number;
    /**
     * @method first
     */
    first(): number;
    /**
     * @method last
     */
    last(): number;
    /**
     * @method previousPage
     */
    previousPage(): number | undefined;
    /**
     * @method nextPage
     */
    nextPage(): number | undefined;
    /**
     * @method pagesPerPageset
     * @param {Number|null}
     */
    pagesPerPageset(val?: number): number;
    /**
     * @method pageset
     * @param {Number|null}
     */
    pageset(): number[];
    /**
     * @method hasNextPageset
     */
    hasNextPageset(): boolean;
    /**
     * @method hasPreviousPageset
     */
    hasPreviousPageset(): boolean;
    parseVal(val: any): number;
    parseUnsignedInt(val: any): number;
}
export default DataPage;
export type { DataPageType };
//# sourceMappingURL=datapage.d.ts.map