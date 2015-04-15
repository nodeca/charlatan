'use strict';

/**
 * class Charlatan.Commerce
 **/


var Charlatan = require('../charlatan');
var Helpers = require('./helpers');


function get_categories(num) {
  var categories = [], tries = 0;

  while (categories.length < num) {
    var category = Charlatan.fetch('commerce.department');
    if (categories.indexOf(category) === -1) {
      categories.push(category);
    }

    if (tries++ > 100) {
      // original ruby stuff could infinitely loop here
      break;
    }
  }
  return categories;
}

function merge_categories(categories) {
  var separator = Charlatan.fetch('separator');
  var comma_separated = categories.slice(1).join(', ');

  return [ comma_separated, categories[0] ].join(separator);
}

/**
 * Charlatan.Commerce.color() -> String
 *
 * Generate color name
 **/
exports.color = function () {
  return Charlatan.fetch('commerce.color');
};


/**
 * Charlatan.Commerce.department(max=3, fixed_amount=false) -> String
 *  - max(Number): number of categories
 *  - fixed_amount(Boolean): always return max amount of them
 *
 * Generate department name
 **/
exports.department = function (max, fixed_amount) {
  if (typeof max !== 'number') {
    max = 3;
  }

  var num;

  if (fixed_amount) {
    num = max;
  } else {
    num = Helpers.rand(max + 1, 1);
  }

  var categories = get_categories(num);

  if (num > 1) {
    return merge_categories(categories);
  }
  return categories[0];
};


/**
 * Charlatan.Commerce.productName() -> String
 *
 * Generate product name
 **/
exports.productName = function () {
  return Charlatan.fetch('commerce.product_name.adjective') + ' ' +
    Charlatan.fetch('commerce.product_name.material') + ' ' +
    Charlatan.fetch('commerce.product_name.product');
};



/**
 * Charlatan.Commerce.price() -> Float
 *
 * Generate price
 **/
exports.price = function () {
  return Charlatan.Helpers.rand(100, 0) +
    Math.floor(Charlatan.Helpers.rand(100, 0)) / 100.0;
};
