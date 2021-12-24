import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Home = () => {
  // let favSongs = JSON.parse(localStorage.getItem("ids"));
  return (
    <StyledHome>
      <h3>Your recent songs will appear here...</h3>
      {/* {favSongs &&
        favSongs.map((id) => {
            return <Card id={id} />;
          })
        } */}
    </StyledHome>
  );
};

const StyledHome = styled.div`
  position: relative;
  width: 100%;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`;

export default Home;
