'use strict';

/**
 * class Charlatan.App
 **/

var Charlatan = require('../charlatan');


/**
 *  Charlatan.App.name() -> String
 *
 *  Generate an application name
 **/
exports.name = function () {
  return Charlatan.fetch('app.name');
};


/**
 *  Charlatan.App.version() -> String
 *
 *  Generate an application version
 **/
exports.version = function () {
  return Charlatan.numerify(Charlatan.parse('app.version'));
};


/**
 *  Charlatan.App.author() -> String
 *
 *  Generate an application author
 **/
exports.author = function () {
  return Charlatan.fetch('app.author');
};
