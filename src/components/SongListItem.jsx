import React from "react";
import useAppContext from "../context/useAppContext";
import { TbPlaylistAdd } from "react-icons/tb";
import { motion } from "framer-motion";
import { IoMusicalNote } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SongListItem = ({ song, index, isAlbum }) => {
  const {
    playlist,
    setPlaylist,
    currentSong,
    setCurrentSong,
    decodeHTML,
    finder,
    setisPlaying,
  } = useAppContext();
  const navigate = useNavigate();

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
  const scaleVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.7, delay: index * 0.1 } },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="pl6 overflow-clip flex justify-between p-3 cursor-pointer hover:bg-zinc-900 transition duration-100 ease-in-out rounded-xl"
      key={song.id}
    >
      <div
        className="flex"
        onClick={() => {
          if (isAlbum) {
            navigate(`/album/${song.id}`);
          } else {
            setCurrentSong(song);
            setisPlaying(true);
            setPlaylist([song]);
          }
        }}
      >
        <motion.div
          variants={scaleVariant}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center mr-2 w-6"
        >
          {currentSong?.id === song.id && <IoMusicalNote size={22} />}
        </motion.div>
        <motion.img
          variants={scaleVariant}
          initial="hidden"
          animate="visible"
          src={song.image}
          alt={song.title}
          className="h-[4.5rem] w-[4.5rem] rounded-xl mr-2"
        />
        <motion.div
          className="mt-1 ml-2"
          initial={{ y: 100 }}
          animate={{
            y: 0,
            transition: { duration: 0.7, delay: index * 0.1 },
          }}
        >
          <h3 className="text-zinc-200">{decodeHTML(song.title)}</h3>
          <h4 className="text-zinc-400 text-sm">
            {song.more_info.artistMap.primary_artists
              .map(({ name }) => decodeHTML(name))
              .join(", ")}
          </h4>
        </motion.div>
      </div>
      {!isAlbum && (
        <div className="flex items-center justify-center">
          <TbPlaylistAdd
            size={24}
            className="cursor-pointer text-zinc-200 hover:text-zinc-400 transition duration-300 ease-in-out"
            onClick={() => addtoPlaylistHandler(song)}
          />
        </div>
      )}
    </motion.div>
  );
};

export default SongListItem;
