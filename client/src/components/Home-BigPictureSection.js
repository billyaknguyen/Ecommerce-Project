import { useState } from "react";
import styled from "styled-components";
import { BigPicture } from "./IconHandlers/BigPictureHandler";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

//Function to make the Image slider on the homepage.
const BigPictureSection = () => {
  const [currentPic, setCurrentPic] = useState(0);
  const length = BigPicture.length;

  const nextPicture = () => {
    setCurrentPic(currentPic === length - 1 ? 0 : currentPic + 1);
  };

  const prevPicture = () => {
    setCurrentPic(currentPic === 0 ? length - 1 : currentPic - 1);
  };

  return (
    <Slider>
      <Left onClick={prevPicture}>
        <AiOutlineLeft />
      </Left>
      {BigPicture.map((picture, index) => {
        return (
          <Wrapper key={index}>
            <TextSection>
              {index === currentPic && <Text>{picture.text}</Text>}
              {index === currentPic && (
                <ShopLink to={picture.link}>Shop now</ShopLink>
              )}
            </TextSection>

            {index === currentPic ? (
              <PictureSection active={true}>
                {index === currentPic && (
                  <Picture src={picture.image} alt="BigProductImg" />
                )}
              </PictureSection>
            ) : (
              <PictureSection active={false}>
                {index === currentPic && (
                  <Picture src={picture.image} alt="BigProductImg" />
                )}
              </PictureSection>
            )}
          </Wrapper>
        );
      })}

      <Right onClick={nextPicture}>
        <AiOutlineRight />
      </Right>
    </Slider>
  );
};

const Slider = styled.section`
  margin: 50px 0px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div``;
const PictureSection = styled.div`
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition-duration: 1s;
  transform: ${(props) => props.active && "scale(1)"};
`;
const Picture = styled.img`
  width: 100%;
  height: 700px;
  border-radius: 30px;
`;
const Left = styled.button`
  background: none;
  font-size: 30px;
  border: none;
  padding: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const Right = styled.button`
  background: none;
  font-size: 30px;
  border: none;
  padding: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const TextSection = styled.span`
  position: absolute;
  top: 42%;
  left: 22%;
  color: #e0e1dd;
  z-index: 1;
  font-size: 30px;
  display: flex;
  flex-direction: column;
`;
const Text = styled.p`
  font-weight: bold;
  color: #fefae0;
  text-shadow: 3px 3px 0px #936639;
`;
const ShopLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 26px;
  border: 1px solid white;
  width: 150px;
  text-align: center;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  &:hover {
    cursor: pointer;
    background-color: #fefae0;
    color: black;
  }
`;
export default BigPictureSection;
