import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSignOutMutation } from '../../store/services/authApi';
import { TbLoader2 } from 'react-icons/tb';

const SignOut = () => {
  const [signOut] = useSignOutMutation();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{}>({});

  const onValid: SubmitHandler<{}> = async () => {
    signOut()
      .unwrap()
      .then((_) => {})
      .catch((_) => {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <button
          type="submit"
          className="border inline-flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting && <TbLoader2 className="-mt-1 animate-spin" />}
          <span className="ml-1">로그아웃</span>
        </button>
      </form>
    </div>
  );
};

export default SignOut;
