import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
      <h1 className="logo">Wavelet</h1>
      <div className="menu-items">
        <NavLink to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/search" activeClassName="active">
          Search
        </NavLink>
        <NavLink to="/playlists" activeClassName="active">
          My Playlists
        </NavLink>
        <NavLink to="/player" activeClassName="active">
          Now Playing
        </NavLink>
      </div>
    </StyledNav>
  );
}

const StyledNav = styled.div`
  position: relative;
  width: max-content;
  height: 100vh;
  background: #1ffff4;
  .active {
    padding-left: 1rem;
    border-left: 4px solid black;
    background: #d0fffddd;
  }
  .logo {
    padding: 3rem;
    font-size: 2.5rem;
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
