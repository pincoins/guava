import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const Panel = ({
  children,
  shadow,
  rounded,
  divided,
  ...rest
}: {
  children?: ReactNode;
  shadow?: boolean;
  rounded?: boolean;
  divided?: boolean;
} & ComponentPropsWithoutRef<'div'>) => {
  const classes = className(rest.className, {
    'shadow-md': shadow,
    'rounded-md': rounded,
    'divide-y divide-gray-100': divided,
  });

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default Panel;
