import MainContext from "./MainContext";
import { useState } from "react";

const MainState = (props) => {
  const [inputVar, setInputVar] = useState(); //get user input
  const [searchedData, setSearchedData] = useState(); //data of searched item
  const [currentSong, setCurrentSong] = useState(); //get details of song
  const [isPlaying, setisPlaying] = useState(false); //check if playing or not
  const [progress, setProgress] = useState(0);
const [no, setno] = useState(0)

  //decode encoded HTML
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  return (
    <MainContext.Provider
      value={{
        setno,
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
        decodeHTML
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}

export default MainState;
