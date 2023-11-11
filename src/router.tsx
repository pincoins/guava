import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import CategoryList from './routes/shop/categories/CategoryList';
import ProductList from './routes/shop/products/ProductList';
import OrderList from './routes/shop/orders/OrderList';
import Profile from './routes/auth/Profile';
import SignIn from './routes/auth/SignIn';
import SignOut from './routes/auth/SignOut';
import React from 'react';
import Root from './routes/Root';
import Cart from './routes/shop/Cart';
import Faq from './routes/help/Faq';
import Notice from './routes/help/Notice';
import Qna from './routes/help/Qna';
import Privacy from './routes/help/Privacy';
import Terms from './routes/help/Terms';
import SignUp from './routes/auth/SignUp';
import Guide from './routes/help/Guide';
import RootBoundary from './routes/RootBoundary';
import { Counter } from './routes/misc/Counter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RootBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        children: [
          {
            path: 'categories',
            element: <CategoryList />,
          },
          {
            path: 'products',
            element: <ProductList />,
          },
          {
            path: 'cart',
            element: <Cart />,
          },
          {
            path: 'orders',
            element: <OrderList />,
          },
        ],
      },
      {
        path: 'auth',
        children: [
          {
            path: 'sign-up',
            element: <SignUp />,
          },
          {
            path: 'sign-in',
            element: <SignIn />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'sign-out',
            element: <SignOut />,
          },
        ],
      },
      {
        path: 'help',
        children: [
          {
            path: 'faq',
            element: <Faq />,
          },
          {
            path: 'notice',
            element: <Notice />,
          },
          {
            path: 'qna',
            element: <Qna />,
          },
          {
            path: 'privacy',
            element: <Privacy />,
          },
          {
            path: 'terms',
            element: <Terms />,
          },
          {
            path: 'guide',
            element: <Guide />,
          },
        ],
      },
      {
        path: 'misc',
        children: [
          {
            path: 'counter',
            element: <Counter />,
          },
        ],
      },
    ],
  },
]);

export default router;
