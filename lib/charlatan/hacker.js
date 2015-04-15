'use strict';

/**
 * class Charlatan.Hacker
 **/

var Helpers = require('./helpers');
var Charlatan = require('../charlatan');


/**
 * Charlatan.Hacker.abbreviation() -> String
 *
 * Generate an abbreviation
 **/
var abbreviation = exports.abbreviation = function () {
  return Charlatan.fetch('hacker.abbreviation');
};


/**
 * Charlatan.Hacker.adjective() -> String
 *
 * Generate "hacker" adjective
 **/
var adjective = exports.adjective = function () {
  return Charlatan.fetch('hacker.adjective');
};


/**
 * Charlatan.Hacker.noun() -> String
 *
 * Generate "hacker" noun
 **/
var noun = exports.noun = function () {
  return Charlatan.fetch('hacker.noun');
};


/**
 * Charlatan.Hacker.verb() -> String
 *
 * Generate "hacker" verb
 **/
var verb = exports.verb = function () {
  return Charlatan.fetch('hacker.verb');
};


/**
 * Charlatan.Hacker.ingverb() -> String
 *
 * Generate "hacker" ingverb
 **/
var ingverb = exports.ingverb = function () {
  return Charlatan.fetch('hacker.ingverb');
};


function phrases() {
  /*eslint-disable max-len*/
  return [
    'If we ' + verb() + ' the ' + noun() + ', we can get to the ' + abbreviation() + ' ' + noun() + ' through the ' + adjective() + ' ' + abbreviation() + ' ' + noun() + '!',
    'We need to ' + verb() + ' the ' + adjective() + ' ' + abbreviation() + ' ' + noun() + '!',
    'Try to ' + verb() + ' the ' + abbreviation() + ' ' + noun() + ', maybe it will ' + verb() + ' the ' + adjective() + ' ' + noun() + '!',
    'You can\'t ' + verb() + ' the ' + noun() + ' without ' + ingverb() + ' the ' + adjective() + ' ' + abbreviation() + ' ' + noun() + '!',
    'Use the ' + adjective() + ' ' + abbreviation() + ' ' + noun() + ', then you can ' + verb() + ' the ' + adjective() + ' ' + noun() + '!',
    'The ' + abbreviation() + ' ' + noun() + ' is down, ' + verb() + ' the ' + adjective() + ' ' + noun() + ' so we can ' + verb() + ' the ' + abbreviation() + ' ' + noun() + '!',
    '' + ingverb() + ' the ' + noun() + ' won\'t do anything, we need to ' + verb() + ' the ' + adjective() + ' ' + abbreviation() + ' ' + noun() + '!',
    'I\'ll ' + verb() + ' the ' + adjective() + ' ' + abbreviation() + ' ' + noun() + ', that should ' + noun() + ' the ' + abbreviation() + ' ' + noun() + '!'
  ];
}


/**
 * Charlatan.Hacker.saySomethingSmart() -> String
 *
 * Generate a smart looking phrase
 **/
exports.saySomethingSmart = function () {
  return Helpers.sample(phrases());
};
