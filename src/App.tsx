import Pages from "./components/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Pages />
      </CookiesProvider>
    </Provider>
  );
}

export default App;
