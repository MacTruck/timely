import React, { useState } from 'react';
import useFormValidation from './useFormValidation.jsx';

const initialState = {
  email: '',
  password: '',
  name: '',
}

const LoginScreen = (props) => {
  const { handleLogin, handleSignup, handleChange, handleBlur, values, errors, isSubmitting } = useFormValidation(initialState)
  const [signupToggle, setSignupToggle] = useState(false);

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
        name="name"
        value={values.name}
        placeholder="Name"
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