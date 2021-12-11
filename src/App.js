import React, { useState, useEffect, useRef } from "react";
import Player from "./components/Player";
import Nav from "./components/Nav";
import Songlist from "./components/Songlist";
import nayan from "./images/Nayan.mp3";
import "./style/app.scss";
function App() {
  //States
  const [inputVar, setInputVar] = useState(); //get user input
  const [searchedData, setSearchedData] = useState(); //data of searched item
  const [currentSong, setCurrentSong] = useState(); //get details of song
  const [isPlaying, setisPlaying] = useState(false); //check if playing or not

  return (
    <div className="App">
      <Nav
        inputVar={inputVar}
        setInputVar={setInputVar}
        setSearchedData={setSearchedData}
      />
      {searchedData &&
        searchedData.map((element) => {
          return (
            <Songlist
            setisPlaying={setisPlaying}
              setCurrentSong={setCurrentSong}
              element={element}
              key={element.id}
            />
          );
        })}
      {currentSong && <Player isPlaying={isPlaying} setisPlaying={setisPlaying} currentSong={currentSong} />}
    </div>
  );
}

export default App;
