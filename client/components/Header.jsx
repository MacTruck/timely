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
      {props.username}
    </div>
  )

  return (
    <header>
      {/* <img id="icon" src="/images/diamondTriple-fav.png" alt="Dead Simple Icon" /> */}
      <h1 id="main-title" title="Timely">Timely</h1>
      { props.username ? profileButton : loginButton }
      { loginToggle && 
        <LoginScreen
          updateState={props.updateState}
          setLoginToggle={setLoginToggle}
          entries={props.entries}
        />
      }
    </header>
  );
}

export default Header;