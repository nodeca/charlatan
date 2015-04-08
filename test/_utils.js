
'use strict';

var seed = process.env.MT_SEED || Math.floor(Math.random() * Math.pow(2, 32));
console.log('Using seed:', seed);

var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister(seed);

Math.random = function () {
  return generator.random();
};

