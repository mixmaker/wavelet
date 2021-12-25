import React, { useRef } from "react";
import styled from "styled-components";
import bg from "../images/bg.png";
import { Link } from "react-router-dom";

const Home = ({ loaderRef }) => {
  return (
    <StyledHome className="home left">
      <h1 className="logo">Wavelet</h1>
      <div className="bg">
        <img src={bg} alt="" />
      </div>
      <div className="text">
        <h2>
          Let the <span>music </span>take you away...
        </h2>
        <h3>Start listening to your favourite songs now</h3>
        <Link
          to="/search"
          onClick={() => {
            loaderRef.current.continuousStart();
            setTimeout(()=>loaderRef.current.complete(), 0)
          }}
        >
          Explore <span>→</span>
        </Link>
      </div>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  height: 100vh;
  padding: 2rem;
  overflow: hidden;
  background: linear-gradient(
    118.91deg,
    #241e3a 7.94%,
    #181138 17.77%,
    #020112 49.48%
  );

  .logo {
    font-family: "Shadows Into Light", cursive;
  }
  .text {
    padding-left: 1rem;
    height: 100%;
    width: 70%;
    position: relative;
    top: 30%;

    h2 {
      font-size: 6rem;
      line-height: 90%;

      span {
        color: #ee6c4d;
        text-shadow: 5px 7px 30px #ee6c4d;
      }
    }
    h3 {
      font-size: 1.4rem;
      margin: 0.5rem 0 2rem 0;
      color: #c7edea;
    }
    a {
      text-decoration: none;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border: 2px solid #dd805e;
      border-radius: 14px;
      cursor: pointer;
      background: transparent;
      color: #fff;
      transition: 0.5s ease;
      &:hover {
        box-shadow: 5px 5px 30px 3px #dd805e;
        background-color: #dd805e;
      }
      &:hover ~ span {
        transform: translateX(20px);
      }
    }
  }
  .bg {
    position: absolute;
    right: -5%;
    top: 0;
  }
`;

export default Home;
