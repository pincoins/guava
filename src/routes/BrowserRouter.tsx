import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from '../pages/Home';
import CategoryList from '../pages/shop/categories/CategoryList';
import ProductList from '../pages/shop/products/ProductList';
import SignIn from '../pages/auth/SignIn';
import SignOut from '../pages/auth/SignOut';
import React from 'react';
import Root from './Root';
import Cart from '../pages/shop/Cart';
import SignUp from '../pages/auth/SignUp';
import RootBoundary from './RootBoundary';
import CategoryDetail from '../pages/shop/categories/CategoryDetail';
import ProductDetail from '../pages/shop/products/ProductDetail';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Profile from '../pages/auth/Profile';
import OrderList from '../pages/shop/orders/OrderList';
import OrderDetail from '../pages/shop/orders/OrderDetail';
import Qna from '../pages/help/Qna';
import Faq from '../pages/help/Faq';
import Notice from '../pages/help/Notice';
import Privacy from '../pages/help/Privacy';
import Terms from '../pages/help/Terms';
import Guide from '../pages/help/Guide';
import RoleManagerRoute from './RoleManagerRoute';

const BrowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<RootBoundary />}>
      <Route index={true} element={<Home />} />
      <Route path="auth">
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="sign-out" element={<SignOut />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Route>
      <Route path="shop">
        <Route element={<PrivateRoute />}>
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
        <Route element={<PrivateRoute />}>
          <Route path="qna" element={<Qna />} />
        </Route>
        <Route path="faq" element={<Faq />} />
        <Route path="notice" element={<Notice />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="guide" element={<Guide />} />
      </Route>
      <Route path="dashboard" element={<PrivateRoute />}>
        <Route element={<RoleManagerRoute />}>
          <Route index={true} element={<Home />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default BrowserRouter;
