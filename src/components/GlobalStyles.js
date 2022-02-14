import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*, ::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
::-webkit-scrollbar{
    width: .5rem;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #ee6c4d;
  border-radius: 14px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a5533e;
}
html{
  scrollbar-color: #ee6c4d #f1f1f1; // compatible with firefox
  scrollbar-width: thin;
}
body{
    background-color: rgb(19, 16, 16);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5rem;
    font-family: 'Padauk', sans-serif;
    /* overflow-x: hidden; */
}
.artist, .secondary{
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 200;
    letter-spacing: .5px;
  }
  .left{
      margin-left: 7rem;
  }
`;
export default GlobalStyles;
