import React, { useContext } from 'react';
import { ProductsContext } from '../context/productsContext';
import propTypes from 'prop-types';
import classes from '../css/product.module.css';

const Product = ({ id }) => {
  const docs = useContext(ProductsContext);
  return (
    <div className={classes.wrapper}>
      <img className={classes.img} src={docs[id].imageUrl}></img>
      <h1 className={classes.title}>{docs[id].title}</h1>
      <h2 className={classes.price}>{docs[id].price} $</h2>
      <p className={classes.desc}>{docs[id].description}</p>
      <button> Add To Cart </button>
    </div>
  );
};

Product.propTypes = {
  id: propTypes.number,
};

export default Product;
