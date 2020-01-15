import React from 'react';

const Header = (props) => (
  <header>
    <img id="icon" src="/images/diamondTriple-fav.png" alt="Dead Simple Icon" />
    <h1 id="main-title" title="Dead Simple">Dead Simple</h1>
    <a id="loginButton" href="#header">{ props.login }</a>
  </header>
);

export default Header;