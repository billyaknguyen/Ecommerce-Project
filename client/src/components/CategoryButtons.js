import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Making a Button for each item category
const CategoryButtons = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <Container>
      {categories.map((category, index) => {
        return (
          <Link key={index} to={`/category/${category}`}>
            <Button>{category}</Button>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 150px;
`;
const Button = styled.button`
  color: black;
  font-size: 16px;
  padding: 8px;
  cursor: pointer;
  border: none;
  border-radius: 100px;
  background-color: transparent;
  &:hover {
    background-color: #e1e5f2;
  }
`;

export default CategoryButtons;
