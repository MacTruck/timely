import React, { useState } from 'react';
import useFormValidation from './useFormValidation.jsx';

const initialState = {
  email: '',
  password: '',
  username: '',
}

// onSubmit -> change button to pending animation

const LoginScreen = (props) => {
  const [signupToggle, setSignupToggle] = useState(false);
  const { handleChange, handleBlur, values, errors, isSubmitting } = useFormValidation(initialState)

  function handleLogin() {
    // Fetch Login Info
    if (Object.keys(errors).length === 0) {
      const loginValues = {...values};
      if (props.entries.length) {
        loginValues.newEntries = [...props.entries];
        console.log('Adding newEntries to loginValues', loginValues);
      }
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginValues),
      })
        .then(response => response.json())
        .then(data => {
          props.updateState(data.userData);
          props.setLoginToggle(false);
        })
        .catch(err => console.log('Error in handleLogin: ', err));
    }
  }

  function handleSignup() {
    // Fetch Signup Route
    if (Object.keys(errors).length === 0) {
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(data => {
          props.updateState({ user_id: data.user_id });
          props.setLoginToggle(false);
        })
        .catch(err => console.log('Error in handleSignup: ', err));
    }
  }

  const loginButton = (
    <button
      type="button"
      disabled={isSubmitting}
      className="mainButton"
      onClick={handleLogin}
    >
      Log In
    </button>);

  const signupButton = (
    <button
      type="button"
      disabled={isSubmitting}
      className="mainButton"
      onClick={handleSignup}
    >
      Sign Up
      </button>);

  return (
    <form id="loginForm">
      { signupToggle && <input
        type="text"
        name="username"
        value={values.username}
        placeholder="username"
        onChange={handleChange}
        autoComplete="off"
      /> }
      <input 
        type="text"
        name="email"
        value={values.email}
        placeholder="Email"
        className={errors.email && 'error-input'}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
      <input
        type="password"
        name="password"
        value={values.password}
        placeholder="Password"
        className={errors.password && 'error-input'}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off" 
      />
      {errors.password && <p className="error-text">{errors.password}</p>}
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