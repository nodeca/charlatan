'use strict';

var Charlatan = require('./charlatan');

// returns a single random number based on a range
exports.randomNumber = function(range) {
  var r = Math.floor(Math.random()*range);
  return r;
};

// takes an array and returns the array randomly sorted
exports.randomize = function(array) {
  var r = Math.floor(Math.random()*array.length);
  return array[r];
};

// parses string for a symbol and replace it with a random number from 1-10
exports.replaceSymbolWithNumber = function(string, symbol){
  var str = '';
  var i;

  // default symbol is '#'
  if(symbol === undefined){
    symbol = '#';
  }

  for(i = 0; i < string.length; i++){
    if(string[i] === symbol){
      str += Math.floor(Math.random()*10);
    }
    else{
      str += string[i];
    }
  }
  return str;
};

// takes an array and returns it randomized
exports.shuffle = function(source){
  var result = source.slice();
	var i, p, tmp;
  for (i = 0; i < source.length; i++) {
    p = parseInt(Math.random() * source.length, 10);
		tmp = result[i];
    result[i] = result[p];
    result[p] = tmp;
  }
	return result;
};


exports.generateDataSet = function(size){

};

exports.createCard = function(){

  return {
    "name":Charlatan.Name.findName(),
      "username":Charlatan.Internet.userName(),
      "email":Charlatan.Internet.email(),
      "address":{
        "streetA":Charlatan.Address.streetName(),
        "streetB":Charlatan.Address.streetAddress(),
        "streetC":Charlatan.Address.streetAddress(true),
        "streetD":Charlatan.Address.secondaryAddress(),
        "city":Charlatan.Address.city(),
        "ukCounty":Charlatan.Address.ukCounty(),
        "ukCountry":Charlatan.Address.ukCountry(),
        "zipcode":Charlatan.Address.zipCode()
      },
      "phone":Charlatan.PhoneNumber.phoneNumber(),
      "website":Charlatan.Internet.domainName(),
      "company":{
        "name":Charlatan.Company.companyName(),
        "catchPhrase":Charlatan.Company.catchPhrase(),
        "bs":Charlatan.Company.bs(),
      },
      "posts":[
      {
        "words":Charlatan.Lorem.words(),
        "sentence":Charlatan.Lorem.sentence(),
        "sentences":Charlatan.Lorem.sentences(),
        "paragraph":Charlatan.Lorem.paragraph()
      },
      {
        "words":Charlatan.Lorem.words(),
        "sentence":Charlatan.Lorem.sentence(),
        "sentences":Charlatan.Lorem.sentences(),
        "paragraph":Charlatan.Lorem.paragraph()
      },
      {
        "words":Charlatan.Lorem.words(),
        "sentence":Charlatan.Lorem.sentence(),
        "sentences":Charlatan.Lorem.sentences(),
        "paragraph":Charlatan.Lorem.paragraph()
      }
    ]
  };
};


exports.userCard = function(){

  return {
    "name":Charlatan.Name.findName(),
      "username":Charlatan.Internet.userName(),
      "email":Charlatan.Internet.email(),
      "address":{
        "street":Charlatan.Address.streetName(true),
        "suite":Charlatan.Address.secondaryAddress(),
        "city":Charlatan.Address.city(),
        "zipcode":Charlatan.Address.zipCode()
      },
      "phone":Charlatan.PhoneNumber.phoneNumber(),
      "website":Charlatan.Internet.domainName(),
      "company":{
        "name":Charlatan.Company.companyName(),
        "catchPhrase":Charlatan.Company.catchPhrase(),
        "bs":Charlatan.Company.bs(),
      },
  };
};


String.prototype.capitalize = function(){ //v1.0
  return this.replace(/\w+/g, function(a){
    return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
  });
};
