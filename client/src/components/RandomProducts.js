import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductsContext";
import styled from "styled-components";
import { Spinner } from "./Spinner";

//for rendering random 10 products on the home page
const RandomProducts = () => {
  const { productsData } = useContext(ProductContext);

  // the empty array will be pushed in the random products's data
  let randomProductList = [];

  //produce the random Number
  const produceRandomNum = () => {
    return Math.floor(Math.random() * 347);
  };

  //Conditional rendering or it will be blocked (can be moved to app and will add loading componet)
  if (productsData.length > 0) {
    //push the single random data into the array and loop it 10 times.
    //so that RandomProductList will contain 10 random different products data
    for (let i = 0; i < 12; i++) {
      randomProductList.push(productsData[produceRandomNum()]);
    }
  }
  return (
    <>
      {productsData.length === 0 ? (
        <Spinner />
      ) : (
        <Container>
          {/* map the array to display the product's image and price */}
          {randomProductList.map((randomProduct, index) => {
            return (
              <WrapperProduct to={`/products/${randomProduct._id}`} key={index}>
                <IMG src={randomProduct.imageSrc} alt="Product"></IMG>
                <ItemName>
                  {randomProduct.name.length > 60
                    ? `${randomProduct.name.slice(0, 50)}...`
                    : randomProduct.name}
                </ItemName>
                <ItemPrice> {randomProduct.price}</ItemPrice>
              </WrapperProduct>
            );
          })}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.1fr);
  grid-template-rows: repeat(3, 0.2fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: center;
  align-items: center;
  justify-items: center;
  margin-bottom: 20px;
`;
const WrapperProduct = styled(Link)`
  width: 250px;
  height: 380px;

  border-radius: 10px;
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  text-decoration: none;
  color: black;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    animation: wiggleJiggle 1.5s infinite;
  }

  @keyframes wiggleJiggle {
    0% {
      transform: rotate(0deg) scale(1);
    }
    25% {
      transform: rotate(-3deg) scale(1.2);
    }
    50% {
      transform: rotate(3deg) scale(1.3);
    }
    75% {
      transform: rotate(-3deg) scale(1.4);
    }
    100% {
      transform: rotate(0deg) scale(1);
    }
  }
`;
const IMG = styled.img`
  width: 250px;
  height: 270px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  border: 1px outset rgba(28, 110, 164, 0.05);
`;

const ItemPrice = styled.div`
  margin-bottom: 20px;
  color: #415a77;
  font-size: 25px;
`;
const ItemName = styled.div`
  font-size: 10px;
  color: #4a4e69;
`;

export default RandomProducts;
