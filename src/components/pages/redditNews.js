'use strict';
import React from 'react';

const snoowrap = require('snoowrap');


const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: 'p0wDcQ6snhLWYcejw1gn29cW64aFJnZ3QOHIAe6aurSP',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
});

const r = new snoowrap({
  userAgent: 'Reddit News JS by /u/BambooSlayerz',
  clientId: 'AzC27iiyRqCkAQ',
  clientSecret: '8KtUv8B5V8p5v_wv1X0fv4U6g5I',
  username: 'BambooSlayerz',
  password: 'shadowmw3'
});

var scores = []

function gatherRedditData() {
  const rawItems = r.getSubreddit('news').getHot({limit : 100});
  var listOfTitles = (rawItems.map(post => post.title));
  listOfTitles.then(events => main(events))
}

function analyzeEvents(event) {
  naturalLanguageUnderstanding.analyze({
      "features": {
        "sentiment" : {}
      },
      "text" : event})
      .then(analysisResults => {
      return scoresInArray(analysisResults["sentiment"]["document"]["score"])
  });
}

function scoresInArray(score) {
  scores.push(score)

  if (scores.length === 100) {
    exportScores(scores)
  }
}

function exportScores(scores) {
    return scores
}


function main(events) {
  for (const event of events) {
    analyzeEvents(event);
  }
}

exports.start = function start() {
  gatherRedditData();
}



