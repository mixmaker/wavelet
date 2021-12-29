import React, { useContext } from "react";
import styled from "styled-components";
import MainContext from "../context/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Playlist = () => {
  //import contexts
  const { playlist, decodeHTML, currentSong } = useContext(MainContext);
  return (
    <StyledPlaylist className="left">
      {playlist.length === 0 && (
        <h3>Add some songs to playlist and they will appear here</h3>
      )}
      {playlist.length !== 0 && <h2 className="heading">Up next...</h2>}
      {playlist.map((element) => {
        const selectedStyle = () => {
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
            <FontAwesomeIcon
              className="faPlay"
              icon={faPlay}
              style={selectedStyle()}
            />
            <div className="details">
              <img src={element.image} alt={decodeHTML(element.song)} />
              <div className="info">
                <h4>{decodeHTML(element.song)}</h4>
                <h5 className="artist">{decodeHTML(element.singers)}</h5>
              </div>
            </div>
          </div>
        );
      })}
    </StyledPlaylist>
  );
};

const StyledPlaylist = styled.div`
  margin: 2rem;
  .main {
    display: flex;
    align-items: center;
    width: 500px;
    margin: 1rem 0;
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
  }
  .info {
    padding: 0 0.5rem;
  }
  .faPlay {
    visibility: hidden;
  }
`;

export default Playlist;
