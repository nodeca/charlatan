'use strict';

/**
 * class Charlatan.Avatar
 *
 **/


var Charlatan = require('../charlatan');

/**
 * Charlatan.Avatar.image(slug=null) -> String
 *
 * Generate link to robohash avatar
 **/
exports.image = function (slug) {
  if (!slug) {
    slug = Charlatan.Lorem.words().join('');
  }
  return "http://robohash.org/" + slug;
};
