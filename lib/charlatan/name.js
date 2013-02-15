'use strict';

/**
 * class Charlatan.Name
 *
 **/


var Charlatan = require('../charlatan');

/**
 * Charlatan.Name.name() -> String
 *
 * Generate full name.
 **/
exports.name = function () {
  return Charlatan.parse('name.name');
};


/**
 * Charlatan.Name.firstName() -> String
 *
 * Generate first name. Example: 'Marjorie'
 **/
exports.firstName = function () {
  return Charlatan.fetch('name.first_name');
};


/**
 * Charlatan.Name.lastName() -> String
 *
 * Generate last name. Example: 'Lemke'
 **/
exports.lastName = function () {
  return Charlatan.fetch('name.last_name');
};


/**
 * Charlatan.Name.prefix() -> String
 *
 * Generate name prefix. Example: 'Dr.'
 **/
exports.prefix = function () {
  return Charlatan.fetch('name.prefix');
};


/**
 * Charlatan.Name.suffix() -> String
 *
 * Generate name suffix. Example: 'PhD'
 **/
exports.suffix = function () {
  return Charlatan.fetch('name.suffix');
};


/**
 * Charlatan.Name.title() -> String
 *
 * Generate a buzzword-laden job title
 * Wordlist from http://www.bullshitjob.com/title/
 **/
exports.title = function () {
  return Charlatan.fetch('name.title.descriptor') + ' ' +
          Charlatan.fetch('name.title.level') + ' ' +
          Charlatan.fetch('name.title.job');
};
