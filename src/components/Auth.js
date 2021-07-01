import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../store/actions/main.js';
import { useForm } from 'react-hook-form';
import classes from '../css/auth.module.css';

const Auth = props => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let page;

  if (props.match.url === '/register') {
    page = (
      <form
        className={classes.authForm}
        onSubmit={handleSubmit((data, e) => {
          props.onRegister(data.email, data.password, data.username);
          e.target.reset();
          props.history.push('/');
        })}>
        <label htmlFor="username">Enter Username</label>
        <input
          id="username"
          type="text"
          {...register('username', {
            required: { value: true, message: 'this field is required' },
            minLength: {
              value: 6,
              message: 'Your username should be at least 6 characters long',
            },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <label htmlFor="email">Enter E-mail</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: { value: true, message: 'this field is required' },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="password">Enter Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: { value: true, message: 'this field is required' },
            minLength: {
              value: 8,
              message: 'Your password should be at least 8 characters long',
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
              message:
                'Your password should contain at least one uppercase letter, one lowercase letter, and one number ',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button className={classes.authButton} type="submit">
          Register
        </button>
      </form>
    );
  }

  if (props.match.url === '/login') {
    page = (
      <form
        className={classes.authForm}
        onSubmit={handleSubmit((data, e) => {
          props.onLogin(data.email1, data.password1);
          e.target.reset();
          props.history.push('/');
        })}>
        <label htmlFor="email">Enter E-mail</label>
        <input
          id="email"
          type="email"
          {...register('email1', {
            required: { value: true, message: 'this field is required' },
          })}
        />
        {errors.email1 && <p>{errors.email1.message}</p>}
        <label htmlFor="password">Enter Password</label>
        <input
          id="password"
          type="password"
          {...register('password1', {
            required: { value: true, message: 'this field is required' },
            minLength: {
              value: 8,
              message: 'Your password should be at least 8 characters long',
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
              message:
                'Your password should contain at least one uppercase letter, one lowercase letter, and one number ',
            },
          })}
        />
        {errors.password1 && <p>{errors.password1.message}</p>}
        <button className={classes.authButton} type="submit">
          Log In
        </button>
      </form>
    );
  }

  return <div>{page}</div>;
};

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onRegister: (email, password, username) =>
      dispatch(actions.register(email, password, username)),
  };
};

Auth.propTypes = {
  match: propTypes.object,
  onLogin: propTypes.func,
  onRegister: propTypes.func,
  token: propTypes.string,
  history: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
