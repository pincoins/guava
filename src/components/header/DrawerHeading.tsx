import { ReactNode } from 'react';

const DrawerHeading = ({ children }: { children?: ReactNode }) => {
  return (
    <div>
      <h1 className="font-bold border-l-4 border-b border-green-600 bg-[#ebf2ea] text-[#1d915c] px-2 py-1">
        {children}
      </h1>
    </div>
  );
};

export default DrawerHeading;
