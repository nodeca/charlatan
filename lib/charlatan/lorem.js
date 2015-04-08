'use strict';

/**
 * class Charlatan.Lorem
 *
 **/

var Helpers = require('./helpers');
var Charlatan = require('../charlatan');


function isNotSet(variable) {
  return variable === undefined || variable === null;
}


// If an array is passed, a random value will be selected.
// All other values are simply returned.
//
// Note: ruby supports ranges here, we don't
//
function resolve(value) {
  if (Array.isArray(value)) {
    return Helpers.sample(value);
  }

  return value;
}

/**
 * Charlatan.Lorem.word () -> String
 *
 * Generate random word
 **/
exports.word = function () {
  return Helpers.sample(exports.words());
};

/**
 * Charlatan.Lorem.words(wordCount = 3, supplemental = false) -> Array
 * - wordCount (integer): number of words in output
 * - supplemental (boolean): use additional words
 *
 * Generate array of random words
 **/
exports.words = function (wordCount, supplemental) {

  if (isNotSet(wordCount)) {
    wordCount = 3;
  }

  var words = Charlatan.translate('lorem.words');

  if (!!supplemental) {
    words = words.concat(Charlatan.translate('lorem.supplemental'));
  }

  return Helpers.shuffle(words).slice(0, wordCount);
};


exports.character = function () {
  return exports.characters(1);
};

/**
 * Charlatan.Lorem.characters(charCount=null) -> String
 * - charCount (integer): number of characters in result
 *
 * Generate lorem characters
 **/
exports.characters = function (charCount) {
  if (typeof charCount !== 'number') { charCount = 255; }

  charCount = resolve(charCount);

  var result = '';

  for (var i = 0; i < charCount; i++) {
    result += Helpers.rand(36).toString(36);
  }

  return result;
};

/**
 * Charlatan.Lorem.sentence(wordCount=4, supplemental=false, randomWordsToAdd=6) -> String
 * - wordCount (integer): number of words in sentence. If null, then it's random greater than 3
 * - supplemental (boolean): use additional words
 * - randomWordsToAdd (integer): additional count of random words
 *
 * Generate lorem sentence
 **/
exports.sentence = function (wordCount, supplemental, randomWordsToAdd) {
  var sentence;

  if (isNotSet(wordCount)) {
    wordCount = 4;
  }

  if (isNotSet(randomWordsToAdd)) {
    wordCount = 6;
  }

  sentence = exports.words(wordCount + Helpers.rand(randomWordsToAdd), supplemental).join(' ') + '.';

  return Helpers.capitalize(sentence);
};


/**
 * Charlatan.Lorem.sentences(sentenceCount=3, supplemental=false) -> Array
 * - sentenceCount(integer): number of sentences in output
 * - supplemental (boolean): use additional words
 *
 * Generate array of lorem sentences
 **/
exports.sentences = function (sentenceCount, supplemental) {
  var sentences = [];

  if (isNotSet(sentenceCount)) {
    sentenceCount = 3;
  }

  for (sentenceCount; sentenceCount > 0; sentenceCount--) {
    sentences.push(exports.sentence(null, supplemental));
  }

  return sentences;
};


/**
 * Charlatan.Lorem.paragraph(sentenceCount=3, supplemental=false, randomWordsToAdd=3) -> String
 * - sentenceCount(integer): number of sentences in paragraph
 * - supplemental (boolean): use additional words
 * - randomWordsToAdd (integer): additional count of random words
 *
 * Generate lorem paragraph
 **/
exports.paragraph = function (sentenceCount, supplemental) {
  if (isNotSet(sentenceCount)) {
    sentenceCount = Helpers.rand(3) + 1;
  }

  return exports.sentences(sentenceCount, supplemental).join(' ');
};


/**
 * Charlatan.Lorem.paragraphs(paragraphCount=3, sentenceCount=null) -> Array
 * - paragraphCount(integer): number of paragraphs in output
 * - supplemental (boolean): use additional words
 *
 * Generate array of lorem paragraphs
 **/
exports.paragraphs = function (paragraphCount, supplemental) {
  var paragraphs = [];

  if (isNotSet(paragraphCount)) {
    paragraphCount = 3;
  }

  for (; paragraphCount > 0; paragraphCount--) {
    paragraphs.push(exports.paragraph(null, supplemental));
  }

  return paragraphs;
};


/**
 * Charlatan.Lorem.text(paragraphCount, sentenceCount, glue) -> String
 * - paragraphCount(integer): number of paragraphs in output
 * - supplemental (boolean): use additional words
 * - glue (string): glue between paragraphs, `\n \r\t` by default
 *
 * Generate text
 **/
exports.text = function (paragraphCount, supplemental, glue) {
  if (isNotSet(glue)) {
    glue = '\n \r\t';
  }

  return exports.paragraphs(paragraphCount, supplemental).join(glue);
};
