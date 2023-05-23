import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return <SignUp onClick={handleSignUp}>Sign Up</SignUp>;
};

const SignUp = styled.button`
  color: black;
  width: 100px;
  font-size: 16px;
  padding: 5px;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 100px;
  background-color: transparent;
  &:hover {
    background-color: #f1f5f9;
  }
`;
