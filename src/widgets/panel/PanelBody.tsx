import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const PanelBody = ({
  children,
  ...rest
}: {
  children?: ReactNode;
} & ComponentPropsWithoutRef<'div'>) => {
  const classes = className(rest.className);

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default PanelBody;
