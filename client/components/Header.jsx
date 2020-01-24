import React, { useState } from 'react';
import LoginScreen from './LoginScreen.jsx';

const Header = (props) => {
  const [loginToggle, setLoginToggle] = useState(false);

  return (
    <header>
      {/* <img id="icon" src="/images/diamondTriple-fav.png" alt="Dead Simple Icon" /> */}
      <h1 id="main-title" title="Timely">Timely</h1>
      <div
        id="loginButton"
        onClick={() => setLoginToggle(loginToggle => !loginToggle)}
        >
          { loginToggle ? 'Back' : 'Login' }
      </div>
      { loginToggle && <LoginScreen
        updateState={props.updateState}
      />}
    </header>
  );
}

export default Header;