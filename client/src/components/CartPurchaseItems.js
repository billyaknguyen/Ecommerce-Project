import styled from "styled-components";
import { useContext } from "react";
import { ProductContext } from "./ProductsContext";
import { Link } from "react-router-dom";

const CartPurchaseItems = () => {
  //get the data and function from the reducer
  const {
    state,
    actions: {
      removeCartItemFromServer,
      addOneItemToServer,
      reduceOneItemToServer,
    },
  } = useContext(ProductContext);

  //function can add the product +1 the button will be disabled when the quantity equal to the numInStock , updated in database too
  const addProduct = async (id, numInStock, changeTotal, maxTotal) => {
    let addValue = 0;
    state.purchaseItems.forEach((item) => {
      if (item._id === id) {
        if (item.quantity > item.numInStock) {
          addValue = maxTotal;
        } else {
          addValue = addValue + changeTotal;
        }
      }
    });
    try {
      //update in database the purchase quantity
      const response = await fetch("/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, changeNum: 1 }),
      });
      //update the state too
      if (response) {
        addOneItemToServer(id, numInStock, addValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function will reduce the Num - 1 when user click on -, but not gonna go down below 0 the button will be diabled , updated in database too
  const reduceProduct = async (id, changeTotal) => {
    try {
      const response = await fetch("/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, changeNum: -1 }),
      });

      if (response) {
        reduceOneItemToServer(id, changeTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // this function remove an item from the cart , it is called when the "X" button is clicked
  const removeItem = async (id, singleTotal) => {
    try {
      const response = await fetch(`/cart/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response) {
        removeCartItemFromServer(id, singleTotal);
      }
    } catch (error) {
      console.log("Error , unable to remove item");
    }
  };

  return (
    <>
      {state.hasLoaded &&
        state.purchaseItems.map((purchaseItem) => {
          const { name, price, imageSrc, quantity, numInStock, _id } =
            purchaseItem;
          let singleTotal = price.slice(1) * quantity;
          let changeTotal = price.slice(1) * 1;
          let maxTotal = numInStock * price.slice(1);
          return (
            <WrapperItem key={_id}>
              <WrapperItemImage>
                <Link to={`/products/${_id}`}>
                  <IMG src={imageSrc} />
                </Link>
              </WrapperItemImage>
              <div>
                <WrapperItemName>{name}</WrapperItemName>
                <WrapperItemPrice>
                  <PWrapper>Unit:</PWrapper> {price}
                </WrapperItemPrice>
                <WrapperItemQuantity>
                  <Button
                    onClick={() =>
                      addProduct(_id, numInStock, changeTotal, maxTotal)
                    }
                    disabled={quantity >= numInStock ? true : false}
                  >
                    +
                  </Button>
                  <span>{quantity}</span>
                  <Button
                    onClick={() => reduceProduct(_id, changeTotal)}
                    disabled={quantity === 1 ? true : false}
                  >
                    -
                  </Button>
                </WrapperItemQuantity>
                {/* calculate the total amount that user can pay */}
                <WrapperItemRemove onClick={() => removeItem(_id, singleTotal)}>
                  Remove
                </WrapperItemRemove>
              </div>
            </WrapperItem>
          );
        })}
    </>
  );
};

const WrapperItem = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  padding-bottom: 10px;
`;
const WrapperItemImage = styled.div``;
const IMG = styled.img`
  width: 180px;
  height: 180px;
  margin-top: 10px;
  margin-right: 10px;
`;
const WrapperItemName = styled.div`
  width: 400px;
  margin-bottom: 20px;
`;
const WrapperItemPrice = styled.div`
  margin-bottom: 20px;
`;
const WrapperItemQuantity = styled.div`
  gap: 10px;
  display: flex;
  border: 1px solid black;
  width: 70px;
  padding: 6px;
`;
const WrapperItemRemove = styled.button`
  margin-top: 20px;
  cursor: pointer;
  background: none;
  border: none;
`;
const PWrapper = styled.p`
  display: inline;
  font-weight: bold;
`;
const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export default CartPurchaseItems;
