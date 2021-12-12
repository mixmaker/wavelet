import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronUp,
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
      setisPlaying(false)
    }
    // console.log(e)
    // console.log(duration)
  };
  const timeFormatter = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e)=>{
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  //states
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  });
  return (
    <div className="player">
      <div className="songDetail">
        <FontAwesomeIcon className="arrow" icon={faChevronUp} />
        <img src={currentSong.image} alt="Songimg" />
        <div className="text">
          <h2>{currentSong.song}</h2>
          <h3 className="artist">{currentSong.singers}</h3>
        </div>
      </div>
      <div className="time-control">
        <p>{timeFormatter(songInfo.currentTime)}</p>
        <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler} type="range" />
        <p>{timeFormatter(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
        <FontAwesomeIcon
          className="play"
          onClick={playpauseHandler}
          icon={isPlaying ? faPause : faPlay }
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
    </div>
  );
}
