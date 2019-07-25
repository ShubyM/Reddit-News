'use-strict';
import React from 'react'
// var reddit = require('./prototypeComponent')

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
    password: 'shadowmw3',
});





class RedditTest extends React.Component {
    gatherRedditData() {
        var posts = []
        const rawItems = r.getSubreddit('news').getHot({limit : 100});
        rawItems.map(post => {
            naturalLanguageUnderstanding.analyze({
            "features": {"sentiment" : {}}, "text" : post.title})
            .then(function(analysisResults) {
              posts.push(post.title, post.score, analysisResults["sentiment"]["document"]["score"])
              if (posts.length === 300) console.log(posts)
            })
          })
    }

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            scores: [],
            upVotes: []
        };
    }

    componentDidMount() {
        var events = []
        const rawItems = r.getSubreddit('news').getHot({limit : 100});
        rawItems.map(post => events.push(post.title));
        if (events.length === 100) {
            this.setState({posts : events});
            console.log(events)
        }
    }




    render() {
        return (
            // <h1> {this.state.posts} </h1>
            <button onClick = {this.gatherRedditData}> Refresh (NW) </button>
        )
    }
}


export default RedditTest;