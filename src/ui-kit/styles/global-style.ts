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
    height: 100%;
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
    background-color: var(--rdp-background-color);
  }

  .datepicker-today-date {
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

  .mySwiper {
    position: static !important;
    display: flex;
    justify-content: space-between;
    justify-items: center;
  }


  .swiper-slide {
    text-align: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    cursor: pointer;
    /* Center slide text vertically */
    /* display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center; */
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
