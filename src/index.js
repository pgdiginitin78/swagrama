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
import CommonLoader from "./components/common/commonLoader/CommonLoader.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <LoaderProvider>
              <CommonLoader />
              <App />
            </LoaderProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </HelmetProvider>,
);
