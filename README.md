Charlatan
=========

This port of Perl's Data::Faker library, that generates fake data such as names, addresses, and phone numbers.

See [API Documentation](http://shkuropat.github.com/Charlatan) for more details.

# Installation

Install Charlatan from npm registry:

    $ npm install charlatan

Or install bleeding edge version from GitHub repo:

    $ git clone git://github.com/shkuropat/Charlatan.git ./node_modules/charlatan

# Usage

```javascript
'use strict';

var Charlatan = require('charlatan');

var name    = Charlatan.Name.name();       // Maybell Kunde II
var email   = Charlatan.Internet.email();  // Walter.Dibbert@leslie.biz
var company = Charlatan.Company.name();    // Lehner and Daughters
```


# Credits

Author [Eugene Shkuropat](https://github.com/shkuropat)

Initially started as fork of [Faker.js](https://github.com/Marak/Faker.js)

Released under the MIT license. See [LICENSE][license] for details.

[license]:  https://raw.github.com/shkuropat/Charlatan/master/LICENSE/master/LICENSE
