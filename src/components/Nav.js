import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faList,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../images/avatar.svg";
import { useContext } from "react";
import MainContext from "../context/MainContext";

export default function Nav() {
  const { setProgress } = useContext(MainContext);
  const pageloadingHandler = () => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100)
    }, 40);
  };
  return (
    <StyledNav>
      <div className="menu-items">
        <NavLink onClick={()=> pageloadingHandler()} to="/home" activeClassName="active">
          <div className="wrapper">
            <FontAwesomeIcon icon={faHome} />
          </div>
        </NavLink>
        <NavLink onClick={()=> pageloadingHandler()} to="/search" activeClassName="active">
          <div className="wrapper">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </NavLink>
        <NavLink onClick={()=> pageloadingHandler()} to="/playlists" activeClassName="active">
          <div className="wrapper">
            <FontAwesomeIcon icon={faList} />
          </div>
        </NavLink>
        <NavLink onClick={()=> pageloadingHandler()} to="/player" activeClassName="active">
          <div className="wrapper">
            <FontAwesomeIcon icon={faMusic} />
          </div>
        </NavLink>
      </div>
      <img src={avatar} alt="avatar" className="avatar" />
    </StyledNav>
  );
}

const StyledNav = styled.div`
  position: fixed;
  z-index: 5;
  font-family: "Comfortaa", cursive;
  background: #161616;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  .menu-items {
    position: relative;
    display: flex;
    flex-direction: column;
    width: calc(5rem-1px);

    .active {
      border-right: 1px solid #fff;
      color: #fff;
    }
    a {
      box-sizing: content-box;
      color: #acacac;
      margin: 1rem 0;
      height: 2.5rem;
      display: flex;
      width: 80px;
      align-items: center;
      justify-content: center;
      .wrapper {
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      text-decoration: none;
      font-size: 1.2rem;
      line-height: 40px;
      /* padding: 1rem 2rem; */
      transition: 0.5s;
      cursor: pointer;

      /* &:hover {
        background: #202020;
      } */
    }
  }
  .avatar {
    width: 35px;
    padding-bottom: 2rem;
  }
  /* .logo {
    padding: 3rem;
    font-size: 2.5rem;
    font-family: "Shadows Into Light", cursive;
  } */
`;
