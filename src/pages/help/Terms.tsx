import React, { Suspense } from 'react';

const Terms = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Terms</div>
    </Suspense>
  );
};

export default Terms;
