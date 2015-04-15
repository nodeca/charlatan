'use strict';

/**
 * class Charlatan.Lorem
 **/

var Helpers = require('./helpers');
var Charlatan = require('../charlatan');


function isNotSet(variable) {
  return typeof variable === 'undefined' || variable === null;
}


/** internal
 * resolve(value) -> String
 *  - value(String | Array): stuff
 *
 * If an array is passed, a random value will be selected.
 * All other values are simply returned.
 *
 * Note: ruby supports ranges here, we don't
 **/
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
  return Helpers.sample(Charlatan.translate('lorem.words'));
};

/**
 * Charlatan.Lorem.words(wordCount = 3, supplemental = false) -> Array
 * - wordCount(Number): number of words in output
 * - supplemental(Boolean): use additional words
 *
 * Generate an array of random words
 **/
exports.words = function (wordCount, supplemental) {

  if (isNotSet(wordCount)) {
    wordCount = 3;
  }

  var words = Charlatan.translate('lorem.words');

  if (supplemental) {
    words = words.concat(Charlatan.translate('lorem.supplemental'));
  }

  var result = [];

  for (var i = 0, l = resolve(wordCount); i < l; i++) {
    result.push(Helpers.sample(words));
  }
  return result;
};


/**
 * Charlatan.Lorem.character() -> String
 *
 * Generate a character
 **/
exports.character = function () {
  return exports.characters(1);
};


/**
 * Charlatan.Lorem.characters(charCount=255) -> String
 * - charCount(Integer): number of characters in result
 *
 * Generate lorem characters
 **/
exports.characters = function (charCount) {
  if (typeof charCount === 'undefined' || charCount === null) { charCount = 255; }

  var result = '';

  for (var i = 0, l = resolve(charCount); i < l; i++) {
    result += Helpers.rand(36).toString(36);
  }

  return result;
};

/**
 * Charlatan.Lorem.sentence(wordCount=4, supplemental=false, randomWordsToAdd=6) -> String
 * - wordCount(Integer): number of words in sentence. If null, then it's random greater than 3
 * - supplemental(Boolean): use additional words
 * - randomWordsToAdd(Integer): additional count of random words
 *
 * Generate lorem sentence
 **/
exports.sentence = function (wordCount, supplemental, randomWordsToAdd) {
  var sentence;

  if (isNotSet(wordCount)) {
    wordCount = 4;
  }

  if (isNotSet(randomWordsToAdd)) {
    randomWordsToAdd = 6;
  }

  sentence = exports.words(wordCount + Helpers.rand(randomWordsToAdd), supplemental).join(' ') + '.';

  return Helpers.capitalize(sentence);
};


/**
 * Charlatan.Lorem.sentences(sentenceCount=3, supplemental=false) -> Array
 * - sentenceCount(Number): number of sentences in output
 * - supplemental(Boolean): use additional words
 *
 * Generate array of lorem sentences
 **/
exports.sentences = function (sentenceCount, supplemental) {
  var sentences = [];

  if (isNotSet(sentenceCount)) {
    sentenceCount = 3;
  } else {
    sentenceCount = resolve(sentenceCount);
  }

  for (; sentenceCount > 0; sentenceCount--) {
    sentences.push(exports.sentence(null, supplemental));
  }

  return sentences;
};


/**
 * Charlatan.Lorem.paragraph(sentenceCount=3, supplemental=false, randomWordsToAdd=3) -> String
 * - sentenceCount(Number): number of sentences in a paragraph
 * - supplemental(Boolean): use additional words
 * - randomWordsToAdd(Integer): additional count of random words
 *
 * Generate lorem paragraph
 **/
exports.paragraph = function (sentenceCount, supplemental, randomSentencesToAdd) {
  if (isNotSet(sentenceCount)) {
    sentenceCount = 3;
  } else {
    sentenceCount = resolve(sentenceCount);
  }

  if (isNotSet(randomSentencesToAdd)) {
    randomSentencesToAdd = 3;
  }

  return exports.sentences(sentenceCount + Helpers.rand(randomSentencesToAdd), supplemental).join(' ');
};


/**
 * Charlatan.Lorem.paragraphs(paragraphCount=3, sentenceCount=false) -> Array
 * - paragraphCount(Integer): number of paragraphs in the output
 * - supplemental(Boolean): use additional words
 *
 * Generate an array of lorem paragraphs
 **/
exports.paragraphs = function (paragraphCount, supplemental) {
  var paragraphs = [];

  if (isNotSet(paragraphCount)) {
    paragraphCount = 3;
  } else {
    paragraphCount = resolve(paragraphCount);
  }

  for (; paragraphCount > 0; paragraphCount--) {
    paragraphs.push(exports.paragraph(null, supplemental));
  }

  return paragraphs;
};


/**
 * Charlatan.Lorem.text(paragraphCount, sentenceCount, glue) -> String
 * - paragraphCount(integer): number of paragraphs in the output
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
