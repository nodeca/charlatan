'use strict';

var Helpers = require('./helpers');
var definitions = require('../lib/definitions');

exports.words = function(num){
  if(num === undefined) {
    num = 3;
  }
  return Helpers.shuffle(definitions.lorem()).slice(0, num);
  //Words.shuffle[0, num]
};

exports.sentence = function(wordCount){
  if (wordCount === undefined) {
    wordCount = 3;
  }

  // ToDo captialize first word
  return  this.words(wordCount + Helpers.randomNumber(7)).join(' ');
};

exports.sentences = function(sentenceCount){
  var sentences = [];
  if (sentenceCount === undefined)
  {
    sentenceCount = 3;
  }
  for (sentenceCount; sentenceCount >= 0; sentenceCount--) {
    sentences.push(this.sentence());
  }
  return sentences.join("\n");
};

exports.paragraph = function(sentenceCount){
  if (sentenceCount === undefined)
  {
    sentenceCount = 3;
  }
  return this.sentences(sentenceCount + Helpers.randomNumber(3));
};

exports.paragraphs = function(paragraphCount){
  var paragraphs = [];
  if (paragraphCount === undefined){
    paragraphCount = 3;
  }
  for(paragraphCount; paragraphCount >= 0; paragraphCount--){
    paragraphs.push(this.paragraph());
  }
  return paragraphs.join("\n \r\t");
};
