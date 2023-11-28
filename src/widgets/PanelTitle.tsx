import { ReactNode } from 'react';

const PanelTitle = ({ children, ...rest }: { children?: ReactNode }) => {
  return (
    <div
      {...rest}
      className="flex flex-col gap-y-1 items-center justify-center border-b border-gray-100 bg-white mb-2"
    >
      {children}
    </div>
  );
};

export default PanelTitle;
