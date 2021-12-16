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
    const anim = Math.round((current / duration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercent: anim,
    });
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
    animationPercent: 0,
  });

  //styles for input slider
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercent}%)`,
  };

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
        <img src={currentSong.image} alt="Songimg" />
        <div className="text">
          <h2>{currentSong.song}</h2>
          <h3>{currentSong.singers}</h3>
        </div>
      </div>
      <div className="time-control">
        <p>{timeFormatter(songInfo.currentTime)}</p>
        <div className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
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
      h3 {
        color: #c2c2c2;
      }
    }
  }
  .time-control {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    width: 40%;
    p {
      width: 3rem;
      margin: 0 1rem;
      text-align: center;
    }
    .track {
      width: 100%;
      height: 0.75rem;
      background: #30e3ca;
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      cursor: pointer;
      input {
        width: 100%;
        -webkit-appearance: none;
        background: transparent;
        /* padding: 1rem 0; */
        &:focus {
          outline: none;
        }
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: .75rem;
        width: .75rem;
        cursor:pointer;
      }
      .animate-track {
        background: rgb(204, 204, 204);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
      }
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
