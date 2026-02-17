import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import ScrollToTop from "./ScrollToTop.jsx";
import { Provider } from "react-redux";
import { store } from "./components/redux/Store.jsx";
import { LoaderProvider } from "./components/common/commonLoader/LoaderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </BrowserRouter>
  </Provider>,
);
