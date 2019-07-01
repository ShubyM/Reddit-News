import React from 'react';
import '/Users/Shuby/Documents/Website/my-website/src/App.css';

class Header extends React.Component {
  render() {
    return (
    <header>
     <nav> 
         <ul>
             <li> 
                <a href = "/"> Home </a>
             </li>
         </ul>

         <ul> 
            <li> 
                <a href = "/"> About Me </a>
            </li>
         </ul>

         <ul>
            <li> 
                <a href = "/"> Reddit News</a>
            </li>
         </ul>

         <ul>
            <li> 
                <a href = "/"> Random page </a>
            </li>
         </ul>

     </nav>
     </header>
    );
  }
}


export default Header;
