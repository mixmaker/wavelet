import React, { useContext } from "react";
import GlobalStyles from "./components/GlobalStyles";
import LoadingBar from "react-top-loading-bar";
import MainContext from "./context/MainContext";
import styled from "styled-components";
//react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
//components
import Nav from "./components/Nav";
import Intro from "./components/Intro";
import Home from "./components/Home";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
import Fsplayer from "./components/Fsplayer";
import AlbumDetails from "./components/AlbumDetails";

function App() {
  const {
    currentSong,
    progress,
    setProgress,
    playlist,
    setCurrentSong,
    setisPlaying,
  } = useContext(MainContext);
  useEffect(() => {
    if (!currentSong) {
      setCurrentSong(playlist[0]);
      setisPlaying(true);
    }
    // eslint-disable-next-line
  }, [playlist]);
  return (
    <Router>
      <StyledApp className="App">
        <LoadingBar
          color="#EE6C4D"
          height={3}
          loaderSpeed={800}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Nav />
        <GlobalStyles />
        <div className="bg"></div>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/home/album/:id" element={<AlbumDetails />} />
          <Route exact path="/home/playlist/:id" element={<AlbumDetails />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/playlists" element={<Playlist />} />
          <Route exact path="/player" element={<Fsplayer />} />
        </Routes>
        {currentSong && <Player />}
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
