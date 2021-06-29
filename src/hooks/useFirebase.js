// eslint-disable-next-line no-unused-vars
import { database } from '../firebase/index';
import { useEffect, useState } from 'react';

const useFirebase = () => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    database.ref('products/').on('value', async snap => {
      const data = await snap.val();
      const products = [];
      for (let key in data) {
        products.push({ ...data[key], id: key });
      }
      setDocs(products);
    });
  }, []);
  return { docs };
};

export default useFirebase;
