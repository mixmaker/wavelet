import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5rem;
    font-family: 'Padauk', sans-serif;
}
.artist{
    font-family: 'Indie Flower', cursive;
  }
`
export default GlobalStyles;