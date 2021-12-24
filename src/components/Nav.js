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
    <StyledNav>
      <div className="wrapper">
        <h1 className="logo">Wavelet</h1>
        <div className="menu-items">
          <NavLink to="/" activeClassName="active">
            <FontAwesomeIcon icon={faHome} />
            Home
          </NavLink>
          <NavLink to="/search" activeClassName="active">
          <FontAwesomeIcon icon={faSearch} />Search
          </NavLink>
          <NavLink to="/playlists" activeClassName="active">
          <FontAwesomeIcon icon={faList} />My Playlists
          </NavLink>
          <NavLink to="/player" activeClassName="active">
          <FontAwesomeIcon icon={faMusic} />Now Playing
          </NavLink>
        </div>
      </div>
    </StyledNav>
  );
}

const StyledNav = styled.div`
  position: relative;
  width: 300px;
  font-family: "Comfortaa", cursive;
  svg{
    margin-right:.5rem;
  }
  .wrapper {
    height: 100vh;
    background: #1ffff4;
    position: fixed;
  }
  .active {
    padding-left: 1rem;
    border-left: 4px solid black;
    background: #d0fffddd;
  }
  .logo {
    padding: 3rem;
    font-size: 2.5rem;
    font-family: "Shadows Into Light", cursive;
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
`;
