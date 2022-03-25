import React from "react";
import styled from "styled-components";
import Songlist from "../components/Songlist";
import useAppContext from "../context/useAppContext";
import { motion } from "framer-motion";
import { getResponse } from "../api";
import { searchResultsURL } from "../api/base";
import LazyLoad from "react-lazyload";
// import TextField from "@mui/material/TextField";

const Search = () => {
  document.title = "Wavelet | Search";

  //import contexts
  const { inputVar, setInputVar, searchedData, setSearchedData, setProgress } =
    useAppContext();

  const getInput = (e) => {
    setInputVar(e.target.value);
  };
  const songInput = () => {
    setProgress(10);
    const apiUrl = searchResultsURL(inputVar);
    const run = async () => {
      try {
        const data = await getResponse(apiUrl);
        setProgress(60);
        setSearchedData(data.results);
        setProgress(100);
      } catch (error) {
        alert(error);
      }
    };
    run();
    // getResponse(
    //   searchResultsURL(inputVar),
    //   (data) => {
    //     // console.log(data);
    //     setProgress(60);
    //     setSearchedData(data.results);
    //     setProgress(100);
    //   },
    //   (err) => alert(err)
    // );
  };

  //HOVER EFFECT
  // let item;
  // let marker;
  // const indicator = (e) => {
  //   marker.style.top = e.offsetTop + "px";
  //   marker.style.width = e.offsetWidth + "px";
  // };
  // const getelements = () => {
  //   item = document.querySelectorAll(".list li");
  //   marker = document.querySelector("#marker");
  // };
  // const main = () => {
  //   if (item === undefined || marker === undefined) {
  //     getelements();
  //   }
  //   if (item !== undefined && marker !== undefined) {
  //     item.forEach((link) => {
  //       link.addEventListener("mouseover", (e) => {
  //         if (link === e.target) {
  //           indicator(e.target);
  //         }
  //       });
  //     });
  //   }
  // };

  return (
    <StyledSearch>
      <div className="inputdiv">
        <input
          type="text"
          name="songname"
          onChange={getInput}
          value={inputVar}
          placeholder=" "
          onKeyDown={(e) => e.key === "Enter" && songInput()}
        />
        <label htmlFor="songname" className="content">
          <span className="contenttext">Search songs</span>
        </label>
      </div>
      {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
      <ul className="list">
        {searchedData &&
          searchedData.map((element, index) => {
            return (
              <LazyLoad offset={100}>
                <li key={element.id}>
                  <Songlist element={element} index={index} key={element.id} />
                </li>
              </LazyLoad>
            );
          })}
      </ul>
    </StyledSearch>
  );
};

const StyledSearch = styled(motion.div)`
  margin: 1rem 0 0 10%;
  width: 70%;
  /* overflow-x: hidden; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  .inputdiv {
    position: relative;
    margin: 1rem 0 2rem 1rem;
    width: max(28%, 300px);
    height: 4rem;
    overflow: hidden;

    input {
      position: relative;
      font-size: 1.1rem;
      padding: 2rem 0 0 0.25rem;
      width: 100%;
      height: 100%;
      background: transparent;
      outline: none;
      border: none;
      color: #d7f1ee;
      transition: 0.5s;
    }

    .content {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 1.3rem;
      width: 100%;
      height: 100%;
      pointer-events: none;
      border-bottom: 2px solid #fff;

      &::after {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        bottom: -2px;
        border-bottom: 3px solid #ee6c4d;
        transition: 0.5s ease;
        transform: translateX(-100%);
      }

      .contenttext {
        position: absolute;
        font-size: 1.5rem;
        left: 0;
        transition: 0.5s ease;
      }
    }
  }
  .inputdiv input:placeholder-shown + .content .contenttext {
    transform: translate(10%, 80%);
  }
  .inputdiv input:placeholder-shown + .content::after {
    transform: translateX(-100%);
  }

  .inputdiv input:focus + .content .contenttext,
  .inputdiv input:focus + .content::after {
    color: #a497d1;
    transform: translate(0%, 0%);
  }

  .list {
    position: relative;
    li {
      position: relative;
      list-style: none;
    }
  }
`;

export default Search;
