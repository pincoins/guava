import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchCategories } from '../../../store/thunks/fetchCategories';
import { AppDispatch, RootState } from '../../../store';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      카테고리 목록
      {data?.map((i: string) => {
        return <div>{i}</div>;
      })}
    </div>
  );
};

export default CategoryList;
