// Browser implementation of { locales, addLocale }
//
'use strict';

var locales = require('./locales_browser_data.json');

function addLocale(name, data) {
  // if data not set, then check available
  if (typeof data === 'undefined') {
    if (Object.keys(locales).indexOf(name) === -1) {
      throw new Error('Locale not found:' + name);
    }

    // Do nothing because all locales already loaded
    return true;
  }

  // data in file
  if (typeof data === 'string') {
    throw new Error('Charlatan: loading from file not supported in browser');
  }

  locales[name] = data;

  // compatibility layer for ruby Faker: we DON'T use intermediate
  // level `faker`, but wish to have universal localizations.
  // So, if `faker` section exists then its children moved 1 level up.
  if (data.faker) {
    Object.keys(data.faker).forEach(function (k) {
      locales[name][k] = data.faker[k];
    });
  }

  return true;
}

exports.locales = locales;
exports.addLocale = addLocale;
