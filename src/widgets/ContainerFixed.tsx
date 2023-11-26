import className from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

const ContainerFixed = ({
  children,
  ...rest
}: {} & ComponentPropsWithoutRef<'div'> & { children?: ReactNode }) => {
  const classes = className(rest.className, 'mx-auto max-w-7xl');
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default ContainerFixed;
