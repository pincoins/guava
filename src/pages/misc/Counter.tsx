import React from 'react';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../../store/slices/counterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);

  const dispatch = useAppDispatch();

  return (
    <>
      <h1>{count}</h1>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch(incrementByAmount(10));
        }}
      >
        +10
      </button>
    </>
  );
}

export default Counter;
