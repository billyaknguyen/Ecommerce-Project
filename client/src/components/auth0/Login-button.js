import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { ImPacman } from "react-icons/im";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  return (
    <SignIn title="Login" onClick={handleLogin}>
      <ImPacman />
    </SignIn>
  );
};

const SignIn = styled.button`
  cursor: pointer;
  font-size: 24px;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  &:hover {
    background-color: #f1f5f9;
  }
`;
