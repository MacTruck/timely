import React, { useState, useEffect } from 'react';

const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('No errors in validation');
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleLogin() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    // Fetch Login Info
    if (Object.keys(validationErrors).length === 0) {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          props.updateState(data.userData);
        })
        .catch(err => console.log('Error in handleLogin: ', err));
    }
  }

  function handleSignup(e) {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    // Fetch Signup Route
    if (Object.keys(validationErrors).length === 0) {
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
    }
  }

  function validate(testValues) {
    let errors = {};

    // Email Errors
    if (!testValues.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(testValues.email)) {
      errors.email = 'Invalid email address';
    }

    // Passowrd Errors
    if (!testValues.password) {
      errors.password = 'Password Required';
    } else if (testValues.password.length < 7) {
      errors.password = 'Password must be at least 6 characters'
    }

    return errors;
  }

  

  return { handleLogin, handleSignup, handleChange, handleBlur, values, errors, isSubmitting }
}

export default useFormValidation;