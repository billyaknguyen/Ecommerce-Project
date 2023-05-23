import { createContext, useState, useReducer, useEffect } from "react";

export const ProductContext = createContext();
//This is the initial state of our reducer ;
const initialState = {
  hasLoaded: false,
  purchaseItems: [],
  allTotal: 0,
};

// This is our reducer actions
const reducer = (state, action) => {
  switch (action.type) {
    //receive cart information from the database
    case "receive-purchase-items-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        purchaseItems: action.data,
        allTotal: action.allTotal,
      };
    //removes an item from the cart
    case "remove-item-from-cart":
      return {
        ...state,
        purchaseItems: state.purchaseItems.filter((item) => {
          return item._id !== action.id;
        }),
        allTotal: state.allTotal - action.singleTotal,
      };
    // updates the state by increasing the quantity of a purchase item in the cart and also the total cost
    case "add-one-Item-to-Server":
      return {
        ...state,
        purchaseItems: state.purchaseItems.map((item) => {
          if (item._id === action.id) {
            if (item.quantity > action.numInStock) {
              item.quantity = action.numInStock;
            } else {
              item.quantity = item.quantity + 1;
            }

            return item;
          } else {
            return item;
          }
        }),
        allTotal: state.allTotal + action.changeValue,
      };

    // updates the state by decreasing the quantity of a purchase item in the cart and also the total cost
    case "reduce-one-Item-to-Server":
      return {
        ...state,
        purchaseItems: state.purchaseItems.map((item) => {
          if (item._id === action.id) {
            item.quantity = item.quantity - 1;
            return item;
          } else {
            return item;
          }
        }),
        allTotal: state.allTotal - action.changeValue,
      };
    // resets the cart after a user has placed an order
    case "reset-cart":
      return {
        ...state,
        purchaseItems: [],
        allTotal: 0,
      };

    default:
      throw new Error(`Action unknown: ${action.type}`);
  }
};

export const ProductProvider = ({ children }) => {
  //store all the items fetch from "/home"
  const [productsData, setProductsData] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [cartCount, setCartCount] = useState(0);

  //function to getting total items count in the cart
  useEffect(() => {
    if (state.purchaseItems) {
      let totalCount = 0;
      state.purchaseItems.forEach((item) => {
        totalCount += item.quantity;
      });
      setCartCount(totalCount);
    }
  }, [state.purchaseItems]);

  const receiveCartItemsFromServer = (data, allTotal) => {
    dispatch({
      type: "receive-purchase-items-info-from-server",
      ...data,
      allTotal,
    });
  };

  const addOneItemToServer = (id, numInStock, changeValue) => {
    dispatch({ type: "add-one-Item-to-Server", id, numInStock, changeValue });
  };

  const reduceOneItemToServer = (id, changeValue) => {
    dispatch({ type: "reduce-one-Item-to-Server", id, changeValue });
  };

  const removeCartItemFromServer = (id, singleTotal) => {
    dispatch({ type: "remove-item-from-cart", id, singleTotal });
  };

  const resetCart = () => {
    dispatch({ type: "reset-cart" });
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        actions: {
          receiveCartItemsFromServer,
          removeCartItemFromServer,
          addOneItemToServer,
          reduceOneItemToServer,
          resetCart,
        },
        productsData,
        setProductsData,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
