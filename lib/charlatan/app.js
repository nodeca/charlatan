'use strict';

/**
 * class Charlatan.App
 **/

var Charlatan = require('../charlatan');


exports.name = function () { 
  return Charlatan.fetch('app.name');
};

exports.version = function () {
  return Charlatan.numerify(Charlatan.parse('app.version'));
};

exports.author = function () { 
  return Charlatan.fetch('app.author');
};
