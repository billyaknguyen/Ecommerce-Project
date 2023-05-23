import styled from "styled-components";

const CategoryPictureHandler = ({ category }) => {
  if (category === "Fitness") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/1616/1616487.png" />
    );
  }
  if (category === "Lifestyle") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/4939/4939498.png" />
    );
  }
  if (category === "Medical") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/1988/1988521.png" />
    );
  }
  if (category === "Entertainment") {
    return <Icon src="https://cdn-icons-png.flaticon.com/512/864/864837.png" />;
  }
  if (category === "Industrial") {
    return <Icon src="https://cdn-icons-png.flaticon.com/512/699/699404.png" />;
  }
  if (category === "Pets and Animals") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/6462/6462524.png" />
    );
  }
  if (category === "Gaming") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/7194/7194261.png" />
    );
  }
};

const Icon = styled.img`
  width: 50px;
`;

export default CategoryPictureHandler;
