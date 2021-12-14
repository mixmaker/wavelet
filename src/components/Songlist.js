import React, { useEffect } from "react";
import { getAudio } from "../api";
import axios from "axios";

export default function Songlist({
  element,
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
    <div className="songlist" id={`${element.id}`} onClick={getAudioHandler}>
      <img src={element.image} alt="" />
      <div className="info">
        <h2>{element.title}</h2>
        <h3>{element.more_info.singers}</h3>
      </div>
    </div>
  );
}
// await setSongId(e.target.id)
// console.log(songId)
// let du = await getAudio(e.target.id)
// du && console.log(du)
// du && setCurrentSong(du)
