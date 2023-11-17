import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignOutMutation } from '../../store/services/authApi';

const SignOut = () => {
  const [signOut] = useSignOutMutation();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{}>({});

  const onValid: SubmitHandler<{}> = async () => {
    signOut();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <button type="submit" className="border" disabled={isSubmitting}>
          로그아웃
        </button>
      </form>
    </div>
  );
};

export default SignOut;
