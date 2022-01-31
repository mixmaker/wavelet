import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
//import context
import MainContext from "../context/MainContext";
//api
import { albumURL, homeDataURL } from "../api/base";
import { getResponse } from "../api";
import HomeCard from "../components/HomeCard";
//components

const Home = () => {
  document.title = "Wavelet | Home";
  const {
    homedata,
    setHomedata,
    setProgress,
    setAlbumdata,
    setCurrentSong,
    setisPlaying,
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
          <LazyLoad offset={100} once>
            <div className="fixed">
              <div className="homewrapper">
                {homedata &&
                  homedata.new_trending.map((element) => {
                    return <HomeCard element={element} />;
                  })}
              </div>
            </div>
          </LazyLoad>
        </div>
      )}
      {homedata && (
        <div className="topPlaylists">
          <h2 className="heading">Top Playlists</h2>
          <LazyLoad offset={100} once>
            <div className="fixed">
              <div className="homewrapper">
                {homedata &&
                  homedata.top_playlists.map((element) => {
                    return <HomeCard element={element} />;
                  })}
              </div>
            </div>
          </LazyLoad>
        </div>
      )}
      {homedata && (
        <div className="newAlbums">
          <h2 className="heading">New Albums</h2>
          <LazyLoad>
            <div className="fixed">
              <div className="homewrapper">
                {homedata &&
                  homedata.new_albums.map((element) => {
                    return <HomeCard element={element} />;
                  })}
              </div>
            </div>
          </LazyLoad>
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
  }
`;

export default Home;
// background: linear-gradient(
//   135deg,
//   rgba(207, 193, 245, 0.353),
//   rgba(91, 132, 221, 0.625)
// );
