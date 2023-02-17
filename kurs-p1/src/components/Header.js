import React from "react";
import logo from '../logo.svg';

export default function Header(){
    return(
      <nav className='nav'>
          <div className="logo">
            <img src={logo} width="20%" alt="logo" />
            <h3>React Facts</h3>
          </div>
          
  
          <ul className='nav-items'>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
      </nav>
    );
  }