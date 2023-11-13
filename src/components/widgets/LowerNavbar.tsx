import { Link } from 'react-router-dom';
import React from 'react';
import { Category } from '../../store/models/interfaces';
import { useFetchCategoriesQuery } from '../../store/services/categoryApi';

const LowerNavbar = () => {
  const { data, error, isFetching } = useFetchCategoriesQuery();

  let content;

  if (isFetching) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>error occurred.</div>;
  } else {
    content = data?.map((category: Category) => {
      return (
        <Link to={`/shop/categories/${category.slug}`}>{category.title}</Link>
      );
    });
  }

  return <div className="flex flex-row justify-between">{content}</div>;
};

export default LowerNavbar;
