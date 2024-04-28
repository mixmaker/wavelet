import React from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../context/useAppContext";
import { cn } from "../cn";

const Card = ({ element }) => {
  const { setAlbumInfo, decodeHTML } = useAppContext();

  const navigate = useNavigate();
  const isArtist = element.more_info?.featured_station_type === "artist";

  return (
    <div
      className="cursor-pointer w-[240px] m-4 shadow-lg transition duration-500 ease-in-out transform hover:scale-105"
      onClick={() => {
        setAlbumInfo({ title: element.title, image: element.image });
        navigate(
          `/${element.type}/${
            element.type === "radio_station"
              ? element.more_info.query
              : element.id
          }`
        );
      }}
    >
      <div
        className={cn(
          "w-[200px] rounded-xl overflow-clip",
          isArtist ? "rounded-full" : ""
        )}
      >
        <img src={element.image} alt="img" className="w-full object-cover" />
      </div>
      <div className="p-2 flex flex-col items-center justify-center text-center">
        <h3 className="line-clamp-1 w-10/12 text-sm text-zinc-300">
          {decodeHTML(element.title)}
        </h3>
        <h4 className="text-sm tracking-tight font-light text-zinc-400">
          {element.type}
        </h4>
      </div>
    </div>
  );
};

export default Card;
