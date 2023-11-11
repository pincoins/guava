import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppSelector, useThunk } from '../../hooks/rtk-hooks';
import { RootState } from '../../store';
import { fetchCategories } from '../../store/thunks/fetchCategories';
import { Category } from '../../store/models/interfaces';

const LowerNavbar = () => {
  const data = useAppSelector((state: RootState) => state.categories.data);

  const [doFetchCategories, isLoadingCategories, loadingCategoryError] =
    useThunk(fetchCategories);

  useEffect(() => {
    doFetchCategories();
  }, [doFetchCategories]);

  let content;

  if (isLoadingCategories) {
    content = <div>Loading...</div>;
  } else if (loadingCategoryError) {
    content = <div>error occurred.</div>;
  } else {
    content = data?.map((category: Category) => {
      return (
        <Link to={`/shop/categories/${category.slug}/products`}>
          {category.title}
        </Link>
      );
    });
  }

  return <div className="flex flex-row justify-between">{content}</div>;
};

export default LowerNavbar;
