import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import CategoryList from './pages/shop/categories/CategoryList';
import ProductList from './pages/shop/products/ProductList';
import OrderList from './pages/shop/orders/OrderList';
import Profile from './pages/auth/Profile';
import SignIn from './pages/auth/SignIn';
import SignOut from './pages/auth/SignOut';
import React, { Suspense } from 'react';
import Root from './pages/Root';
import Cart from './pages/shop/Cart';
import Faq from './pages/help/Faq';
import Notice from './pages/help/Notice';
// import Qna from './pages/help/Qna';
import Privacy from './pages/help/Privacy';
import Terms from './pages/help/Terms';
import SignUp from './pages/auth/SignUp';
import Guide from './pages/help/Guide';
import RootBoundary from './pages/RootBoundary';
import CategoryDetail from './pages/shop/categories/CategoryDetail';
import ProductDetail from './pages/shop/products/ProductDetail';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import OrderDetail from './pages/shop/orders/OrderDetail';

const ROLE_ALL = Array.of('SYSADMIN', 'STAFF', 'MEMBER');
const ROLE_SYSADMIN = Array.of('SYSADMIN');
const ROLE_MANAGER = Array.of('SYSADMIN', 'STAFF');
const ROLE_MEMBER = Array.of('MEMBER');

const Qna = React.lazy(() => import('./pages/help/Qna'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<RootBoundary />}>
      <Route index={true} element={<Home />} />
      <Route path="auth">
        <Route element={<ProtectedRoute roles={ROLE_ALL} />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-out" element={<SignOut />} />
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
          <Route
            path="qna"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Qna />
              </Suspense>
            }
          />
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
