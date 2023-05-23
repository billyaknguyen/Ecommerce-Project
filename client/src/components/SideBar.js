import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// This is for our Sidebar component which has clickable buttons for categories and body locations, it will display the corresponding items based on the selected category or body location filter
const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [bodyLocations, setBodyLocations] = useState([]);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isBodyActive, setIsBodyActive] = useState(false);

  useEffect(() => {
    //fetching Category names
    const getCategories = async () => {
      try {
        const response = await fetch("/categories");
        const resData = await response.json();
        setCategories(resData.data);
      } catch (error) {
        console.log("error");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    //fetching bodyLocations
    const getBodyLocations = async () => {
      try {
        const response = await fetch("/bodylocations");
        const resData = await response.json();
        setBodyLocations(resData.data);
      } catch (error) {
        console.log("error");
      }
    };
    getBodyLocations();
  }, []);

  return (
    <>
      <SideBarSection>
        {!isCategoryActive ? (
          <ClickButton onClick={() => setIsCategoryActive(true)}>
            Category
            <FiChevronDown />
          </ClickButton>
        ) : (
          <ClickButton onClick={() => setIsCategoryActive(false)}>
            Category
            <FiChevronUp />
          </ClickButton>
        )}
        {isCategoryActive &&
          categories.map((category) => {
            return (
              <SearchResultLink to={`/category/${category}`} key={category}>
                <CategoryBar>{category}</CategoryBar>
              </SearchResultLink>
            );
          })}
        {!isBodyActive ? (
          <ClickButton onClick={() => setIsBodyActive(true)}>
            Body Location
            <FiChevronDown />
          </ClickButton>
        ) : (
          <ClickButton onClick={() => setIsBodyActive(false)}>
            Body Location
            <FiChevronUp />
          </ClickButton>
        )}
        {isBodyActive &&
          bodyLocations.map((bodyLocation) => {
            return (
              <SearchResultLink
                to={`/bodyLocations/${bodyLocation}`}
                key={bodyLocation}
              >
                <CategoryBar>{bodyLocation}</CategoryBar>
              </SearchResultLink>
            );
          })}
      </SideBarSection>
    </>
  );
};

const SideBarSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryBar = styled.div``;

const ClickButton = styled.button`
  width: 200px;
  height: 50px;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  background: none;
  border: none;
  font-family: "Montserrat", sans-serif;
  &:hover {
    cursor: pointer;
  }
`;
const SearchResultLink = styled(Link)`
  color: gray;
  text-decoration: none;
  padding: 5px 0px;
  font-size: 15px;
  &:hover {
    font-weight: 800;
    color: black;
  }
`;

export default Sidebar;
