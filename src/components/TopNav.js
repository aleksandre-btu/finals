import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import * as actions from '../store/actions/main.js';
import classes from '../css/topNav.module.css';

const TopNav = props => {
  return (
    <div className={classes.TopNav}>
      <ul className={classes.FirstUl}>
        <li>
          <Link to="/"> Products </Link>
        </li>
        {props.token ? (
          <>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/add-product"> Add Products </Link>
            </li>
          </>
        ) : null}
      </ul>
      {props.token ? (
        <ul className={classes.SecondUl}>
          <li>
            <button
              className={classes.btn}
              onClick={() => {
                props.onLogout();
                return <Link to="/" />;
              }}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul className={classes.SecondUl}>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

TopNav.propTypes = {
  token: propTypes.string,
  onLogout: propTypes.func,
  history: propTypes.object,
};

const mapStateToProps = state => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
