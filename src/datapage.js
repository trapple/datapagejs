/*
 * DataPage
 * Simple data object for pagenation.
 *
 * http://github.com/trapple/datapagejs
 *
 * Copyright(c)2013 trapple
 * Version 1.0.0
 *
 */
var DataPage = function (total_entries, entries_per_page, current_page, pages_per_pageset) {
  this._total_entries = total_entries || 0;
  this._entries_per_page = entries_per_page || 10;
  this._current_page = current_page || 1;
  this._pages_per_pageset = pages_per_pageset || 10;
};

DataPage.prototype.entries_per_page = function (val) {
  if(val !== undefined){
    this._entries_per_page = this.parseVal(val);
  }
  return this._entries_per_page;
};

DataPage.prototype.current_page = function (val) {
  if(val !== undefined){
    val = this.parseVal(val);
    this._current_page = val
    if(val > this.last_page())
      this._current_page = this.last_page();
    return this._current_page;
  }
  return this._current_page;
};

DataPage.prototype.total_entries = function (val) {
  if(val !== undefined)
    this._total_entries = this.parseUnsignedInt(val);
  return this._total_entries;
};

DataPage.prototype.entries_on_this_page = function () {
  if(this.total_entries() === 0){
    return 0;
  }else{
    return this.last() - this.first();
  }
}


DataPage.prototype.first_page = function () {
  return 1;
};

DataPage.prototype.last_page = function () {
  var pages = this.total_entries() / this.entries_per_page();
  var last_page;
  if( pages == parseInt(pages) ){
    last_page = pages;
  }else{
    last_page = 1+ parseInt(pages);
  }
  if( last_page < 1)
    last_page = 1;
  return last_page;
};

DataPage.prototype.first = function () {
  if(this.total_entries() === 0){
    return 0;
  }else{
    return ( (this.current_page() - 1) * this.entries_per_page() ) + 1;
  }
};

DataPage.prototype.last = function () {
  if( this.current_page() == this.last_page() ){
    return this.total_entries();
  } else {
    return ( this.current_page() * this.entries_per_page() );
  }
};

DataPage.prototype.previous_page = function () {
  if( this.current_page() > 1 ){
    return this.current_page() - 1;
  } else {
    return;
  }
}

DataPage.prototype.next_page = function () {
  return this.current_page() < this.last_page() ? this.current_page() + 1 : undefined;
}

DataPage.prototype.pages_per_pageset = function (val) {
  if(val !== undefined){
    this._pages_per_pageset = this.parseVal(val);
    if( this._pages_per_pageset > this.last_page() )
      this._pages_per_pageset = this.last_page();
  }
  return this._pages_per_pageset;
}

DataPage.prototype.pageset = function () {
  var page_all = [];
  var page_set = [];
  var i;
  var splice_start = 0;
  var len = this.pages_per_pageset();

  for(i = this.first_page(); i <= this.last_page(); i++){
    page_all.push(i);
  }
  if( this.current_page() > parseInt(len/2) ){
    splice_start = this.current_page() - parseInt(len/2) - 1;
  }

  if( this.current_page() + parseInt(len/2) > this.last_page() ){
    splice_start = this.last_page() - len;
  }

  if(page_all.length > len){
    page_all = page_all.splice(splice_start, len);
  }

  return page_all;
}

DataPage.prototype.parseVal = function (val) {
  if(typeof val !== 'number')
    throw new Error('no number');
  if(val < 1)
    throw new Error('no int');
  return parseInt(val);
};

DataPage.prototype.parseUnsignedInt = function (val) {
  if(typeof val !== 'number')
    throw new Error('no number');
  return parseInt(val);
};

