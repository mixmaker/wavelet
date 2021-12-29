import React, { useEffect, useContext } from "react";
import MainContext from "../context/MainContext";
import styled from "styled-components";
import bg from "../images/bg.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const logoVariants = {
  hidden: {
    y: 50,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};
const Home = () => {
  //import contexts
  const { setProgress } = useContext(MainContext);
  //set top-loading-bar progress to 100 when page is completely loaded
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);
  return (
    <StyledHome className="home">
      <div className="logoDiv">
        <motion.div
          className="logo"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="letter1" variants={letterVariants}>
            W
          </motion.h1>
          <motion.h1 className="letter2" variants={letterVariants}>
            a
          </motion.h1>
          <motion.h1 className="letter3" variants={letterVariants}>
            v
          </motion.h1>
          <motion.h1 className="letter4" variants={letterVariants}>
            e
          </motion.h1>
          <motion.h1 className="letter5" variants={letterVariants}>
            l
          </motion.h1>
          <motion.h1 className="letter6" variants={letterVariants}>
            e
          </motion.h1>
          <motion.h1 className="letter7" variants={letterVariants}>
            t
          </motion.h1>
        </motion.div>
      </div>
      <div className="bg">
        <img src={bg} alt="" />
      </div>
      <div className="text">
        <motion.h2>
          Let the <span>music </span>take you away...
        </motion.h2>
        <motion.h3>Start listening to your favourite songs now</motion.h3>
        <Link to="/home">
          Explore <span>→</span>
        </Link>
      </div>
    </StyledHome>
  );
};

const StyledHome = styled(motion.div)`
  position: absolute;
  height: 100vh;
  width: 100%;
  padding: 2rem;
  overflow: hidden;
  z-index: 5;
  background: linear-gradient(
    118.91deg,
    #241e3a 7.94%,
    #181138 17.77%,
    #020112 49.48%
  );
  .logoDiv {
    height: max-content;
    overflow: hidden;
    .logo {
      display: flex;
      font-size: 1.3rem;
      font-family: "Shadows Into Light", cursive;
      overflow: hidden;
      height: max-content;
    }
  }
  .text {
    padding-left: 2rem;
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
      border: 2px solid #ee6c4d;
      border-radius: 14px;
      cursor: pointer;
      background: transparent;
      color: #fff;
      transition: 0.5s ease;
      &:hover {
        box-shadow: 5px 5px 30px 3px #ee6c4d;
        background-color: #ee6c4d;
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
    overflow: hidden;
  }
`;

export default Home;
