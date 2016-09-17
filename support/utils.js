'use strict';


var yaml = require('js-yaml');
var fs   = require('fs');
var path = require('path');


exports.all_locales = function () {
  var locales = {};
  var locales_dir = path.resolve(__dirname, '../lib/locales');

  fs.readdirSync(locales_dir).forEach(function (file) {
    if (/\.yml/.test(file)) {
      var data = yaml.safeLoad(fs.readFileSync(path.join(locales_dir, file), 'utf8'));

      Object.keys(data).forEach(function (k) {
        locales[k] = data[k];
      });
    }
  });

  return locales;
};
