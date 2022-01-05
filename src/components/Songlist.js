import React, { useContext } from "react";
//styles and animations
import { motion } from "framer-motion";
import styled from "styled-components";
//import context
import MainContext from "../context/MainContext";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
//api
import { getDetailsfromId } from "../api";

export default function Songlist({ element, index , hoverHandler}) {
  const {
    decodeHTML,
    currentSong,
    setCurrentSong,
    setisPlaying,
    setProgress,
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
          backgroundColor: "#56297999",
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
  const getAudioHandler = () => {
    setProgress(10);
    // getDetails(element.id).then((data) => {
    getDetailsfromId(element.id).then(({ data }) => {
      // console.log(data[element.id]);
      setProgress(60);
      setCurrentSong(data[element.id]);
      setPlaylist([data[element.id]]);
      setisPlaying(true);
      setProgress(100);
    });
  };

  const addtoPlaylistHandler = () => {
    let idArr;
    for (let i = 0; i < playlist.length; i++) {
      idArr
        ? (idArr = idArr.concat([playlist[i].id]))
        : (idArr = [playlist[i].id]);
    }
    if (finder(idArr, element.id)) {
      alert("Song already in playlist");
    } else {
      // getDetails(element.id).then((data) => {
      getDetailsfromId(element.id).then(({ data }) => {
        setPlaylist(playlist.concat(data[element.id]));
      });
    }
  };

  return (
    <SongList className="songList">
      <motion.div
        id={`${element.id}`}
        style={selectedStyle()}
        className="overlay"
      >
        <div className="details" onClick={getAudioHandler}>
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
          <FontAwesomeIcon
            className="add"
            icon={faPlus}
            onClick={addtoPlaylistHandler}
          />
        </motion.div>
      </motion.div>
    </SongList>
  );
}

const SongList = styled(motion.div)`
  position: relative;
  margin: 1rem;
  width: 100%;
  transition: 0.5s;
  overflow: hidden;
  .mark{
    position: absolute;
    top: 0;
    width: 100% ;
    height: 100% ;
    /* background-color: blue; */
  }
  .overlay {
    position: relative;
    transition: 0.5s;
    /* pointer-events: none; */
    &:hover {
      background: #53362b;
    }
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;
    .details {
      transition: 0.5s;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      min-width: 50%;
      img {
        height: 70px;
        border-radius: 14px;
      }
    }
    .icons {
      position: relative;

      padding: 0 2rem;
    }
    .pe {
      pointer-events: none;
    }
    .add {
      /* cursor: pointer; */
      /* z-index: 5; */
      padding: 0.25rem;
      font-size: 1.5rem;
      border-radius: 5px;
      transition: .5s;
      &:hover {
        background: #8b68a5f9;
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
