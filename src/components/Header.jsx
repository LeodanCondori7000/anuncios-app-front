import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useUserStore } from "../app/zustandStore";

const StyledHeader = styled.header`
  background-color: #74c0fc;
  width: 100%;
  // padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    height: 4rem;
    .nav-logo-link {
      text-decoration: none;
      // font-size: 24px;
      font-size: 3rem;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavMenu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: #44a8f4;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.$isToggled ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    // li {
    //   width: 100%;
    //   text-align: center;
    // }

    // .nav-menu-list {
    //   padding: 10px 0;
    //   width: 100%;
    // }
  }
`;

const Header = () => {
  const [isToggled, setIsToggled] = useState(false);

  const { user, logoutUser } = useUserStore();
  console.log(user);

  const handleToggleOpen = () => {
    setIsToggled(!isToggled);
  };

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <StyledHeader>
      <div className="nav_logo">
        <Link to={"/"} className="nav-logo-link">
          Anuncios
        </Link>
      </div>
      <NavMenu $isToggled={isToggled}>
        {user && <span>welcome,{user.name}</span>}
        {!user ? (
          <li>
            <NavLink
              className="nav-menu-list"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to="/login"
            >
              Login
            </NavLink>
          </li>
        ) : (
          <>
          
          <button onClick={logoutUser}>Logout</button>
          <li>
          <NavLink
            className="nav-menu-list"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            to="/profile"
          >
            perfil
          </NavLink>
        </li>

          </>
        )}

        <li>
          <NavLink
            className="nav-menu-list"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            to="/contact"
          >
            Contact
          </NavLink>
        </li>

        <li>
          <NavLink
            className="nav-menu-list"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            to="/about"
          >
            About
          </NavLink>
        </li>
      </NavMenu>
      <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
    </StyledHeader>
  );
};

export default Header;
