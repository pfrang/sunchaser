import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: #CFD1DE;
  }

  img[width], img[height] {
    max-width: none;
    /* height: 100%; */
  }

  h3 {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .rdp-button_reset.rdp-button.rdp-day.daypicker-selected-date {
    font-weight: bold !important;
    /* background-color: var(--rdp-background-color); */
  }

  .rdp-button_reset:hover:not([disabled]) {
    background-color: #2C5C32 !important;
  }


  dialog {
    pointer-events: none;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  dialog[open] {
    opacity: 1;
    pointer-events: inherit;
    transform: translateY(-50%, 0);
  }

  .range-thumb {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    fill: #555;
    pointer-events: none;
    /* Allow interaction with the hidden thumb */
    z-index: 2;
  }

  .range-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background: #ddd;
    outline: none;
    opacity: 0;
    /* Hide the default thumb */
    position: relative;
    z-index: 1;
  }

  #bouncingArrow {
    margin-top: 100px;
    right: 20px;
    animation: 2s infinite bounce;
  }


  @keyframes bounce {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(10px);
    }

    100% {
      transform: translateX(0px);
    }
  }

`;
