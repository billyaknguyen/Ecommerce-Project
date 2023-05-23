import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FcOk } from "react-icons/fc";
import { Spinner, WrapperSpinner } from "./Spinner";

//Confirmation page component
const Confirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState("");

  useEffect(() => {
    fetch(`/orders/${id}`)
      .then((res) => res.json())
      .then((resData) => setOrder(resData.data));
  }, []);
  return (
    <>
      {!order ? (
        <WrapperSpinner>
          <Spinner />
        </WrapperSpinner>
      ) : (
        <Container>
          <WrapperContent>
            <WrapperMessage>
              <WrapperMessageImage>
                <FcOk />
              </WrapperMessageImage>
              <WrapperMessageText>
                <h1>THANK YOU FOR YOUR PURCHASE!</h1>
              </WrapperMessageText>
            </WrapperMessage>
            <WrapperContentHeader>
              <div>
                <h4>Payment information:</h4>
                <p>Order Number# {order._id}</p>
                <p>Date: {order.orderDate}</p>
                <p>Credit Card: **** **** **** {order.creditCard.slice(15)}</p>
              </div>
              <div>
                <h4>Shipping Address:</h4>
                <Span>
                  <PText>{order.firstName}</PText>.
                  <PText>{order.lastName}</PText>
                </Span>
                <PText>{order.address}</PText>
                <PText>{order.country}</PText>
              </div>
            </WrapperContentHeader>
            <WrapperContentBody>
              <WrapperContentBodyTitle>
                <p>Items</p>
                <p>Total</p>
              </WrapperContentBodyTitle>
              {order.cartItems.map((item, index) => {
                return (
                  <WrapperContentBodyItem key={index}>
                    {" "}
                    <Item>
                      <IMG src={item.imageSrc} alt="image" />{" "}
                      <p>{item.name} </p>{" "}
                    </Item>
                    <Item>
                      <p>{item.price}</p>
                    </Item>
                  </WrapperContentBodyItem>
                );
              })}
            </WrapperContentBody>
            <WrapperTotal>
              <PTotal>Total: ${order.cartTotal} </PTotal>
            </WrapperTotal>
          </WrapperContent>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding: 20px;
  margin-top: 150px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;
const WrapperContent = styled.div``;
const WrapperMessage = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const WrapperMessageImage = styled.div`
  margin-right: 20px;
  font-size: 50px;
  margin-top: 10px;
`;
const WrapperMessageText = styled.div``;
const WrapperContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
`;
const Span = styled.span`
  display: flex;
`;
const PText = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
`;
const WrapperContentBody = styled.div`
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;
const WrapperContentBodyTitle = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const WrapperContentBodyItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  margin-top: 20px;
  justify-content: space-between;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
`;

const IMG = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;
const WrapperTotal = styled.div``;
const PTotal = styled.p`
  float: right;
`;

export default Confirmation;
