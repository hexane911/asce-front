import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/main.page";
import Header from "./sections/header";
import GoodsSection from "./sections/goods.section";
import SupportSection from "./sections/support.section";
import Footer from "./sections/footer";
import ProductPage from "./pages/product.page";
import CartPage from "./pages/cart.page";
import { useEffect } from "react";
import { scrollTo, useCheckAuth } from "../tools";
import Popup from "./popup";
import BannerPage from "./pages/banner.page";
import { useDispatch, useSelector } from "react-redux";
import { TCartItem } from "../types";
import { useGetProductsQuery } from "../redux/products.api";
import { setCart } from "../redux/cart.slice";
import AuthPage from "./pages/auth.page";
import Loader from "./loader";
import OrderPage from "./pages/order.page";

type PageProps = {
  outlet?: any;
};

const Page = ({ outlet }: PageProps) => {
  const location = useLocation();

  const cart = useSelector((state: { cart: TCartItem[] }) => state.cart);
  const dispatch = useDispatch();
  const { data: products } = useGetProductsQuery();
  const {authNeeded, authSuccess, isCheckingPw} = useCheckAuth()
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((el) => !!el.quantity))
      );
    }
  }, [cart]);

  useEffect(() => {
    scrollTo();
  }, [location]);

  useEffect(() => {
    if (products) {
      let filtered = [...cart].filter((cartItem) => {
        return !!products?.find((el) => el.id === cartItem.id && !!el.in_stock_amount);
      });

      if (filtered.length !== cart.length) {
        dispatch(setCart(filtered));
      }
    }
  }, [products]);

  if (isCheckingPw) {
    return <Loader />
  }

  if (authNeeded?.password_required && !authSuccess) {
    return <AuthPage />
  }


  return (
    <div className="page" id="page">
      <Popup />
      <Header />
      {outlet ? <>{outlet}</> : <Outlet />}
      <GoodsSection />
      <SupportSection />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    children: [
      {
        path: "/",
        index: true,
        element: <MainPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/order/:orderId",
        element: <OrderPage />
      }
    ],
    errorElement: <Page outlet={<BannerPage state="404" />} />,
  },
]);

const Pages = () => {
  return <RouterProvider router={router} />;
};

export default Pages;
