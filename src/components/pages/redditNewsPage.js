import React from "react";
import Data from "./redditData.json";
import "./reddit.css";


function start() {
  var reddit = require('./redditNews');
  reddit.start()
}

class Reddit extends React.Component {
  render() {
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th scope="col"> Event Name <button onClick = {start}> Refresh (NW) </button></th>
              <th scope="col"> Event score</th>
              <th scope="col"> Up Votes </th>
              <th scope = "col"> Sum Score </th> 
            </tr>
          </thead>

          <tbody>
            {Data.table.map((eventData, index) => {
              return (
                <tr>
                  <td class = "column1"> {eventData.title} </td>
                  <td> {eventData.score} </td>
                  <td> {eventData.upVotes} </td>
                  <td> </td>

                </tr>
              );
            })}
          </tbody>

          <tfoot>
            
          </tfoot>

        </table>
      </section>
    );
  }
}

export default Reddit;
