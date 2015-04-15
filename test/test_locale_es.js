'use strict';

require('./_utils');

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var YAML = require('js-yaml');
var faker = require('../');
var locales = {};

[ 'en', 'es' ].forEach(function (x) {
  var data = YAML.safeLoad(fs.readFileSync(path.join(__dirname, '/../lib/locales/', x + '.yml'), 'utf8'));
  locales[x] = data[x].faker;
});

describe('locale: es', function () {
  beforeEach(function () {
    faker.setLocale('es');
  });

  it('configured_locale_translation', function () {
    assert.equal(faker.translate('faker.address.city_prefix')[0], locales.es.address.city_prefix[0]);
  });

  it('locale_override_when_calling_translate', function () {
    assert.equal(faker.translate('faker.lorem.words', { locale: 'en' })[0], locales.en.lorem.words[0]);
  });

  it('translation_fallback', function () {
    assert.equal(locales.es.company.bs, null);
    assert.deepEqual(faker.translate('faker.company.bs'), locales.en.company.bs);
  });

  after(function () {
    faker.setLocale(null);
  });
});
