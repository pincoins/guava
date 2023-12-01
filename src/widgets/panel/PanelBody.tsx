import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const PanelBody = ({
  children,
  noPadding,
  ...rest
}: {
  children?: ReactNode;
  noPadding?: boolean;
} & ComponentPropsWithoutRef<'div'>) => {
  const classes = className(rest.className, {
    'pt-3': !noPadding,
  });

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default PanelBody;
