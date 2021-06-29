import React, { useContext } from 'react';
import { ProductsContext } from '../context/productsContext';
import Product from './Product';
import classes from '../css/product.module.css';

const Products = () => {
  const docs = useContext(ProductsContext);

  return (
    <div className={classes.Products}>
      {docs.map((doc, index) => (
        <Product key={index} id={index} />
      ))}
    </div>
  );
};

export default Products;
