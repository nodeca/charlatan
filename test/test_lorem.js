'use strict';

require('./_utils');

var assert = require('assert');
var Charlatan = require('../');
var tester = require('../').Lorem;

describe('Lorem', function () {
  var standard_wordlist = Charlatan.translate('lorem.words');
  var complete_wordlist = standard_wordlist.concat(Charlatan.translate('faker.lorem.supplemental'));

  it('character', function () {
    assert.equal(tester.character().length, 1);
  });

  it('character_type', function () {
    assert.equal(typeof tester.character(), 'string');
  });

  it('characters', function () {
    assert.equal(tester.characters().length, 255);
  });

  it('characters_with_args', function () {
    for (var i = 0; i < 100; i++) {
      assert.equal(tester.characters(500).length, 500);
    }
  });

  // Words delivered by a standard request should be on the standard wordlist.
  it('standard_words', function () {
    var words = tester.words(1000);
    words.forEach(function (w) {
      assert(standard_wordlist.indexOf(w) !== -1);
    });
  });

  // Words requested from the supplemental list should all be in that list.
  it('supplemental_words', function () {
    var words = tester.words(1000, true);
    words.forEach(function (w) {
      assert(complete_wordlist.indexOf(w) !== -1);
    });
  });

  // Lorem.word generates random word from standard wordlist
  it('word', function () {
    for (var i = 0; i < 1000; i++) {
      assert(standard_wordlist.indexOf(tester.word()) !== -1);
    }
  });

  it('exact_count_param', function () {
    assert.equal(tester.characters(2).length, 2);
    assert.equal(tester.words(2).length, 2);
    assert.equal(tester.sentences(2).length, 2);
    assert.equal(tester.paragraphs(2).length, 2);
  });

  it('array_count_param', function () {
    var cs = tester.characters([ 1, 4 ]);
    var ws = tester.words([ 1, 4 ]);
    var ss = tester.sentences([ 1, 4 ]);
    var ps = tester.paragraphs([ 1, 4 ]);

    assert(cs.length === 1 || cs.length === 4);
    assert(ws.length === 1 || ws.length === 4);
    assert(ss.length === 1 || ss.length === 4);
    assert(ps.length === 1 || ps.length === 4);
  });

  it('words_with_large_count_params', function () {
    var exact = tester.words(500);
    var array = tester.words([ 250, 500 ]);

    assert.equal(exact.length, 500);
    assert(array.length === 250 || array.length === 500);
  });
});
