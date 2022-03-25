import React from "react";
import styled from "styled-components";
import useAppContext from "../context/useAppContext";

const Fsplayer = () => {
  document.title = "Wavelet | Now Playing";
  //contexts
  const { decodeHTML, currentSong, setisPlaying, songInfo, playlist } =
    useAppContext();
  const dragHandler = () => {};
  return (
    <StyledFsplayer className="left">
      {currentSong && (
        <div className="playerContainer">
          <img src={currentSong.image} alt="" />
          <h2>{decodeHTML(currentSong.title)}</h2>
          <h3 className="artist">
            {decodeHTML(
              currentSong.more_info.artistMap.primary_artists.map(
                (element) => " " + element.name
              )
            )}
          </h3>
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
        </div>
      )}
    </StyledFsplayer>
  );
};

const StyledFsplayer = styled.div`
  position: relative;
  height: 100vh;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  .playerContainer {
    background: #383838;
    width: 500px;
    height: 700px;
  }
`;

export default Fsplayer;
