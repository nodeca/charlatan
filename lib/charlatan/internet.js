'use strict';

/**
 * class Charlatan.Internet
 *
 **/


var Helpers   = require('./helpers');
var Charlatan = require('../charlatan');


function fix_umlauts(string) {
  return string.replace(/[äöüß]/ig, function (str) {
    switch (str) {
    case 'ä':
      return 'ae';
    case 'ö':
      return 'oe';
    case 'ü':
      return 'ue';
    case 'ß':
      return 'ss';
    }
  });
}


/**
 * Charlatan.Internet.email([name]) -> String
 * - name (string) : user name, optional
 *
 * Generate email :-)
 *
 **/
exports.email = function (name) {
  return this.userName(name).toLowerCase() + '@' + this.domainName();
};


/**
 * Charlatan.Internet.freeEmail([name]) -> String
 * - name (string) : user name, optional
 *
 * Generate email in public domain souch as gmail and hotmail
 *
 **/
exports.freeEmail = function (name) {
  return this.userName(name).toLowerCase() + '@' + Charlatan.fetch('internet.free_email');
};


/**
 * Charlatan.Internet.safeEmail([name]) -> String
 * - name (string) : user name, optional
 *
 * Generate email in example.[org|com|net]
 *
 **/
exports.safeEmail = function (name) {
  var domain = 'example.' + Helpers.sample(['org', 'com', 'net']);

  return this.userName(name).toLowerCase() + '@' + domain;
};


/**
 * Charlatan.Internet.userName([name]) -> String
 * - name (string) : user name, optional
 *
 * Generate nickname.
 *
 **/
exports.userName = function (name) {
  var glue = Helpers.sample(['.', '_']);

  if (!name) {
    name = Helpers.sample([
        Charlatan.Name.firstName(),
        [Charlatan.Name.firstName(), Charlatan.Name.lastName()].join(' ')
      ]);
  }
  name = name.split(' ').join(glue).toLowerCase().replace('\'', '');

  return fix_umlauts(name);
};



/**
 * Charlatan.Internet.domainName() -> String
 *
 * Generate domain.
 *
 **/
exports.domainName = function () {
  return this.domainWord() + '.' + this.domainSuffix();
};


/**
 * Charlatan.Internet.domainWord() -> String
 *
 * Generate domain without dot suffix
 *
 **/
exports.domainWord = function () {
  // lorem can return word with apostrophe
  return Charlatan.fetch('lorem.words')
          .replace(/[^a-z]/gi, '')
          .toLowerCase();
};


/**
 * Charlatan.Internet.domainSuffix() -> String
 *
 * Fetch first level domain souch as `com`
 *
 **/
exports.domainSuffix = function () {
  // lorem can return word with apostrophe
  return Charlatan.fetch('internet.domain_suffix');
};


/**
 * Charlatan.Internet.IPv4() -> String
 *
 * Generate IP address
 *
 **/
exports.IPv4 = function () {
  var i
    , result = [];

  for (i = 0; i < 4; i++) {
    result[i] = (Math.random() * 254 + 1).toFixed(0);
  }

  return result.join('.');
};


/**
 * Charlatan.Internet.IPv6() -> String
 *
 * Generate IPv6 address
 *
 **/
exports.IPv6 = function () {
  var group
    , result = []
    , i, j;

  for (i = 0; i < 8; i++) {
    group = '';
    for (j = 0; j < 4; j++) {
      group += Helpers.rand(15).toString(16);
    }
    result.push(group);
  }

  return result.join(':');
};
