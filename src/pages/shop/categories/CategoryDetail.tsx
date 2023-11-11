import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryList = () => {
  let { category } = useParams();

  return <div>{category}</div>;
};

export default CategoryList;
