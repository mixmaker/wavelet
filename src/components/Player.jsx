import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useAppContext from "../context/useAppContext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import axios from "axios";
import { usePalette } from "react-palette";

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
  } = useAppContext();

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
      setProgress(40);
      if (playlist.length !== 1) {
        if (currentIndex < playlist.length - 1) {
          setCurrentSong(playlist[currentIndex + 1]);
          setisPlaying(true);
        }
        if (currentIndex === playlist.length - 1) {
          setCurrentSong(playlist[0]);
          setisPlaying(true);
        }
        setProgress(100);
      } else {
        setCurrentSong(null);
        setTimeout(() => {
          setProgress(100);
          setCurrentSong(playlist[0]);
          setisPlaying(true);
        }, 50);
      }
    }
    if (direction === "skip-back") {
      setProgress(40);
      if (playlist.length !== 1) {
        if (currentIndex > 0) {
          setCurrentSong(playlist[currentIndex - 1]);
          setisPlaying(true);
        }
        if (currentIndex === 0) {
          setCurrentSong(playlist[playlist.length - 1]);
          setisPlaying(true);
        }
        setProgress(100);
      } else {
        setCurrentSong(null);
        setTimeout(() => {
          setProgress(100);
          setCurrentSong(playlist[0]);
          setisPlaying(true);
        }, 50);
      }
    }
  };
  //styles for input slider
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercent}%)`,
  };

  //prevent clicking play/pause again when smooth fading
  const [cursorstate, setCursorstate] = useState({ cursor: "pointer" });
  //smoothfade on play pause
  const fadeInOut = (direction) => {
    var newvol;
    setCursorstate({ pointerEvents: "none" });
    if (direction === "pause") {
      newvol = audioRef.current.volume;
      var pauseInt = setInterval(() => {
        if (newvol > 0) {
          newvol = audioRef.current.volume;
          newvol -= 0.1;
          audioRef.current.volume = Math.round(newvol * 10) / 10;
        }
        if (audioRef.current.volume === 0) {
          clearInterval(pauseInt);
          audioRef.current.pause();
          audioRef.current.volume = 1;
          setCursorstate({ cursor: "pointer" });
        }
      }, 100);
    }
    if (direction === "play") {
      audioRef.current.volume = 0;
      newvol = 0;
      audioRef.current.play();
      var playInt = setInterval(() => {
        if (newvol < 1) {
          newvol += 0.1;
          audioRef.current.volume = Math.round(newvol * 10) / 10;
        }
        if (audioRef.current.volume === 1) {
          clearInterval(playInt);
          setCursorstate({ cursor: "pointer" });
        }
      }, 100);
    }
  };
  //get img uri b4 playing any song
  useEffect(() => {
    const getEncodedUri = async (imgurl) => {
      const { data } = await axios.get(
        `https://wavelet-backend.vercel.app/api/getdatauri?imgurl=${encodeURIComponent(
          imgurl
        )}`
      );
      setCurrentSong({ ...currentSong, image: data.uri });
    };
    if (currentSong.image.split(":")[0] !== "data") {
      getEncodedUri(currentSong.image);
    }
  }, [currentSong, setCurrentSong]);

  const playerRef = useRef(null);
  const boxRef = useRef(null);

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 100) {
      playerRef.current.style.cssText =
        " bottom: -100px; margin: 0; left:0; width:99vw;";
    } else {
      playerRef.current.style.cssText =
        " bottom: 0; margin: 0.5rem; width:90%;";
    }
    prevScrollpos = currentScrollPos;
  };
  const { data } = usePalette(currentSong.image);
  if (data.darkMuted !== songInfo.bgColor) {
    setSongInfo({ ...songInfo, bgColor: data.darkMuted });
  }
  if (data.lightMuted !== songInfo.seekColor) {
    setSongInfo({ ...songInfo, seekColor: data.lightMuted });
  }
  return (
    <StyledPlayer
      initial={{ y: "120%" }}
      animate={{ y: 0, transition: { duration: 0.5, ease: "easeIn" } }}
      ref={playerRef}
      theme={{
        bgColor: songInfo.bgColor,
        seekColor: songInfo.seekColor,
      }}
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
      <div className="box" ref={boxRef}>
        <div className="songDetail">
          <img
            // crossOrigin={"anonymous"}
            src={currentSong.image}
            ref={imgRef}
            alt="Songimg"
            // onLoad={getColorHandler}
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
          <KeyboardDoubleArrowLeftOutlinedIcon
            onClick={() => skipsongHandler("skip-back")}
            className="skip-back"
          />
          {isPlaying ? (
            <PauseIcon
              className="play"
              onClick={playpauseHandler}
              style={cursorstate}
            />
          ) : (
            <PlayArrowIcon
              className="play"
              onClick={playpauseHandler}
              style={cursorstate}
            />
          )}
          {/* <StyledPlay
            class={`play ${isPlaying ? "" : "paused"}`}
            onClick={playpauseHandler}
            style={cursorstate}
          >
            <span class="line1"></span>
            <span class="line2"></span>
          </StyledPlay> */}
          <KeyboardDoubleArrowRightOutlinedIcon
            onClick={() => skipsongHandler("skip-forward")}
            className="skip-forward"
          />
          {/* <FontAwesomeIcon
            onClick={() => skipsongHandler("skip-forward")}
            className="skip-forward"
            icon={faAngleRight}
          /> */}
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
/*const StyledPlay = styled.div`
  position: relative;
  width: 20px;
  height: 10px;
  overflow: hidden;

  .line1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 10px;
    background-color: #fff;
    transition: 0.5s;
    transition-delay: 0.2s;
    transform-origin: 10% 60%;
  }
  .line2 {
    position: absolute;
    top: 0;
    right: 0;
    width: 2px;
    height: 10px;
    background-color: #fff;
    transition: 0.5s;
  }
  .paused {
    /* .line1 {
      width: 100px;
      height: 120px;
      transform: skew(50deg, -40deg) translateX(-60%);
    }
    .line2 {
      transform: translateX();
      width: 0;
    } 
  }
`;*/
const StyledPlayer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 7rem;
  z-index: 1000;
  width: 90%;
  margin: 0.5rem;
  border-radius: 10px;
  transition: 0.5s;
  overflow: hidden;
  //fallback if couldn't extract album art color or unavailable
  background-color: rgb(19, 16, 16) !important;
  background: linear-gradient(
    165deg,
    ${(props) => props.theme.bgColor} 0%,
    #000 40%
  );
  /* Enable hardware acceleration to fix laggy transitions */
  /* -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0); */
  @media (max-width: 900px) {
    margin: 0;
    margin-bottom: 0.5rem;
    width: 95%;
  }
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
    /* background: linear-gradient(
      160deg,
      ${(props) => props.theme.color} 7.94%,
      #181138 17.77%,
      #020112 49.48%
    ); */
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
        font-size: 1.5rem;
      }
      .play {
        font-size: 1.7rem;
      }
    }
  }
  .track {
    width: 100%;
    height: 0.25rem;
    /* background: #30e3ca; */
    background: ${(props) => props.theme.seekColor};
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
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 1rem;
      width: 1rem;
    }
    input[type="range"]::-moz-range-thumb {
      -webkit-appearance: none;
      height: 1rem;
      width: 1rem;
      background: transparent;
      border-color: transparent;
      color: transparent;
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
