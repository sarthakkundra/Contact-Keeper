import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, isAuthenticated, error, clearError } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    if (isAuthenticated) {
      
      props.history.push("/");
    }
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input
          type='submit'
          value='Register'
          className='btn btn-block btn-primary'
        />
      </form>
    </div>
  );
};

export default Login;
