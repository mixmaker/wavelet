import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import avatar from "../images/avatar.svg";
import { useContext } from "react";
import MainContext from "../context/MainContext";
// import { Badge } from "@mui/material";

export default function Nav() {
  const { setProgress } = useContext(MainContext);
  const pageloadingHandler = () => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 40);
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const applocation = useLocation();
  const darkenBg = {
    background: "rgba(0, 0, 0, 0.521)",
  };
  return applocation.pathname !== "/" ? (
    <StyledNav
      style={isExpanded ? darkenBg : {}}
      onMouseOver={() => setIsExpanded(true)}
      onMouseOut={() => setIsExpanded(false)}
    >
      <div className={isExpanded ? "nav expanded" : "nav"}>
        {/* <div className="nav expanded"> */}
        <div className="menu-items">
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            onClick={pageloadingHandler}
            to="/home"
          >
            <div className="navwrapper">
              <HomeIcon />
              <span>Home</span>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            onClick={pageloadingHandler}
            to="/search"
          >
            <div className="navwrapper">
              <SearchIcon />
              <span>Search</span>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            onClick={pageloadingHandler}
            to="/playlists"
          >
            <div className="navwrapper">
              <PlaylistPlayIcon />
              <span>Playlist</span>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? " active" : "")}
            onClick={pageloadingHandler}
            to="/player"
          >
            <div className="navwrapper">
              <AudiotrackIcon />
              <span>Now Playing</span>
            </div>
          </NavLink>
        </div>
        <div className="credits">
          <img src={avatar} alt="avatar" className="avatar" />
          {/* <span>About Me</span> */}
        </div>
      </div>
    </StyledNav>
  ) : (
    ""
  );
}

const StyledNav = styled.div`
  position: absolute;
  z-index: 999;
  pointer-events: none;
  transition: 0.5s;
  width: 100%;
  height: 100vh;
  .nav {
    position: fixed;
    pointer-events: auto;
    z-index: 1000;
    font-family: "Comfortaa", cursive;
    background: #1a1a1a97;
    /* background: linear-gradient(
      135deg,
      rgba(119, 119, 119, 0.1),
      rgba(78, 78, 78, 0.2)
    ); */
    margin: 0.5rem;
    padding: 1.5rem 2rem;
    height: 98%;
    /* width: 100%; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: flex-start; */
    /* box-sizing: content-box; */
    /* text-align: center; */
    overflow: hidden;
    backdrop-filter: blur(20px);
    .menu-items {
      position: relative;
      display: flex;
      flex-direction: column;
      width: max-content;

      .active {
        /* border-right: 1px solid #fff; */
        filter: drop-shadow(1px 2px 4px rgb(202, 156, 233));
        -webkit-filter: drop-shadow(1px 2px 4px rgb(202, 156, 233));
        color: #fff;
      }
      a {
        box-sizing: content-box;
        color: #919191;
        margin: 1rem 0;
        height: 2.5rem;
        display: flex;
        /* width: 80px; */
        align-items: center;
        justify-content: center;
        .navwrapper {
          position: relative;
          cursor: pointer;
          display: flex;
          width: 2rem;
          /* justify-content: center; */
          align-items: center;
          text-align: left;
          transition: 0.2s;
          span {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translateX(80px) rotate(5deg);
            /* opacity: 0; */
            padding-left: 0.5rem;
            transition: 0.5s;
            white-space: nowrap;
          }
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
      /* padding-bottom: 2rem; */
    }
    /* .logo {
    padding: 3rem;
    font-size: 2.5rem;
    font-family: "Shadows Into Light", cursive;
  } */
  }
  .expanded .menu-items a .navwrapper {
    width: 10rem;
  }
  .expanded .menu-items a .navwrapper span {
    transform: translateX(0) rotate(0deg);
  }
`;
