Charlatan
=========

This is node.js port of Perl's Data::Faker library,
that generates fake data such as names, addresses, and phone numbers.
But now it little bit closer to ruby [version](https://github.com/stympy/faker).

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

# Locales

Different country has different data formats.
Charlatan support locales as solution of this problem.

```javascript
'use strict';

var Charlatan = require('charlatan');
Charlatan.setLocale('en-us');
```

If locale not found, then fallbacks to base language (and then to `en`), for example `ru_RU -> ru -> en`.
Avaliable locales see [here](https://github.com/shkuropat/Charlatan/tree/master/config/locales).
Also you can use your own locale

```javascript
var Charlatan = require('charlatan');
Charlatan.addLocale(myLocaleName, myLocaleFile);
Charlatan.setLocale(myLocaleName);
```

# Credits

Author [Eugene Shkuropat](https://github.com/shkuropat)

Initially started as fork of [Faker.js](https://github.com/Marak/Faker.js)

Initially locales fetched from ruby [Faker](https://github.com/stympy/faker)

Released under the MIT license. See [LICENSE][license] for details.

[license]:  https://raw.github.com/shkuropat/Charlatan/master/LICENSE/master/LICENSE
