Charlatan
=========

[![build status](https://secure.travis-ci.org/shkuropat/Charlatan.png)](http://travis-ci.org/shkuropat/Charlatan)

This is node.js port of ruby's Faker [library](https://github.com/stympy/faker),
that generates fake data such as names, addresses and phone numbers.

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

var name    = Charlatan.Name.name();       // Joshua Lemke MD
var email   = Charlatan.Internet.email();  // glover_ii@voluptas.name
var company = Charlatan.Company.name();    // Wilkinson LLC
```

# Locales

Different country has different data formats.
Charlatan support locales as solution of this problem.

Avaliable locales see [here](https://github.com/shkuropat/Charlatan/tree/master/config/locales), `en` is [default](https://github.com/shkuropat/Charlatan/blob/master/config/locales/en-au.yml).

```javascript
'use strict';

var Charlatan = require('charlatan');
Charlatan.setLocale('en-us');
Charlatan.Name.name();
```
Also you can use your own locale in yaml, json or plain hash.
Yaml format see [here](https://github.com/shkuropat/Charlatan/blob/master/config/locales/en.yml)


```javascript
var Charlatan = require('charlatan');
Charlatan.addLocale(myLocaleName, myLocaleFile);
Charlatan.setLocale(myLocaleName);
Charlatan.Name.name();
```

*Note:* If some phrase not found in current locale, then fallbacks to base language (and then to `en`), for example `ru_RU -> ru -> en`.

# Contributing

Use one topic branch per pull request.

Do not commit to master in your fork.

Provide a clean branch without any merge commits from upstream.

You can install all developer dependencies by `make dev-deps` command.

Use `make test` before commit.

*Note:* Pre-compiled locales stored in `./locales`, remove it before patching package locales.

# Credits

Author [Eugene Shkuropat](https://github.com/shkuropat)

Initially started as fork of [Faker.js](https://github.com/Marak/Faker.js)

Released under the MIT license. See [LICENSE][license] for details.

[license]:  https://raw.github.com/shkuropat/Charlatan/master/LICENSE/master/LICENSE
