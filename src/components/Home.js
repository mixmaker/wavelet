import React, { useContext, useEffect } from "react";
import styled from "styled-components";
//import context
import MainContext from "../context/MainContext";
//api
import { albumURL, homeDataURL } from "../api/base";
import { getResponse } from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  const { homedata, setHomedata, setProgress,setAlbumdata } =
    useContext(MainContext);
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
    setAlbumdata(data);
  };
  // let item;
  // let marker;
  // const indicator = (e) => {
  //   marker.style.left = e.offsetLeft + "px";
  //   marker.style.width = e.offsetWidth + "px";
  // };
  // const getelements = () => {
  //   item = document.querySelectorAll(".card1");
  //   marker = document.querySelector(".marker");
  //   console.log(item)
  //   console.log(marker)
  //   console.log("i run")
  // };
  // useEffect(() => {
  //   setProgress(40);
  //   homedata && setProgress(100);
  //   homedata && getelements()
  // }, [homedata]);

  // const fun = () => {
  //   // if (item === undefined || marker === undefined) {
  //   //   getelements();
  //   // }
  //   // if (item !== undefined && marker !== undefined) {
  //     item.forEach((link) => {
  //       link.addEventListener("mouseover", (e) => {
  //         indicator(e.target);
  //       });
  //       link.addEventListener("mouseout", (e) => {
  //         marker.style.width = 0;
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
            <div className="wrapper">
              <div className="marker"></div>
              {homedata &&
                homedata.new_trending.map((element) => {
                  return (
                    <Link to={'/home/'+element.type+'/'+element.id}>
                    <div
                      className="card1"
                      // onMouseOver={() => fun()}
                      key={element.id}
                      onClick={() => getAlbumdata(element.type, element.id)}
                      >
                      <img src={element.image} alt="img" />
                      <div className="details">
                        <h3 className="title">{element.title}</h3>
                        <h4 className="type">{element.type}</h4>
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
            <div className="wrapper">
              {homedata &&
                homedata.top_playlists.map((element) => {
                  return (
                    <Link to={'/home/'+element.type+'/'+element.id}>
                    <div className="card2" key={element.id}>
                      <img src={element.image} alt="img" />
                      <h3 className="title">{element.title}</h3>
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
            <div className="wrapper">
              {homedata &&
                homedata.new_albums.map((element) => {
                  return (
                    <Link to={'/home/'+element.type+'/'+element.id}>
                    <div className="card3" key={element.id}>
                      <img className="pe" src={element.image} alt="img" />
                      <h3 className="title pe">{element.title}</h3>
                      <h4 className="type pe">{element.type}</h4>
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
  min-height: 90vh;
  position: relative;
  a{
    text-decoration: none;
    color: white;
  }
  .loading {
    position: relative;
    left: 40%;
    top: 50%;
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
      height: max-content;
      /* border: 1px solid grey; */
      transition: 0.7s;
      &:hover {
        background: #ccc;
        color: black;
      }
      img {
        height: 200px;
        object-fit: fill;
        pointer-events: none;
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
