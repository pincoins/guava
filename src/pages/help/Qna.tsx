import React, { Suspense } from 'react';

const Qna = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>qna</div>
    </Suspense>
  );
};

export default Qna;
