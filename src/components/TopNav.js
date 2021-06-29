import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../css/topNav.module.css';

const TopNav = () => {
  return (
    <div className={classes.TopNav}>
      <ul className={classes.FirstUl}>
        <li>
          <Link to="/"> Products </Link>
        </li>
        <li>
          <a>Cart</a>
        </li>
        <li>
          <a>Orders</a>
        </li>
        <li>
          <Link to="/add-product"> Add Products </Link>
        </li>
        <li>
          <a>Admin Products</a>
        </li>
      </ul>
      <ul className={classes.SecondUl}>
        <li>
          <Link to="/login" value="huhu">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" value="heh">
            Register
          </Link>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default TopNav;
