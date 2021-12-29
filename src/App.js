import React, { useContext } from "react";
import GlobalStyles from "./components/GlobalStyles";
import LoadingBar from "react-top-loading-bar";
import MainContext from "./context/MainContext";
import styled from "styled-components";
//react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//components
import Nav from "./components/Nav";
import Intro from './components/Intro'
import Home from "./components/Home";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
import Fsplayer from "./components/Fsplayer";

function App() {
  const { currentSong, progress, setProgress } = useContext(MainContext);

  return (
    <Router>
      <StyledApp className="App">
        <LoadingBar
          color="#ff4ff3"
          height={2}
          loaderSpeed={800}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Nav />
        <GlobalStyles />
        <div className="bg">
        </div>
          <Routes>
            <Route exact path="/" element={<Intro/>} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/playlists" element={<Playlist />} />
            <Route exact path="/player" element={<Fsplayer />} />
          </Routes>
        {currentSong && (
          <Player />
        )}
      </StyledApp>
    </Router>
  );
}

const StyledApp = styled.div`
  display: flex;
  .bg {
  }
`;

export default App;
