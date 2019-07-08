import "./card.css";
import React from "react";


/* @params headerName, title, sub, desc, foot */
const Card = (props) => {
  return (
    <div class="row">
      <div class="col-sm-3">
        <div class="card">
          <div class="card-header"> {props.headerName} </div>
          <img
            class="card-img-top"
            src= {props.url}
            alt="card top"
          />
          <div class="card-body">
            <h3 class="card-title"> {props.title} </h3>
            <h4 class="card-subtitle"> {props.sub} </h4>
            <p class="card-text"> {props.desc} </p>
          </div>
          <div class="card-footer">{props.foot} </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
