import React, { useEffect } from 'react';
import { fetchCategories } from '../../../store/thunks/categoryActions';
import { RootState } from '../../../store';
import { Category } from '../../../store/models/interfaces';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk-hooks';

const CategoryList = () => {
  const { data, error, loading } = useAppSelector(
    (state: RootState) => state.categoriesSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>error occurred. {error}</div>;
  } else {
    content = data?.map((i: Category) => {
      return <div>{i.title}</div>;
    });
  }

  return <div>{content}</div>;
};

export default CategoryList;
