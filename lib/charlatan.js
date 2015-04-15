'use strict';

/**
 * class Charlatan
 *
 **/

exports.Address     = require('./charlatan/address');
exports.App         = require('./charlatan/app');
exports.Avatar      = require('./charlatan/avatar');
exports.Bitcoin     = require('./charlatan/bitcoin');
exports.Business    = require('./charlatan/business');
exports.Code        = require('./charlatan/code');
exports.Commerce    = require('./charlatan/commerce');
exports.Company     = require('./charlatan/company');
exports.Date        = require('./charlatan/date');
exports.Finance     = require('./charlatan/finance');
exports.Hacker      = require('./charlatan/hacker');
exports.Internet    = require('./charlatan/internet');
exports.Lorem       = require('./charlatan/lorem');
exports.Name        = require('./charlatan/name');
exports.Number      = require('./charlatan/number');
exports.PhoneNumber = require('./charlatan/phone_number');
exports.Team        = require('./charlatan/team');
var Helpers         = exports.Helpers = require('./charlatan/helpers');

var yaml = require('js-yaml');

var Fs = require('fs');
var Path = require('path');

// locale files {<<locale_name>>: <<path_locale_file>>}
var available_locales = {};

// already loaded locales {<<locale_name>>: <<locale_data>>}
var locales = {};

var current_locale;
var base_locale = 'en';

var Numbers  = Helpers.range('0', '9');
var ULetters = Helpers.range('A', 'Z');
var Letters  = ULetters.concat(Helpers.range('a', 'z'));


// getValue(data, path) -> mixed
// - data (object): locale
// - path (array): path to property
//
// get value from locale hash
function getValue(data, path) {
  if (typeof data !== 'object' || data === null) {
    return void 0;
  } else if (path.length === 1) {
    return data[path[0]];
  }
  return getValue(data[path[0]], path.slice(1));
}


// snake2camelcase(str) -> string
// - str (string): source string
//
// locale files use snake notation `xxx_yyy_zzz`
// but real methods use camelcase `xxxYyyZzz`
function snake2camelcase(str) {
  return str.replace(/(\_[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('_', '');
  });
}


/**
 * Charlatan.addLocale(name, data) -> void
 * - name (string): locale name, for example `en-US`
 * - data (object|string): locale hash or yaml file
 *
 * Load locale to Charlatan. Charlatan preload some
 * [locales](https://github.com/nodeca/charlatan/tree/master/lib)
 **/
var addLocale = exports.addLocale = function (name, data) {
  var i;
  // if data not set, then check available
  if (typeof data === 'undefined') {
    if (!available_locales[name]) {
      throw new Error('Locale not found:' + name);
    }

    data = available_locales[name];

    // load base language, if exists
    var lang = name.split('-')[0];
    if (name !== lang && !!available_locales[lang]) {
      addLocale(lang);
    }
  }
  // data in file
  if (typeof data === 'string') {
    if (!Fs.existsSync(data)) {
      throw new Error('Config ' + data + ' not found');
    }
    data = yaml.safeLoad(Fs.readFileSync(data, 'utf8'))[name];

  }
  locales[name] = data;

  // compatibility layer for ruby Faker: we DON'T use intermediate
  // level `faker`, but wish to have universal localizations.
  // So, if `faker` section exists then its children moved 1 level up.
  if (data.faker) {
    for (i in data.faker) {
      locales[name][i] = data.faker[i];
    }
  }

  return true;
};


/**
 * Charlatan.setLocale([name]) -> void
 * - name (String): locale name, for example `en-US`
 *
 * Set current locale. If name is not defined, revert back to default locale.
 **/
exports.setLocale = function (name) {
  if (!name) {
    name = base_locale;
  }
  if (!locales[name]) {
    addLocale(name);
  }
  current_locale = name;
  return true;
};


/**
 * Charlatan.getLocale() -> String
 *
 * Get current locale
 **/
exports.getLocale = function () {
  return current_locale;
};


/**
 * Charlatan.getAllLocales() -> [String]
 *
 * Get the list of all available locales
 **/
exports.getAllLocales = function () {
  return Object.keys(locales);
};


/**
 * Charlatan.translate(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Returns a phrase from the locale.
 *
 * Fallbacks to base language (and then to `en`)
 *   if it was not found: `ru-RU -> ru -> en`
 **/
exports.translate = function (key, options) {
  if (!options) { options = {}; }

  var locale = options.locale || current_locale;
  var lang = locale.split('-')[0];
  var path = key.split('.');
  var result = getValue(locales[locale], path);

  // fallback to root lang (`pt-BR` -> `pt`, but it can be missed)
  if (typeof result === 'undefined' && lang !== locale) {
    if (locales[lang]) {
      result = getValue(locales[lang], path);
    }
  }

  // fallback to base lang (en)
  if (typeof result === 'undefined') {
    result = getValue(locales[base_locale], path);
  }

  // oops
  if (typeof result === 'undefined') {
    throw new Error('Invalid path: ' + key);
  }

  return result;
};


/**
 * Charlatan.fetch(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Helper for the common approach of grabbing a translation
 * with an array of values and selecting one of them.
 **/
var fetch = exports.fetch = function (key) {
  var fetched = exports.translate(key);
  if (Array.isArray(fetched)) {
    fetched = Helpers.sample(fetched);
  }

  if (fetched.match(/^\//) && fetched.match(/\/$/)) {
    fetched = exports.regexify(fetched);
  }

  return fetched;
};


/**
 * Charlatan.parse(key) -> string
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Load formatted strings from the locale, "parsing" them
 * into method calls that can be used to generate a
 * formatted translation: e.g., "#{first_name} #{last_name}".
 **/
exports.parse = function (key) {
  var re = /#\{([A-Za-z]+(?:\.))?([^\}]+)\}/g;

  return fetch(key).replace(re, function (match, kls, method) {
    var text = '';

    // If the token had a class Prefix (e.g., Name.first_name)
    // take it, otherwise use base namespace part
    if (!kls) {
      kls = exports.Helpers.capitalize(key.split('.')[0]);
    } else {
      kls = kls.slice(0, -1);
    }
    // If the class has the method, call it, otherwise
    // fetch the translation
    if (!!exports[kls] &&
        typeof exports[kls][snake2camelcase(method)] === 'function') {

      text += exports[kls][snake2camelcase(method)].call(exports[kls]);
    } else {
      text += exports.fetch(kls.toLowerCase() + '.' + method);
    }

    return text;
  });
};


/**
 * Charlatan.numerify(source) -> string
 * - source (string): source string
 *
 * Find `#` symbol and replace it with random number
 **/
exports.numerify = function (source) {
  // make sure numerify results don’t start with a zero
  return source
    .replace(/\#/, function () {
      return Math.floor(Helpers.rand(10, 1));
    })
    .replace(/\#/g, function () {
      return Math.floor(Helpers.rand(10, 0));
    });
};


