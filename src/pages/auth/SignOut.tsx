import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../store/slices/authSlice';
import { RootState } from '../../store';

const SignOut = () => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { handleSubmit } = useForm<{}>({});

  useEffect(() => {
    if (!accessToken) {
      navigate('/auth/sign-in');
    }
  }, [accessToken]);

  const onSubmit: SubmitHandler<{}> = () => {
    dispatch(signOut());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className="border">
          로그아웃
        </button>
      </form>
    </div>
  );
};

export default SignOut;
