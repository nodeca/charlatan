Charlatan
=========

[![Build Status](https://img.shields.io/travis/nodeca/charlatan/master.svg?style=flat)](https://travis-ci.org/nodeca/charlatan)
[![NPM version](https://img.shields.io/npm/v/charlatan.svg?style=flat)](https://www.npmjs.org/package/charlatan)


> Fake identities generator for node.js (names, addresses, phones, IPs and others).

This is node.js port of ruby's [Faker](https://github.com/stympy/faker) library
(v1.4.3 now), that generates fake identities for names, addresses, phone numbers,
emails and others.

[API Documentation](http://nodeca.github.com/charlatan).


Installation
------------

```bash
$ npm install charlatan
```


Usage
-----

```js
var Charlatan = require('charlatan');

var name    = Charlatan.Name.name();       // Joshua Lemke MD
var email   = Charlatan.Internet.email();  // glover_ii@voluptas.name
var company = Charlatan.Company.name();    // Wilkinson LLC
```


Locales
-------

Different countries have different data formats. Charlatan support locales as
solution of this problem.

Currently available locales are [here](https://github.com/nodeca/charlatan/tree/master/lib/locales),
`en` is [default](https://github.com/nodeca/charlatan/blob/master/lib/locales/en.yml).

```js
var Charlatan = require('charlatan');
Charlatan.setLocale('en-US');
Charlatan.Name.name();
```

Also you can use your own locale in yaml, json or plain hash.

```js
var Charlatan = require('charlatan');
Charlatan.addLocale(myLocaleName, myLocaleFile);
Charlatan.setLocale(myLocaleName);
Charlatan.Name.name();
```

__Note__: If phrase not found in current locale, charlatan tries to then
fallback into to base language, and then to `en`. For example `ru-RU -> ru -> en`.


Credits
-------

Author [Eugene Shkuropat](https://github.com/shkuropat)

[MIT](https://raw.github.com/nodeca/charlatan/master/LICENSE) license.
