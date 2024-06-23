import React, { useEffect, useRef, useState } from "react";
import useAppContext from "../context/useAppContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SkeletonListitem from "../components/skeletons/SkeletonListitem";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "../components/ui/button";
import { FaPlay } from "react-icons/fa6";
import { useGetAlbumData } from "../api/queries";
import { cn } from "../cn";
import SongListItem from "../components/SongListItem";
import { IoIosArrowUp } from "react-icons/io";
import LoadingComponent from "../components/LoadingComponent";
import { motion } from "framer-motion";

const AlbumDetails = () => {
  const {
    playlist,
    setPlaylist,
    albumInfo,
    setCurrentSong,
    decodeHTML,
    finder,
    setisPlaying,
  } = useAppContext();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[1];

  const { data: albumdata, isLoading, isError } = useGetAlbumData(type, id);

  const [isVisible, setIsVisible] = useState(false);
  const prevScrollPos = useRef(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollPos = window.scrollY;
      // Button is displayed after scrolling for 500 pixels
      if (currentScrollPos > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      prevScrollPos.current = currentScrollPos;
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isVisible]);

  const itemsList = type === "song" ? albumdata?.songs : albumdata?.list;

  return (
    <div className="p-6">
      {isVisible && (
        <Button
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-2 right-20 rounded-full h-12 w-12 p-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <IoIosArrowUp size={26} />
        </Button>
      )}
      <Button
        variant="secondary"
        size="icon"
        className="sticky top-7 mb-7 mt-1"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack size={26} />
      </Button>
      <div className="flex items-start">
        <div className="w-[500px] h-[500px] sticky top-24 flex justify-center items-center">
          {!albumInfo?.image && isLoading ? (
            <LoadingComponent text="Loading image" />
          ) : isError || albumdata?.error ? (
            <h1>Error loading image.</h1>
          ) : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.9 } }}
              src={
                type === "song"
                  ? isLoading
                    ? albumInfo?.image
                    : albumdata?.songs[0]?.image?.replace("150x150", "500x500")
                  : isLoading
                  ? albumInfo?.image
                  : albumdata?.image?.replace("150x150", "500x500")
              }
              className={cn(
                "w-full h-full rounded-xl transition-all duration-500 ease-in-out",
                isLoading ? "blur-sm" : ""
              )}
              alt={
                type === "song"
                  ? decodeHTML(albumdata?.songs[0]?.title)
                  : decodeHTML(albumdata?.title)
              }
            />
          )}
        </div>
        <div className="ml-10 w-30">
          <h1 className="text-2xl text-zinc-50">
            {isLoading
              ? albumInfo?.title
              : type === "song"
              ? albumdata?.songs[0]?.title
              : albumdata?.title}
          </h1>
          <h3 className="text-base text-zinc-400 leading-tight ">
            {type}
            {isLoading || type === "song" || isError || albumdata?.error
              ? ""
              : `, ${albumdata?.list_count} songs`}
          </h3>
          <Button
            disabled={isLoading || isError || albumdata?.error}
            className="mt-5 mb-3"
            // variant="secondary"
            onClick={() => setPlaylist(albumdata?.list)}
          >
            {isLoading ? (
              <LoadingComponent text="Please wait" />
            ) : (
              <>
                <FaPlay className="mr-1.5" />
                Play all
              </>
            )}
          </Button>
          <div className="items w-[35rem]">
            {isLoading &&
              [1, 2, 3, 4, 5].map((n) => <SkeletonListitem key={n} />)}
            {isError || (albumdata?.error && <h1>Something went wrong.</h1>)}
            {!isLoading &&
              !isError &&
              itemsList?.map((song) => (
                <SongListItem key={song.id} song={song} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
