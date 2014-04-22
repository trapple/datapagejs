DataPage - Simple Pagenation Data Object 
==================================================

[![Build Status](https://travis-ci.org/trapple/datapagejs.svg?branch=master)](https://travis-ci.org/trapple/datapagejs)

SYNOPSIS
--------------------------------------

```
new DataPage();

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
pager.entries_per_page(15)
// get
pager.entries_per_page();
```

### current_page
```
// set
pager.current_page(2)
// get
pager.current_page();
```

### total_entries ( set | get )

### entries_on_this_page ( set | get )

### first_page

### last_page

### fast

### last

### previous_page

### next_page

### pages_per_pageset ( set | get )

### pageset

### has_next_pageset

### has_previous_pageset
