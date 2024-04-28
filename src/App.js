import React from "react";
import LoadingBar from "react-top-loading-bar";
import useAppContext from "./context/useAppContext";
//react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
//components
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Player from "./components/Player";
import AlbumDetails from "./pages/AlbumDetails";
import "./globals.css";
import Applayout from "./pages/Applayout";
import Albums from "./pages/Albums";
import Artists from "./pages/Artists";

function App() {
  const {
    currentSong,
    progress,
    setProgress,
    playlist,
    setCurrentSong,
    setisPlaying,
  } = useAppContext();
  useEffect(() => {
    if (!currentSong) {
      setCurrentSong(playlist[0]);
      setisPlaying(true);
    }
    // eslint-disable-next-line
  }, [playlist]);
  return (
    <Router>
      <div className="App flex min-h-screen antialiased grainy">
        <LoadingBar
          color="#EE6C4D"
          height={3}
          loaderSpeed={800}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path="/" element={<Onboarding />} />
          <Route element={<Applayout />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/album/:id" element={<AlbumDetails />} />
            <Route exact path="/song/:id" element={<AlbumDetails />} />
            <Route exact path="/playlist/:id" element={<AlbumDetails />} />
            <Route exact path="/radio_station/:id" element={<AlbumDetails />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/albums" element={<Albums />} />
            <Route exact path="/artists" element={<Artists />} />
          </Route>
        </Routes>
        {currentSong && <Player />}
      </div>
    </Router>
  );
}

export default App;
