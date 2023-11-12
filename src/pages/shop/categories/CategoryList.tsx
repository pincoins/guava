import React, { useEffect } from 'react';
import { fetchCategories } from '../../../store/thunks/fetchCategories';
import { RootState } from '../../../store';
import { Category } from '../../../store/models/interfaces';
import { useAppSelector, useThunk } from '../../../hooks/rtk-hooks';

const CategoryList = () => {
  const data = useAppSelector((state: RootState) => state.categoriesSlice.data);

  const [doFetchCategories, isLoadingCategories, loadingCategoryError] =
    useThunk(fetchCategories);

  useEffect(() => {
    // dispatched twice if React.StrictMode is on for development
    doFetchCategories();
  }, []);

  let content;

  if (isLoadingCategories) {
    content = <div>Loading...</div>;
  } else if (loadingCategoryError) {
    content = <div>error occurred.</div>;
  } else {
    content = data?.map((i: Category) => {
      return <div>{i.title}</div>;
    });
  }

  return <div>{content}</div>;
};

export default CategoryList;
