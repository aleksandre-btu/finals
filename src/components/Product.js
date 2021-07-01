import React, { useContext } from 'react';
import { ProductsContext } from '../context/productsContext';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import classes from '../css/product.module.css';
import useFirebase from '../hooks/useFirebase';
import axios from 'axios';

const Product = props => {
  const { docs } = useFirebase('users');
  const products = useContext(ProductsContext);

  const onClickHandler = () => {
    for (let i in docs) {
      if (docs[i].id === props.userId) {
        axios
          .post(
            'https://finalsreact-default-rtdb.europe-west1.firebasedatabase.app/users/' +
              props.userId +
              '/cart.json',
            {
              title: products[props.id].title,
              price: products[props.id].price,
              imageUrl: products[props.id].imageUrl,
              description: products[props.id].description,
            },
          )
          .then(response => {
            console.log(response);
          })
          .catch(err => console.log(err));
      }
    }
  };
  return (
    <div className={classes.wrapper}>
      <img className={classes.img} src={products[props.id].imageUrl}></img>
      <h1 className={classes.title}>{products[props.id].title}</h1>
      <h2 className={classes.price}>{products[props.id].price} $</h2>
      <p className={classes.desc}>{products[props.id].description}</p>
      {props.token ? (
        <button onClick={() => onClickHandler()}> Add To Cart </button>
      ) : null}
    </div>
  );
};

Product.propTypes = {
  id: propTypes.number,
  token: propTypes.string,
  userId: propTypes.string,
};

const mapStateToProps = state => {
  return {
    token: state.token,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Product);
