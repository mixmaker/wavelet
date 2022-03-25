import React, { useEffect } from "react";
import styled from "styled-components";
import useAppContext from "../context/useAppContext";
import { albumURL } from "../api/base";
import { getResponse } from "../api";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SkeletonListitem from "../components/skeletons/SkeletonListitem";

const AlbumDetails = () => {
  const {
    albumdata,
    setProgress,
    playlist,
    setPlaylist,
    setAlbumdata,
    setCurrentSong,
    decodeHTML,
    finder,
    setisPlaying,
  } = useAppContext();

  const navigate = useNavigate();
  const exitAlbumDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("albumDetail")) {
      navigate("/home");
    }
  };

  const addtoPlaylistHandler = (song) => {
    let idArr;
    for (let i = 0; i < playlist.length; i++) {
      idArr ? (idArr = [...idArr, playlist[i].id]) : (idArr = [playlist[i].id]);
    }
    if (finder(idArr, song.id)) {
      alert("Song already in playlist");
    } else {
      setPlaylist([...playlist, song]);
    }
  };

  return (
    <StyledAlbumDetails
      onClick={exitAlbumDetailHandler}
      className="albumDetail"
    >
      <div className="content">
        <motion.div className="image">
          <LazyLoad offset={100}>
            <img src={albumdata.image} alt="" />
          </LazyLoad>
        </motion.div>
        <div className="main">
          <h1 className="heading">{albumdata.title}</h1>
          <h3 className="type">{albumdata.type}</h3>
          <button onClick={() => setPlaylist(albumdata.list)}>Play all</button>
          <div className="items">
            {!albumdata.list &&
              [1, 2, 3, 4, 5].map((n) => <SkeletonListitem key={n} />)}
            {albumdata.list &&
              albumdata.list.map((song) => {
                return (
                  <div className="songitem" key={song.id}>
                    <div
                      className="songItemDetails"
                      onClick={() => {
                        setCurrentSong(song);
                        setisPlaying(true);
                        setPlaylist([song]);
                      }}
                    >
                      <img src={song.image} alt={song.title} />
                      <div className="songItemText">
                        <h3>{decodeHTML(song.title)}</h3>
                        <h4 className="artist">
                          {song.more_info.artistMap.primary_artists
                            .map(({ name }) => decodeHTML(name))
                            .join(", ")}
                        </h4>
                      </div>
                    </div>
                    <div className="albumIcons">
                      <PlaylistAddIcon
                        onClick={() => addtoPlaylistHandler(song)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </StyledAlbumDetails>
  );
};

const StyledAlbumDetails = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 500;
  // backdrop-filter: blur(4px); // Edge is super laggy idk y, firefox not supported
  .content {
    position: relative;
    overflow-y: scroll;
    height: max-content;
    margin: auto;
    height: 100%;
    width: 60%;
    scrollbar-color: #ee6c4d #f1f1f1; // compatible with firefox
    scrollbar-width: thin;
    .image {
      position: absolute;
      width: 100%;
      pointer-events: none; //need to fix this
      img {
        width: 100%;
      }
    }
    .main {
      margin: 2rem 0;
      padding: 5rem;
      z-index: 550;
      width: 100%;
      position: relative;
      min-height: 100vh;
      height: max-content;
      position: relative;
      top: 0;
      left: 0;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.7) 200px,
        rgba(0, 0, 0, 1) 500px
      );
      .heading {
        font-size: 2.3rem;
      }
      .type {
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
      .items {
        margin-top: 2rem;
        .songitem {
          display: flex;
          width: 100%;
          border-radius: 10px;
          margin-bottom: 1rem;
          padding: 0.75rem;
          justify-content: space-between;
          &:hover {
            background: linear-gradient(
              135deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 20%,
              rgba(231, 231, 231, 0.233) 100%
            );
          }
          .songItemDetails {
            display: flex;
            cursor: pointer;
            img {
              height: 70px;
              margin-right: 1rem;
              border-radius: 14px;
            }
          }
          .albumIcons {
            align-self: center;
            /* pointer-events: none; */
            cursor: pointer;
            outline: none;
            border: 1px solid transparent;
            background: transparent;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.25rem;
            margin: 0.15rem;
            border-radius: 50%;
            transition: 0.3s;
            &:hover {
              border: 1px solid #fff;
            }
            &:active {
              background: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1400px) and (min-width: 900px) {
    .content {
      width: 70%;
    }
  }
  @media only screen and (max-width: 900px) {
    .content {
      width: 80%;
      margin-left: 7rem;
    }
  }
`;
export default AlbumDetails;
