import React from "react";
import { getAudio } from "../api";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Songlist({
  element,
  index,
  decodeHTML,
  currentSong,
  setCurrentSong,
  setisPlaying,
  setProgress,
}) {
const selectedStyle =()=> {
  if (element.id == currentSong.id) {
    return {
      backgroundColor: "#80ffee",
    }
  }
}

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
    <SongList id={`${element.id}`} onClick={getAudioHandler} style={selectedStyle()}>
      <motion.div
        className="overlay"
        initial={{ y: 150 }}
        animate={{
          y: 0,
          transition: {
            duration: .75,
            delay: index * 0.1,
          },
        }}
      >
        <img src={element.image} alt="" />
        <div className="info">
          <h2>{decodeHTML(element.title)}</h2>
          <h3>{decodeHTML(element.more_info.singers)}</h3>
        </div>
      </motion.div>
    </SongList>
  );
}

const SongList = styled(motion.div)`
  position: relative;
  padding: 1rem 5rem;
  cursor: pointer;
  display: flex;
  overflow-y: hidden;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ccfff8;
  }
  .overlay{
    display: flex;
    height:max-content;
    pointer-events:none;
  }
    img {
      position: relative;
      height: 90px;
      margin-right: 1rem;
    }

    .info {
      background: transparent;
    }

  }
`;
