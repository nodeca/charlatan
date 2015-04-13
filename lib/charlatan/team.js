'use strict';

/**
 * class Charlatan.Team
 **/

var Charlatan = require('../charlatan');
var Helpers = require('./helpers');


/**
 * Charlatan.Team.name() -> String
 *
 * Generate team name.
 **/
exports.name = function () {
  return Charlatan.fetch('team.name');
};


/**
 * Charlatan.Team.creature() -> String
 *
 * Generate team mascot.
 **/
exports.creature = function () {
  return Charlatan.fetch('team.creature');
};


/**
 * Charlatan.Team.state() -> String
 *
 * Generate team state.
 **/
exports.state = function () {
  return Helpers.titleize(Charlatan.fetch('faker.address.state'));
};
