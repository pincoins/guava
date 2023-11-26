import { Suspense } from 'react';

const Notice = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>notice</div>
    </Suspense>
  );
};

export default Notice;
