import React from "react";
import Data from "./redditData.json";
import "./reddit.css";

class Reddit extends React.Component {
  render() {
    return (
      //   <div>
      //     {/* {Data.table.map((eventData, index) => {
      //       return (
      //         <p>
      //           {eventData.event} {eventData.score}
      //         </p> */}
      //       );
      //     })}
      //   </div>

      <div class="tbl-header">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event score</th>
              <th> Up Votes </th>
              {/* <th>Up Votes</th>
              <th>Total score</th>
              <th>Change %</th> */}
            </tr>
          </thead>
        </table>

        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                {Data.table.map((eventData, index) => {
                   return <tr> 
                       <td> {eventData.title} </td> 
                       <td> {eventData.score} </td>
                       <td> {eventData.upVotes} </td>
                    </tr>
                })}
              </tr>
            </tbody>
          </table>
        </div>


      </div>
    );
  }
}

export default Reddit;
