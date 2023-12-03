import { ComponentPropsWithoutRef, ReactNode } from 'react';
import className from 'classnames';

const Divider = ({
  children,
  ...rest
}: { children?: ReactNode } & ComponentPropsWithoutRef<'div'>) => {
  const classes = className(rest.className, 'relative');

  return (
    <div className={classes}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-sm text-gray-500">{children}</span>
      </div>
    </div>
  );
};

export default Divider;
