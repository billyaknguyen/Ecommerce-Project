import { useContext, useState } from "react";
import styled from "styled-components";
import { ProductContext } from "./ProductsContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//Checkout Page
const Checkout = () => {
  const { user } = useAuth0();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    creditCard: "",
    expiration: "",
    cvv: "",
    userId: user ? user.sub : "",
  });
  const [isPlacedOrder, setIsPlacedOrder] = useState(false);

  const {
    state,
    actions: { resetCart },
  } = useContext(ProductContext);
  const navigate = useNavigate();

  //Updates the state with new form data as the user types
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCreditCard = (event) => {
    const creditCardValue = event.target.value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setFormData({ ...formData, creditCard: creditCardValue });
  };

  const handleExpiration = (event) => {
    const expirationValue = event.target.value.replace(/(\d{2})(?=\d)/g, "$1/");
    setFormData({ ...formData, expiration: expirationValue });
  };
  //This function is used to send a POST request to the server using current cart items and form data , which then navigates to the confirmation page.
  const handleCheckout = async (event) => {
    event.preventDefault();
    setIsPlacedOrder(true);
    try {
      const response = await fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: state.purchaseItems,
          cartTotal: state.allTotal,
          ...formData,
        }),
      });
      const resData = await response.json();
      if (resData) {
        console.log("SUCCESS", resData);
        resetCart();
        navigate(`/confirmation/${resData.data.insertedId}`);
      }
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={handleCheckout}>
        <FormTitle>Checkout</FormTitle>
        <FormGroup>
          <Label htmlFor="firstName">First Name:</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name:</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address">Address:</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="country">Country:</Label>
          <Input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="creditCard">Credit Card:</Label>
          <Input
            type="text"
            id="creditCard"
            name="creditCard"
            value={formData.creditCard}
            onChange={handleCreditCard}
            placeholder="1234 1234 1234 1234"
            pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
            maxLength="19"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="expiration">Expiration:</Label>
          <Input
            type="text"
            id="expiration"
            name="expiration"
            value={formData.expiration}
            onChange={handleExpiration}
            placeholder="MM/YY"
            pattern="\d{2}\/\d{2}"
            maxLength="5"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="cvv">CVV Number:</Label>
          <Input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            pattern="\d{3}"
            maxLength="3"
            required
          />
        </FormGroup>
        <Button type="submit" disabled={isPlacedOrder}>
          {!isPlacedOrder ? "Place Order!" : <SpinnerLoading />}
        </Button>
      </Form>
      <OrderSummaryWrapper>
        <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
        <OrderSummary>
          {state.hasLoaded &&
            state.purchaseItems.map((purchaseItem) => {
              const { name, price, imageSrc, quantity, _id } = purchaseItem;

              return (
                <OrderSummaryItem key={_id}>
                  <OrderSummaryImageWrapper>
                    <OrderSummaryImage src={imageSrc} />
                  </OrderSummaryImageWrapper>
                  <OrderSummaryDetails>
                    <OrderSummaryName>{name}</OrderSummaryName>
                    <OrderSummaryPrice>
                      ${price.slice(1) * quantity}
                    </OrderSummaryPrice>
                    <OrderSummaryQuantity>Qty: {quantity}</OrderSummaryQuantity>
                  </OrderSummaryDetails>
                </OrderSummaryItem>
              );
            })}
        </OrderSummary>
        <OrderTotalWrapper>
          <OrderTotalTitle>Order Total:</OrderTotalTitle>
          <OrderTotalPrice>${state.allTotal}</OrderTotalPrice>
        </OrderTotalWrapper>
      </OrderSummaryWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  gap: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Form = styled.form`
  width: 500px;
  border: 1px solid rgb(232, 232, 232);
  padding: 40px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid rgb(232, 232, 232);
  border-radius: 4px;
`;
const Button = styled.button`
  display: block;
  margin-top: 30px;
  background-color: rgb(103, 114, 229);
  color: white;
  border: none;
  border-radius: 4px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background-color: rgb(138, 142, 186);
  }
`;

//Order Summary :

const OrderSummaryWrapper = styled.div`
  width: 500px;
  border: 1px solid rgb(232, 232, 232);
  padding: 40px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 30px;
  }
`;

const OrderSummaryTitle = styled.h2`
  margin-bottom: 20px;
`;

const OrderSummary = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const OrderSummaryItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const OrderSummaryImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-right: 20px;
`;

const OrderSummaryImage = styled.img`
  width: 100%;
  height: 100%;
`;

const OrderSummaryDetails = styled.div`
  flex: 1;
`;
const OrderSummaryName = styled.h3`
  margin: 0;
`;

const OrderSummaryPrice = styled.p`
  margin: 0;
`;

const OrderSummaryQuantity = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgb(179, 179, 179);
`;
const OrderTotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const OrderTotalTitle = styled.p`
  margin: 0;
  font-weight: bold;
`;

const OrderTotalPrice = styled.p`
  margin: 0;
  font-weight: bold;
`;
export const SpinnerLoading = styled.div`
  border: 5px solid #084e8a;
  border-top: 5px white solid;
  border-radius: 50%;
  height: 10px;
  width: 10px;
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

export default Checkout;
