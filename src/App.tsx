import { createContext, useEffect, useState } from "react";
import Pages from "./components/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export const FakeCartContext = createContext<{
  cart: {device: "AirPods 3" | "AirPods Pro", id: number, quantity: number, order: number}[];
  setCart: any;
}>({
  cart: [],
  setCart: null,
});

function App() {
  const [cart, setCart] = useState<{device: "AirPods 3" | "AirPods Pro", id: number, quantity: number, order: number}[]>([]);
  useEffect(() => {
    let saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved).filter((el : any) => !!el.quantity));
    }
  }, []);
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart.filter(el => !!el.quantity)));
    }
  }, [cart]);

  return (
    <Provider store={store}>
      <FakeCartContext.Provider value={{ cart, setCart }}>
        <Pages />
      </FakeCartContext.Provider>
    </Provider>
  );
}

export default App;
