import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import MainContext from "../context/MainContext";
import { albumURL } from "../api/base";
import { getResponse } from "../api";
import { useLocation } from "react-router-dom";

const AlbumDetails = () => {
  const {
    albumdata,
    setProgress,
    setPlaylist,
    setAlbumdata,
    setCurrentSong,
    decodeHTML,
    setisPlaying,
  } = useContext(MainContext);
  const getAlbumdata = async (type, id) => {
    const albumUrl = albumURL(type, id);
    setProgress(40);
    const data = await getResponse(albumUrl);
    setAlbumdata(data);
    setProgress(100);
  };
  const location = useLocation();
  const locArr = location.pathname.split("/");
  useEffect(() => {
    if ((albumdata && albumdata.id !== locArr[3]) || !albumdata) {
      getAlbumdata(locArr[2], locArr[3]);
    }
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    // eslint-disable-next-line
  }, [location]);
  return (
    <StyledAlbumDetails className="left">
      {albumdata && albumdata.id === locArr[3] && (
        <>
          <div className="image">
            <img src={albumdata.image.replace("150x150", "500x500")} alt="" />
          </div>
          <div className="main">
            <h1 className="heading">{albumdata.title}</h1>
            <h3 className="type">{albumdata.type}</h3>
            <button onClick={() => setPlaylist(albumdata.list)}>
              Play all
            </button>
            <div className="item">
              {albumdata.list.map((song) => {
                return (
                  <div
                    className="songitem"
                    key={song.id}
                    onClick={() => {
                      setCurrentSong(song);
                      setisPlaying(true);
                    }}
                  >
                    <img src={song.image} alt="" />
                    <div className="details">
                      <h3>{decodeHTML(song.title)}</h3>
                      <h4 className="artist">
                        {song.more_info.artistMap.primary_artists.map(
                          (element) => element.name + ", "
                        )}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </StyledAlbumDetails>
  );
};

const StyledAlbumDetails = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  .heading {
    font-size: 2.1rem;
  }
  button {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    outline: none;
    background: transparent;
    color: white;
    transition: 0.5s;
    cursor: pointer;
    border: 2px solid #b077db;
    &:hover {
      background-color: #b077db;
      box-shadow: 5px 5px 30px 0.25px #b077db;
    }
    &:active {
      background-color: #501f75;
      box-shadow: 5px 5px 30px 0.25px #b077db;
    }
  }
  .songitem {
    padding: 0.5rem;
    transition: 0.5s;
    cursor: pointer;
    &:hover {
      background-color: #362119;
    }
  }
  @media (min-width: 900px) {
    margin: 2rem 3rem;
    .image {
      position: fixed;
      padding-right: 2rem;
      opacity: 0.6;
      img {
        height: 40rem;
      }
    }
    .main {
      margin-left: 50%;
      .item {
        margin-top: 2rem;
        .songitem {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          img {
            height: 80px;
            padding-right: 1rem;
          }
        }
      }
    }
  }
  @media (max-width: 900px) {
    height: 100vh;
    .main {
      position: relative;
      width: 100%;
      padding: 0 4rem;
      padding-bottom: 3rem;
      padding-top: 60%;
      height: max-content;
      color: white;
      min-height: 100vh;
      /* background: black; */
      &::before {
        content: "";
        position: absolute;
        z-index: -1;
        /* z-index: 10;
              pointer-events: none; */
        top: 0;
        /* margin: 0; */
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgb(0, 0, 0, 0.3) 0%,
          rgba(0, 0, 0, 0.8) 20%,
          rgba(0, 0, 0, 1) 55%
        );
      }

      .item {
        .songitem {
          display: flex;
          margin: 1rem 3rem;
          img {
            height: 60px;
            padding-right: 1rem;
          }
        }
      }
    }
    .image {
      position: fixed;
      width: 100%;
      top: 0;
      z-index: -1;
      img {
        width: 100%;
        /* height: 200px; */
      }
    }
  }
`;
export default AlbumDetails;
