import { Suspense } from 'react';

const Faq = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>faq</div>
    </Suspense>
  );
};

export default Faq;
