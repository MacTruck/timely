import React, { useState } from 'react';

const LoginScreen = (props) => {
  const [loginInputs, setLoginInputs] = useState({});
  const [signupToggle, setSignupToggle] = useState(false);

  function handleInput(e) {
    const inputObject = {...loginInputs};
    inputObject[e.target.name] = e.target.value;
    console.log('inputObject', inputObject);
    setLoginInputs(inputObject);
  }

  return (
    <form id="loginForm">
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
      <button
        type="button"
        className="mainButton"
        onClick={() => props.handleLogin(loginInputs)}
      >
          Log In
      </button>
      <div
        id="signupToggle"
        onClick={() => setSignupToggle(signupToggle => !signupToggle)}
      >
        { signupToggle ? 'or Sign Up' : 'or Log In' }
      </div>
    </form>
  )
}

export default LoginScreen;