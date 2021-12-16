import React from "react";
import { getAudio } from "../api";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Songlist({
  element,
  decodeHTML,
  setCurrentSong,
  setisPlaying,
  setProgress,
}) {
  const getAudioHandler = (e) => {
    setProgress(10);
    getAudio(e.target.id).then((data) => {
      setProgress(60);
      // data && console.log(data.data);
      data && setCurrentSong(data.data);
      data && setisPlaying(true);
      setProgress(100);
    });
  };
  return (
    <SongList id={`${element.id}`} onClick={getAudioHandler}>
      <motion.div
        className="overlay"
        initial={{ y: 200 }}
        animate={{
          y: 0,
          transition: {
            duration: 0.5,
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
  padding: 2rem 5rem;
  cursor: pointer;
  display: flex;
  overflow-y: hidden;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ccfff8;
  }
  .overlay{
    display: flex;
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
