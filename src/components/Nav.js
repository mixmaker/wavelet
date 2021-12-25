import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faList, faMusic } from "@fortawesome/free-solid-svg-icons";

export default function Nav(
  {
    // inputVar,
    // // setInputVar,
    // setSearchedData,
    // setProgress,
  }
) {
  return (
    <>
    <StyledNav>
        <div className="menu-items">
          <NavLink to="/" activeClassName="active">
            <FontAwesomeIcon icon={faHome} />
            
          </NavLink>
          <NavLink to="/search" activeClassName="active">
          <FontAwesomeIcon icon={faSearch} />
          </NavLink>
          <NavLink to="/playlists" activeClassName="active">
          <FontAwesomeIcon icon={faList} />
          </NavLink>
          <NavLink to="/player" activeClassName="active">
          <FontAwesomeIcon icon={faMusic} />
          </NavLink>
        </div>
    </StyledNav>
    <h1 className="logo">Wavelet</h1>
    </>
  );
}

const StyledNav = styled.div`
  position: relative;
  /* width: 300px; */
  font-family: "Comfortaa", cursive;
  background: #1ffff4;
  height: 100vh;
  svg{
    margin-right:.5rem;
  }
  .active {
    padding-left: 1rem;
    border-left: 4px solid black;
    background: #d0fffddd;
  }
  .menu-items {
    width: 100%;
    display: flex;
    flex-direction: column;
    a {
      text-decoration: none;
      font-size: 1.2rem;
      line-height: 40px;
      padding: 1rem 2rem;
      transition: background 0.5s, border-left 0.3s ease;
      cursor: pointer;

      &:hover {
        background: #affaf6;
      }
    }
  }
  .logo {
    padding: 3rem;
    font-size: 2.5rem;
    font-family: "Shadows Into Light", cursive;
  }
`;
