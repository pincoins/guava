import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GoSync } from 'react-icons/go';
import { MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useGoogleRecaptcha } from '../../hooks/useGoogleRecaptcha';
import { useSignInMutation } from '../../store/services/authApi';
import Button from '../../widgets/Button';

export interface SignInForm {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup
      .string()
      .email('이메일 주소가 올바르지 않습니다.')
      .required('필수'),
    password: yup
      .string()
      .min(5, '비밀번호는 최소 5자입니다.')
      .required('필수'),
  })
  .required();

const SignIn = () => {
  // 1. 리덕스 스토어 객체 가져오기
  // 2. 리액트 라우터 네비게이션 객체 가져오기
  const navigate = useNavigate();

  // 3. RTK Query 객체 가져오기
  const [signIn] = useSignInMutation();

  // 4. 리액트 훅 폼 정의
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<SignInForm>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  // 5. 주요 상태 선언 (useState, useReducer 및 커스텀 훅)
  const [reCaptcha, reCaptchaElement] = useGoogleRecaptcha();

  // 6. onValid 폼 제출 핸들러
  const onValid: SubmitHandler<SignInForm> = async (data, _) => {
    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        await signIn({
          username: data.username,
          password: data.password,
          captcha,
        })
          .unwrap()
          .then((_) => {
            navigate('/');
          })
          .catch((rejected) => {
            console.error(rejected);
          });
      }
    }
  };

  // 7. useEffect
  // 8. 이벤트 핸들러

  // 9. JSX 반환
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="이메일"
        className="border"
        {...register('username', {
          required: true,
          onChange: (_) => {
            if (errors.username) {
              clearErrors('username');
            }
          },
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}
      <input
        type="password"
        placeholder="비밀번호"
        className="border"
        {...register('password', {
          required: true,
          onChange: (_) => {
            if (errors.password) {
              clearErrors('password');
            }
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <Button
        type="submit"
        disabled={isSubmitting}
        loading={isSubmitting}
        className="text-sm font-semibold"
        inline
        preset="primary"
      >
        {isSubmitting ? <GoSync className="animate-spin" /> : <MdLogin />}로그인
      </Button>
      {reCaptchaElement}
    </form>
  );
};

export default SignIn;
