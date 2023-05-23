import { useState } from "react";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

//This is the Pagination function, dividing the items into pages of fixed number of items, you can also switch between pages by clicking on the number button.
const PageResult = ({ query, items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [maxPageDisplay] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);
  const pagesNum = Math.ceil(items.length / itemsPerPage);
  let lastPage = maxPageDisplay + currentPage;
  let firstPage = currentPage;
  if (lastPage > pagesNum) {
    lastPage = pagesNum;
  }
  if (pagesNum > maxPageDisplay && lastPage == pagesNum) {
    firstPage = pagesNum - maxPageDisplay;
  }
  if (pagesNum < maxPageDisplay) {
    firstPage = 1;
  }

  let pageNumList = [];
  for (let i = 1; i <= pagesNum; i++) {
    pageNumList.push(i);
  }
  {
    currentPage < 1
      ? setCurrentPage(1)
      : currentPage > pagesNum && setCurrentPage(pagesNum);
  }
  return (
    <>
      <CategoryWrapper>
        <CategoryName>{query}</CategoryName>
      </CategoryWrapper>
      <Wrapper>
        <Sidebar />
        <SearchResultSection>
          <ProductQuantity>{items.length} products</ProductQuantity>
          <Container>
            {items &&
              currentItem.map((item, index) => {
                return (
                  <WrapperProduct to={`/products/${item._id}`} key={index}>
                    <IMG src={item.imageSrc} alt="Product"></IMG>
                    <ItemName>
                      {item.name.length > 60
                        ? `${item.name.slice(0, 50)}...`
                        : item.name}
                    </ItemName>
                    <ItemPrice> {item.price}</ItemPrice>
                  </WrapperProduct>
                );
              })}
          </Container>
          <PaginationButton>
            <LeftButton
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <AiOutlineLeft />
            </LeftButton>
            {pageNumList.map((num, index) => {
              if (firstPage - 1 <= index && index < lastPage) {
                return (
                  <PageNum
                    key={index}
                    onClick={() => {
                      setCurrentPage(num);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    pageNum={num}
                    currentPage={currentPage}
                  >
                    {num}
                  </PageNum>
                );
              }

              if (index === pagesNum - 1) {
                return (
                  <div key={num}>
                    <PageNum pageNum={0}>...</PageNum>
                    <PageNum
                      onClick={() => {
                        setCurrentPage(num);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      pageNum={num}
                      currentPage={currentPage}
                    >
                      {num}
                    </PageNum>
                  </div>
                );
              }
            })}
            <RightButton
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <AiOutlineRight />
            </RightButton>
          </PaginationButton>
        </SearchResultSection>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 5%;
`;

const SearchResultSection = styled.div`
  width: 60%;
`;
const ProductQuantity = styled.div`
  margin-left: 50px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 0.1fr);
  grid-template-rows: repeat(3, 0.2fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;
const WrapperProduct = styled(Link)`
  width: 250px;
  height: 420px;

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
    animation: wiggleJiggle 0.5s infinite;
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
  margin-top: 10px;
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

const ItemName = styled.p`
  font-size: 10px;
  color: #4a4e69;
`;
const CategoryName = styled.h2`
  text-align: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const PaginationButton = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const LeftButton = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const RightButton = styled.button`
  background: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const PageNum = styled.button`
  padding: 5px 10px;
  border-radius: 50%;
  background: ${(prop) =>
    prop.pageNum == prop.currentPage ? "lightGray" : "none"};
  border: none;
  font-size: 15px;
  cursor: pointer;
`;

export default PageResult;
