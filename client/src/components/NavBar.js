import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Logo from "../assets/EM.svg";
import { FaShoppingCart } from "react-icons/fa";
import { GoSearch, GoX } from "react-icons/go";
import { useContext, useState } from "react";
import { ProductContext } from "./ProductsContext";
import { LoginButton } from "./auth0/Login-button";
import { LogoutButton } from "./auth0/Logout-button";
import { useAuth0 } from "@auth0/auth0-react";

// This is the Navigation Bar
const NavBar = () => {
  const [isSearch, setIsSearch] = useState(false);

  const { cartCount } = useContext(ProductContext);
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <Nav>
        <SearchIcon>
          {!isSearch ? (
            <GoSearch onClick={() => setIsSearch(true)} />
          ) : (
            <GoX onClick={() => setIsSearch(false)} />
          )}
        </SearchIcon>
        <MyLink to="/">
          <LogoImage src={Logo} alt="logo" />{" "}
        </MyLink>

        <LinksContainer>
          <ProfileWrapper>
            {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
          </ProfileWrapper>
          <MyLink to="cart">
            {cartCount > 0 && (
              <Counter>
                <CartNumber>{cartCount}</CartNumber>
              </Counter>
            )}
            <FaShoppingCart />
          </MyLink>
        </LinksContainer>
      </Nav>
      {isSearch && (
        <SearchSection>
          <SearchBar />
        </SearchSection>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: white;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #e1e5f2;
`;

const MyLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 24px;
  position: relative;
`;

const LinksContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  gap: 20px;
`;

const ProfileWrapper = styled.div``;
const LogoImage = styled.img`
  width: 100px;
  height: 100px;
`;

const SearchIcon = styled.div`
  font-size: 24px;
  margin-left: 40px;

  &:hover {
    cursor: pointer;
  }
`;
const Counter = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 50%;
  background-color: #336dbf;
  color: white;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartNumber = styled.div`
  font-size: 20px;
`;

export default NavBar;
