import React, { Suspense } from 'react';

const Privacy = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Privacy</div>
    </Suspense>
  );
};

export default Privacy;
