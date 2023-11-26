import { Suspense } from 'react';

const OrderList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>orders</div>
    </Suspense>
  );
};

export default OrderList;
