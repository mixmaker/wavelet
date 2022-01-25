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
body{
    //#1f1919
    scrollbar-width: thin;
    scrollbar-color: #ee6c4d #f1f1f1;
    background-color: rgb(19, 16, 16);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5rem;
    font-family: 'Padauk', sans-serif;
    overflow-x: hidden;
}
.artist{
    font-family: 'Indie Flower', cursive;
    letter-spacing: 1px;
  }
  .left{
      /* position: absolute; */
      left: 5.5rem;
      width: calc(100% - 5.5rem);
  }
`;
export default GlobalStyles;
