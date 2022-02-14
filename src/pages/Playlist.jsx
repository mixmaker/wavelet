import React, { useContext } from "react";
import styled from "styled-components";
import MainContext from "../context/MainContext";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

const Playlist = () => {
  document.title = "Wavelet | Playlists";

  //import contexts
  const { playlist, setPlaylist, decodeHTML, currentSong } =
    useContext(MainContext);
  const removeSongfromPlaylistHandler = (id) => {
    const newPlaylist = playlist.filter((element, index) => {
      return id !== index;
    });
    setPlaylist(newPlaylist);
  };
  return (
    <StyledPlaylist className="left">
      {playlist.length === 0 && (
        <h3>Add some songs to playlist and they will appear here</h3>
      )}
      {playlist.length !== 0 && <h2 className="heading">Up next...</h2>}
      {playlist.map((element, index) => {
        const playingStyle = () => {
          if (currentSong) {
            if (element.id === currentSong.id) {
              return {
                visibility: "visible",
              };
            }
          }
        };
        return (
          <div className="main">
            <EqualizerIcon className="playingico" style={playingStyle()} />
            <div className="details">
              <img src={element.image} alt={decodeHTML(element.song)} />
              <div className="info">
                <h4>{decodeHTML(element.title)}</h4>
                <h5 className="artist">
                  {decodeHTML(
                    element.more_info.artistMap.primary_artists.map(
                      (element) => " " + element.name
                    )
                  )}
                </h5>
              </div>
              <div className="playlistIcons">
                <button onClick={() => removeSongfromPlaylistHandler(index)}>
                  <PlaylistRemoveIcon />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </StyledPlaylist>
  );
};

const StyledPlaylist = styled.div`
  position: relative;
  margin: 2rem;
  .main {
    display: flex;
    align-items: center;
    width: 500px;
    margin: 1rem 0;
    &:hover{
      .playlistIcons{
        opacity: 1;
      }
    }
  }
  .heading {
    padding-bottom: 1rem;
  }
  .details {
    transition: 0.5s;
    padding: 0.5rem;
    display: flex;
    width: 100%;
    .info {
      flex: 5;
      padding: 0 0.5rem;
      h4 {
        font-size: 1.2rem;
        color: #d3d3d3;
      }
      .artist {
        font-size: 0.9rem;
        color: #919191;
      }
    }
    img {
      height: 60px;
      border-radius: 14px;
    }
    .playlistIcons {
      /* flex: 1; */
      display: flex;
      align-items: center;
      opacity: 0;
      transition: .2s;
      button {
        background: transparent;
        cursor: pointer;
        outline: none;
        border: 1px solid transparent;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem;
        color: #f1f1f1;
        &:hover {
          border: 1px solid #d3d3d3;
        }
        &:active {
          background: rgba(82, 82, 82, 0.39);
        }
      }
    }
  }
  .playingico {
    visibility: hidden;
  }
`;

export default Playlist;
