import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";

//This is what happens when the Cart is empty.
const EmptyCart = () => {
  return (
    <Container>
      <WrapperIcon>
        <AiOutlineShoppingCart />
      </WrapperIcon>
      <Content>
        <h1>Your cart is currently empty</h1>
        <WrapperText>
          <p>
            Before proceed to checkout, you must add some products to your cart.
          </p>
          <p>You will find a lot of interesting products on our page</p>
        </WrapperText>
        <Button href="http://localhost:3000/"> RETURN TO SHOP</Button>
      </Content>
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
  margin-top: 90px;
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
const WrapperIcon = styled.div`
  font-size: 90px;
  text-align: center;
`;
const Button = styled.a`
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 10px;
  background-color: black;
  margin-top: 20px;
  position: relative;
`;

export default EmptyCart;
