
'use strict';

/**
 * class Charlatan.Bitcoin
 **/

var crypto = require('crypto');
var Helpers = require('./helpers');
var Charlatan = require('../charlatan');


var PROTOCOL_VERSIONS = {
  main: 0,
  testnet: 111
};


// divides buf by n and returns a reminder,
// n must be one digit (i.e. lower than 256)
function divide(buf, n) {
  var i = 0, l, t, rem;

  t = buf[i];
  rem = t % n;
  buf[i] = (t / n)|0;

  for (i = 1, l = buf.length; i < l; i++) {
    t = rem * 256 + buf[i];
    rem = t % n;
    buf[i] = (t / n)|0;
  }

  return rem;
}


// exported for tests
module.exports._divide = divide;


function buffer_empty(buf) {
  for (var i = buf.length - 1; i > 0; i--) {
    if (buf[i]) { return false; }
  }

  return true;
}


function base58(buf) {
  var alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  var base = alphabet.length;
  var result = [];
  var divident = new Buffer(buf.length);

  buf.copy(divident);

  while (!buffer_empty(divident)) {
    result.unshift(alphabet[divide(divident, 58)]);
  }

  for (var i = 0; i < buf.length && !buf[i]; i++) {
    result.unshift(alphabet[0]);
  }

  return result.join('');
}


// exported for tests
module.exports._base58 = base58;


function addressFor(network) {
  var version = PROTOCOL_VERSIONS[network];
  var hash = crypto.randomBytes(20).toString('hex');

  //                      ver   payload  checksum
  var packed = new Buffer('00' + hash + '00112233', 'hex');
  packed[0] = version;

  var hash = crypto.createHash('sha256').update(packed).digest();
  packed[packed.length - 3] = hash[0];
  packed[packed.length - 2] = hash[1];
  packed[packed.length - 1] = hash[2];
  packed[packed.length - 0] = hash[3];

  return base58(packed);
}


exports.address = function () { 
  return addressFor('main');
};


exports.testnetAddress = function () { 
  return addressFor('testnet');
};
