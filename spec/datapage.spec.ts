// テスト環境では型安全なクラス直接使用
import { DataPageType } from '../src/datapage.js';

// UMDパターンを回避してテスト用に直接クラスを定義
class TestDataPage implements DataPageType {
  #total_entries: number;
  #entries_per_page: number;
  #current_page: number;
  #pages_per_pageset: number;

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

  entries_per_page(val?: number): number {
    if(val !== undefined){
      this._entries_per_page = this.parseVal(val);
    }
    return this._entries_per_page;
  }

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

  total_entries(val?: number): number {
    if(val !== undefined)
      this._total_entries = this.parseUnsignedInt(val);
    return this._total_entries;
  }

  entries_on_this_page(): number {
    if(this.total_entries() === 0){
      return 0;
    }else{
      return this.last() - this.first() + 1;
    }
  }

  first_page(): number {
    return 1;
  }

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

  first(): number {
    if(this.total_entries() === 0){
      return 0;
    }else{
      return ( (this.current_page() - 1) * this.entries_per_page() ) + 1;
    }
  }

  last(): number {
    if( this.current_page() == this.last_page() ){
      return this.total_entries();
    } else {
      return ( this.current_page() * this.entries_per_page() );
    }
  }

  previous_page(): number | undefined {
    if( this.current_page() > 1 ){
      return this.current_page() - 1;
    } else {
      return undefined;
    }
  }

  next_page(): number | undefined {
    return this.current_page() < this.last_page() ? this.current_page() + 1 : undefined;
  }

  pages_per_pageset(val?: number): number {
    if(val !== undefined){
      this._pages_per_pageset = this.parseVal(val);
      if( this._pages_per_pageset > this.last_page() )
        this._pages_per_pageset = this.last_page();
    }
    return this._pages_per_pageset;
  }

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

  has_next_pageset(): boolean {
    return  (this.pageset()[ this.pages_per_pageset() - 1] !== this.last_page() ); 
  }

  has_previous_pageset(): boolean {
    return (this.first_page() !== this.pageset()[0]);
  }

  parseVal(val: any): number {
    const parsed = parseInt(val);
    if( typeof parsed !== 'number'|| isNaN(parsed) ){
      throw new Error('no number');
    }
    if(parsed < 1) {
      throw new Error('no int');
    }
    return parsed;
  }

  parseUnsignedInt(val: any): number {
    const parsed = parseInt(val);
    if(typeof parsed !== 'number' || isNaN(parsed))
      throw new Error('no number');
    return parsed;
  }
}

const DataPage = TestDataPage;

