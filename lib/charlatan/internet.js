'use strict';

/**
 * class Charlatan.Internet
 **/


var Helpers   = require('./helpers');
var Charlatan = require('../charlatan');


function fix_umlauts(string) {
  return string.replace(/[äöüß]/ig, function (str) {
    switch (str.toLowerCase()) {
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
 **/
exports.email = function (name) {
  return exports.userName(name) + '@' + exports.domainName();
};


/**
 * Charlatan.Internet.freeEmail([name]) -> String
 * - name (string) : user name, optional
 *
 * Generate email in public domain such as gmail and hotmail
 **/
exports.freeEmail = function (name) {
  return exports.userName(name) + '@' + Charlatan.fetch('internet.free_email');
};


/**
 * Charlatan.Internet.safeEmail([name]) -> String
 * - name (string) : user name, optional
 *
 * Generate email in example.[org|com|net]
 **/
exports.safeEmail = function (name) {
  var domain = 'example.' + Helpers.sample([ 'org', 'com', 'net' ]);

  return exports.userName(name) + '@' + domain;
};


/**
 * Charlatan.Internet.userName([name]) -> String
 * - name (string) : user name, optional
 *
 * Generate nickname.
 **/
exports.userName = function (specifier, separators) {
  var result;

  if (!separators) { separators = [ '.', '_' ]; }

  if (typeof specifier === 'string') {
    return Helpers.shuffle(specifier.match(/\w+/g))
             .join(Helpers.sample(separators))
             .toLowerCase();
  }

  if (typeof specifier === 'number') {
    var tries = 0; // Don't try forever in case we get something like 1_000_000.

    do {
      result = exports.userName(null, separators);
      tries++;
    } while (result.length < specifier && tries < 7);

    while (result.length < specifier) {
      result += result;
    }

    return result;
  }

  return fix_umlauts(Helpers.sample([
    function () {
      return Charlatan.Name.firstName().replace(/\W/g, '').toLowerCase();
    },
    function () {
      return [ Charlatan.Name.firstName(), Charlatan.Name.lastName() ]
        .join(Helpers.sample(separators))
        .replace(/\W/g, '')
        .toLowerCase();
    }
  ])());
};

/**
 * Charlatan.Internet.password(minLength=8, maxLength=16) -> String
 * - minLength (integer) : min number of characters in generated password
 * - maxLength (integer) : max number of characters in generated password
 *
 * Generate an alphanumeric password
 **/
exports.password = function (minLength, maxLength) {
  if (typeof minLength !== 'number') { minLength = 8; }
  if (typeof maxLength !== 'number') { maxLength = 16; }

  maxLength = Math.max(minLength + 1, maxLength);

  return Charlatan.Lorem.characters(Helpers.rand(maxLength + 1, minLength));
};

/**
 * Charlatan.Internet.domainName() -> String
 *
 * Generate domain name.
 **/
exports.domainName = function () {
  return fix_umlauts(exports.domainWord()) + '.' + exports.domainSuffix();
};


/**
 * Charlatan.Internet.domainWord() -> String
 *
 * Generate domain component
 **/
exports.domainWord = function () {
  return Charlatan.Company.name()
          .split(' ')[0]
          .replace(/\W/g, '')
          .toLowerCase();
};


/**
 * Charlatan.Internet.domainSuffix() -> String
 *
 * Return TLD, e.g. "com"
 **/
exports.domainSuffix = function () {
  // lorem can return word with apostrophe
  return Charlatan.fetch('internet.domain_suffix');
};


/**
 * Charlatan.Internet.IPv4() -> String
 *
 * Generate an IPv4 address
 **/
exports.IPv4 = function () {
  var i, result = [];

  for (i = 0; i < 4; i++) {
    result[i] = Helpers.rand(255, 1); // 1..254
  }

  return result.join('.');
};


/**
 * Charlatan.Internet.macAddress(prefix='') -> String
 *  - prefix(String) : prefix
 *
 * Generate a mac address
 **/
exports.macAddress = function (prefix) {
  if (!prefix) { prefix = ''; }

  var digits = [];

  if (prefix) {
    digits = prefix.split(':').map(function (d) {
      return parseInt(d, 16) || 0;
    });
  }

  for (var i = 6 - digits.length; i > 0; i--) {
    digits.push(Helpers.rand(256));
  }

  return digits.map(function (d) {
    return ('00' + d.toString(16)).slice(-2);
  }).join(':');
};


/**
 * Charlatan.Internet.IPv6() -> String
 *
 * Generate an IPv6 address
 **/
exports.IPv6 = function () {
  var group, result = [], i, j;

  for (i = 0; i < 8; i++) {
    group = '';
    for (j = 0; j < 4; j++) {
      group += Helpers.rand(16).toString(16);
    }
    result.push(group);
  }

  return result.join(':');
};


/**
 * Charlatan.Internet.IPv6([domain, path]) -> String
 *  - domain(String): domain name
 *  - path(String): path name
 *
 * Generate an url address
 **/
exports.url = function (host, path) {
  if (!host) {
    host = exports.domainName();
  }

  if (!path) {
    path = '/' + exports.userName();
  }

  return 'http://' + host + path;
};


/**
 * Charlatan.Internet.IPv6([words, glue]) -> String
 *  - words(String): words array (by default it fetches lorem.words)
 *  - glue(String): character that separates words
 *
 * Build slug out of a words array
 **/
exports.slug = function (words, glue) {
  if (!glue) {
    glue = Helpers.sample('-_.'.split(''));
  }

  if (!words) {
    words = Charlatan.Lorem.words(2);
  }

  if (Array.isArray(words)) {
    words = words.join(' ');
  }

  return words
           .replace(/ /g, glue)
           .toLowerCase();
};


/**
 * Charlatan.Internet.deviceToken() -> String
 *
 * Generate an APN token
 **/
exports.deviceToken = function () {
  var i, result = '';

  for (i = 0; i < 64; i++) {
    result += Helpers.rand(16).toString(16);
  }

  return result;
};
