// 型定義
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

// ES6 Class実装
class DataPage implements DataPageType {
  #total_entries: number;
  #entries_per_page: number;
  #current_page: number;
  #pages_per_pageset: number;

  // 後方互換性のためのpublicプロパティ
  get _total_entries(): number { return this.#total_entries; }
  set _total_entries(value: number) { this.#total_entries = value; }
  
  get _entries_per_page(): number { return this.#entries_per_page; }
  set _entries_per_page(value: number) { this.#entries_per_page = value; }
  
  get _current_page(): number { return this.#current_page; }
  set _current_page(value: number) { this.#current_page = value; }
  
  get _pages_per_pageset(): number { return this.#pages_per_pageset; }
  set _pages_per_pageset(value: number) { this.#pages_per_pageset = value; }

  constructor(total_entries?: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number) {
    this.#total_entries     = total_entries || 0;
    this.#entries_per_page  = entries_per_page || 10;
    this.#current_page      = current_page || 1;
    this.#pages_per_pageset = pages_per_pageset || 10;

    this.#total_entries     = this.parseUnsignedInt( this.#total_entries );
    this.#entries_per_page  = this.parseVal( this.#entries_per_page );
    this.#current_page      = this.parseVal( this.#current_page );
    this.#pages_per_pageset = this.parseVal( this.#pages_per_pageset );
  }

  /**
   * @method entries_per_page
   * @param {Number|null}
   */
  entries_per_page(val?: number): number {
    if(val !== undefined){
      this._entries_per_page = this.parseVal(val);
    }
    return this._entries_per_page;
  }

  /**
   * @method current_page
   * @param {Number|null}
   */
  current_page(val?: number): number {
    if(val !== undefined){
      const parsedVal = this.parseVal(val);
      this._current_page = parsedVal;
      if(parsedVal > this.last_page())
        this._current_page = this.last_page();
      return this._current_page;
    }
    return this._current_page;
  }

  /**
   * @method total_entries
   * @param {Number|null}
   */
  total_entries(val?: number): number {
    if(val !== undefined)
      this._total_entries = this.parseUnsignedInt(val);
    return this._total_entries;
  }

  /**
   * @method entries_on_this_page
   */
  entries_on_this_page(): number {
    if(this.total_entries() === 0){
      return 0;
    }else{
      return this.last() - this.first() + 1;
    }
  }

  /**
   * @method first_page
   */
  first_page(): number {
    return 1;
  }

  /**
   * @method last_page
   */
  last_page(): number {
    const pages = this.total_entries() / this.entries_per_page();
    let last_page: number;
    if( pages == parseInt(pages.toString()) ){
      last_page = pages;
    }else{
      last_page = 1+ parseInt(pages.toString());
    }
    if( last_page < 1)
      last_page = 1;
    return last_page;
  }

  /**
   * @method first
   */
  first(): number {
    if(this.total_entries() === 0){
      return 0;
    }else{
      return ( (this.current_page() - 1) * this.entries_per_page() ) + 1;
    }
  }

  /**
   * @method last
   */
  last(): number {
    if( this.current_page() == this.last_page() ){
      return this.total_entries();
    } else {
      return ( this.current_page() * this.entries_per_page() );
    }
  }

  /**
   * @method previous_page
   */
  previous_page(): number | undefined {
    if( this.current_page() > 1 ){
      return this.current_page() - 1;
    } else {
      return undefined;
    }
  }

  /**
   * @method next_page
   */
  next_page(): number | undefined {
    return this.current_page() < this.last_page() ? this.current_page() + 1 : undefined;
  }

  /**
   * @method pages_per_pageset
   * @param {Number|null}
   */
  pages_per_pageset(val?: number): number {
    if(val !== undefined){
      this._pages_per_pageset = this.parseVal(val);
      if( this._pages_per_pageset > this.last_page() )
        this._pages_per_pageset = this.last_page();
    }
    return this._pages_per_pageset;
  }

  /**
   * @method pageset
   * @param {Number|null}
   */
  pageset(): number[] {
    let page_all: number[] = [];
    let i: number;
    let splice_start: number = 0;
    const len = this.pages_per_pageset();

    for(i = this.first_page(); i <= this.last_page(); i++){
      page_all.push(i);
    }
    if( this.current_page() > parseInt((len/2).toString()) ){
      splice_start = this.current_page() - parseInt((len/2).toString()) - 1;
    }

    if( this.current_page() + parseInt((len/2).toString()) > this.last_page() ){
      splice_start = this.last_page() - len;
    }

    if(page_all.length > len){
      page_all = page_all.splice(splice_start, len);
    }

    return page_all;
  }

  /**
   * @method has_next_pageset
   */
  has_next_pageset(): boolean {
    return  (this.pageset()[ this.pages_per_pageset() - 1] !== this.last_page() ); 
  }

  /**
   * @method has_previous_pageset
   */
  has_previous_pageset(): boolean {
    return (this.first_page() !== this.pageset()[0]);
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
//export { DataPage };  // CommonJS named export対応
export type { DataPageType };