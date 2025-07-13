// メインのDataPageクラスをインポート
import DataPage from '../src/datapage.js';
import { DataPageType } from '../src/datapage.js';

describe("DataPage", function () {

  it('no args', function () {
    const pager: DataPageType = new DataPage();
    expect( pager.totalEntries() ).toEqual(0);
    expect( pager.entriesPerPage() ).toEqual(10);
    expect( pager.currentPage() ).toEqual(1);
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
    expect( pager.totalEntries() ).toEqual(500);
    expect( pager.entriesPerPage() ).toEqual(20);
    expect( pager.currentPage() ).toEqual(3);
    expect( pager.pagesPerPageset() ).toEqual(5);
  });

  it('entries_per_page', function () { 
    const pager: DataPageType = new DataPage();
    pager.entriesPerPage(5);
    expect( pager.entriesPerPage() ).toEqual(5);

    pager.entriesPerPage(3.5);
    expect( pager.entriesPerPage() ).toEqual(3);

    pager.entriesPerPage("5" as any);
    expect( pager.entriesPerPage() ).toEqual(5);

    expect( function(){pager.entriesPerPage(0)} ).toThrow();
    expect( function(){pager.entriesPerPage('hoge' as any)} ).toThrow('Invalid number: hoge');
  });

  it('current_page', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(100);
    pager.entriesPerPage(20);

    pager.currentPage(2);
    expect( pager.currentPage() ).toEqual(2);

    pager.currentPage("2" as any);
    expect( pager.currentPage() ).toEqual(2);

    pager.entriesPerPage(20);
    pager.currentPage(6);
    expect( pager.currentPage() ).toEqual(5);

    pager.currentPage(4.5);
    expect( pager.currentPage() ).toEqual(4);
    expect( function(){pager.currentPage(0) }).toThrow('Number must be positive: 0');
    expect( function(){pager.currentPage('hoge' as any)} ).toThrow('Invalid number: hoge');
  });

  it('total_entries', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(400);    
    expect( pager.totalEntries() ).toEqual(400);

    pager.totalEntries(4.5);
    expect( pager.totalEntries() ).toEqual(4);

    pager.totalEntries("400" as any);    
    expect( pager.totalEntries() ).toEqual(400);

    pager.totalEntries(0);
    expect( pager.totalEntries() ).toEqual(0);
    expect( function(){pager.totalEntries('fuga' as any)} ).toThrow('Invalid number: fuga');
  });

  it('entries_on_this_page', function () {
    const total_entries: number = 315,
        entries_per_page: number = 10,
        current_page: number = 2,
        pages_per_pageset: number = 5;
    const pager: DataPageType = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
    expect( pager.entriesOnThisPage() ).toEqual(10);
  });

  it('entries_on_this_page with lastpage', function () {
    const total_entries: number = 315,
        entries_per_page: number = 10,
        current_page: number = 32,
        pages_per_pageset: number = 5;
    const pager: DataPageType = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
    expect( pager.entriesOnThisPage() ).toEqual(5);
  });

  it('first_page', function () {
    const pager: DataPageType = new DataPage();
    expect( pager.firstPage() ).toEqual(1);
  });

  it('last_page', function () {
    const pager: DataPageType = new DataPage(500, 30, 1);
    expect( pager.lastPage() ).toEqual(17); 

    pager.totalEntries(600);
    pager.entriesPerPage(30);
    expect( pager.lastPage() ).toEqual(20); 

    pager.totalEntries(0);
    pager.entriesPerPage(30);
    expect( pager.lastPage() ).toEqual(1); 
    
    pager.totalEntries(3);
    pager.entriesPerPage(30);
    expect( pager.lastPage() ).toEqual(1); 
  });

  it('first', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(0);
    expect( pager.first() ).toEqual(0);

    pager.totalEntries(335);
    pager.entriesPerPage(30);
    pager.currentPage(1);
    expect(pager.first()).toEqual(1);

    pager.currentPage(2);
    expect(pager.first()).toEqual(31);

    pager.currentPage(12);
    expect(pager.first()).toEqual(331);
  });
  
  it('last', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(0);
    expect( pager.last() ).toEqual(0);

    pager.totalEntries(335);
    pager.entriesPerPage(30);
    pager.currentPage(1);
    expect(pager.last()).toEqual(30);

    pager.currentPage(2);
    expect(pager.last()).toEqual(60);

    pager.currentPage(12);
    expect(pager.last()).toEqual(335);
  });

  it('previous_page', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(300);
    pager.entriesPerPage(15);
    pager.currentPage(5);
    expect( pager.previousPage() ).toEqual(4);

    pager.currentPage(1);
    expect( pager.previousPage() ).toEqual(undefined);
  });

  it('next_page', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(50);
    pager.entriesPerPage(25);
    pager.currentPage(2);
    expect( pager.nextPage() ).toEqual(undefined);

    pager.currentPage(1);
    expect( pager.nextPage() ).toEqual(2);
  });

  it('pages_per_pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.currentPage(15);
    pager.pagesPerPageset(10);
    expect( pager.pagesPerPageset() ).toEqual(10);

    pager.pagesPerPageset(100);
    expect( pager.pagesPerPageset() ).toEqual(100);

    pager.pagesPerPageset(101);
    expect( pager.pagesPerPageset() ).toEqual(100);

    pager.pagesPerPageset("5" as any);
    expect( pager.pagesPerPageset() ).toEqual(5);
  });

  it('pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.pagesPerPageset(10);
    pager.currentPage(1);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.currentPage(2);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.currentPage(3);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.currentPage(4);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.currentPage(5);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.currentPage(6);
    expect( pager.pageset() ).toEqual( [1,2,3,4,5,6,7,8,9,10] );
    pager.currentPage(7);
    expect( pager.pageset() ).toEqual( [2,3,4,5,6,7,8,9,10,11] );
    pager.currentPage(100);
    expect( pager.pageset() ).toEqual( [91,92,93,94,95,96,97,98,99,100] );
    pager.currentPage(96);
    expect( pager.pageset() ).toEqual( [91,92,93,94,95,96,97,98,99,100] );
    pager.currentPage(95);
    expect( pager.pageset() ).toEqual( [90,91,92,93,94,95,96,97,98,99] );
    pager.currentPage(94);
    expect( pager.pageset() ).toEqual( [89,90,91,92,93,94,95,96,97,98] );
    //console.log(pager.pageset());
  });

  it('has_next_pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.pagesPerPageset(10);
    pager.currentPage(100);
    expect( pager.hasNextPageset() ).toEqual( false );   
    pager.currentPage(95);
    expect( pager.hasNextPageset() ).toEqual( true );   
  });

  it('has_previous_pageset', function () {
    const pager: DataPageType = new DataPage();
    pager.totalEntries(500);
    pager.entriesPerPage(5);
    pager.pagesPerPageset(10);
    pager.currentPage(7);
    expect( pager.hasPreviousPageset() ).toEqual( true );   
    pager.currentPage(6);
    expect( pager.hasPreviousPageset() ).toEqual( false );   
     
  });
});