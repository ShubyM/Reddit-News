"use-strict";
import React from "react";
import "./reddit.css";
import { analyzeWithAllFeatures } from "./request";

const snoowrap = require("snoowrap");

const r = new snoowrap({
  userAgent: "Reddit News JS by /u/BambooSlayerz",
  clientId: "AzC27iiyRqCkAQ",
  clientSecret: "8KtUv8B5V8p5v_wv1X0fv4U6g5I",
  username: "BambooSlayerz",
  password: "shadowmw3"
});

class RedditTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      scores: [],
      upVotes: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.setState({ loaded: false });
    const rawItems = r.getSubreddit("news").getHot({ limit: 100 });
    rawItems
      .map(post => post.title)
      .then(titles => {
        this.setState({ posts: titles });
      });

    rawItems
      .map(post => post.score)
      .then(scores => {
        this.setState({ upVotes: scores });
      });

    rawItems
      .map(post => this.analyze(post.title))
      .then(results => this.setState({ scores: results }));
  }

  analyze(text) {
    analyzeWithAllFeatures({ text }).then(json => {
      console.log(json.results.sentiment.document.score);
      return json.results.sentiment.document.score;
    });
  }

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

    // elements.push(<foot> <tr> </tr></foot> )

    return elements;
  }

  render() {
    if (true) {
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
    } else {
      return (
        <h1> Sorry something broke and you really suck at programming </h1>
      );
    }
  }
}

export default RedditTest;
