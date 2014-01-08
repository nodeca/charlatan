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


/**
 * Charlatan.Lorem.sentence(wordCount=null, supplemental=false, capitalize=true) -> String
 * - wordCount (integer): number of words in sentence. If null, then randomly greater then 3
 * - supplemental (boolean): use additional words
 * - capitalize (boolean): need capitalize first word
 *
 * Generate lorem sentence
 **/
exports.sentence = function (wordCount, supplemental, capitalize) {
  var sentence;

  if (isNotSet(wordCount)) {
    wordCount = Helpers.rand(7) + 3;
  }

  if (isNotSet(capitalize)) {
    capitalize = true;
  }

  sentence = this.words(wordCount, supplemental).join(' ') + '.';

  if (capitalize) {
    sentence = Helpers.capitalize(sentence);
  }

  return sentence;
};


/**
 * Charlatan.Lorem.sentences(sentenceCount, supplemental=false) -> Array
 * - sentenceCount(integer): number of sentencies in output
 * - supplemental (boolean): use additional words
 *
 * Generate array of lorem sentences
 **/
exports.sentences = function (sentenceCount, supplemental) {
  var sentences = [];

  if (isNotSet(sentenceCount))

  {
    sentenceCount = Helpers.rand(3) + 3;
  }

  for (sentenceCount; sentenceCount > 0; sentenceCount--) {
    sentences.push(this.sentence(null, supplemental));
  }

  return sentences;
};


/**
 * Charlatan.Lorem.paragraph(sentenceCount) -> String
 * - sentenceCount(integer): number of sentencies in paragph
 * - supplemental (boolean): use additional words
 *
 * Generate lorem paragraph
 **/
exports.paragraph = function (sentenceCount, supplemental) {
  if (isNotSet(sentenceCount)) {
    sentenceCount = Helpers.rand(3) + 1;
  }

  return this.sentences(sentenceCount, supplemental).join(' ');
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
    paragraphs.push(this.paragraph(null, supplemental));
  }

  return paragraphs;
};


/**
 * Charlatan.Lorem.text(paragraphCount, sentenceCount, glue) -> String
 * - paragraphCount(integer): number of paragraphs in output
 * - supplemental (boolean): use additional words
 * - glue (string): glue beetwin paragraphs, `\n \r\t` by default
 *
 * Generate text
 **/
exports.text = function (paragraphCount, supplemental, glue) {
  if (isNotSet(glue)) {
    glue = '\n \r\t';
  }

  return this.paragraphs(paragraphCount, supplemental).join(glue);
};
