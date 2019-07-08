import React from "react";
import Data from "./redditData.json";
import "./reddit.css";

function start() {
  var reddit = require("./redditNews");
  reddit.start();
}

class Reddit extends React.Component {
  render() {
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th scope="col">
                Event Name <button onClick={start}> Refresh (NW) </button>
              </th>
              <th scope="col"> Event score</th>
              <th scope="col"> Up Votes </th>
              <th scope="col"> Sum Score </th>
            </tr>
          </thead>

          <tbody>
            {Data.table.map((eventData, index) => {
              return (
                <tr>
                  <td class="column1"> {eventData.title} </td>
                  <td> {eventData.score} </td>
                  <td> {eventData.upVotes} </td>
                  <td> {eventData.upVotes * eventData.score} </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td colspan="1"> Total Score </td>
              {/* {Data.total.map((sum, index) => {
                return <td> {sum} </td>;
              })} */}

              <td> {Data.total[1]} </td>

              <td> </td>

              <td> {Data.total[0]} </td>
            </tr>
          </tfoot>
        </table>
      </section>
    );
  }
}

export default Reddit;
