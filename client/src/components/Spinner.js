import styled from "styled-components";

// This is our loading component , while waiting for items to fetch from our database.
export const Spinner = styled.div`
  position: relative;
  top: 50px;
  border: 10px solid #084e8a;
  border-top: 10px white solid;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  animation: spin 2s linear infinite;
  margin: auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const WrapperSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