/**
 * Charlatan.letterify(source) -> string
 * - source (string): source string
 *
 * Find `?` symbol and replace it with random char from [A..Z]
 **/
exports.letterify = function (source) {
  return source.replace(/\?/g, function () {
    return Helpers.sample(ULetters);
  });
};


/**
 * Charlatan.bothify(source) -> string
 * - source (string): source string
 *
 * Perform both `letterify` and `numerify` operations.
 **/
exports.bothify = function (source) {
  return exports.letterify(exports.numerify(source));
};


/**
 * Charlatan.regexify(re) -> String
 * - re(RegExp | String): regexp to sample from
 *
 * Given a regular expression, attempt to generate a string
 * that would match it.  This is a rather simple implementation,
 * so don't be shocked if it blows up on you in a spectacular fashion.
 *
 * It does not handle ., *, unbounded ranges such as {1,},
 * extensions such as (?=), character classes, some abbreviations
 * for character classes, and nested parentheses.
 *
 * I told you it was simple. :) It's also probably dog-slow,
 * so you shouldn't use it.
 *
 * It will take a regex like this:
 *
 * /^[A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}$/
 *
 * and generate a string like this:
 *
 * "U3V  3TP"
 **/
exports.regexify = function (re) {
  // Handle either a Regexp or a String that looks like a Regexp
  if (Object.prototype.toString.call(re) === '[object RegExp]') {
    re = re.source;
  }

  // "baz", 2, 3 -> "bazbaz" or "bazbazbaz"
  function repeatRange(_unused, what, from, to) {
    return new Array(Helpers.rand(+to + 1, +from) + 1).join(what);
  }

  return re
    // Ditch the anchors
    .replace(/^\/?\^?/, '').replace(/\$?\/?$/, '')

    // All {2} become {2,2} and ? become {0,1}
    .replace(/\{(\d+)\}/g, '{$1,$1}').replace(/\?/g, '{0,1}')

    // [12]{1,2} becomes [12] or [12][12]
    .replace(/(\[[^\]]+\])\{(\d+),(\d+)\}/g, repeatRange)

    // (12|34){1,2} becomes (12|34) or (12|34)(12|34)
    .replace(/(\([^\)]+\))\{(\d+),(\d+)\}/g, repeatRange)

    // A{1,2} becomes A or AA or \d{3} becomes \d\d\d
    .replace(/(\\?.)\{(\d+),(\d+)\}/g, repeatRange)

    // (this|that) becomes 'this' or 'that'
    .replace(/\((.*?)\)/g, function (match) {
      return Helpers.sample(match.replace(/[\(\)]/g, '').split('|'));
    })

    // All A-Z inside of [] become C (or X, or whatever)
    .replace(/\[([^\]]+)\]/g, function (match) {
      return match.replace(/(\w\-\w)/g, function (range) {
        range = range.split('-');

        return Helpers.sample(Helpers.range(range[0], range[1]));
      });
    })

    // All [ABC] become B (or A or C)
    .replace(/\[([^\]]+)\]/g, function (m, str) {
      return Helpers.sample(str.split(''));
    })

    .replace(/\\d/g, function () {
      return Helpers.sample(Numbers);
    })

    .replace(/\\w/g, function () {
      return Helpers.sample(Letters);
    });
};


// Init Charlatan
// fetch locales and init base locale
var locales_dir = Path.resolve(__dirname, 'locales');

Fs.readdirSync(locales_dir).forEach(function (file) {
  if (/\.yml/.test(file)) {
    available_locales[file.replace('.yml', '')] = Path.join(locales_dir, file);
  }
});

exports.setLocale(base_locale);
