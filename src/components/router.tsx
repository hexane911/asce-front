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

const Page = () => {
  const location = useLocation();

  useEffect(() => {
    scrollTo();
  }, [location]);

  return (
    <div className="page" id="page">
      <Header />
      <Outlet />
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
    ],
  },
]);

const Pages = () => {
  return (
    // <>
    //   <Header />
    <RouterProvider router={router} />
    //   <GoodsSection />
    //   <SupportSection />
    //   <Footer />
    // </>
  );
};

export default Pages;
