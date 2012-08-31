'use strict';

var Charlatan = require('../index.js');
Charlatan.setLocale('en-us');

var user = {
  name: Charlatan.Name.name(),
  company: Charlatan.Company.name(),
  motto: Charlatan.Lorem.sentence()
};
console.dir(user);
