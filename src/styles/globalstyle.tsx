"use client";

import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NIXGONFONTS V2.0';
    src: url('/font/NIXGONFONTS L 2.0.ttf') format('truetype'),
    url('/font/NIXGONFONTS L 2.0.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;

    font-weight: 400;
  }
  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareExtraBold.ttf') format('truetype'),
    url('/font/NanumSquareOTFExtraBold.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;
    
    font-weight: 1000;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareBold.ttf') format('truetype'),
    url('/font/NanumSquareOTFBold.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;

    font-weight: 700;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareRegular.ttf') format('truetype'),
    url('/font/NanumSquareOTFRegular.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;

    font-weight: 400;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareLight.ttf') format('truetype'),
    url('/font/NanumSquareOTFLight.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;

    font-weight: 100;
  }

  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: #F8F8F8;
    -ms-overflow-style: none;
    font-family: NanumSquare, sans-serif;

    @media (min-width: 768px) and (max-width: 1024px) {
      min-width: 1024px;
    }

    @media (max-width: 768px) {
      min-width: none;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
  input, button, select, option, textarea {
    font-size: 100%;
    font-family: inherit;
  }
  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }

  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 일부 안드로이드 브라우저를 위한 설정 */
    -webkit-focus-ring-color: transparent; /* 일부 최신 버전의 크롬을 위한 설정 */
    letter-spacing: -0.3px;
  }

  /* constants */
  :root {
    --background-main: #F8F8F8;
    --foundation-gray-50: #F8F8F8;
    --foundation-gray-100: #F2F3F4;
    --foundation-gray-200: #E5E6E9;
    --foundation-gray-300: #D8DADE;
    --foundation-gray-400: #CBCDD3;
    --foundation-gray-500: #BEC1C8;
    --foundation-gray-600: #989AA0;
    --foundation-gray-700: #727478;
    --foundation-gray-800: #4C4D50;
    --foundation-gray-900: #262728;
    --foundation-orange-100: #FFEAD3;
    --foundation-orange-200: #FFD5A7;
    --foundation-orange-300: #FFBF7A;
    --foundation-orange-400: #FFAA4E;
    --foundation-orange-500: #FF9522;
    --foundation-orange-600: #D27000;
    --foundation-orange-700: #A54C00;
    --foundation-orange-800: #7C2900;
    --foundation-orange-900: #570000;
    --foundation-base: #FFFFFF;

  }



  /* --main-orange-color: #FF9522 */
`;

export const LoadingAnimation = css`
  animation: menuSlide 0.75s;
  -moz-animation: menuSlide 0.75s;
  -webkit-animation: menuSlide 0.75s;
  -o-animation: menuSlide 0.75s;

  @keyframes menuSlide {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-moz-keyframes menuSlide {
    /* Firefox */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-webkit-keyframes menuSlide {
    /* Safari and Chrome */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-o-keyframes menuSlide {
    /* Opera */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
