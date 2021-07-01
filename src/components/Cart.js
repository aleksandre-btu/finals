/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import useFirebase from '../hooks/useFirebase';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import classes from '../css/product.module.css';

const Cart = props => {
  const [arr, setArr] = useState([]);
  const { docs } = useFirebase('users');

  useEffect(() => {
    if (docs) {
      for (let i in docs) {
        if (docs[i].id === props.userId) {
          const mainCart = docs[i].cart;
          const arr = [];
          for (let key in mainCart) {
            arr.push({ ...mainCart[key], id: key });
          }
          setArr(arr.slice(1));
        }
      }
    }
  }, [docs]);
  return (
    <div className={classes.cartMain}>
      <h1>Cart</h1>
      {docs ? (
        arr.map(product => (
          <div key={product.id} className={classes.wrapper}>
            <img className={classes.img} src={product.imageUrl}></img>
            <h1 className={classes.title}>{product.title}</h1>
            <h2 className={classes.price}>{product.price} $</h2>
            <p className={classes.desc}>{product.description}</p>
          </div>
        ))
      ) : (
        <h1>there are no items</h1>
      )}
    </div>
  );
};

Cart.propTypes = {
  token: propTypes.string,
  userId: propTypes.string,
};

const mapStateToProps = state => {
  return {
    token: state.token,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Cart);
