import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
import useAppContext from "../context/useAppContext";
//api
import { albumURL } from "../api/base";
import { getResponse } from "../api";
import styled from "styled-components";

const HomeCard = ({ element }) => {
  const {
    albumdata,
    setAlbumdata,
    setisPlaying,
    setCurrentSong,
    setProgress,
    decodeHTML,
  } = useAppContext();

  const getAlbumdata = async (type, id) => {
    const albumUrl = albumURL(type, id);
    const data = await getResponse(albumUrl);
    if (type === "song") {
      setCurrentSong(data.songs[0]);
      setisPlaying(true);
    }
    if (type === "album" || type === "playlist") {
      setAlbumdata({
        ...albumdata,
        ...data,
        image: data.image.replace("150x150", "500x500"),
      });
    }
  };
  const navigate2 = useNavigate();

  return (
    <StylesHomeCard>
      <div
        className="card"
        onClick={() => {
          if (element.type !== "song") {
            navigate2("/home/" + element.type + "/" + element.id);
            setProgress(40);
            setAlbumdata({
              title: element.title,
              type: element.type,
              image: element.image,
            });
          }
          getAlbumdata(element.type, element.id);
          setProgress(100);
        }}
      >
        <LazyLoad>
          <img src={element.image} alt="img" />
        </LazyLoad>
        <div className="details">
          <h3 className="title">{decodeHTML(element.title)}</h3>
          <h4 className="type secondary">{element.type}</h4>
        </div>
      </div>
    </StylesHomeCard>
  );
};

const StylesHomeCard = styled.div`
  .card {
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0;
    margin: 0 1rem;
    overflow: hidden;
    width: 240px;
    height: 100%;
    z-index: 100;
    transition: 0.5s;
    &:hover {
      background: rgba(80, 91, 128, 0.412);
      /* background-image: url("https://www.transparenttextures.com/patterns/binding-dark.png"); //just for fun */
    }

    // paper folding effect from --> https://codepen.io/Afzl/pen/gOxPbp
    &::before {
      content: "";
      display: block;
      bottom: 0;
      right: 0;
      width: 0;
      border-color: rgba(107, 125, 185, 0.6) rgba(36, 36, 36, 0.3)
        rgba(36, 36, 36, 0.3) rgba(107, 125, 185, 0.6);
      border-radius: 5px 0 0 0;
      position: absolute;
      border-width: 0px;
      border-style: solid;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
      transition: border-width 0.2s;
      /* background-color: blue; */
    }
    &:hover:before {
      border-width: 15px;
    }

    img {
      height: 200px;
      object-fit: fill;
      pointer-events: none;
    }
    h3 {
      width: 100%;
      word-wrap: break-word;
      /* overflow: wrap; */
    }
    .details {
      height: max-content;
      overflow: hidden;
      width: 100%;
      pointer-events: none;
      padding-left: 0.5rem;
    }
  }
`;
export default HomeCard;
