
'use strict';

/**
 * class Charlatan.Bitcoin
 **/

var crypto = require('crypto');


var PROTOCOL_VERSIONS = {
  main: 0,
  testnet: 111
};


// Divides buf by n (modifying buf in-place) and returns
// a reminder; n must be one digit (i.e. lower than 256)
//
function divide(buf, n) {
  /*jshint bitwise: false*/
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
    result.unshift(alphabet[divide(divident, base)]);
  }

  for (var i = 0; i < buf.length && !buf[i]; i++) {
    result.unshift(alphabet[0]);
  }

  return result.join('');
}


function addressFor(network, rnd) {
  var version = PROTOCOL_VERSIONS[network];

  //                      ver   payload  checksum
  var packed = new Buffer('00' + rnd + '00112233', 'hex');
  packed[0] = version;

  var hash = crypto.createHash('sha256').update(packed.slice(0, packed.length - 4)).digest();
  hash = crypto.createHash('sha256').update(hash).digest();

  packed[packed.length - 4] = hash[0];
  packed[packed.length - 3] = hash[1];
  packed[packed.length - 2] = hash[2];
  packed[packed.length - 1] = hash[3];

  return base58(packed);
}


exports.address = function () { 
  return addressFor('main', crypto.randomBytes(20).toString('hex'));
};


exports.testnetAddress = function () { 
  return addressFor('testnet', crypto.randomBytes(20).toString('hex'));
};


// exported for tests
exports._divide = divide;
exports._base58 = base58;
exports._addressFor = addressFor;
