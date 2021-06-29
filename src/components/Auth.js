import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../store/actions/main.js';
import { useForm } from 'react-hook-form';

const Auth = props => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(props.token);
  });

  let page;

  if (props.match.url === '/register') {
    page = (
      <form
        onSubmit={handleSubmit((data, e) => {
          props.onRegister(data.email, data.password);
          e.target.reset();
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
        <label htmlFor="email">Enter E-main</label>
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
              value: /[a-zA-Z][0-9]/,
              message:
                'Your password should contain at least one uppercase letter, one lowercase letter, and one number ',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit"> Register </button>
      </form>
    );
  }

  if (props.match.url === '/login') {
    page = (
      <form
        onSubmit={handleSubmit((data, e) => {
          props.onLogin(data.email1, data.password1);
          e.target.reset();
        })}>
        <label htmlFor="email">Enter E-main</label>
        <input
          id="email"
          type="email"
          {...register('email1', {
            required: { value: true, message: 'this field is required' },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
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
              value: /[a-zA-Z][0-9]/,
              message:
                'Your password should contain at least one uppercase letter, one lowercase letter, and one number ',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit"> Log In </button>
      </form>
    );
  }

  return <div>{page}</div>;
};

const mapStateToProps = state => {
  return {
    token: state.token,
    id: state.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onRegister: (email, password) =>
      dispatch(actions.register(email, password)),
  };
};

Auth.propTypes = {
  match: propTypes.object,
  onLogin: propTypes.func,
  onRegister: propTypes.func,
  token: propTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
