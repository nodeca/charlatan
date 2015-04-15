'use strict';

require('./_utils');

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var YAML = require('js-yaml');
var faker = require('../');
var locales = {};

[ 'en', 'en-BORK' ].forEach(function (x) {
  var data = YAML.safeLoad(fs.readFileSync(path.join(__dirname, '/../lib/locales/', x + '.yml'), 'utf8'));
  locales[x] = data[x].faker;
});

describe('locale', function () {
  beforeEach(function () {
    faker.setLocale('en-BORK');
  });

  it('configured_locale_translation', function () {
    assert.equal(faker.translate('faker.lorem.words')[0], locales['en-BORK'].lorem.words[0]);
  });

  it('locale_override_when_calling_translate', function () {
    assert.equal(faker.translate('faker.lorem.words', { locale: 'en' })[0], locales.en.lorem.words[0]);
  });

  it('translation_fallback', function () {
    assert.equal(locales['en-BORK'].name, null);
    assert.deepEqual(faker.translate('faker.name.first_name')[0], locales.en.name.first_name[0]);
  });

  it('regex', function () {
    faker.setLocale('en-GB');
    var re = /[A-PR-UWYZ][A-HK-Y]?[0-9][ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}/;
    var result = faker.Address.postcode();
    assert(result.match(re), result + ' didn\'t match ' + re);
  });

  it('available_locales', function () {
    assert.notEqual(faker.getAllLocales().indexOf('en-GB'), -1);
  });

  after(function () {
    faker.setLocale(null);
  });
});
