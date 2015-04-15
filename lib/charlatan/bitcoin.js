
'use strict';

/**
 * class Charlatan.Bitcoin
 **/

var crypto = require('crypto');


var PROTOCOL_VERSIONS = {
  main: 0,
  testnet: 111
};


/** internal
 *  divide(buf, n) -> Number
 *   - buf(Buffer): divident
 *   - n(Number): divisor
 *
 *  Performs integer division of buf by n (modifying buf in-place)
 *  and returns a reminder.
 *
 *  `n` must be one digit (i.e. lower than 256)
 **/
function divide(buf, n) {
  /*eslint-disable no-bitwise*/
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


/** internal
 *  buffer_empty(buf) -> Boolean
 *   - buf(Buffer): buffer to check
 *
 *  Returns true iff all elements of a buffer are zero.
 **/
function buffer_empty(buf) {
  for (var i = buf.length - 1; i > 0; i--) {
    if (buf[i]) { return false; }
  }

  return true;
}


/** internal
 *  base58(buf) -> String
 *   - buf(Buffer): buffer to encode
 *
 *  Encodes buffer to base58 format
 **/
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


/** internal
 *  addressFor(network[, rnd]) -> String
 *   - network(String): network we're getting address for
 *   - rnd(Buffer): hash of a private key (generated randomly if not supplied)
 *
 *  Generate bitcoin address for a given network
 **/
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


/**
 *  Charlatan.Bitcoin.address() -> String
 *
 *  Generate a valid bitcoin address
 **/
exports.address = function () {
  return addressFor('main', crypto.randomBytes(20).toString('hex'));
};


/**
 *  Charlatan.Bitcoin.testnetAddress() -> String
 *
 *  Generate a valid bitcoin address for testnet block chain
 **/
exports.testnetAddress = function () {
  return addressFor('testnet', crypto.randomBytes(20).toString('hex'));
};


// exported for tests
exports._divide = divide;
exports._base58 = base58;
exports._addressFor = addressFor;
