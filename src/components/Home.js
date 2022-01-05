import React, { useContext, useEffect } from "react";
import styled from "styled-components";
//import context
import MainContext from "../context/MainContext";
//api
import { homeDataURL, topSearchesURL } from "../api/base";
import { getResponse } from "../api";

const Home = () => {
  const { homedata, setHomedata } = useContext(MainContext);
  const apiUrl = homeDataURL();
  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const data = await getResponse(apiUrl);
        setHomedata(data);
      } catch (error) {
        alert("Something went wrong:" + error);
      }
    };
    dataFetcher();
  }, [apiUrl]);

  return (
    <StyledHome className="left">
      <h1 className="home">Home</h1>
      <div className="newTrending">
        <h2 className="heading">New Trending</h2>
        <div className="fixed">
          <div className="wrapper">
            {homedata &&
              homedata.new_trending.map((element) => {
                return (
                  <div className="card" key={element.id}>
                    <img src={element.image} alt="img" />
                    <h3 className="title">{element.title}</h3>
                    <h4 className="type">{element.type}</h4>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="topPlaylists">
        <h2 className="heading">Top Playlists</h2>
        <div className="fixed">
          <div className="wrapper">
            {homedata &&
              homedata.top_playlists.map((element) => {
                return (
                  <div className="card" key={element.id}>
                    <img src={element.image} alt="img" />
                    <h3 className="title">{element.title}</h3>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="newAlbums">
        <h2 className="heading">New Albums</h2>
        <div className="fixed">
          <div className="wrapper">
            {homedata &&
              homedata.new_albums.map((element) => {
                return (
                  <div className="card" key={element.id}>
                    <img src={element.image} alt="img" />
                    <h3 className="title">{element.title}</h3>
                    <h4 className="type">{element.type}</h4>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  margin: 2rem;

  .newTrending,
  .topPlaylists ,.newAlbums{
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
        width: 5%;
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
      .wrapper {
        padding: 0 2rem;
        position: relative;
        display: flex;
        overflow: auto;
        white-space: nowrap;
        ::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 1rem;
      padding: 1rem;
      /* overflow: hidden; */
      width: 450px;
      /* border: 1px solid grey; */
      transition: 0.7s;

      img {
        height: 200px;
        object-fit: fill;
      }
      &:hover {
        background-color: #c2c2c2;
        color: #303030;
      }
    }
  }
`;

export default Home;
