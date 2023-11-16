import React, { Suspense } from 'react';

const Guide = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>guide</div>
    </Suspense>
  );
};

export default Guide;
