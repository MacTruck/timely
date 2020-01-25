import React, { useState } from 'react';
import LoginScreen from './LoginScreen.jsx';

const Header = (props) => {
  const [loginToggle, setLoginToggle] = useState(false);

  const loginButton = (
    <div
      // id="loginButton"
      className="headerButton"
      onClick={() => setLoginToggle(loginToggle => !loginToggle)}
    >
      {loginToggle ? 'Back' : 'Login'}
    </div>
  )

  const profileButton = (
    <div
      className="headerButton"
    >
      {props.name}
    </div>
  )

  return (
    <header>
      {/* <img id="icon" src="/images/diamondTriple-fav.png" alt="Dead Simple Icon" /> */}
      <h1 id="main-title" title="Timely">Timely</h1>
      { props.name ? profileButton : loginButton }
      { loginToggle && <LoginScreen
        updateState={props.updateState}
        setLoginToggle={setLoginToggle}
      />}
    </header>
  );
}

export default Header;