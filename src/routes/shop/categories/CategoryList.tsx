import React, { useEffect } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { fetchCategories } from '../../../store/thunks/fetchCategories';
import { RootState } from '../../../store';
import Category from '../../../store/models/Category';
import { useThunk } from '../../../hooks/useThunk';

const CategoryList = () => {
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
    content = data?.map((i: Category) => {
      return <div>{i.title}</div>;
    });
  }

  return <div>{content}</div>;
};

export default CategoryList;
