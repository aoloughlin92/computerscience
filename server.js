"use strict";

const express = require("express");
const logger = require("./utils/logger");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const fetch = require("node-fetch");

const app = express();
app.use(express.static('views'));
app.use(express.static('node_modules/p5/lib'));
app.use(express.static('node_modules/p5/lib/addons'));
const exphbs = require("express-handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main"
  })
);
app.set("view engine", ".hbs");

const routes = require("./routes");
app.use("/", routes);

const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info(`glitch-template-1 started on port ${listener.address().port}`);
});

app.get('/weather',async (request, response)=>{
  const api_url = "https://api.darksky.net/forecast/0dd5dd380e3b875b54df248d5b508d71/53.2779782,-6.2131807/?units=auto"
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});