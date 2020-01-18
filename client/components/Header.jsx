import React from 'react';

const loginData = {
  email: 'steve@steve.com',
  password: 'blankenship',
}

const Header = (props) => (
  <header>
    {/* <img id="icon" src="/images/diamondTriple-fav.png" alt="Dead Simple Icon" /> */}
    <h1 id="main-title" title="Dead Simple">Timely</h1>
    <div id="loginButton" href="#header" onClick={() => handleLogin(loginData)}>Login</div>
  </header>
);

export default Header;