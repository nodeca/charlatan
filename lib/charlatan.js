'use strict';

/**
 * class Charlatan
 *
 **/

exports.Name        = require('./charlatan/name');
exports.Address     = require('./charlatan/address');
exports.PhoneNumber = require('./charlatan/phone_number');
exports.Internet    = require('./charlatan/internet');
exports.Company     = require('./charlatan/company');
exports.Lorem       = require('./charlatan/lorem');
var Helpers         = exports.Helpers = require('./charlatan/helpers');

var yaml = require('js-yaml');

var Fs = require('fs');
var Path = require('path');

// locale files {<<locale_name>>: <<path_locale_file>>}
var avaliable_locales = {};

// already loaded locales {<<locale_name>>: <<locale_data>>}
var locales = {};

var current_locale;
var base_locale = 'en';


// getValue(data, path) -> mixed
// - data (object): locale
// - path (array): path to property
//
// get value from locale hash
function getValue(data, path) {
  if (!data[path[0]] ||
      (path.length > 0 && typeof(data[path[0]]) !== 'object')) {
    return undefined;
  }
  if (path.length === 1) {
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
  return str.replace(/(\_[a-z])/g,
    function ($1) { return $1.toUpperCase().replace('_',''); }
  );
}


/**
 * Charlatan.addLocale(name, data) -> void
 * - name (string): locale name, for example `en-us`
 * - data (object|string): locale hash or yaml file
 *
 * Load locale to Charlatan. Charlatan preload some
 * [locales](https://github.com/nodeca/charlatan/tree/master/lib)
 **/
var addLocale = exports.addLocale = function (name, data) {
  var i;
  // if data not set, then check avaliable
  if (data === undefined) {
    if (!avaliable_locales[name]) {
      throw new Error('Locale not found:' + name);
    }

    data = avaliable_locales[name];

    // load base language, if exists
    var lang = name.split('-')[0];
    if (name !== lang && !!avaliable_locales[lang]) {
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
  // level `faker`, but wish to have universal localisations.
  // So, if `faker` section exists then it's childs moved 1 level up.
  if (data.faker) {
    for (i in data.faker) {
      locales[name][i] = data.faker[i];
    }
  }

  return true;
};


/**
 * Charlatan.setLocale(name) -> void
 * - name (string): locale name, for example `en-us`
 *
 *
 **/
exports.setLocale = function (name) {
  if (!locales[name]) {
    addLocale(name);
  }
  current_locale = name;
  return true;
};


/**
 * Charlatan.translate(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Returns a phrase from the locale.
 *
 * Fallbacks to base language (and then to `en`)
 *   if it was not found: `ru_RU -> ru -> en`
 **/
exports.translate = function (key) {
  var lang = current_locale.split('-')[0];
  var path = key.split('.');
  var result = getValue(locales[current_locale], path);

  // fallback to root lang (`pt-br` -> `pt`, but it can be missed)
  if (result === undefined && lang !== current_locale) {
    if (locales[lang]) {
      result = getValue(locales[lang], path);
    }
  }

  // fallback to base lang (en)
  if (result === undefined) {
    result = getValue(locales[base_locale], path);
  }

  // oops
  if (result === undefined) {
    throw new Error('Invalid path:' + key);
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
  if (fetched.length !== undefined) {
    fetched = Helpers.sample(fetched);
  }
  // need regexfy from ruby version?
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
  var match, kls, method, etc;
  var re = /#\{([A-Za-z]+(?:\.))?([^\}]+)\}([^#]+)?/g;
  var str = fetch(key);
  var text = '';

  match = re.exec(str);
  if (!match) {
    return str;
  }
  do {
    kls = match[1];
    method = match[2];
    etc = match[3];
    // If the token had a class Prefix (e.g., Name.first_name)
    // take it, otherwise use base namespace part
    if (!kls) {
      kls = exports.Helpers.capitalize(key.split('.')[0]);
    }
    else {
      kls = kls.slice(0, -1);
    }
    // If the class has the method, call it, otherwise
    // fetch the transation
    if (!!exports[kls] &&
        typeof(exports[kls][snake2camelcase(method)]) === 'function') {

      text += exports[kls][snake2camelcase(method)].call(exports[kls]);
    }
    else {
      text += exports.fetch(kls.toLowerCase() + '.' + method);
    }

    // And tack on spaces, commas, etc. left over in the string
    if (!!etc) {
      text += etc;
    }
    match = re.exec(str);
  } while (match);
  return text;
};


/**
 * Charlatan.numerify(source) -> string
 * - source (string): source string
 *
 * Find `#` symbol and replace it with random number
 **/
exports.numerify = function (source) {
  return source.replace(/\#/g, function () {
    return Math.floor(Math.random() * 10);
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
    return Helpers.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  });
};


// Init Charlatan
// fetch locales and init base locale
var locales_dir = Path.resolve(__dirname, 'locales');

Fs.readdirSync(locales_dir).forEach(function (file) {
  if (/\.yml/.test(file)) {
    avaliable_locales[file.replace('.yml', '')] = Path.join(locales_dir, file);
  }
});

exports.setLocale('en');
