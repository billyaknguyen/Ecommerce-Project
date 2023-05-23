import { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductContext } from "./ProductsContext";

//This will be the SearchBar of our website
const SearchBar = () => {
  const { productsData } = useContext(ProductContext);
  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (event) => {
    //Putting what the user is typing as the state of the itemSearch
    const userSearch = event.target.value;
    setProductSearch(userSearch);
    // filter all products the moment the user types one character and only show 5 results,
    if (userSearch.length >= 1) {
      const searchResults = productsData
        .filter((product) => {
          return product.name.toLowerCase().includes(userSearch.toLowerCase());
        })
        .slice(0, 5);
      setFilteredProducts(searchResults);
    } else {
      setFilteredProducts([]);
    }
  };
  //when a user click on a search suggestion, it resets the search bar to an empty string and also hide the suggestion list
  const handleLinkClick = () => {
    setFilteredProducts([]);
    setProductSearch("");
  };

  return (
    <div>
      <Form>
        <Bar
          type="text"
          placeholder="Search your item"
          value={productSearch}
          onChange={handleSearch}
        />
      </Form>
      {filteredProducts.length > 0 && (
        <SuggestionList>
          {filteredProducts.map((product, index) => {
            //starting index of productSearch in the product name
            const titleIndex = product.name
              .toLowerCase()
              .indexOf(productSearch.toLowerCase());
            //slice product name starting from index 0 until the index of titleIndex
            const firstHalf = product.name.slice(0, titleIndex);

            // This is where we are getting the user's search text starting from the titleIndex until the end of the searchTerm
            const matchedText = product.name.slice(
              titleIndex,
              titleIndex + productSearch.length
            );
            // This is the remaining part of the product's name
            const secondHalf = product.name.slice(
              titleIndex + productSearch.length
            );

            return (
              <MyLink
                key={index}
                onClick={handleLinkClick}
                to={`/products/${product._id}`}
              >
                <Suggestion>
                  {firstHalf}
                  <UserPrediction>{matchedText}</UserPrediction>
                  {secondHalf}
                </Suggestion>
              </MyLink>
            );
          })}
        </SuggestionList>
      )}
    </div>
  );
};

//The input field
const Bar = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  width: 600px;
  height: 25px;
`;

//The form that wraps everything around
const Form = styled.form`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus-within {
    border-color: blue;
  }
`;

//unordered list
const SuggestionList = styled.ul`
  z-index: 10;
  position: absolute;
  width: 700px;
  background-color: white;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
`;

// list item
const Suggestion = styled.li`
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
  }
`;

// This is what the user has typed in the search bar, it will be highlighted in the product's name
const UserPrediction = styled.span`
  font-weight: bold;
  color: blue;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default SearchBar;
