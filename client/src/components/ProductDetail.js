import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BiMinus, BiPlus } from "react-icons/bi";
import BodyLocationIconHandler from "./IconHandlers/BodyLocationIconHandler";
import CategoryPictureHandler from "./IconHandlers/CategoryPictureHandler";
import { Spinner, WrapperSpinner } from "./Spinner";
import { ProductContext } from "./ProductsContext";

//This component is to show the detail info about one single product
const ProductDetail = () => {
  //store all the single product data by id
  const [singleProductData, setSingleProductData] = useState(null);
  //store the quantity of products that user selected
  const [purchaseNum, setPurchaseNum] = useState(0);
  //store the company info by id
  const [companyInfo, setCompanyInfo] = useState(null);
  //Get the product Id in URL
  const { id } = useParams();

  const { cartCount, setCartCount } = useContext(ProductContext);

  //fetch the single product data by Id, id got from the URL params
  useEffect(() => {
    fetch(`/product/${id}`)
      .then((res) => res.json())
      .then((resData) => {
        setSingleProductData(resData.data);
      });
  }, [id]);

  //fetch to get the company info
  useEffect(() => {
    if (singleProductData) {
      fetch(`/company/${singleProductData.companyId}`)
        .then((res) => res.json())
        .then((resData) => {
          setCompanyInfo(resData.data);
        });
    }
  }, [singleProductData]);

  //reset the num if its out of the range
  useEffect(() => {
    if (purchaseNum > 0) {
      if (purchaseNum > numInStock) {
        setPurchaseNum(numInStock);
      }
    } else {
      setPurchaseNum(0);
    }
  }, [purchaseNum]);

  //will be replaced by loading component put this here first to avoid error
  if (!singleProductData || !companyInfo) {
    return (
      <WrapperSpinner>
        <Spinner />;
      </WrapperSpinner>
    );
  }

  const { url, country } = companyInfo[0];
  const companyName = companyInfo[0].name;
  const { imageSrc, name, price, category, numInStock, body_location } =
    singleProductData;

  //function will add the Num + 1 when user click on + , but not gonna go above the in-stock Num
  const addProduct = () => {
    setPurchaseNum(purchaseNum + 1);
  };

  //function will reduce the Num - 1 when user click on -, but not gonna go down below 0
  const reduceProduct = () => {
    setPurchaseNum(purchaseNum - 1);
  };

  const handleCartItems = (ev) => {
    ev.preventDefault();
    setCartCount(cartCount + purchaseNum);
    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: parseInt(id),
        name: name,
        price: price,
        imageSrc: imageSrc,
        quantity: parseInt(purchaseNum),
        numInStock: parseInt(numInStock),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <LinkSection>
        <CategoryLink to={"/"}>Home</CategoryLink>
        <Dot>·</Dot>
        <CategoryLink to={`/category/${category}`}> Category</CategoryLink>
        <Dot>·</Dot>
        <Product> ProductDetail</Product>
      </LinkSection>

      <Wrapper>
        {numInStock !== 0 ? (
          <Picture src={imageSrc} alt="Product" />
        ) : (
          <SoldOut imgUrl={imageSrc}>
            <SoldOutText>Sold out</SoldOutText>
          </SoldOut>
        )}

        <InfoContainer>
          <PriceSection>
            <Name>{name}</Name>
            <Price>{price}</Price>
          </PriceSection>
          <ProductInfo>
            <InfoSection>
              <CategoryPictureHandler category={category} />
              <Text>{category}</Text>
            </InfoSection>
            <InfoSection>
              <BodyLocationIconHandler body={body_location} />
              <Text>{body_location}</Text>
            </InfoSection>
            <InfoSection>
              <StockIcon src="https://cdn-icons-png.flaticon.com/512/3566/3566826.png" />
              <Text>
                {numInStock === 0 ? "Out of Stock" : `In stock : ${numInStock}`}
              </Text>
            </InfoSection>
          </ProductInfo>
          <BuySection>
            <QuantitySection>
              <QuantityButton onClick={addProduct}>
                <BiPlus />
              </QuantityButton>
              <PurchaseNum
                onChange={(ev) => setPurchaseNum(ev.target.value)}
                value={purchaseNum}
              />
              <QuantityButton onClick={reduceProduct}>
                <BiMinus />
              </QuantityButton>
            </QuantitySection>
            <CartButton
              onClick={handleCartItems}
              disabled={purchaseNum === 0 ? true : false}
            >
              Add to cart
            </CartButton>
          </BuySection>

          <CompanyInfo href={url}>
            {companyName} · {country}
          </CompanyInfo>
        </InfoContainer>
      </Wrapper>
    </>
  );
};

const LinkSection = styled.div`
  width: 15.5%;
  padding-top: 30px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const Dot = styled.div`
  color: #6d6875;
  font-size: 15px;
  font-weight: 700;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: lightgray;
  &:hover {
    color: #6d6875;
  }
`;

const Product = styled.span`
  color: #6d6875;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 5% 3%;
  display: flex;
  justify-content: center;
  gap: 50px;
`;
const InfoContainer = styled.div`
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 50%;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  font-family: "Montserrat", sans-serif;
  border-bottom: 1px lightgray solid;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0px;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`;
const Text = styled.span`
  font-size: 26px;
  color: #463f3a;
  font-family: "Edu NSW ACT Foundation", cursive;
`;
const StockIcon = styled.img`
  width: 50px;
`;

const Name = styled.h1`
  font-weight: 200;
`;
const BuySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  border: 3px dotted lightgray;
`;

const QuantityButton = styled.button`
  border: none;
  height: 40px;
  font-size: 40px;
  color: gray;
  background: none;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const PurchaseNum = styled.input`
  font-size: 30px;
  width: 30px;
  border: none;
  background: none;
  text-align: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
`;

const CartButton = styled.button`
  width: 50%;
  height: 60px;
  background-color: black;
  color: white;
  font-size: 28px;
  font-family: "Montserrat", sans-serif;
  border-radius: 30px;
  border: none;

  &:hover {
    background-color: #9a8c98;
    animation: ${fadeIn} 0.3s ease-in;
    cursor: pointer;
  }
`;

const Price = styled.div`
  font-size: 40px;
  color: #774c60;
`;

const Picture = styled.img`
  width: 400px;
  image-rendering: auto;
  border-radius: 60px;
  padding: 20px;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

const SoldOut = styled.div`
  width: 400px;
  height: 400px;
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-repeat: no-repeat;
  background-size: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;

  font-family: "Montserrat", sans-serif;
  border-radius: 60px;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

const SoldOutText = styled.span`
  color: white;
  font-weight: 700;
  background-color: #463f3a;
  height: 400px;
  width: 400px;
  opacity: 0.3;
  border-radius: 60px;
  text-align: center;
`;

const CompanyInfo = styled.a`
  margin: 10px auto;
  padding: 10px;
  text-decoration: none;
  color: #774c60;
  &:hover {
    color: #778da9;
  }
`;

export default ProductDetail;
