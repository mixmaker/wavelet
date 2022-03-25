import { MainContext } from "./useAppContext";
import { useState } from "react";
var CryptoJS = require("crypto-js");

const MainState = ({ children }) => {
  const [homedata, setHomedata] = useState();
  const [albumdata, setAlbumdata] = useState();
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
  //decrypt encrypted media url
  function decryptByDES(ciphertext) {
    var keyHex = CryptoJS.enc.Utf8.parse("38346591");

    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
      },
      keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
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
        albumdata,
        setAlbumdata,
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
        decryptByDES,
        finder,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainState;
