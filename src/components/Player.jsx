import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAppContext from "../context/useAppContext";
import axios from "axios";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { usePalette } from "react-palette";
import { decryptByDES } from "../api/base";

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
  } = useAppContext();

  //refs
  const audioRef = useRef(null);
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
  // const trackAnim = {
  //   transform: `translateX(${songInfo.animationPercent}%)`,
  // };

  //prevent clicking play/pause again when smooth fading
  const [cursorstate, setCursorstate] = useState(true);
  //smoothfade on play pause
  const fadeInOut = (direction) => {
    var newvol;
    setCursorstate(false);
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
          setCursorstate(true);
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
          setCursorstate(true);
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

  const seekRef = useRef(null);

  useEffect(() => {
    seekRef?.current.style.setProperty("--fallback-bg", songInfo?.seekColor);
  }, [songInfo]);

  const { data } = usePalette(currentSong.image);
  if (data.darkMuted !== songInfo.bgColor) {
    setSongInfo({ ...songInfo, bgColor: data.darkMuted });
  }
  if (data.lightMuted !== songInfo.seekColor) {
    setSongInfo({ ...songInfo, seekColor: data.lightMuted });
  }
  return (
    <motion.div
      initial={{ y: "120%" }}
      animate={{ y: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
      // ref={playerRef}
      theme={{
        bgColor: songInfo.bgColor,
        seekColor: songInfo.seekColor,
      }}
      className="fixed bottom-6 ml-4 rounded-xl overflow-hidden"
    >
      <div
        className="w-full h-full -z-10 absolute"
        style={{
          backgroundColor: songInfo.bgColor,
          opacity: 0.3,
        }}
      ></div>
      <div className="relative p-4 duration-300 group justify-start flex h-64 w-52 backdrop-blur-md transition-all hover:w-96 hover:h-52">
        <div className="flex flex-col justify-start w-44 transition-all">
          <img
            src={currentSong.image}
            alt="Songimg"
            className="h-44 w-44 rounded-xl transition-all"
            // onLoad={getColorHandler}
          />
          <div className="mt-2 group-hover:translate-y-32 group-hover:opacity-0 transition-all">
            <h2 className="text-base line-clamp-1 leading-5">
              {decodeHTML(currentSong.title)}
            </h2>
            <h3 className="artist text-sm text-zinc-400 line-clamp-1">
              {decodeHTML(
                currentSong.more_info.artistMap.primary_artists.map(
                  (element) => " " + element.name
                )
              )}
            </h3>
          </div>
        </div>
        <div className="absolute left-48 ml-4 pb-9 h-full justify-around flex flex-col w-40 opacity-0 duration-300 transition-opacity group-hover:opacity-100 ">
          <div className="mt-2">
            <h2 className="text-base line-clamp-2 leading-5">
              {decodeHTML(currentSong.title)}
            </h2>
            <h3 className="artist text-sm text-zinc-400 line-clamp-2">
              {decodeHTML(
                currentSong.more_info.artistMap.primary_artists.map(
                  (element) => " " + element.name
                )
              )}
            </h3>
          </div>
          <div className="track">
            <input
              ref={seekRef}
              min={0}
              max={songInfo.duration || 0}
              value={songInfo.currentTime}
              onChange={dragHandler}
              type="range"
              className="seek-bar"
              style={
                {
                  // background: songInfo.seekColor
                }
              }
            />
            {/* <style>
            .seek-bar::-webkit-slider-thumb{
              box-shadow: -400px 0 0 400px #d5eebb;
            }
          </style> */}
            {/* <div className="animate-track" style={trackAnim}></div> */}
            <div className="time flex justify-between">
              <p>{timeFormatter(songInfo.currentTime)}</p>
              <p>{timeFormatter(songInfo.duration)}</p>
            </div>
          </div>
          <div className="play-control flex justify-evenly items-center">
            <TbPlayerTrackPrevFilled
              onClick={() => skipsongHandler("skip-back")}
              className="skip-back"
            />
            {isPlaying ? (
              <TbPlayerPauseFilled
                className={`${
                  cursorstate ? "cursor-pointer" : "pointer-events-none"
                } text-4xl bg-zinc-700/60 rounded-full p-2`}
                onClick={playpauseHandler}
              />
            ) : (
              <TbPlayerPlayFilled
                className={`${
                  cursorstate ? "cursor-pointer" : "pointer-events-none"
                } text-4xl bg-zinc-700/60 rounded-full p-2`}
                onClick={playpauseHandler}
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
            <TbPlayerTrackNextFilled
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
      </div>
    </motion.div>
  );
}
