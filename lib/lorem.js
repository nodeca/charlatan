'use strict';

/**
 * Lorem
 *
 **/

var Helpers = require('./helpers');
var definitions = require('../lib/definitions');


/**
 * Lorem#words(wordCount = 3) -> Array
 * - wordCount (integer): number of words in output
 *
 * Generate array of random words
 **/
exports.words = function(wordCount){
  if (wordCount=== undefined) {
    wordCount= 3;
  }
  return Helpers.shuffle(definitions.lorem()).slice(0, wordCount);
};


/**
 * Lorem#sentence(wordCount= null, capitalize=true) -> String
 * - wordCount (integer): number of words in sentence. If null, then random
 * - capitalize (boolean): need capitalize first word
 *
 * Generate lorem sentence
 **/
exports.sentence = function(wordCount, capitalize){
  var sentence;
  if (wordCount === undefined) {
    wordCount = Helpers.randomNumber(7) + 3;
  }
  if (capitalize === undefined) {
    capitalize = true;
  }

  sentence = this.words(wordCount).join(' ') + '.';

  if (capitalize) {
    sentence = Helpers.capitalize(sentence);
  }
  return sentence;
};


/**
 * Lorem#sentences(sentenceCount) -> Array
 * - sentenceCount(integer): number of sentencies in output
 *
 * Generate array of lorem sentences
 **/
exports.sentences = function(sentenceCount){
  var sentences = [];
  if (sentenceCount === undefined)
  {
    sentenceCount = Helpers.randomNumber(3) + 3;
  }
  for (sentenceCount; sentenceCount >= 0; sentenceCount--) {
    sentences.push(this.sentence());
  }
  return sentences;
};


/**
 * Lorem#paragraph(sentenceCount) -> String
 * - sentenceCount(integer): number of sentencies in paragph
 * - glue (string): glue beetwin paragraphs, by space default
 *
 * Generate lorem paragraph
 **/
exports.paragraph = function(sentenceCount, glue){
  if (sentenceCount === undefined)
  {
    sentenceCount = Helpers.randomNumber(3) + 1;
  }
  if (glue === undefined) {
    glue = ' ';
  }
  return this.sentences(sentenceCount).join(glue);
};


/**
 * Lorem#paragraphs(paragraphCount=3, sentenceCount=null) -> Array
 * - paragraphCount(integer): number of paragraphs in output
 * - sentenceCount(integer): number of sentencies in paragph
 *
 * Generate array of lorem paragraphs
 **/
exports.paragraphs = function(paragraphCount, sentenceCount){
  var paragraphs = [];
  if (paragraphCount === undefined){
    paragraphCount = 3;
  }
  for(paragraphCount; paragraphCount >= 0; paragraphCount--){
    paragraphs.push(this.paragraph(sentenceCount));
  }
  return paragraphs;
};


/**
 * Lorem#text(paragraphCount, sentenceCount, glue) -> String
 * - paragraphCount(integer): number of paragraphs in output
 * - sentenceCount(integer): number of sentencies in paragph
 * - glue (string): glue beetwin paragraphs, by `\n \r\t` default
 *
 * Generate text
 **/
exports.text = function(paragraphCount, sentenceCount, glue){
  if (glue === undefined){
    glue = "\n \r\t";
  }
  return this.paragraphs(paragraphCount, sentenceCount).join(glue);
};
