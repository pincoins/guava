import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const Panel = ({
  children,
  shadow,
  rounded,
  ...rest
}: {
  children?: ReactNode;
  shadow?: boolean;
  rounded?: boolean;
} & ComponentPropsWithoutRef<'div'>) => {
  const classes = className(rest.className, {
    'shadow-md': shadow,
    'rounded-md': rounded,
  });

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default Panel;
