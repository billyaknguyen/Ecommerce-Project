import styled from "styled-components";
import { useContext, useEffect } from "react";
import { ProductContext } from "./ProductsContext";
import CartPurchaseItems from "./CartPurchaseItems";
import { useNavigate } from "react-router-dom";
import { Spinner, WrapperSpinner } from "./Spinner";
import EmptyCart from "./EmptyCart";

//This is the Cart component
const Cart = () => {
  const {
    state,
    actions: { receiveCartItemsFromServer },
  } = useContext(ProductContext);

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
      });
  }, []);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  let subtotal = Math.floor(state.allTotal * 100) / 100;

  if (state.hasLoaded === false) {
    return (
      <WrapperSpinner>
        <Spinner />;
      </WrapperSpinner>
    );
  }
  return (
    <>
      {state.purchaseItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Container>
          <Title>Cart</Title>
          <WrapperCart>
            <WrapperProductList>
              <CartPurchaseItems />
            </WrapperProductList>
            <WrapperForm>
              <WrapperContent>
                <OrderBody>
                  <WrapperSummary>
                    <SummaryText>Subtotal:</SummaryText>
                    <SummaryValue>${subtotal}</SummaryValue>
                  </WrapperSummary>
                </OrderBody>
                <OrderFooter>
                  <OrderCheckoutButton onClick={handleCheckout}>
                    CHECKOUT
                  </OrderCheckoutButton>
                </OrderFooter>
              </WrapperContent>
            </WrapperForm>
          </WrapperCart>
        </Container>
      )}
    </>
  );
};

export default Cart;

const Container = styled.div`
  position: relative;
  top: 50px;
`;
const Title = styled.h1`
  text-align: center;
`;
const WrapperCart = styled.div`
  display: flex;
  position: relative;
  top: 50px;
  max-width: 1200px;
  margin: auto;
`;
const WrapperProductList = styled.div`
  width: 80%;
  height: 200px;
`;

const WrapperForm = styled.div`
  width: 40%;
  height: 200px;
  margin-left: 20px;
`;
const WrapperContent = styled.div`
  margin-top: 60px;
`;

const OrderBody = styled.div`
  padding: 10px;
`;
const WrapperSummary = styled.div`
  display: flex;
  align-content: space-around;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const SummaryText = styled.p`
  margin-right: 200px;
`;
const SummaryValue = styled.p`
  font-weight: bold;
`;
const OrderFooter = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const OrderCheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  top: 10px;
  position: relative;
  background-color: rgb(68, 199, 103);
  border: none;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;
