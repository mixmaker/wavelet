import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/wavelet_logo.png";
import { searchSong } from "../api";
import styled from "styled-components";
export default function Nav({
  inputVar,
  setInputVar,
  setSearchedData,
  setProgress,
}) {
  const getInput = (e) => {
    setInputVar(e.target.value);
  };
  const songInput = async () => {
    // setSongName(inputVar);
    // console.log(songName)
    setProgress(10);
    let data = await searchSong(inputVar);
    setProgress(60);
    // console.log(data)
    setSearchedData(data);
    setProgress(100);
  };

  return (
    <StyledNav className="nav">
      <div className="logo">
        <img src={logo} alt="Wavelet Music" />
      </div>
      <div className="search">
        <input
          type="text"
          name="search"
          id="searchBar"
          placeholder="Search Songs Here"
          onChange={getInput}
          onKeyDown={(e) => e.key === "Enter" && songInput()}
        />
        <div className="icon">
          <FontAwesomeIcon icon={faSearch} onClick={songInput} />
        </div>
      </div>
    </StyledNav>
  );
}

const StyledNav = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(44, 44, 44);
  .logo img {
    height: 80px;
  }
  .search {
    position: relative;
    display: flex;
    // justify-content: center;
    align-items: center;
    background-color: transparent;
    width: 400px;
    // border: 2px solid blue;
    // border-radius: 14px;
    border-bottom: 2px solid #817f7f;
    #searchBar {
      width: 90%;
      color: #cacaca;
      font-size: 1rem;
      padding: 0 0.5rem 0.25rem 0.5rem;
      letter-spacing: 2px;
      background: transparent;
      border: none;
      outline: none;
    }
  }

  .icon {
    padding: 0 0.5rem 0 0.5rem;
    color: #fff;
    cursor: pointer;
  }
`;
