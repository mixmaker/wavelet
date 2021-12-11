import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Player({ currentSong, isPlaying, setisPlaying }) {
  //refs
  const audioRef = useRef(null);
  //event handlers
  const playpauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying)
    } else {
      audioRef.current.play();
      setisPlaying(!isPlaying)
    }
  };

  //states


  return (
    <div className="player">
      <div className="songDetail">
        <img src={currentSong.image} alt="Songimg" />
        <div className="text">
          <h2>{currentSong.song}</h2>
          <h3 className="artist">{currentSong.singers}</h3>
        </div>
      </div>
      <div className="time-control">
        <p>Start time</p>
        <input type="range" name="" id="" />
        <p>End time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
        <FontAwesomeIcon className="play" onClick={playpauseHandler} icon={isPlaying?faPause :faPlay} />
        <FontAwesomeIcon className="skip-forward" icon={faAngleRight} />
      </div>
        <audio
          ref={audioRef}
          src={currentSong.media_url}
          autoPlay
        ></audio>
    </div>
  );
}
