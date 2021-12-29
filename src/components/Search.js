import React from "react";
import styled from "styled-components";
import Songlist from "./Songlist";
import { useContext } from "react";
import MainContext from "../context/MainContext";
import { motion } from "framer-motion";
import { getResponse } from "../api";
import { searchResultsURL } from "../api/base";

const Search = () => {
  //import contexts
  const { inputVar, setInputVar, searchedData, setSearchedData, setProgress } =
    useContext(MainContext);

  const getInput = (e) => {
    setInputVar(e.target.value);
  };
  const songInput = () => {
    setProgress(10);
    getResponse(
      searchResultsURL(inputVar),
      (data) => {
        console.log(data);
        setProgress(60);
        setSearchedData(data.results);
        setProgress(100);
      },
      (err) => alert(err)
    );
  };

  return (
    <StyledSearch className="left">
      <div className="overlaya">
        <input
          type="text"
          name="songname"
          onChange={getInput}
          onKeyDown={(e) => e.key === "Enter" && songInput()}
          placeholder="Search Songs Here"
        />
      </div>
      <motion.div className="list">
        {searchedData &&
          searchedData.map((element, index) => {
            return (
              <Songlist element={element} index={index} key={element.id} />
            );
          })}
      </motion.div>
    </StyledSearch>
  );
};

const StyledSearch = styled(motion.div)`
  margin: 2rem 5rem;
  padding-bottom: 8rem;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  input {
    font-size: 1.3rem;
    padding: 0.5rem;
    width: 350px;
    margin-bottom: 1rem;
    transition: 0.5s;
  }
  .list {
    width: 70%;
  }
`;

export default Search;
