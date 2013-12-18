"use strict";

// already loaded locales {<<locale_name>>: <<locale_data>>}
var locales = {};

var currentLocale;
var currentLang;
var baseLocale = 'en';

var Helpers = require('./helpers');

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
 * data.baseLocale() -> string
 */
exports.baseLocale = function() {
  return baseLocale;
};

/**
 * data.setBaseLocale(name) -> void
 * - name (string): locale name, for example `en-us`
 */
exports.setBaseLocale = function(name) {
  baseLocale = name;
};

/**
 * data.addLocale(name, data) -> void
 * - name (string): locale name, for example `en-us`
 * - data (object): locale hash
 *
 * Load locale data into Charlatan.
 **/
var addLocale = exports.addLocale = function(name, data) {
  locales[name] = data;
};

/**
 * data.hasLocale(name) -> boolean
 * - name (string): locale name, for example `en-us`
 */
var hasLocale = exports.hasLocale = function(name) {
  return !!locales[name];
};


/**
 * data.setLocale(name) -> void
 * - name (string): locale name, for example `en-us`
 **/
exports.setLocale = function(name) {
  if (!hasLocale(name)) {
    throw new Error("no locale data loaded for "+name);
  }
  currentLocale = name;
  currentLang = name.split('-')[0];
};


/**
 * data.translate(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Returns a phrase from the locale.
 *
 * Falls back to base language (and then to `en`)
 *   if it was not found: `ru_RU -> ru -> en`
 **/
exports.translate = function(key) {
  var path = key.split('.');
  var result = getValue(locales[currentLocale], path);

  // fallback to root lang (`pt-br` -> `pt`, but it can be missed)
  if (result === undefined && currentLang !== currentLocale) {
    if (hasLocale(currentLang)) {
      result = getValue(locales[currentLang], path);
    }
  }

  // fallback to base lang (en)
  if (result === undefined) {
    result = getValue(locales[baseLocale], path);
  }

  // oops
  if (result === undefined) {
    throw new Error('Invalid path:' + key);
  }

  return result;
};


/**
 * data.fetch(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Helper for the common approach of grabbing a translation
 * with an array of values and selecting one of them.
 **/
var fetch = exports.fetch = function(key) {
  var fetched = exports.translate(key);
  if (fetched.length !== undefined) {
    fetched = Helpers.sample(fetched);
  }
  // need regexfy from ruby version?
  return fetched;
};


/**
 * data.parse(key) -> string
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
      kls = Helpers.capitalize(key.split('.')[0]);
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
