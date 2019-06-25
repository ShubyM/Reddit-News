import './header.css';
import React from 'react';

class Header extends React.Component {
  render() {
    return (
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
    );
  }
}


export default Header;
