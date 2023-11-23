import className from 'classnames';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
}: {
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
} & ComponentPropsWithoutRef<'button'> & { children?: ReactNode }) {
  const classes = className(
    rest.className,
    'inline-flex items-center gap-x-1.5 px-2.5 py-1.5 border shadow-sm',
    {
      'opacity-80': loading,

      'rounded-md': !rounded,
      'rounded-full': rounded,

      'bg-white': outline,

      'border-sky-600 hover:bg-sky-600 hover:text-white hover:border-sky-500':
        primary,
      'bg-sky-700 text-white': primary && !outline, // outline if undefined
      'text-sky-700': outline && primary,

      'border-slate-500 hover:bg-slate-500 hover:text-white hover:border-slate-400':
        secondary,
      'bg-slate-600 text-white': secondary && !outline,
      'text-slate-600': outline && secondary,

      'border-green-400 hover:bg-green-400 hover:text-white hover:border-green-300':
        success,
      'bg-green-500 text-white': success && !outline,
      'text-green-500': outline && success,

      'border-yellow-300 hover:bg-yellow-300 hover:text-white hover:border-yellow-200':
        warning,
      'bg-yellow-400 text-white': warning && !outline,
      'text-yellow-400': outline && warning,

      'border-rose-400 hover:bg-rose-400 hover:text-white hover:border-rose-300':
        danger,
      'bg-rose-500 text-white': danger && !outline,
      'text-rose-500': outline && danger,
    }
  );

  /* 버튼 종류
  - 자식: text, icon, icon + text
  - 디자인: elevated[primary, secondary, success, warning, danger], outlined
  - circular, rounded
   */

  return (
    <button {...rest} disabled={loading} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({
    primary,
    secondary,
    success,
    warning,
    danger,
  }: {
    primary: boolean | undefined;
    secondary: boolean | undefined;
    success: boolean | undefined;
    warning: boolean | undefined;
    danger: boolean | undefined;
  }) => {
    // !! 변수에 값이 할당되었으면 true 그렇지 않으면 false
    // undefined 변수를 false 만들기

    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true'
      );
    }
  },
};

export default Button;
