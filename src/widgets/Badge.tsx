import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const Badge = ({
  children,
  preset,
  inline,
  outline,
  flat,

  rounded,
  pill,
  animate,
  ...rest
}: {
  preset?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  inline?: boolean;
  outline?: boolean;
  flat?: boolean;
  rounded?: boolean;
  pill?: boolean;
  loading?: boolean;
  animate?: 'bounce' | 'ping';
} & ComponentPropsWithoutRef<'span'> & { children?: ReactNode }) => {
  const classes = className(rest.className, 'items-center', {
    'inline-flex gap-x-2 px-2 py-1': inline,
    'p-1': !inline,

    'rounded-md': rounded,
    'rounded-full': pill,

    'animate-bounce': animate === 'bounce',
    'animate-ping': animate === 'ping',

    'bg-white': outline,

    'ring-1 ring-inset p-1 ring-gray-200': !flat,

    'border-sky-600': preset === 'primary',
    'bg-sky-700 text-white': preset === 'primary' && !outline, // outline if undefined
    'text-sky-700': outline && preset === 'primary',

    'border-slate-500': preset === 'secondary',
    'bg-slate-600 text-white': preset === 'secondary' && !outline,
    'text-slate-600': outline && preset === 'secondary',

    'border-green-400': preset === 'success',
    'bg-green-500 text-white': preset === 'success' && !outline,
    'text-green-500': outline && preset === 'success',

    'border-yellow-300': preset === 'warning',
    'bg-yellow-400 text-white': preset === 'warning' && !outline,
    'text-yellow-400': outline && preset === 'warning',

    'border-rose-400': preset === 'danger',
    'bg-rose-500 text-white': preset === 'danger' && !outline,
    'text-rose-500': outline && preset === 'danger',
  });

  return (
    <span {...rest} className={classes}>
      {children}
    </span>
  );
};

export default Badge;
