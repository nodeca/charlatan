'use strict';

/**
 * Internet
 *
 **/


var Helpers = require('./helpers');
var definitions = require('./definitions');


/**
 * Internet#email() -> String
 *
 * Generate email :-)
 *
 ***/
exports.email = function() {
  return this.userName() + "@" + this.domainName();
};


/**
 * Internet#userName() -> String
 *
 * Generate nickname.
 * Randomly chose format `first_name` or `first_name[.|_]last_name`
 *
 ***/
exports.userName = function() {
  if (Helpers.randomNumber(2) === 0)
  {
    return Helpers.randomize(definitions.first_name());
  }
  return Helpers.randomize(definitions.first_name()) +
          Helpers.randomize([".", "_"]) +
          Helpers.randomize(definitions.last_name()) ;
};


/**
 * Internet#domainName() -> String
 *
 * Generate domain.
 *
 ***/
exports.domainName = function() {
  return this.domainWord() + "." +
          Helpers.randomize(definitions.domain_suffix());
};


/**
 * Internet#domainWord() -> String
 *
 * Generate domain without dot suffix
 *
 ***/
exports.domainWord = function() {
  // lorem can return word with apostrophe
  return Helpers.randomize(definitions.first_name())
          .replace(/[^a-z]/gi, '')
          .toLowerCase();
};


/**
 * Internet#IPv4() -> String
 *
 * Generate IP address
 *
 ***/
exports.IPv4 = function() {
  var i;
  var result = [];

  for(i = 0; i < 4; i++) {
    result[i] = (Math.random()*254 + 1).toFixed(0);
  }

  return result.join(".");
};


/**
 * Internet#IPv6() -> String
 *
 * Generate IPv6 address
 *
 ***/
exports.IPv6 = function() {
  var group;
  var result = [];
  var i, j;

  for(i = 0; i < 8; i++) {
    group = '';
    for(j = 0; j < 4; j++) {
      group += Helpers.randomNumber(15).toString(16);
    }
    result.push(group);
  }
  return result.join(":");
};
