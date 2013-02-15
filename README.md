Charlatan
=========

[![Build Status](https://travis-ci.org/nodeca/charlatan.png?branch=master)](https://travis-ci.org/nodeca/charlatan)

This is node.js port of ruby's [Faker](https://github.com/stympy/faker) library,
that generates fake identities for names, addresses, phone numbers, emails and others.

See [API Documentation](http://nodeca.github.com/charlatan) for details.

# Installation

Install Charlatan from npm registry:

    $ npm install charlatan


# Usage

```javascript
var Charlatan = require('charlatan');

var name    = Charlatan.Name.name();       // Joshua Lemke MD
var email   = Charlatan.Internet.email();  // glover_ii@voluptas.name
var company = Charlatan.Company.name();    // Wilkinson LLC
```

# Locales

Different countries have different data formats. Charlatan support locales as solution of this problem.

Currently available locales are [here](https://github.com/nodeca/charlatan/tree/master/lib/locales),
`en` is [default](https://github.com/nodeca/charlatan/blob/master/lib/locales/en.yml).

```javascript
var Charlatan = require('charlatan');
Charlatan.setLocale('en-us');
Charlatan.Name.name();
```

Also you can use your own locale in yaml, json or plain hash.

```javascript
var Charlatan = require('charlatan');
Charlatan.addLocale(myLocaleName, myLocaleFile);
Charlatan.setLocale(myLocaleName);
Charlatan.Name.name();
```

__Note__: If phrase not found in current locale, charlatan tries to then fallback into to base language, 
and then to `en`. For example `ru_RU -> ru -> en`.


# Credits

Author [Eugene Shkuropat](https://github.com/shkuropat)

Released under the MIT license. See [LICENSE][license] for details.

[license]:  https://raw.github.com/nodeca/charlatan/master/LICENSE
