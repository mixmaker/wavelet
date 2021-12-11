import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/wavelet_logo.png";
import { searchSong } from "../api";

export default function Nav({
  inputVar,
  setInputVar,
  setSearchedData,
}) {
  const getInput = (e) => {
    setInputVar(e.target.value);
  };
  const songInput = async() => {
    // setSongName(inputVar);
    // console.log(songName)
    let data = await searchSong(inputVar)
    // console.log(data)
    setSearchedData(data);
  };

  return (
    <div className="nav">
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
          onKeyDown={e => e.key === 'Enter' && songInput()}
        />
        <div className="icon">
          <FontAwesomeIcon icon={faSearch} onClick={songInput} />
        </div>
      </div>
    </div>
  );
}
