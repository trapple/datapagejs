// 型定義
interface DataPageInstance {
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
  new (total_entries?: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number): DataPageInstance;
  prototype: DataPageInstance;
}

// UMD パターン
(function (root: any, factory: () => DataPageConstructor) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.DataPage = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

// メインのDataPageコンストラクタ関数
function DataPage(this: DataPageInstance, total_entries?: number, entries_per_page?: number, current_page?: number, pages_per_pageset?: number) {
  this._total_entries     = total_entries || 0;
  this._entries_per_page  = entries_per_page || 10;
  this._current_page      = current_page || 1;
  this._pages_per_pageset = pages_per_pageset || 10;

  this._total_entries     = this.parseUnsignedInt( this._total_entries );
  this._entries_per_page  = this.parseVal( this._entries_per_page );
  this._current_page      = this.parseVal( this._current_page );
  this._pages_per_pageset = this.parseVal( this._pages_per_pageset );
}

/*
 * @method entries_per_page
 * @param {Number|null}
 */
DataPage.prototype.entries_per_page = function (val?: number): number {
  if(val !== undefined){
    this._entries_per_page = this.parseVal(val);
  }
  return this._entries_per_page;
};

/*
 * @method current_page
 * @param {Number|null}
 */
DataPage.prototype.current_page = function (val?: number): number {
  if(val !== undefined){
    const parsedVal = this.parseVal(val);
    this._current_page = parsedVal;
    if(parsedVal > this.last_page())
      this._current_page = this.last_page();
    return this._current_page;
  }
  return this._current_page;
};

/*
 * @method total_entries
 * @param {Number|null}
 */
DataPage.prototype.total_entries = function (val?: number): number {
  if(val !== undefined)
    this._total_entries = this.parseUnsignedInt(val);
  return this._total_entries;
};

/*
 * @method entries_on_this_page
 */
DataPage.prototype.entries_on_this_page = function (): number {
  if(this.total_entries() === 0){
    return 0;
  }else{
    return this.last() - this.first() + 1;
  }
};

/*
 * @method first_page
 */
DataPage.prototype.first_page = function (): number {
  return 1;
};

/*
 * @method last_page
 */
DataPage.prototype.last_page = function (): number {
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
};

/*
 * @method first
 */
DataPage.prototype.first = function (): number {
  if(this.total_entries() === 0){
    return 0;
  }else{
    return ( (this.current_page() - 1) * this.entries_per_page() ) + 1;
  }
};

/*
 * @method last
 */
DataPage.prototype.last = function (): number {
  if( this.current_page() == this.last_page() ){
    return this.total_entries();
  } else {
    return ( this.current_page() * this.entries_per_page() );
  }
};

/*
 * @method previous_page
 */
DataPage.prototype.previous_page = function (): number | undefined {
  if( this.current_page() > 1 ){
    return this.current_page() - 1;
  } else {
    return undefined;
  }
};

/*
 * @method next_page
 */
DataPage.prototype.next_page = function (): number | undefined {
  return this.current_page() < this.last_page() ? this.current_page() + 1 : undefined;
};

/*
 * @method pages_per_pageset
 * @param {Number|null}
 */
DataPage.prototype.pages_per_pageset = function (val?: number): number {
  if(val !== undefined){
    this._pages_per_pageset = this.parseVal(val);
    if( this._pages_per_pageset > this.last_page() )
      this._pages_per_pageset = this.last_page();
  }
  return this._pages_per_pageset;
};

/*
 * @method pageset
 * @param {Number|null}
 */
DataPage.prototype.pageset = function (): number[] {
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
};

/*
 * @method has_next_pageset
 */
DataPage.prototype.has_next_pageset = function (): boolean {
  return  (this.pageset()[ this.pages_per_pageset() - 1] !== this.last_page() ); 
};

/*
 * @method has_previous_pageset
 */
DataPage.prototype.has_previous_pageset = function (): boolean {
  return (this.first_page() !== this.pageset()[0]);
};

DataPage.prototype.parseVal = function (val: any): number {
  const parsed = parseInt(val);
  if( typeof parsed !== 'number'|| isNaN(parsed) ){
    throw new Error('no number');
  }
  if(parsed < 1) {
    throw new Error('no int');
  }
  return parsed;
};

DataPage.prototype.parseUnsignedInt = function (val: any): number {
  const parsed = parseInt(val);
  if(typeof parsed !== 'number' || isNaN(parsed))
    throw new Error('no number');
  return parsed;
};

return DataPage as unknown as DataPageConstructor;
}));

// TypeScript向けの型定義export
export interface DataPageType extends DataPageInstance {}
export interface DataPageConstructorType extends DataPageConstructor {}

// ES Module対応のためのdefault export
declare const DataPageModule: DataPageConstructor;
export default DataPageModule;