'use strict';

/**
 * class Charlatan.Avatar
 *
 **/


var Charlatan = require('../charlatan');

var SUPPORTED_FORMATS = [ 'png', 'jpg', 'bmp' ];

/**
 * Charlatan.Avatar.image(slug=null) -> String
 * - slug(String): slug:)
 *
 * Generate link to robohash avatar
 **/
exports.image = function (slug, size, format) {
  if (!slug) {
    slug = Charlatan.Lorem.words().join('');
  }
  if (!size) {
    size = '300x300';
  }
  if (!format) {
    format = 'png';
  }

  if (!size.match(/^[0-9]+x[0-9]+$/)) {
    throw new Error('Size should be specified in format 300x300');
  }
  if (SUPPORTED_FORMATS.indexOf(format) === -1) {
    throw new Error('Supported formats are ' + SUPPORTED_FORMATS.join(', '));
  }

  return 'http://robohash.org/' + slug + '.' + format + '?size=' + size;
};
