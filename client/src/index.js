import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ProductProvider } from "./components/ProductsContext";
import { Auth0ProviderWithNavigate } from "./components/auth0/auth0-provider-with-navigate";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <ProductProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProductProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>,
  document.getElementById("root")
);
