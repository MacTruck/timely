import React, { useState } from 'react';

const LoginScreen = (props) => {
  const [loginInputs, setLoginInputs] = useState({});
  const [signupToggle, setSignupToggle] = useState(false);

  function handleInput(e) {
    const inputObject = {...loginInputs};
    inputObject[e.target.name] = e.target.value;
    setLoginInputs(inputObject);
  }

  function handleLogin(loginData) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        props.updateState(data.userData);
      })
      .catch(err => console.log('Error in handleLogin: ', err));
  }

  function handleSignup(signupData) {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    })
  }

  const loginButton = (
    <button
      type="button"
      className="mainButton"
      onClick={() => handleLogin(loginInputs)}
    >
      Log In
    </button>);

  const signupButton = (
    <button
      type="button"
      className="mainButton"
      onClick={() => handleSignup(loginInputs)}
    >
      Sign Up
      </button>);

  return (
    <form id="loginForm">
      { signupToggle && <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleInput}
      /> }
      <input 
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleInput}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInput} 
      />
      { signupToggle ? signupButton : loginButton }
      <div
        id="signupToggle"
        onClick={() => setSignupToggle(signupToggle => !signupToggle)}
      >
        { signupToggle ? 'or Log In' : 'or Sign Up' }
      </div>
    </form>
  )
}

export default LoginScreen;