import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchCategories } from '../../../store/thunks/fetchCategories';
import { AppDispatch, RootState } from '../../../store';
import Category from '../../../store/models/Category';

const CategoryList = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const data = useAppSelector((state: RootState) => state.categories.data);
  const loading = useAppSelector(
    (state: RootState) => state.categories.loading
  );
  const error = useAppSelector((state: RootState) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>error occurred: {error}</div>;
  } else {
    content = data?.map((i: Category) => {
      return <div>{i.title}</div>;
    });
  }

  return <div>{content}</div>;
};

export default CategoryList;
