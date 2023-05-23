import styled from "styled-components";

const BodyLocationIconHandler = ({ body }) => {
  if (body === "Waist") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/3937/3937430.png" />
    );
  }
  if (body === "Arms") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/6589/6589940.png" />
    );
  }
  if (body === "Wrist") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/4029/4029440.png" />
    );
  }
  if (body === "Hands") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/2165/2165693.png" />
    );
  }
  if (body === "Chest") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/2166/2166997.png" />
    );
  }
  if (body === "Head") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/6669/6669489.png" />
    );
  }
  if (body === "Feet") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/8315/8315352.png" />
    );
  }
  if (body === "Neck") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/5021/5021069.png" />
    );
  }
  if (body === "Torso") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/6016/6016674.png" />
    );
  }
  if (body === "Gaming") {
    return (
      <Icon src="https://cdn-icons-png.flaticon.com/512/7194/7194261.png" />
    );
  }
};

const Icon = styled.img`
  width: 50px;
`;

export default BodyLocationIconHandler;
