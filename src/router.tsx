import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import CategoryList from './pages/shop/categories/CategoryList';
import ProductList from './pages/shop/products/ProductList';
import SignIn from './pages/auth/SignIn';
import SignOut from './pages/auth/SignOut';
import React from 'react';
import Root from './pages/Root';
import Cart from './pages/shop/Cart';
import SignUp from './pages/auth/SignUp';
import RootBoundary from './pages/RootBoundary';
import CategoryDetail from './pages/shop/categories/CategoryDetail';
import ProductDetail from './pages/shop/products/ProductDetail';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';

const Profile = React.lazy(() => import('./pages/auth/Profile'));
const OrderList = React.lazy(() => import('./pages/shop/orders/OrderList'));
const OrderDetail = React.lazy(() => import('./pages/shop/orders/OrderDetail'));
const Qna = React.lazy(() => import('./pages/help/Qna'));
const Faq = React.lazy(() => import('./pages/help/Faq'));
const Notice = React.lazy(() => import('./pages/help/Notice'));
const Privacy = React.lazy(() => import('./pages/help/Privacy'));
const Terms = React.lazy(() => import('./pages/help/Terms'));
const Guide = React.lazy(() => import('./pages/help/Guide'));

const ROLE_ALL = Array.of('SYSADMIN', 'STAFF', 'MEMBER');
const ROLE_SYSADMIN = Array.of('SYSADMIN');
const ROLE_MANAGER = Array.of('SYSADMIN', 'STAFF');
const ROLE_MEMBER = Array.of('MEMBER');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<RootBoundary />}>
      <Route index={true} element={<Home />} />
      <Route path="auth">
        <Route element={<ProtectedRoute roles={ROLE_ALL} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="sign-out" element={<SignOut />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
      <Route path="shop">
        <Route element={<ProtectedRoute roles={ROLE_ALL} />}>
          <Route path="orders">
            <Route index={true} element={<OrderList />} />
            <Route path=":order" element={<OrderDetail />} />
          </Route>
        </Route>
        <Route path="categories">
          <Route index={true} element={<CategoryList />} />
          <Route path=":category" element={<CategoryDetail />} />
        </Route>
        <Route path="products">
          <Route index={true} element={<ProductList />} />
          <Route path=":product" element={<ProductDetail />} />
        </Route>
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="help">
        <Route element={<ProtectedRoute roles={ROLE_ALL} />}>
          <Route path="qna" element={<Qna />} />
        </Route>
        <Route path="faq" element={<Faq />} />
        <Route path="notice" element={<Notice />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="guide" element={<Guide />} />
      </Route>
      <Route path="dashboard" element={<ProtectedRoute roles={ROLE_MANAGER} />}>
        <Route index={true} element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