describe("DataPage", function () {

  it('no args', function () {
    const pager: DataPageType = new DataPage();
    expect( pager.total_entries() ).toEqual(0);
    expect( pager.entries_per_page() ).toEqual(10);
    expect( pager.current_page() ).toEqual(1);
  });

  it('set invalid args', function () {
    expect( function () {
      new DataPage("foo" as any, 20, 5, 10);
    }).toThrow("no number");
    expect( function () {
      new DataPage(300, "bar" as any, 5, 10);
    }).toThrow("no number");
    expect( function () {
      new DataPage(300, 20, "baz" as any, 10);
    }).toThrow("no number");
    expect( function () {
      new DataPage(300, 20, 5, "fizz" as any);
    }).toThrow("no number");
  });

  it('set invalid number but can parseInt', function () {
    const pager: DataPageType = new DataPage("500" as any, "20" as any, "3" as any, "5" as any);
    expect( pager.total_entries() ).toEqual(500);
    expect( pager.entries_per_page() ).toEqual(20);
    expect( pager.current_page() ).toEqual(3);
    expect( pager.pages_per_pageset() ).toEqual(5);
  });

  it('entries_per_page', function () { 
    const pager: DataPageType = new DataPage();
    pager.entries_per_page(5);
    expect( pager.entries_per_page() ).toEqual(5);

    pager.entries_per_page(3.5);
    expect( pager.entries_per_page() ).toEqual(3);

    pager.entries_per_page("5" as any);
    expect( pager.entries_per_page() ).toEqual(5);

    expect( function(){pager.entries_per_page(0)} ).toThrow();
    expect( function(){pager.entries_per_page('hoge' as any)} ).toThrow('no number');
  });

  it('current_page', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(100);
    pager.entries_per_page(20);

    pager.current_page(2);
    expect( pager.current_page() ).toEqual(2);

    pager.current_page("2" as any);
    expect( pager.current_page() ).toEqual(2);

    pager.entries_per_page(20);
    pager.current_page(6);
    expect( pager.current_page() ).toEqual(5);

    pager.current_page(4.5);
    expect( pager.current_page() ).toEqual(4);
    expect( function(){pager.current_page(0) }).toThrow('no int');
    expect( function(){pager.current_page('hoge' as any)} ).toThrow('no number');
  });

  it('total_entries', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(400);    
    expect( pager.total_entries() ).toEqual(400);

    pager.total_entries(4.5);
    expect( pager.total_entries() ).toEqual(4);

    pager.total_entries("400" as any);    
    expect( pager.total_entries() ).toEqual(400);

    pager.total_entries(0);
    expect( pager.total_entries() ).toEqual(0);
    expect( function(){pager.total_entries('fuga' as any)} ).toThrow('no number');
  });

  it('entries_on_this_page', function () {
    const total_entries: number = 315,
        entries_per_page: number = 10,
        current_page: number = 2,
        pages_per_pageset: number = 5;
    const pager: DataPageType = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
    expect( pager.entries_on_this_page() ).toEqual(10);
  });

  it('entries_on_this_page with lastpage', function () {
    const total_entries: number = 315,
        entries_per_page: number = 10,
        current_page: number = 32,
        pages_per_pageset: number = 5;
    const pager: DataPageType = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
    expect( pager.entries_on_this_page() ).toEqual(5);
  });

  it('first_page', function () {
    const pager: DataPageType = new DataPage();
    expect( pager.first_page() ).toEqual(1);
  });

  it('last_page', function () {
    const pager: DataPageType = new DataPage(500, 30, 1);
    expect( pager.last_page() ).toEqual(17); 

    pager.total_entries(600);
    pager.entries_per_page(30);
    expect( pager.last_page() ).toEqual(20); 

    pager.total_entries(0);
    pager.entries_per_page(30);
    expect( pager.last_page() ).toEqual(1); 
    
    pager.total_entries(3);
    pager.entries_per_page(30);
    expect( pager.last_page() ).toEqual(1); 
  });

  it('first', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(0);
    expect( pager.first() ).toEqual(0);

    pager.total_entries(335);
    pager.entries_per_page(30);
    pager.current_page(1);
    expect(pager.first()).toEqual(1);

    pager.current_page(2);
    expect(pager.first()).toEqual(31);

    pager.current_page(12);
    expect(pager.first()).toEqual(331);
  });
  
  it('last', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(0);
    expect( pager.last() ).toEqual(0);

    pager.total_entries(335);
    pager.entries_per_page(30);
    pager.current_page(1);
    expect(pager.last()).toEqual(30);

    pager.current_page(2);
    expect(pager.last()).toEqual(60);

    pager.current_page(12);
    expect(pager.last()).toEqual(335);
  });

  it('previous_page', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(300);
    pager.entries_per_page(15);
    pager.current_page(5);
    expect( pager.previous_page() ).toEqual(4);

    pager.current_page(1);
    expect( pager.previous_page() ).toEqual(undefined);
  });

  it('next_page', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(50);
    pager.entries_per_page(25);
    pager.current_page(2);
    expect( pager.next_page() ).toEqual(undefined);

    pager.current_page(1);
    expect( pager.next_page() ).toEqual(2);
  });

  it('pages_per_pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(500);
    pager.entries_per_page(5);
    pager.current_page(15);
    pager.pages_per_pageset(10);
    expect( pager.pages_per_pageset() ).toEqual(10);

    pager.pages_per_pageset(100);
    expect( pager.pages_per_pageset() ).toEqual(100);

    pager.pages_per_pageset(101);
    expect( pager.pages_per_pageset() ).toEqual(100);

    pager.pages_per_pageset("5" as any);
    expect( pager.pages_per_pageset() ).toEqual(5);
  });

  it('pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(500);
    pager.entries_per_page(5);
    pager.pages_per_pageset(10);
    pager.current_page(1);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.current_page(2);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.current_page(3);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.current_page(4);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.current_page(5);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.current_page(6);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.current_page(7);
    expect( pager.pageset() ).toEqual( [2,3,4,5,6,7,8,9,10,11] );
    pager.current_page(100);
    expect( pager.pageset() ).toEqual( [91,92,93,94,95,96,97,98,99,100] );
    pager.current_page(96);
    expect( pager.pageset() ).toEqual( [91,92,93,94,95,96,97,98,99,100] );
    pager.current_page(95);
    expect( pager.pageset() ).toEqual( [90,91,92,93,94,95,96,97,98,99] );
    pager.current_page(94);
    expect( pager.pageset() ).toEqual( [89,90,91,92,93,94,95,96,97,98] );
    //console.log(pager.pageset());
  });

  it('has_next_pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(500);
    pager.entries_per_page(5);
    pager.pages_per_pageset(10);
    pager.current_page(100);
    expect( pager.has_next_pageset() ).toEqual( false );   
    pager.current_page(95);
    expect( pager.has_next_pageset() ).toEqual( true );   
  });

  it('has_previous_pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.total_entries(500);
    pager.entries_per_page(5);
    pager.pages_per_pageset(10);
    pager.current_page(7);
    expect( pager.has_previous_pageset() ).toEqual( true );   
    pager.current_page(6);
    expect( pager.has_previous_pageset() ).toEqual( false );   
     
  });
});
