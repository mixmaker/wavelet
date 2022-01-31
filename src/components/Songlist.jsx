import React, { useContext } from "react";
//styles and animations
import { motion } from "framer-motion";
import styled from "styled-components";
//import context
import MainContext from "../context/MainContext";
//icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite"; //will be added soon
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import axios from "axios";
//api
// import { getDetailsfromId } from "../api";

export default function Songlist({ element, index, hoverHandler }) {
  const {
    decodeHTML,
    currentSong,
    setCurrentSong,
    setisPlaying,
    setProgress,
    searchedData,
    playlist,
    setPlaylist,
  } = useContext(MainContext);

  const scaleVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.7, delay: index * 0.1 } },
  };

  const selectedStyle = () => {
    if (currentSong) {
      if (element.id === currentSong.id) {
        return {
          background:
            "linear-gradient(-45deg, transparent 0%,rgba(255, 255, 255, 0.1) 50%,rgba(231, 231, 231, 0.233) 100%)",
        };
      }
    }
  };
  const finder = (arr, item) => {
    if (arr !== undefined) {
      if (arr.find((element) => element === item)) {
        return true;
      } else {
        return false;
      }
    }
  };
  const playSongHandler = async () => {
    setProgress(40);
    const { data } = await axios.get(
      `https://wavelet-backend.vercel.app/api/getdatauri?imgurl=${encodeURIComponent(
        searchedData[index].image
      )}`
    );
    const newSongdata = { ...searchedData[index], image: data.uri };
    setCurrentSong(newSongdata);
    // setCurrentSong(searchedData[index]);
    setisPlaying(true);
    setPlaylist([newSongdata]);
    setProgress(100);
    // setProgress(10);
    // // getDetails(element.id).then((data) => {
    // getDetailsfromId(element.id).then(({ data }) => {
    //   // console.log(data[element.id]);
    //   setProgress(60);
    //   setCurrentSong(data[element.id]);
    //   setPlaylist([data[element.id]]);
    //   setisPlaying(true);
    //   setProgress(100);
    // });
  };

  const addtoPlaylistHandler = () => {
    let idArr;
    for (let i = 0; i < playlist.length; i++) {
      idArr ? (idArr = [...idArr, playlist[i].id]) : (idArr = [playlist[i].id]);
    }
    if (finder(idArr, element.id)) {
      alert("Song already in playlist");
    } else {
      setPlaylist([...playlist, searchedData[index]]);
    }
  };

  return (
    <SongList className="songList">
      <motion.div
        id={`${element.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        style={selectedStyle()}
        className="overlay"
      >
        <div className="details" onClick={playSongHandler}>
          <motion.img
            variants={scaleVariant}
            initial="hidden"
            animate="visible"
            src={element.image}
            alt={decodeHTML(element.title)}
            className="pe"
          />
          <motion.div
            className="info pe"
            initial={{ y: 100 }}
            animate={{
              y: 0,
              transition: { duration: 0.7, delay: index * 0.1 },
            }}
          >
            <h2>{decodeHTML(element.title)}</h2>
            <h3 className="artist">
              {decodeHTML(
                element.more_info.artistMap.primary_artists.map(
                  (element) => " " + element.name
                )
              )}
            </h3>
          </motion.div>
        </div>
        <motion.div
          className="icons"
          variants={scaleVariant}
          initial="hidden"
          animate="visible"
        >
          <button className="favourite">
            <FavoriteBorderIcon />
          </button>
          <button className="add">
            <PlaylistAddIcon onClick={addtoPlaylistHandler} />
          </button>
        </motion.div>
      </motion.div>
    </SongList>
  );
}

const SongList = styled(motion.div)`
  position: relative;
  margin: 1rem 1.5rem;
  width: 100%;
  transition: 0.5s;
  overflow: hidden;
  .mark {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: blue; */
  }
  .overlay {
    position: relative;
    transition: 0.5s;
    /* pointer-events: none; */
    &:hover {
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(231, 231, 231, 0.233) 100%
      );
    }
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 1rem;
    .details {
      transition: 0.5s;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      width: 90%;
      img {
        height: 70px;
        border-radius: 14px;
      }
    }
    .icons {
      position: relative;
      display: flex;
      /* align-items: center;
      justify-content: space-around; */
      /* width: 15%; */
      /* padding: 0 2rem; */
    }
    .pe {
      pointer-events: none;
    }
    .add,
    .favourite {
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
    .info {
      padding: 0 1rem;
      .artist {
        color: #bebebeb9;
      }
    }
  }
`;
