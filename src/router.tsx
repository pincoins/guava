import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import CategoryList from './pages/shop/categories/CategoryList';
import ProductList from './pages/shop/products/ProductList';
import OrderList from './pages/shop/orders/OrderList';
import Profile from './pages/auth/Profile';
import SignIn from './pages/auth/SignIn';
import SignOut from './pages/auth/SignOut';
import React from 'react';
import Root from './pages/Root';
import Cart from './pages/shop/Cart';
import Faq from './pages/help/Faq';
import Notice from './pages/help/Notice';
import Qna from './pages/help/Qna';
import Privacy from './pages/help/Privacy';
import Terms from './pages/help/Terms';
import SignUp from './pages/auth/SignUp';
import Guide from './pages/help/Guide';
import RootBoundary from './pages/RootBoundary';
import { Counter } from './pages/misc/Counter';
import CategoryDetail from './pages/shop/categories/CategoryDetail';
import ProductDetail from './pages/shop/products/ProductDetail';

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
            children: [
              {
                index: true,
                element: <CategoryList />,
              },
              {
                path: ':category',
                element: <CategoryDetail />,
              },
            ],
          },
          {
            path: 'products',
            children: [
              {
                index: true,
                element: <ProductList />,
              },
              {
                path: ':product',
                element: <ProductDetail />,
              },
            ],
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
