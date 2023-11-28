import className from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

const Button = ({
  children,
  preset,
  inline,
  outline,
  flat,
  center,
  rounded,
  loading,
  animate,
  ...rest
}: {
  preset?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  inline?: boolean;
  outline?: boolean;
  flat?: boolean;
  center?: boolean;
  rounded?: 'base' | 'sm' | 'md' | 'full';
  loading?: boolean;
  animate?: 'bounce' | 'ping';
} & ComponentPropsWithoutRef<'button'> & { children?: ReactNode }) => {
  const classes = className(rest.className, 'items-center', {
    // inline-flex
    // - 부모 요소에 적용하여 부모 요소 및 자식 요소를 인라인 블록 요소로 만든다.
    // - 인라인 블록 요소는 인라인 블록 요소들끼리 서로 가로 배치된다.
    'inline-flex gap-x-2': inline,
    'p-1': !inline,

    'opacity-80': loading,

    'animate-bounce': animate === 'bounce',
    'animate-ping': animate === 'ping',

    rounded: rounded === 'base',
    'rounded-sm': rounded === 'sm',
    'rounded-md': rounded === 'md',
    'rounded-full': rounded === 'full',

    'border shadow-sm': !flat,
    'px-2 py-1': inline && !flat,

    'bg-white': outline,
    'justify-center': center,

    'border-sky-600 hover:bg-sky-600 hover:text-white hover:border-sky-500':
      preset === 'primary',
    'bg-sky-700 text-white': preset === 'primary' && !outline,
    'text-sky-700': outline && preset === 'primary',

    'border-slate-500 hover:bg-slate-500 hover:text-white hover:border-slate-400':
      preset === 'secondary',
    'bg-slate-600 text-white': preset === 'secondary' && !outline,
    'text-slate-600': outline && preset === 'secondary',

    'border-green-400 hover:bg-green-400 hover:text-white hover:border-green-300':
      preset === 'success',
    'bg-green-500 text-white': preset === 'success' && !outline,
    'text-green-500': outline && preset === 'success',

    'border-yellow-300 hover:bg-yellow-300 hover:text-white hover:border-yellow-200':
      preset === 'warning',
    'bg-yellow-400 text-white': preset === 'warning' && !outline,
    'text-yellow-400': outline && preset === 'warning',

    'border-rose-400 hover:bg-rose-400 hover:text-white hover:border-rose-300':
      preset === 'danger',
    'bg-rose-500 text-white': preset === 'danger' && !outline,
    'text-rose-500': outline && preset === 'danger',
  });

  return (
    <button {...rest} disabled={loading} className={classes}>
      {children}
    </button>
  );
};

export default Button;
