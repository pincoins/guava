import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Profile from '../pages/auth/Profile';
import SignIn from '../pages/auth/SignIn';
import SignOut from '../pages/auth/SignOut';
import SignUp from '../pages/auth/SignUp';
import Faq from '../pages/help/Faq';
import Guide from '../pages/help/Guide';
import Notice from '../pages/help/Notice';
import Privacy from '../pages/help/Privacy';
import Qna from '../pages/help/Qna';
import Terms from '../pages/help/Terms';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Cart from '../pages/shop/Cart';
import CategoryList from '../pages/dashboard/CategoryList';
import OrderDetail from '../pages/shop/orders/OrderDetail';
import OrderList from '../pages/shop/orders/OrderList';
import ProductDetail from '../pages/shop/products/ProductDetail';
import ProductList from '../pages/shop/products/ProductList';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RoleManagerRoute from './RoleManagerRoute';
import Root from './Root';
import RootBoundary from './RootBoundary';
import RootDashboard from './RootDashboard';

const BrowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
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
          <Route path="products">
            <Route path=":categorySlug" element={<ProductList />} />
            <Route path=":slug" element={<ProductDetail />} />
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
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="dashboard"
        element={<RootDashboard />}
        errorElement={<RootBoundary />}
      >
        <Route element={<PrivateRoute />}>
          <Route element={<RoleManagerRoute />}>
            <Route index={true} element={<Home />} />
            <Route path="categories" element={<CategoryList />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default BrowserRouter;
