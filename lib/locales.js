// Exposts { locales, addLocale } to replace implementation
// for browsers
'use strict';

var yaml = require('js-yaml');
var fs   = require('fs');
var path = require('path');

// locale files {<<locale_name>>: <<path_locale_file>>}
var available_locales = {};

// already loaded locales {<<locale_name>>: <<locale_data>>}
var locales = {};

/**
 * Charlatan.addLocale(name, data) -> void
 * - name (string): locale name, for example `en-US`
 * - data (object|string): locale hash or yaml file
 *
 * Load locale to Charlatan. Charlatan preload some
 * [locales](https://github.com/nodeca/charlatan/tree/master/lib)
 **/
function addLocale(name, data) {
  // if data not set, then check available
  if (typeof data === 'undefined') {
    if (!available_locales[name]) {
      throw new Error('Locale not found:' + name);
    }

    data = available_locales[name];

    // load base language, if exists
    var lang = name.split('-')[0];

    if (name !== lang && available_locales[lang]) {
      addLocale(lang);
    }
  }

  // data in file
  if (typeof data === 'string') {
    if (!fs.existsSync(data)) {
      throw new Error('Config ' + data + ' not found');
    }
    data = yaml.safeLoad(fs.readFileSync(data, 'utf8'))[name];

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


// fetch locales and init base locale
var locales_dir = path.resolve(__dirname, 'locales');

fs.readdirSync(locales_dir).forEach(function (file) {
  if (/\.yml/.test(file)) {
    available_locales[file.replace('.yml', '')] = path.join(locales_dir, file);
  }
});
