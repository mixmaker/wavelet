import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useContext } from "react";
import MainContext from "../context/MainContext";
// import { makeMediaurl } from "../api";
// import ColorThief from "colorthief";

export default function Player() {
  //contexts
  const {
    decodeHTML,
    currentSong,
    isPlaying,
    setisPlaying,
    playlist,
    setProgress,
    setCurrentSong,
    songInfo,
    setSongInfo,
    decryptByDES,
  } = useContext(MainContext);

  //refs
  const audioRef = useRef(null);
  const imgRef = useRef(null);
  //event handlers
  const playpauseHandler = () => {
    if (isPlaying) {
      setisPlaying(!isPlaying);
      fadeInOut("pause");
    } else {
      setisPlaying(!isPlaying);
      fadeInOut("play");
    }
  };
  //get the index in playlist of which song is playing
  let currentIndex = playlist.findIndex((id) => currentSong.id === id.id);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const anim = (current / duration) * 100;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercent: anim,
    });

    //go to next song when song is completed playing (if exists in playlist)
    if (current === duration && !playlist[currentIndex + 1]) {
      setisPlaying(false);
    }
    if (current === duration && playlist[currentIndex + 1]) {
      setCurrentSong(playlist[currentIndex + 1]);
    }
  };
  const timeFormatter = (time) => {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipsongHandler = (direction) => {
    if (direction === "skip-forward") {
      setCurrentSong(playlist[currentIndex + 1]);
      setProgress(60);
      setisPlaying(true);
      setProgress(100);
    }
    if (direction === "skip-back") {
      setCurrentSong(playlist[currentIndex - 1]);
      setProgress(60);
      setisPlaying(true);
      setProgress(100);
    }
  };
  //styles for input slider
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercent}%)`,
  };

  //prevent clicking again when smooth fading
  const [cursorstate, setCursorstate] = useState({ cursor: "pointer" });
  //smoothfade on play pause
  const fadeInOut = (direction) => {
    var newvol;
    setCursorstate({ pointerEvents: "none" });
    if (direction === "pause") {
      var pauseInt = setInterval(() => {
        // if (vol > 0) {
        newvol = audioRef.current.volume;
        newvol -= 0.1;
        audioRef.current.volume = Math.round(newvol * 10) / 10;
        // }
        if (audioRef.current.volume === 0) {
          clearInterval(pauseInt);
          audioRef.current.pause();
          setCursorstate({ cursor: "pointer" });
        }
      }, 100);
    }
    if (direction === "play") {
      audioRef.current.volume = 0;
      newvol = 0;
      audioRef.current.play();
      var playInt = setInterval(() => {
        // if (vol > 0) {
        newvol += 0.1;
        audioRef.current.volume = Math.round(newvol * 10) / 10;
        // }
        if (audioRef.current.volume === 1) {
          clearInterval(playInt);
          setCursorstate({ cursor: "pointer" });
        }
      }, 100);
    }
  };
  return (
    <StyledPlayer
      initial={{ y: 100 }}
      animate={{ y: 0, transition: { duration: 0.5 } }}
      className="left"
    >
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
      <div className="box">
        <div className="songDetail">
          <img
            // crossOrigin={"anonymous"}
            src={currentSong.image}
            ref={imgRef}
            alt="Songimg"
            // onLoad={() => {
            //   const colorThief = new ColorThief();
            //   const img = imgRef.current;
            //   console.log(img);
            //   const result = colorThief.getColor(img, 25);
            //   console.log(result);
            // }}
          />
          <div className="text">
            <h2>{decodeHTML(currentSong.title)}</h2>
            <h3 className="artist">
              {decodeHTML(
                currentSong.more_info.artistMap.primary_artists.map(
                  (element) => " " + element.name
                )
              )}
            </h3>
          </div>
        </div>
        <div className="time">
          <p>{timeFormatter(songInfo.currentTime)}</p>/
          <p>{timeFormatter(songInfo.duration)}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon
            onClick={() => skipsongHandler("skip-back")}
            className="skip-back"
            icon={faAngleLeft}
          />
          <FontAwesomeIcon
            className="play"
            onClick={playpauseHandler}
            style={cursorstate}
            icon={isPlaying ? faPause : faPlay}
          />
          <FontAwesomeIcon
            onClick={() => skipsongHandler("skip-forward")}
            className="skip-forward"
            icon={faAngleRight}
          />
        </div>
        <audio
          ref={audioRef}
          onLoadedMetadata={timeUpdateHandler}
          src={decryptByDES(currentSong.more_info.encrypted_media_url)}
          autoPlay
          onTimeUpdate={timeUpdateHandler}
        ></audio>
      </div>
    </StyledPlayer>
  );
}

const StyledPlayer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  z-index: 100;
  .track {
    width: 100%;
    input {
      position: relative;
      top: 0;
      width: 100%;
      /* -webkit-appearance: none; */
      height: 2px;
    }
    /* input[type="range"]:focus {
      outline: none;
    } */
    /* input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 2px;
      width: 2px;
      background-color: black;
    } */
  }
  .box {
    position: relative;
    padding: 1rem 0;
    background: linear-gradient(
      160deg,
      #241e3a 7.94%,
      #181138 17.77%,
      #020112 49.48%
    );
    display: flex;
    justify-content: space-around;
    align-items: center;

    .songDetail {
      display: flex;
      width: max-content;
      img {
        padding-right: 1rem;
        height: 70px;
      }
    }

    .time {
      display: flex;
      font-size: 1.1rem;
    }

    .play-control {
      display: flex;
      width: 30%;
      justify-content: space-around;
      font-size: 1.4rem;
      .skip-back,
      .skip-forward {
        cursor: pointer;
      }
    }
  }
  .track {
    width: 100%;
    height: 0.25rem;
    background: #30e3ca;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: pointer;
      top: 0;
      -webkit-appearance: none;
      background: transparent;
      &:focus {
        outline: none;
      }
    }
    input[type="range"]::-moz-range-thumb {
      -webkit-appearance: none;
      height: 1rem;
      width: 1rem;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 1rem;
      width: 1rem;
    }
    .animate-track {
      background: rgb(107, 107, 107);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }
  }
`;
