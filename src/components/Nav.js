import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/wavelet_logo.png";
import { searchSong } from "../api";

export default function Nav({
  inputVar,
  setInputVar,
  setSearchedData,
  setProgress
}) {
  const getInput = (e) => {
    setInputVar(e.target.value);
  };
  const songInput = async() => {
    // setSongName(inputVar);
    // console.log(songName)
    setProgress(10)
    let data = await searchSong(inputVar)
    setProgress(60)
    // console.log(data)
    setSearchedData(data);
    setProgress(100)
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
