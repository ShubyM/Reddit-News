const express = require('express');
const bodyParser = require("body-parser");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1.js");

const app = express();


/**
 * Constructs the NLU endpoint object to call
 * TODO: Wrap credentials into enviorment vairables
 */
let nlu = new NaturalLanguageUnderstandingV1({
    version: "2018-11-16",
    iam_apikey: "29utp9pg2X5u6iRHhbIBeX8vXnEE9jx5iM_GoofPo9wN",
    url: "https://gateway.watsonplatform.net/natural-language-understanding/api/",
});


/** 
 * Have no idea what this actually does?
 * TODO: Learn how this works
 */
app.use(bodyParser.json());


/**
 * Actually calls NLU endpoint through the POST request
 * Text is an automatically assumed parameter within the code??
 * TODO: Learn how text is added to the request exactly,
 * not explicitly defined
 */
app.post("/api/analyze", (req, res, next) => {
    nlu.analyze(req.body, (err, results) => {
      if (err) {
        return next(err);
      }
      return res.json({ query: req.body.query, results });
    });
  }
);

module.exports = app;