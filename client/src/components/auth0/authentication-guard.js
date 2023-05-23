import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Checkout from "../Checkout";
import Login from "../Login";

// if the user is authenticated , it returns the checkout page else it returns the login page
export const AuthenticationGuard = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return <Checkout />;
  } else {
    return <Login />;
  }
};
