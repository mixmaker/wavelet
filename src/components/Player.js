import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronUp,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Player({ currentSong, isPlaying, setisPlaying }) {
  //refs
  const audioRef = useRef(null);
  //event handlers
  const playpauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setisPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
    if (current === duration) {
      setisPlaying(false);
    }
    // console.log(e)
    // console.log(duration)
  };
  const timeFormatter = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //states
  const [songInfo, setSongInfo] = useState({
    currentTime: "0:00",
    duration: "0:00",
  });
  return (
    <StyledPlayer
      initial={{
        y: 100,
      }}
      animate={{
        y: 0,
        transition: {
          duration: 0.5,
        },
      }}
    >
      <div className="songDetail">
        <motion.img src={currentSong.image} alt="Songimg" />
        <div className="text">
          <motion.h2>{currentSong.song}</motion.h2>
          <h3 className="artist">{currentSong.singers}</h3>
        </div>
      </div>
      <div className="time-control">
        <p>{timeFormatter(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{timeFormatter(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
        <FontAwesomeIcon
          className="play"
          onClick={playpauseHandler}
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon className="skip-forward" icon={faAngleRight} />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.media_url}
        autoPlay
        onTimeUpdate={timeUpdateHandler}
      ></audio>
    </StyledPlayer>
  );
}

const StyledPlayer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0.75rem 5rem;
  background: #292727;
  color: white;
  width: 100%;
  .songDetail {
    display: flex;
    /* padding: 0 5rem; */
    /* justify-content: space-evenly; */
    align-items: center;

    width: 40%;

    img {
      height: 70px;
    }
    .text {
      padding: 0 2rem;
    }
  }
  .time-control {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    p {
      padding: 0 1rem;
    }
    input {
      width: 100%;
    }
  }
  .play-control {
    width: 30%;
    align-items: center;
    display: flex;
    justify-content: space-around;
    font-size: 1.5rem;

    .play {
      cursor: pointer;
    }
  }
`;
