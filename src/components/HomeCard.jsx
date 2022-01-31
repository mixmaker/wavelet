import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import MainContext from "../context/MainContext";
//api
import { albumURL } from "../api/base";
import { getResponse } from "../api";
import styled from "styled-components";

const HomeCard = ({ element }) => {
  const {
    setAlbumdata,
    setisPlaying,
    setCurrentSong,
    setProgress,
    decodeHTML,
  } = useContext(MainContext);

  const getAlbumdata = async (type, id) => {
    const albumUrl = albumURL(type, id);
    const data = await getResponse(albumUrl);
    if (type === "album" || "playlist") {
      setAlbumdata(data);
    }
    if (type === "song") {
      setCurrentSong(data.songs[0]);
      setisPlaying(true);
    }
  };
  return (
    <StylesHomeCard>
      <Link to={"/home/" + element.type + "/" + element.id} key={element.id}>
        <div
          className="card"
          onClick={() => {
            setProgress(40);
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
      </Link>
    </StylesHomeCard>
  );
};

const StylesHomeCard = styled.div`
  .card {
    position: relative;
    /* display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center; */
    margin: 0 1rem;
    padding: 1rem;
    /* overflow: hidden; */
    max-width: 250px;
    height: 100%;
    z-index: 100;
    transition: 0.5s;
    &:hover {
      transform: scale(1.02);
      background: rgba(70, 74, 87, 1);
    }
    /* &::before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transition: 0.5s;
        z-index: -2;
        /* opacity: 0; 
        transform: scale(0);
    }
    &:hover::before {
        background: linear-gradient(
            135deg,
            rgba(207, 193, 245, 0.353),
            rgba(91, 132, 221, 0.625)
            );
            /* background-color: blue; 
            transform: scale(1);
            /* opacity: 1; 
        } */
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
    }
  }
`;
export default HomeCard;
