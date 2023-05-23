import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <SignOut onClick={handleLogout}>Log Out</SignOut>;
};

const SignOut = styled.button`
  color: black;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  &:hover {
    background-color: #f1f5f9;
  }
`;
