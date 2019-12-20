'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
const fetch = require("node-fetch");
var fs = require('fs');

const dashboard = {  
  index(request, response) {  
    const viewData = {
         title: "WEATHER STATION",

      }
    response.render("dashboard", viewData);
    
  },  
};


module.exports = dashboard;