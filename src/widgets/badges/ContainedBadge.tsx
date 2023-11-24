import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const Badge = ({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  pill,
  bounce,
  ping,
  ...rest
}: {
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  pill?: boolean;
  loading?: boolean;
  bounce?: boolean;
  ping?: boolean;
} & ComponentPropsWithoutRef<'span'> & { children?: ReactNode }) => {
  const classes = className(
    rest.className,
    'items-center ring-1 ring-inset inline-flex gap-x-2 px-2 py-1',
    {
      'rounded-md': rounded,
      'rounded-full': pill,

      'animate-bounce': bounce,
      'animate-ping': ping,

      'bg-white': outline,

      'border-sky-600': primary,
      'bg-sky-700 text-white': primary && !outline, // outline if undefined
      'text-sky-700': outline && primary,

      'border-slate-500': secondary,
      'bg-slate-600 text-white': secondary && !outline,
      'text-slate-600': outline && secondary,

      'border-green-400': success,
      'bg-green-500 text-white': success && !outline,
      'text-green-500': outline && success,

      'border-yellow-300': warning,
      'bg-yellow-400 text-white': warning && !outline,
      'text-yellow-400': outline && warning,

      'border-rose-400': danger,
      'bg-rose-500 text-white': danger && !outline,
      'text-rose-500': outline && danger,
    }
  );

  return (
    <span {...rest} className={classes}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  checkVariationValue: ({
    bounce,
    ping,
    rounded,
    pill,
    primary,
    secondary,
    success,
    warning,
    danger,
  }: {
    bounce: boolean | undefined;
    ping: boolean | undefined;
    rounded: boolean | undefined;
    pill: boolean | undefined;
    primary: boolean | undefined;
    secondary: boolean | undefined;
    success: boolean | undefined;
    warning: boolean | undefined;
    danger: boolean | undefined;
  }) => {
    // !! 변수에 값이 할당되었으면 true 그렇지 않으면 false
    // undefined 변수를 false 만들기
    if (Number(!!bounce) + Number(!!ping) > 1) {
      return new Error('Only one of bounce, ping can be true');
    }

    if (Number(!!rounded) + Number(!!pill) > 1) {
      return new Error('Only one of bounce, ping can be true');
    }

    if (
      Number(!!primary) +
        Number(!!secondary) +
        Number(!!warning) +
        Number(!!success) +
        Number(!!danger) >
      1
    ) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true'
      );
    }
  },
};

export default Badge;
