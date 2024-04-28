import { MainContext } from "./useAppContext";
import { useState } from "react";
var CryptoJS = require("crypto-js");

const MainState = ({ children }) => {
  const [homedata, setHomedata] = useState();
  const [albumInfo, setAlbumInfo] = useState();
  const [topSearches, setTopSearches] = useState();
  const [inputVar, setInputVar] = useState(); //get user input
  const [searchedData, setSearchedData] = useState(); //data of searched item
  const [currentSong, setCurrentSong] = useState(); //get details of song
  const [isPlaying, setisPlaying] = useState(false); //check if playing or not
  const [progress, setProgress] = useState(0); //For top-loading-bar
  const [playlist, setPlaylist] = useState([]); //Playlist
  const [songInfo, setSongInfo] = useState({
    currentTime: "0:00",
    duration: "0:00",
    animationPercent: 0,
    bgColor: "",
    seekColor: "",
  });

  //decode encoded HTML
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const finder = (arr, item) => {
    if (arr !== undefined) {
      if (arr.find((element) => element === item)) {
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <MainContext.Provider
      value={{
        homedata,
        setHomedata,
        albumInfo,
        setAlbumInfo,
        topSearches,
        setTopSearches,
        inputVar,
        setInputVar,
        searchedData,
        setSearchedData,
        currentSong,
        setCurrentSong,
        isPlaying,
        setisPlaying,
        progress,
        setProgress,
        playlist,
        setPlaylist,
        songInfo,
        setSongInfo,
        decodeHTML,
        finder,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
