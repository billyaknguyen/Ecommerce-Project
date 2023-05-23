import styled from "styled-components";
import { Link } from "react-router-dom";

//This is our footer
const Footer = () => {
  return (
    <FooterContainer>
      <FooterLink to="https://github.com/billyaknguyen/project-GROUP-e-commerce">
        GitHub
      </FooterLink>
      <FooterLink to="/Terms">Terms & Privacy</FooterLink>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 40px;
  gap: 30px;
  background-color: #e1e5f2;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: gray;
  }
`;

export default Footer;
