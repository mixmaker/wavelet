import React, { useState , useContext} from "react";
import GlobalStyles from "./components/GlobalStyles";
import LoadingBar from "react-top-loading-bar";
import MainContext from "./context/MainContext";
import styled from "styled-components";
//react router
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

//components
import Nav from "./components/Nav";
import Home from "./components/Home";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import Player from "./components/Player";

function App() {

  const {currentSong,progress, setProgress}=useContext(MainContext);
  //States
  // const [inputVar, setInputVar] = useState(); //get user input
  // const [searchedData, setSearchedData] = useState(); //data of searched item
  // const [currentSong, setCurrentSong] = useState(); //get details of song
  // const [isPlaying, setisPlaying] = useState(false); //check if playing or not
  // const [progress, setProgress] = useState(0);


  return (
      <Router>
      <StyledApp className="App">
      <LoadingBar
          color="#ff4ff3"
          height={3}
          loaderSpeed={800}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Nav />
        <GlobalStyles />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/playlists" element={<Playlist />} />
          <Route exact path="/" element={<Player />} />
        </Routes>
        {currentSong && (
        <Player
        //   decodeHTML={decodeHTML}
        //   isPlaying={isPlaying}
        //   setisPlaying={setisPlaying}
        //   currentSong={currentSong}
        />
      )}
      </StyledApp>
    </Router>
  )
}

const StyledApp = styled.div`
display: flex;
`;

export default App;
      
        {/* <Nav
          // setProgress={setProgress}
          // inputVar={inputVar}
          // setInputVar={setInputVar}
          // setSearchedData={setSearchedData}
        /> */}
        