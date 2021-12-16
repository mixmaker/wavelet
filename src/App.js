import React, { useState } from "react";
import Player from "./components/Player";
import Nav from "./components/Nav";
import Songlist from "./components/Songlist";
import "./style/app.scss";
import LoadingBar from "react-top-loading-bar";
function App() {
  //States
  const [inputVar, setInputVar] = useState(); //get user input
  const [searchedData, setSearchedData] = useState(); //data of searched item
  const [currentSong, setCurrentSong] = useState(); //get details of song
  const [isPlaying, setisPlaying] = useState(false); //check if playing or not
  const [progress, setProgress] = useState(0);

  //decode encoded HTML
  var decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="App">
      <LoadingBar
        color="#30E3CA"
        height={3}
        loaderSpeed={800}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Nav
        setProgress={setProgress}
        inputVar={inputVar}
        setInputVar={setInputVar}
        setSearchedData={setSearchedData}
      />
      {searchedData &&
        searchedData.map((element) => {
          return (
            <Songlist
              decodeHTML={decodeHTML}
              setProgress={setProgress}
              setisPlaying={setisPlaying}
              setCurrentSong={setCurrentSong}
              element={element}
              key={element.id}
            />
          );
        })}
      {currentSong && (
        <Player
          decodeHTML={decodeHTML}
          isPlaying={isPlaying}
          setisPlaying={setisPlaying}
          currentSong={currentSong}
        />
      )}
    </div>
  );
}

export default App;
