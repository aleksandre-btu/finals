import React from 'react';
import useFirebase from '../hooks/useFirebase';
import { ProductsContext } from '../context/productsContext';
import Products from './Products';

const Main = () => {
  const { docs } = useFirebase('products');
  return (
    <div>
      <ProductsContext.Provider value={docs}>
        <Products />
      </ProductsContext.Provider>
    </div>
  );
};

export default Main;
