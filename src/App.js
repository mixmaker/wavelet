import React, { useContext , useRef} from "react";
import GlobalStyles from "./components/GlobalStyles";
import LoadingBar from "react-top-loading-bar";
import MainContext from "./context/MainContext";
import styled from "styled-components";
//react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//components
import Nav from "./components/Nav";
import Home from "./components/Home";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
import Fsplayer from "./components/Fsplayer";

function App() {
  const loaderRef = useRef(null)
  const { currentSong, progress, setProgress } = useContext(MainContext);
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
        ref={loaderRef}
          color="#ff4ff3"
          height={2}
          loaderSpeed={800}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Nav loaderRef={loaderRef} />
        <GlobalStyles />
        <div className="bg">
        </div>
          <Routes>
            <Route exact path="/" element={<Home loaderRef={loaderRef} />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/playlists" element={<Playlist />} />
            <Route exact path="/player" element={<Fsplayer />} />
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
  );
}

const StyledApp = styled.div`
  display: flex;
  .bg {
  }
`;

export default App;

{
  /* <Nav
          // setProgress={setProgress}
          // inputVar={inputVar}
          // setInputVar={setInputVar}
          // setSearchedData={setSearchedData}
        /> */
}
