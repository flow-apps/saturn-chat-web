import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    text-decoration: none;
    text-rendering: optimizeLegibility;
  };

  *, input, button {
    font-family: 'Poppins', sans-serif;
  }

  html {
    font-size: 62.5%;

    @media (max-width: 1024px) {
      font-size: 55%;
    }

    @media (max-width: 590px) {
      font-size: 48%;
    }
  }

  body {
    background-color: ${props => props.theme.colors.background};
    height: 100%;
  }
`