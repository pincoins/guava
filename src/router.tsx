import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Order from './pages/Order';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/categories',
    element: <Category />,
  },
  {
    path: '/products',
    element: <Product />,
  },
  {
    path: '/orders',
    element: <Order />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-out',
    element: <SignOut />,
  },
]);

export default router;
