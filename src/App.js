import './App.css';
import React from 'react';
import Header from './components/headerComponent/header'
import RedditNews from './components/pages/RedditNews/RedditNews';






class App extends React.Component {
  /* @params headerName, title, sub, desc, foot */

  

  render() {
    return (
      <div classname = "App"> 
      <Header> </Header>
      {/* <Reddit /> */}
      <RedditNews />




      {/* <div class = "card1"> 
      <Card 
        headerName = "Hello"
        title = "something" 
        sub = "something else"
        desc = "somethingsdndlkfsd"
        foot = "djfndlnflsdf"
        url = "https://img-aws.ehowcdn.com/350x235p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/88dc235d44b345c18d0b1aed42d838ff.jpg"
      /> 
      </div> */}
      
      </div>
    );
  }
}


export default App;
