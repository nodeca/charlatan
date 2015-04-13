'use strict';

/**
 * class Charlatan.Commerce
 **/


var Charlatan = require('../charlatan');

/**
 * Charlatan.Commerce.color() -> String
 *
 * Generate color name
 **/
exports.color = function () {
  return Charlatan.fetch('commerce.color');
};


/**
 * Charlatan.Commerce.department() -> String
 *
 * Generate department name
 **/
exports.department = function () {
  return Charlatan.fetch('commerce.department');
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
 * Charlatan.Commerce.productName() -> Float
 *
 * Generate product name
 **/
exports.price = function () {
  return Charlatan.Helpers.rand(100, 0) + 
    Math.floor(Charlatan.Helpers.rand(100, 0))/100.0;
};
