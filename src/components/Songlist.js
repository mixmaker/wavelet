import React from "react";
import { getDetails } from "../api";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useContext } from "react";
import MainContext from "../context/MainContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Songlist({ element, index }) {
  // console.log(element.id)
  const {
    decodeHTML,
    currentSong,
    setCurrentSong,
    setisPlaying,
    setProgress,
    playlist,
    setPlaylist,
  } = useContext(MainContext);

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
    getDetails(element.id).then((data) => {
      setProgress(60);
      setCurrentSong(data.data);
      setPlaylist([data.data]);
      setisPlaying(true);
      setProgress(100);
      // let newArr = [e.target.id];
      // if (localStorage.ids) {
      //   if (finder(JSON.parse(localStorage.getItem("ids")), newArr[0])) {
      //   } else {
      //     localStorage.setItem(
      //       "ids",
      //       JSON.stringify(
      //         JSON.parse(localStorage.getItem("ids")).concat(newArr)
      //       )
      //     );
      //   }
      // } else {
      //   localStorage.setItem("ids", JSON.stringify(newArr));
      // }
      // console.log(JSON.parse(localStorage.getItem("ids")));
      // // localStorage.clear()
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
      getDetails(element.id).then((data) => {
        setPlaylist(playlist.concat([data.data]));
      });
    }
    // if (finder(playlist, element.id)) {
    //   alert("Song already in playlist");
    // } else {
    //   setPlaylist(playlist.concat([element.id]));
    // }
  };

  return (
    <SongList>
      <motion.div
        id={`${element.id}`}
        style={selectedStyle()}
        className="overlay"
      >
        <div className="details" onClick={getAudioHandler}>
          <motion.img
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { duration: 0.7, delay: index * 0.1 },
            }}
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
            <h3 className="artist">{decodeHTML(element.more_info.singers)}</h3>
          </motion.div>
        </div>
        <div className="icons">
          <FontAwesomeIcon
            className="add"
            icon={faPlus}
            onClick={addtoPlaylistHandler}
          />
        </div>
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
  .overlay {
    transition: 0.5s;

    &:hover {
      background: #116b64be;
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
      padding: 0 2rem;
    }
    .pe {
      pointer-events: none;
    }
    .add {
      cursor: pointer;
      z-index: 5;
      padding: 0.25rem;
      font-size: 1.5rem;
      border-radius: 5px;
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
