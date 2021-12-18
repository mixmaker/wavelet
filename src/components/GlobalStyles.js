import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Baloo+2&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Baloo 2', cursive;
}
body{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5rem;
}
`
export default GlobalStyles;