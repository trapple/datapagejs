// 型定義
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

// ES6 Class実装
class DataPage implements DataPageType {
  #totalEntries: number;
  #entriesPerPage: number;
  #currentPage: number;
  #pagesPerPageset: number;

  constructor(total_entries?: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number) {
    this.#totalEntries     = total_entries || 0;
    this.#entriesPerPage  = entries_per_page || 10;
    this.#currentPage      = current_page || 1;
    this.#pagesPerPageset = pages_per_pageset || 10;

    this.#totalEntries     = this.parseUnsignedInt( this.#totalEntries );
    this.#entriesPerPage  = this.parseVal( this.#entriesPerPage );
    this.#currentPage      = this.parseVal( this.#currentPage );
    this.#pagesPerPageset = this.parseVal( this.#pagesPerPageset );
  }

  /**
   * @method entriesPerPage
   * @param {Number|null}
   */
  entriesPerPage(val?: number): number {
    if(val !== undefined){
      this.#entriesPerPage = this.parseVal(val);
    }
    return this.#entriesPerPage;
  }

  /**
   * @method currentPage
   * @param {Number|null}
   */
  currentPage(val?: number): number {
    if(val !== undefined){
      const parsedVal = this.parseVal(val);
      this.#currentPage = parsedVal;
      if(parsedVal > this.lastPage())
        this.#currentPage = this.lastPage();
      return this.#currentPage;
    }
    return this.#currentPage;
  }

  /**
   * @method totalEntries
   * @param {Number|null}
   */
  totalEntries(val?: number): number {
    if(val !== undefined)
      this.#totalEntries = this.parseUnsignedInt(val);
    return this.#totalEntries;
  }

  /**
   * @method entriesOnThisPage
   */
  entriesOnThisPage(): number {
    if(this.#totalEntries === 0){
      return 0;
    }else{
      return this.last() - this.first() + 1;
    }
  }

  /**
   * @method firstPage
   */
  firstPage(): number {
    return 1;
  }

  /**
   * @method lastPage
   */
  lastPage(): number {
    const pages = this.#totalEntries / this.#entriesPerPage;
    let lastPage: number;
    if( pages == parseInt(pages.toString()) ){
      lastPage = pages;
    }else{
      lastPage = 1+ parseInt(pages.toString());
    }
    if( lastPage < 1)
      lastPage = 1;
    return lastPage;
  }

  /**
   * @method first
   */
  first(): number {
    if(this.#totalEntries === 0){
      return 0;
    }else{
      return ( (this.#currentPage - 1) * this.#entriesPerPage ) + 1;
    }
  }

  /**
   * @method last
   */
  last(): number {
    if( this.#currentPage == this.lastPage() ){
      return this.#totalEntries;
    } else {
      return ( this.#currentPage * this.#entriesPerPage );
    }
  }

  /**
   * @method previousPage
   */
  previousPage(): number | undefined {
    if( this.#currentPage > 1 ){
      return this.#currentPage - 1;
    } else {
      return undefined;
    }
  }

  /**
   * @method nextPage
   */
  nextPage(): number | undefined {
    return this.#currentPage < this.lastPage() ? this.#currentPage + 1 : undefined;
  }

  /**
   * @method pagesPerPageset
   * @param {Number|null}
   */
  pagesPerPageset(val?: number): number {
    if(val !== undefined){
      this.#pagesPerPageset = this.parseVal(val);
      if( this.#pagesPerPageset > this.lastPage() )
        this.#pagesPerPageset = this.lastPage();
    }
    return this.#pagesPerPageset;
  }

  /**
   * @method pageset
   * @param {Number|null}
   */
  pageset(): number[] {
    let pageAll: number[] = [];
    let i: number;
    let spliceStart: number = 0;
    const len = this.#pagesPerPageset;

    for(i = this.firstPage(); i <= this.lastPage(); i++){
      pageAll.push(i);
    }
    if( this.#currentPage > parseInt((len/2).toString()) ){
      spliceStart = this.#currentPage - parseInt((len/2).toString()) - 1;
    }

    if( this.#currentPage + parseInt((len/2).toString()) > this.lastPage() ){
      spliceStart = this.lastPage() - len;
    }

    if(pageAll.length > len){
      pageAll = pageAll.splice(spliceStart, len);
    }

    return pageAll;
  }

  /**
   * @method hasNextPageset
   */
  hasNextPageset(): boolean {
    return  (this.pageset()[ this.#pagesPerPageset - 1] !== this.lastPage() ); 
  }

  /**
   * @method hasPreviousPageset
   */
  hasPreviousPageset(): boolean {
    return (this.firstPage() !== this.pageset()[0]);
  }

  parseVal(val: any): number {
    const parsed = parseInt(val);
    if(isNaN(parsed) ){
      throw new Error(`Invalid number: ${val}`);
    }
    if(parsed < 1) {
      throw new Error(`Number must be positive: ${parsed}`);
    }
    return parsed;
  }

  parseUnsignedInt(val: any): number {
    const parsed = parseInt(val);
    if(isNaN(parsed))
      throw new Error(`Invalid number: ${val}`);
    return parsed;
  }
}

// ES Module export
export default DataPage;
export type { DataPageType };