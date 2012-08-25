'use strict';

/**
 * class Charlatan
 *
 **/

exports.Name = require('./charlatan/name');
exports.Address = require('./charlatan/address');
exports.PhoneNumber = require('./charlatan/phone_number');
exports.Internet = require('./charlatan/internet');
exports.Company = require('./charlatan/company');
exports.Lorem = require('./charlatan/lorem');
exports.Helpers =  require('./charlatan/helpers');

var YAML = require('js-yaml');

var locales = {};
var current_locale;
var base_locale = 'en';
var default_locale = 'en';

var sample = function(source) {
  return exports.Helpers.sample(source);
};


/**
 * Charlatan.addLocale(name, data) -> void
 * - name (string): locale name, for example `en-us`
 * - data (object|string): locale hash or yaml file
 *
 * Load locale to Charlatan. Charlatan preload some
 * [locales](https://github.com/shkuropat/Charlatan/tree/master/lib)
 **/
var addLocale = exports.addLocale = function (name, data) {
  // data in file
  if (typeof name === 'string') {
    data = require(data)[name];
  }
  locales[name] = data;
};


/**
 * Charlatan.setLocale(name) -> void
 * - name (string): locale name, for example `en-us`
 *
 *
 **/
exports.setLocale = function (name) {
  current_locale = name;
};


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

/**
 * Charlatan.translate(key) -> mixed
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Returns a phrase from the locale.
 *
 * Fallbacks to base language (and then to `en`)
 *   if it was not found: `ru_RU -> ru -> en`
 **/
exports.translate = function(key) {
  var lang = current_locale.split('-')[0];
  var path = key.split('.');
  var result = getValue(locales[current_locale], path);

  // fallback to lang
  if (result === undefined && lang !== current_locale) {
    result = getValue(locales[lang], path);
  }

  // fallback to base_lang
  if (result === undefined) {
    result = getValue(locales[base_locale], path);
  }
  // raise err
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
var fetch = exports.fetch = function(key) {
  var fetched = exports.translate(key);
  if (fetched.length !== undefined) {
    fetched = sample(fetched);
  }
  // need regexfy from ruby version?
  return fetched;
};


function snake2camelcase(str){
  var parts = str.split('_');
  if (parts.length === 1) {
    return str;
  }
  return parts[0] + parts.slice(1).map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

/**
 * Charlatan.parse(key) -> string
 * - key (string): key in locale, for example `address.city_prefix`
 *
 * Load formatted strings from the locale, "parsing" them
 * into method calls that can be used to generate a
 * formatted translation: e.g., "#{first_name} #{last_name}".
 **/
exports.parse = function(key) {
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
        typeof(exports[kls][snake2camelcase(method)]) === 'function'){
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
exports.numerify = function(source) {
  return source.replace(/\#/g, function() {
    return Math.floor(Math.random()*10);
  });
};

/**
 * Charlatan.letterify(source) -> string
 * - source (string): source string
 *
 * Find `?` symbol and replace it with random char from [A..Z]
 **/
exports.letterify = function(source) {
   return source.replace(/\?/g, function() {
     return sample('ABCDEFGHIJKLMNOPQRSTUVWXTZ'.split(''));
   });
};


// Init charlatan
var locales_dir = require('path').resolve(__dirname, '../config/locales') + '/';
require('fs').readdirSync(locales_dir).forEach(function (file) {
  if (/\.yml/.test(file)) {
    addLocale(file.replace('.yml', ''), locales_dir + file);
  }
});
exports.setLocale('en');
