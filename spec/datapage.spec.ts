// メインのDataPageクラスをインポート
import DataPage from '../src/datapage.js';
import { DataPageType } from '../src/datapage.js';

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
    }).toThrow("Invalid number: foo");
    expect( function () {
      new DataPage(300, "bar" as any, 5, 10);
    }).toThrow("Invalid number: bar");
    expect( function () {
      new DataPage(300, 20, "baz" as any, 10);
    }).toThrow("Invalid number: baz");
    expect( function () {
      new DataPage(300, 20, 5, "fizz" as any);
    }).toThrow("Invalid number: fizz");
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
    expect( function(){pager.entries_per_page('hoge' as any)} ).toThrow('Invalid number: hoge');
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
    expect( function(){pager.current_page(0) }).toThrow('Number must be positive: 0');
    expect( function(){pager.current_page('hoge' as any)} ).toThrow('Invalid number: hoge');
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
    expect( function(){pager.total_entries('fuga' as any)} ).toThrow('Invalid number: fuga');
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