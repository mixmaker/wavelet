import React from "react";
import styled from "styled-components";
import Songlist from "./Songlist";
import { searchSong } from "../api";
import { useContext } from "react";
import MainContext from "../context/MainContext";

const Search = () => {
  const {
    inputVar,
    setInputVar,
    searchedData,
    setSearchedData,
    setProgress,
  } = useContext(MainContext);

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
    <StyledSearch>
      <input
        type="text"
        name="songname"
        onChange={getInput}
        onKeyDown={(e) => e.key === "Enter" && songInput()}
        placeholder="Search Songs Here"
      />
      <div className="list">
        {searchedData &&
          searchedData.map((element, index) => {
            return <Songlist element={element} index={index} key={element.id} />;
          })}
      </div>
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-y: visible;

  input {
    font-size: 1.3rem;
    padding: 0.5rem;
    width: 350px;
    margin-bottom: 1rem;
    transition: 0.5s;
  }
  .list {
    width: 100%;
  }
`;

export default Search;
