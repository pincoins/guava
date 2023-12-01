import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const PanelHeading = ({
  children,
  ...rest
}: { children?: ReactNode } & ComponentPropsWithoutRef<'div'>) => {
  const classes = className(
    rest.className,
    'grid grid-cols-1 items-center justify-center bg-white'
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default PanelHeading;
