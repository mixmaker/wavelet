import MainContext from "./MainContext";
import { useState } from "react";

const MainState = (props) => {
  const [homedata, setHomedata] = useState()
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
  });

  //decode encoded HTML
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  return (
    <MainContext.Provider
      value={{
        homedata,
        setHomedata,
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
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainState;
