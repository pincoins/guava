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
import CategoryDetail from './pages/shop/categories/CategoryDetail';
import ProductDetail from './pages/shop/products/ProductDetail';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';

const ROLE_ALL = Array.of('SYSADMIN', 'STAFF', 'MEMBER');
const ROLE_SYSADMIN = Array.of('SYSADMIN');
const ROLE_MANAGER = Array.of('SYSADMIN', 'STAFF');
const ROLE_MEMBER = Array.of('MEMBER');

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
            element: <ProtectedRoute roles={ROLE_ALL} />,
            children: [
              {
                path: 'orders',
                element: <OrderList />,
              },
            ],
          },
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
        ],
      },
      {
        path: 'auth',
        children: [
          {
            element: <ProtectedRoute roles={ROLE_ALL} />,
            children: [
              {
                path: 'profile',
                element: <Profile />,
              },
            ],
          },
          {
            path: 'sign-up',
            element: <SignUp />,
          },
          {
            path: 'sign-in',
            element: <SignIn />,
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
            element: <ProtectedRoute roles={ROLE_ALL} />,
            children: [
              {
                path: 'qna',
                element: <Qna />,
              },
            ],
          },
          {
            path: 'faq',
            element: <Faq />,
          },
          {
            path: 'notice',
            element: <Notice />,
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
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
