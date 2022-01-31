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
import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Player from "./components/Player";
import Fsplayer from "./pages/Fsplayer";
import AlbumDetails from "./pages/AlbumDetails";

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
      setCurrentSong(playlist[0]);
      setisPlaying(true);
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
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/home/album/:id" element={<AlbumDetails />} />
          <Route exact path="/home/song/:id" element={<Home />} />
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
`;

export default App;
