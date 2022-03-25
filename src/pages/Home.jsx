import React, { useEffect } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
//import context
import useAppContext from "../context/useAppContext";
import { useLocation } from "react-router-dom";

//api
import { homeDataURL } from "../api/base";
import { getResponse } from "../api";
import HomeCard from "../components/HomeCard";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import AlbumDetails from "./AlbumDetails";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
//components

const Home = () => {
  document.title = "Wavelet | Home";
  const { homedata, setHomedata, setAlbumdata, setProgress } = useAppContext();
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

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/home") {
      setAlbumdata(undefined);
    }
  }, [location]);

  const locArr = location.pathname.split("/");
  if (locArr[3]) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }
  return (
    <>
      {locArr[3] && <AlbumDetails />}
      <StyledHome className="left">
        <h1 className="home">Home</h1>
        <div className="newTrending">
          <h2 className="heading">New Trending</h2>
          <LazyLoad offset={100} once>
            <div className="fixed">
              <div className="homewrapper">
                {!homedata &&
                  [1, 2, 3, 4, 5].map((n) => <SkeletonCard key={n} />)}
                {homedata &&
                  homedata.new_trending.map((element, index) => {
                    return <HomeCard element={element} />;
                  })}
              </div>
            </div>
          </LazyLoad>
        </div>
        <div className="topPlaylists">
          <h2 className="heading">Top Playlists</h2>
          <LazyLoad offset={100} once>
            <div className="fixed">
              <div className="homewrapper">
                {!homedata &&
                  [1, 2, 3, 4, 5].map((n) => <SkeletonCard key={n} />)}
                {homedata &&
                  homedata.top_playlists.map((element) => {
                    return <HomeCard element={element} />;
                  })}
              </div>
            </div>
          </LazyLoad>
        </div>
        <div className="newAlbums">
          <h2 className="heading">New Albums</h2>
          {!homedata && (
            <div className="fixed">
              <div className="homewrapper">
                {[1, 2, 3, 4, 5].map((n) => (
                  <SkeletonCard key={n} />
                ))}
              </div>
            </div>
          )}
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
      </StyledHome>
    </>
  );
};

const StyledHome = styled(motion.div)`
  padding: 2rem;
  height: 100%;
  width: 90%;
  position: relative;
  .home {
    font-size: 2.5rem;
  }
  a {
    text-decoration: none;
    color: white;
  }
  .newTrending,
  .topPlaylists,
  .newAlbums {
    margin: 2rem 0 4rem 0;
    padding: 1rem;
    position: relative;
    width: 100%;
    .heading {
      padding: 0 0 0.25rem 1rem;
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
