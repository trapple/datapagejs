DataPage.js - Simple Pagenation Data Object 
==================================================

[![Build Status](https://travis-ci.org/trapple/datapagejs.svg?branch=master)](https://travis-ci.org/trapple/datapagejs)

SYNOPSIS
--------------------------------------

```
var pager = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
pager.first_page();
pager.last_page();
pager.first();
pager.last();

pager.pageset() // 1,2,3,4,5...


// default value
// total_entries || 0
// entries_per_page || 10
// current_page || 1
// pages_per_pageset || 10

```

INSTALL
--------------------------------------

### Node

```
$ npm install datapage
```

Then:

```
var DataPage = require('datapage');
```

### Browser

```
bower install datapage
```
Then:

```
<script src="datapage.js"></script>
```

METHODS
--------------------------------------
### new

```
new DataPage();
new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
// default value
// total_entries || 0
// entries_per_page || 10
// current_page || 1
// pages_per_pageset || 10

```

### entries_per_page
sets or gets the total number of entries per page (which defaults 10)

```
// set
pager.entries_per_page(15);
// get
pager.entries_per_page();
```

### current_page
```
// set
pager.current_page(2);
// get
pager.current_page();
```

### total_entries ( set | get )

```
// set
pager.total_entries(300);
// get
pager.pager.total_entries();
```

### entries_on_this_page

```
var total_entries = 300,
	entries_per_page = 10,
	current_page = 2,
	pages_per_pageset = 5;
var pager = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
pager.entries_on_this_page(); // returns 10
```

```
var total_entries = 317,
	entries_per_page = 10,
	current_page = 32,
	pages_per_pageset = 5;
var pager = new DataPage(total_entries, entries_per_page, current_page, pages_per_pageset);
pager.entries_on_this_page(); // returns 7
```

### first_page

always returns 1

### last_page

```
var pager = new DataPage(500, 30, 1); 
pager.last_page(); returns 17
```

### fast

### last

### previous_page

### next_page

### pages_per_pageset ( set | get )

### pageset

### has_next_pageset

### has_previous_pageset

SEE ALSO
--------------------------------------
This software has been ported from [Data::Page](http://search.cpan.org/~lbrocard/Data-Page/lib/Data/Page.pm)


COPYRIGHT
--------------------------------------
&copy; 2014 trapple


LICENSE
--------------------------------------
The "Artistic License"

