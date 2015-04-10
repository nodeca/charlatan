'use strict';

/**
 * class Charlatan.Team
 **/

var Charlatan = require('../charlatan');
var Helpers = require('./helpers');


exports.name = function () {
  return Charlatan.fetch('team.name');
};

exports.creature = function () {
  return Charlatan.fetch('team.creature');
};

exports.state = function () {
  return Helpers.titleize(Charlatan.fetch('faker.address.state'));
};
