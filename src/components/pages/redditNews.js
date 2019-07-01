const snoowrap = require('snoowrap');
var fs = require('fs');
var file = fs.createWriteStream('something.csv');
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
  password: 'shadowmw3',
});

var scores = []

function gatherRedditData() {
  const rawItems = r.getSubreddit('news').getHot({limit : 100});
  var listOfTitles = (rawItems.map(post => post.title));
  listOfTitles.then(events => {
    analyzeEvents(events)
  })
}

function analyzeEvents(arrayOfEvents) {
  for (const event of arrayOfEvents) {
  naturalLanguageUnderstanding.analyze({
      "features": {"sentiment" : {}}, "text" : event})
      .then(function(analysisResults) {
      scores.push(event, analysisResults["sentiment"]["document"]["score"])
      if (scores.length === 100) {
        writeToFile(scores)
      }
    })
  }
}

function writeToFile(scores) {
  for (var i = 0; i < scores.length; i = i + 2) {
    scores[i] = scores[i].replace(/,/g, '')
  }



}

exports.start = function start() {
  gatherRedditData()
}

