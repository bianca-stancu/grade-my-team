'use strict';

console.log(process.cwd())
var config = require('../config');
var utis = require('./utils')

//load model
var mongoose = require('mongoose');
var User = require('../models/User');
var Course = require('../models/Course');

//total callbacks (one for each model)
var totalCbs = 1;
var cbCnt = 0;

//seedData
var seedData = require('./seedData')

/**
* Recursive function that goes through 
* seedData populating each item of it
*/
var seedModel = function(idx, done){
  if(idx == seedData.length){
    return done(null, seedData);
  }

  var modelName = seedData[idx].name;
  if(modelName== "User"){
      User.create(seedData[idx].data, function(err){
          if (err) done (err);
          //seed next model
          seedModel(++idx, done)
      });
  }
  else if(modelName == "Course"){
      Course.create(seedData[idx].data, function(err){
          if (err) done (err);
          //seed next model
          seedModel(++idx, done)
      });
  }
}

/**
* This is where everything starts
*/
module.exports.seed = function (done){
  utis.connectAndDropDb(function(err){
    if(err) return done(err);
    seedModel(0, done);
  });
}
