import React, { useContext, useEffect } from "react";
import styled from "styled-components";
//import context
import MainContext from "../context/MainContext";
//api
import { albumURL, homeDataURL } from "../api/base";
import { getResponse } from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  document.title = "Wavelet | Home";
  const {
    homedata,
    setHomedata,
    setProgress,
    setAlbumdata,
    setCurrentSong,
    setisPlaying,
    decodeHTML,
  } = useContext(MainContext);
  const homeUrl = homeDataURL();
  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const data = await getResponse(homeUrl);
        setProgress(40);
        setHomedata(data);
        setProgress(100);
      } catch (error) {
        alert("Something went wrong: " + error);
        setProgress(100);
      }
    };
    dataFetcher();
    // eslint-disable-next-line
  }, [homeUrl]);

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
  // let item;
  // let marker;
  // const indicator = (e) => {
  //   console.log(itemRef.current);
  //   markerRef.current.style.left = e.offsetLeft + "px";
  //   markerRef.current.style.width = e.offsetWidth + "px";
  // };
  // const getelements = () => {
  //   // item = document.querySelectorAll(".card1");
  //   // marker = document.querySelector(".marker");

  // };
  // const markerRef = useRef(null);
  // const itemRef = useRef(null);
  // useEffect(() => {
  // }, [homedata]);

  // const fun = () => {
  //   // if (item === undefined || marker === undefined) {
  //   //   getelements();
  //   // }
  //   // if (item !== undefined && marker !== undefined) {
  //     itemRef.forEach((link) => {
  //       link.addEventListener("mouseover", (e) => {
  //         indicator(e.target);
  //       });
  //       link.addEventListener("mouseout", (e) => {
  //         markerRef.style.width = 0;
  //       });
  //     });
  //   // }
  // };

  return (
    <StyledHome className="left">
      <h1 className="home">Home</h1>
      {!homedata && (
        <div className="loading">
          <h1>Loading, please wait...</h1>
        </div>
      )}
      {homedata && (
        <div className="newTrending">
          <h2 className="heading">New Trending</h2>
          <div className="fixed">
            <div className="homewrapper">
              <div className="marker"></div>
              {homedata &&
                homedata.new_trending.map((element) => {
                  return (
                    <Link
                      to={"/home/" + element.type + "/" + element.id}
                      key={element.id}
                    >
                      <div
                        className="card1"
                        // onMouseOver={(e)=> indicator(e)}
                        // ref={itemRef}
                        onClick={() => {
                          setProgress(40);
                          getAlbumdata(element.type, element.id);
                          setProgress(100);
                        }}
                      >
                        <img src={element.image} alt="img" />
                        <div className="details">
                          <h3 className="title">{decodeHTML(element.title)}</h3>
                          <h4 className="type secondary">{element.type}</h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {homedata && (
        <div className="topPlaylists">
          <h2 className="heading">Top Playlists</h2>
          <div className="fixed">
            <div className="homewrapper">
              {homedata &&
                homedata.top_playlists.map((element) => {
                  return (
                    <Link
                      to={"/home/" + element.type + "/" + element.id}
                      key={element.id}
                    >
                      <div
                        className="card2"
                        onClick={() => {
                          setProgress(40);
                          getAlbumdata(element.type, element.id);
                          setProgress(100);
                        }}
                      >
                        <img src={element.image} alt="img" />
                        <div className="details">
                          <h3 className="title">{decodeHTML(element.title)}</h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {homedata && (
        <div className="newAlbums">
          <h2 className="heading">New Albums</h2>
          <div className="fixed">
            <div className="homewrapper">
              {homedata &&
                homedata.new_albums.map((element) => {
                  return (
                    <Link
                      to={"/home/" + element.type + "/" + element.id}
                      key={element.id}
                    >
                      <div
                        className="card3"
                        onClick={() => {
                          setProgress(40);
                          getAlbumdata(element.type, element.id);
                          setProgress(100);
                        }}
                      >
                        <img
                          // className="pe"
                          src={element.image}
                          alt="img"
                          loading="lazy"
                        />
                        <div className="details">
                          <h3 className="title">{decodeHTML(element.title)}</h3>
                          <h4 className="type secondary">{element.type}</h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </StyledHome>
  );
};

const StyledHome = styled.div`
  margin: 2rem;
  height: 100vh;
  width: 90%;
  position: relative;
  .home {
    font-size: 2.5rem;
  }
  a {
    text-decoration: none;
    color: white;
  }
  .loading {
    position: relative;
    width: 50%;
    left: 40%;
    top: 40%;
    transform: translateX(-50%, -50%);
  }
  .newTrending,
  .topPlaylists,
  .newAlbums {
    margin: 4rem 0;
    padding: 1rem;
    position: relative;

    .heading {
      padding: 0 1rem;
    }
    .fixed {
      position: relative;
      width: 100%;
      &::before {
        content: "";
        position: absolute;
        z-index: 10;
        pointer-events: none;
        top: 0;
        margin: 0;
        left: 0;
        width: 7%;
        height: 100%;
        background: linear-gradient(
          to right,
          rgba(19, 16, 16, 1) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      &::after {
        content: "";
        position: absolute;
        z-index: 10;
        pointer-events: none;
        top: 0;
        margin: 0;
        right: 0;
        width: 10%;
        height: 100%;
        background: linear-gradient(
          to left,
          rgba(19, 16, 16, 1) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
      .homewrapper {
        scrollbar-width: none; // firefox compatible
        padding: 0 2rem;
        position: relative;
        display: flex;
        overflow: auto;
        overflow-y: hidden;
        z-index: 5;
        white-space: nowrap;
        ::-webkit-scrollbar {
          //chrome and edge compatible
          display: none;
        }
      }
    }
    .card1,
    .card2,
    .card3 {
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
  }
  .marker {
    height: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #c2c2c2;
    transition: all 0.5s;
  }
`;

export default Home;
// background: linear-gradient(
//   135deg,
//   rgba(207, 193, 245, 0.353),
//   rgba(91, 132, 221, 0.625)
// );
