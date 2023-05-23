import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = (props) => {
  const { loginWithRedirect } = useAuth0();
  if (props.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={loginWithRedirect()} />;
    // return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
