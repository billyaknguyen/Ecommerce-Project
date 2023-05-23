import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Confirmation from "./Confirmation";
import CategoryItems from "./CategoryItems";
import { ProductContext } from "./ProductsContext";
import GlobalStyle from "./GlobalStyle";
import Checkout from "./Checkout";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./auth0/authentication-guard";
import { Spinner, WrapperSpinner } from "./Spinner";
import { format } from "date-fns";
import BodyItems from "./BodyLocationItems";
import TermsPrivacy from "./TermsPrivacy";

function App() {
  const { user, isLoading } = useAuth0();

  const {
    setProductsData,
    actions: { receiveCartItemsFromServer },
  } = useContext(ProductContext);

  //Add user to clients collection
  useEffect(() => {
    if (user) {
      const userInfo = {
        sub: user.sub,
        nickname: user.nickname,
        name: user.name,
        picture: user.picture,
        email: user.email,
        email_verified: user.email_verified,
        updated_at: user.updated_at,
        memberSince: format(new Date(), "MM.dd.yyyy"),
        orders: [],
        cart: [],
      };

      fetch("/clients", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
  //

  //test to get all the products data
  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((resData) => setProductsData(resData.data));
  }, [setProductsData]);
  //fetching cart data
  useEffect(() => {
    fetch("/cart")
      .then((res) => res.json())
      .then((resData) => {
        let allTotal = 0;
        resData.data.forEach((purchaseItem) => {
          allTotal =
            allTotal + purchaseItem.price.slice(1) * purchaseItem.quantity;
          return allTotal;
        });
        receiveCartItemsFromServer(resData, allTotal);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return (
      <WrapperSpinner>
        <Spinner />
      </WrapperSpinner>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={<AuthenticationGuard component={Checkout} />}
        />
        <Route
          path="/confirmation/:id"
          element={<Confirmation />}
        />
        <Route path="/category/:category" element={<CategoryItems />} />
        <Route path="/bodyLocations/:body" element={<BodyItems />} />
        <Route path="/Terms" element={<TermsPrivacy />} />
      </Routes>
    </>
  );
}

export default App;
