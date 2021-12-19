import React from "react";
import { getAudio } from "../api";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useContext } from "react";
import MainContext from "../context/MainContext";

export default function Songlist({
  element,
  index,
  
}) {
  console.log(element.id)
  const { decodeHTML,
    currentSong,
    setCurrentSong,
    setisPlaying,
    setProgress} =
  useContext(MainContext);

  const selectedStyle = () => {
    if (currentSong) {
      if (element.id == currentSong.id) {
        return {
          backgroundColor: "#80ffee",
        };
      }
    }
  };

  const getAudioHandler = (e) => {
    setProgress(10);
    getAudio(e.target.id).then((data) => {
      setProgress(60);
      data && setCurrentSong(data.data);
      data && setisPlaying(true);
      setProgress(100);
    });
  };
  return (
    <SongList
      onClick={getAudioHandler}
      >
      <motion.div
            id={`${element.id}`}
      style={selectedStyle()}
        className="overlay"
        initial={{ y: 150 }}
        animate={{
          y: 0,
          transition: {
            duration: 0.75,
            delay: index * 0.1,
          },
        }}
      >
        <img src={element.image} alt={decodeHTML(element.title)} className="pe" />
        <div className="info pe">
          <h2>{decodeHTML(element.title)}</h2>
          <h3>{decodeHTML(element.more_info.singers)}</h3>
        </div>
      </motion.div>
    </SongList>
  );
}

const SongList = styled(motion.div)`
  position:relative;
  margin: 1rem;
  /* padding:.5rem; */
  border-radius: 14px;
  width:100%;
  cursor:pointer;
  transition: .5s;
  overflow:hidden;
  /* &::before{
    content:'';
    display:block;
    position:absolute;
    height:100%;
    width:5px;
    background: green;
    z-index:-1;
  } */
  .overlay{
    transition:.5s;
    &:hover{
      background: #ed9de8;
    }
    .pe{
      pointer-events:none;
    }
    display:flex;
    padding:.5rem;
    .info{
      padding: 0 1rem;
    }
  }
img{
  height:80px;
  border-radius: 24px;
}
`;
