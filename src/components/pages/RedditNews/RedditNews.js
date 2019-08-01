"use-strict";
import React from "react";
import "./reddit.css";
import { analyzeWithAllFeatures } from "./request";

const snoowrap = require("snoowrap");
const dotenv = require("dotenv");

/**
 * Initializing the snoowrap Reddit API Call
 */

const r = new snoowrap({
  userAgent: process.env.REACT_APP_USER_AGENT,
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  username: process.env.REACT_APP_USERNAME,
  password: process.env.REACT_APP_PASSWORD
});

class RedditNews extends React.Component {

  /**
   * State is initalized with  posts, scores, upVotes
   * Posts : The title of each post
   * Scores: Sentiment extracted for each post
   * UpVotes: Number of upvotes per post
   */
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      scores: [],
      upVotes: [],
      loaded: false
    };
  }

  /**
   * Initializes the state for the table by mapping all
   * reddit events
   *
   */
  componentDidMount() {
    const rawItems = r.getSubreddit("news").getHot({ limit: 100 });
    rawItems.map(post => this.analyze(post.title, post.score));
  }

  /**
   *
   * @param {String} text
   * String to analyze for the NLU endpoint
   * @returns JSON object
   */
  async analyze(text, upVotes) {
    await analyzeWithAllFeatures({ text }).then(json =>
      this.setState({
        scores: this.state.scores.concat(json.results.sentiment.document.score),
        posts: this.state.posts.concat(text),
        upVotes: this.state.upVotes.concat(upVotes)
      })
    );
  }

  /**
   * Function for generating rows of the table
   * @params NONE
   * @return Returns an array contaning each row of the table
   */
  renderTable() {
    var elements = [];

    for (var i = 0; i < 100; i++) {
      elements.push(
        <tr>
          <td class="column1"> {this.state.posts[i]} </td>
          <td> {this.state.scores[i]} </td>
          <td> {this.state.upVotes[i]}</td>
          <td> {this.state.scores[i] * this.state.upVotes[i]} </td>
        </tr>
      );
    }
    return elements;
  }

  render() {
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th scope="col">
                Event Name
                <button onClick={() => window.location.reload()}>
                  Refresh
                </button>
              </th>
              <th scope="col"> Event score</th>
              <th scope="col"> Up Votes </th>
              <th scope="col"> Sum Score </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td colSpan="1"> Total Score </td>

              <td> </td>

              <td> </td>

              <td> </td>
            </tr>
          </tfoot>
          <tbody>{this.renderTable()}</tbody>
        </table>
      </section>
    );
  }
}

export default RedditNews;