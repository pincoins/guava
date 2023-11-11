import { createAsyncThunk } from '@reduxjs/toolkit';

// 액션 타입 문자열을 받아서 콜백함수를 실행하고 그 결과를 `Promise`에 담아 반환
// 어떤 데이터를 가져와서 어떤 데이터를 반환해야 하는 지 모르므로 리듀서 함수 생성 불가
// `createSlice`의 `extraReducers`로 등록

const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('categories/fetchCategories', async () => {
  const response = { data: ['banana', 'apple'] };

  return response.data;
});

export { fetchCategories };
