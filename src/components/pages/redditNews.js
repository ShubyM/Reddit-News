const snoowrap = require('snoowrap');

var fs = require('fs');

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

var PATH = "/Users/Shuby/Documents/Website/my-website/src/components/pages/redditData.json"

var postProperties = []

function gatherRedditData() {
  const rawItems = r.getSubreddit('news').getHot({limit : 100});
  analyzeEvents(rawItems)
}

function analyzeEvents(rawData) {
  rawData.map(post => {
    naturalLanguageUnderstanding.analyze({
    "features": {"sentiment" : {}}, "text" : post.title})
    .then(function(analysisResults) {
      postProperties.push(post.title, post.score, analysisResults["sentiment"]["document"]["score"])
      if (postProperties.length === 300) {writeToFile(postProperties)}
    })
  })
}

function writeToFile(postProperties) {
  var data = {}
  data.table = []
  data.total = []

  var sumScores = 0;
  var sentimentSum = 0;

  for (var i = 0; i < postProperties.length; i += 3) {
    postProperties[i] = postProperties[i].replace(/,/g, '');
    
    var inputData = {
      title : postProperties[i],
      upVotes : postProperties[i + 1],
      score : postProperties[i + 2],
    }

    sumScores +=  postProperties[i + 2] * postProperties[i + 1] 
    sentimentSum += postProperties[i + 2]
    data.table.push(inputData)
  }
// The total sum is calculated based directly based on the value
// TODO: Figure out better may to calculate total that make sense
  data.total.push(sumScores)
  data.total.push(sentimentSum)

  fs.writeFile(PATH, JSON.stringify(data), function(err) {
    if (err) {console.log(err)}
    else {console.log("Done writing to file")}

    // hi
    }
  );
}

exports.start = function start() {
  gatherRedditData()
}

