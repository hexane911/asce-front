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
import { scrollTo } from "../tools";
import Popup from "./popup";
import BannerPage from "./pages/banner.page";
import { useSelector } from "react-redux";
import { TCartItem } from "../types";

type PageProps = {
  outlet?: any;
};

const Page = ({ outlet }: PageProps) => {
  const location = useLocation();

  const cart = useSelector((state: {cart: TCartItem[]}) => state.cart)

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart.filter(el => !!el.quantity)));
    }
  }, [cart]);

  useEffect(() => {
    scrollTo();
  }, [location]);

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
        path: "/success",
        element: <BannerPage state="success" />
      },
      {
        path: "/order_error",
        element: <BannerPage state="order-rejected" />
      }
    ],
    errorElement: <Page outlet={<BannerPage state="404" />} />,
  },
]);

const Pages = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Pages;
