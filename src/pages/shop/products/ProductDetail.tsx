import React from 'react';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  let { product } = useParams();

  return <div>{product}</div>;
};

export default ProductList;
