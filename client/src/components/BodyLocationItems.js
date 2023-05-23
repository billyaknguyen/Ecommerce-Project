import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Spinner , WrapperSpinner } from "./Spinner";

import PageResult from "./PageResult";

//getting all items related to that category
const BodyItems = () => {
  const { body } = useParams();
  const [items, setItems] = useState([]);

  //fetching items from a certain category
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(`/bodylocations/${body}`);
        const resData = await response.json();
        setItems(resData.data);
      } catch (error) {
        console.log("error");
      }
    };

    getItems();
  }, [body]);
  

  return (
    <>
      {items.length === 0 ? (
        <WrapperSpinner>
        <Spinner />
      </WrapperSpinner>
      ) : (
        <>
        <LinkSection>
        <HomeLink to={"/"}>Home</HomeLink>
        <Dot>·</Dot>
        <Category> Category</Category>
        </LinkSection>
        <PageResult query={body} items={items}/>
        </>
      )}
    </>
  );
};



const LinkSection = styled.div`
width: 8%;
padding-top: 30px;
margin: auto;
display: flex;
justify-content: space-between;
margin-bottom: 40px;
`

const Dot = styled.div`
color:#6d6875;
font-size: 15px;
font-weight: 700;
`

const HomeLink = styled(Link)`
text-decoration: none;
color: lightgray;
&:hover{
  color: #6d6875;
}
`;

const Category = styled.span`
color: #6d6875;
`



export default BodyItems;
