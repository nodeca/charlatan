
'use strict';

//
// Print out `Math.random()` seed for tests.
//
// All our tests are random-based, so with this seed, if CI run fails we can
// reproduce results more easily.
//

var seed = process.env.MT_SEED || Math.floor(Math.random() * Math.pow(2, 32));
/*eslint-disable no-console*/
console.log('Using seed:', seed);

var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister(seed);

Math.random = function () {
  return generator.random();
};

