import './App.css';
import React from 'react';
import Header from './components/headerComponent/header'
import Reddit from './components/pages/redditNewsPage';


class App extends React.Component {
  render() {
    return (
      <div classname = "App"> 
      <Header> </Header>
      <Reddit />
      </div>
    );
  }
}


export default App;
