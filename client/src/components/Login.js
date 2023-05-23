import styled from "styled-components";

// This is the login page where the user gets redirected to when trying to checkout without logging in.
const Login = () => {
  return (
    <Container>
      <Content>
        <h1>You must be logged in</h1>
        <WrapperText>
          <p>Before proceeding to checkout, you must be logged in.</p>
        </WrapperText>
      </Content>
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
  margin-top: 150px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Login;
