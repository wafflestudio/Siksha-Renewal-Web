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

  @font-face {
    font-family: 'NanumSquare_ac';
    src: url('/font/NanumSquare_acEB.ttf') format('truetype'),
    url('/font/NanumSquareOTF_acEB.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;
    
    font-weight: 1000;
  }

  @font-face {
    font-family: 'NanumSquare_ac';
    src: url('/font/NanumSquare_acB.ttf') format('truetype'),
    url('/font/NanumSquareOTF_acB.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;

    font-weight: 700;
  }

  @font-face {
    font-family: 'NanumSquare_ac';
    src: url('/font/NanumSquare_acR.ttf') format('truetype'),
    url('/font/NanumSquareOTF_acR.otf') format('opentype');
    unicode-range: U+0020-007E, U+AC00-D7A3;

    font-weight: 400;
  }

  @font-face {
    font-family: 'NanumSquare_ac';
    src: url('/font/NanumSquare_acL.ttf') format('truetype'),
    url('/font/NanumSquareOTF_acL.otf') format('opentype');
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
    background: var(--Color-Background-main);
    -ms-overflow-style: none;
    font-family: NanumSquare, sans-serif;

    @media (max-width: 768px) {
      min-width: none;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color: var(--Color-Foundation-base-black);
  }
  input, button, select, option, textarea {
    font-size: 100%;
    font-family: inherit;
  }
  button {
    background: inherit;
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 100%;
    line-height: 1.2;
  }


  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 일부 안드로이드 브라우저를 위한 설정 */
    -webkit-focus-ring-color: transparent; /* 일부 최신 버전의 크롬을 위한 설정 */
    letter-spacing: -0.3px;
  }

  /* constants */
  :root {
    --Color-Background-main: #F8F8F8;
    --Color-Foundation-gray-50: #F8F8F8;
    --Color-Foundation-gray-100: #F2F3F4;
    --Color-Foundation-gray-100-2: #F2F3F4;
    --Color-Foundation-gray-100-3: #F2F3F4;
    --Color-Foundation-gray-200: #E5E6E9;
    --Color-Foundation-gray-200-2: #E5E6E9;
    --Color-Foundation-gray-200-3: #E5E6E9;
    --Color-Foundation-gray-300: #D8DADE;
    --Color-Foundation-gray-400: #CBCDD3;
    --Color-Foundation-gray-500: #BEC1C8;
    --Color-Foundation-gray-600: #989AA0;
    --Color-Foundation-gray-700: #727478;
    --Color-Foundation-gray-700-2: #727478;
    --Color-Foundation-gray-800: #4C4D50;
    --Color-Foundation-gray-900: #262728;
    --Color-Foundation-orange-100: #FFEAD3;
    --Color-Foundation-orange-200: #FFD5A7;
    --Color-Foundation-orange-300: #FFBF7A;
    --Color-Foundation-orange-400: #FFAA4E;
    --Color-Foundation-orange-500: #FF9522;
    --Color-Foundation-orange-500-2: #FF9522;
    --Color-Foundation-orange-500-3: #FF9522;
    --Color-Foundation-orange-600: #D27000;
    --Color-Foundation-orange-700: #A54C00;
    --Color-Foundation-orange-800: #7C2900;
    --Color-Foundation-orange-900: #570000;
    --Color-Foundation-base-white: #FFFFFF;
    --Color-Foundation-base-white-2: #FFFFFF;
    --Color-Foundation-base-white-3: #FFFFFF;
    --Color-Foundation-base-white-4: #FFFFFF;
    --Color-Foundation-base-white-5: #FFFFFF;
    --Color-Foundation-base-black: #000000;
    --Color-Foundation-base-black-2: #000000;
    --Color-Foundation-Tint-orange: #FF952240;

    --Color-Main-Active: #FFE8CE;

    --Color-Accent-like: #F86627;
  }

  .dark {
    --Color-Background-main: #121212;
    --Color-Foundation-gray-50: #1E1E1E;
    --Color-Foundation-gray-100: #202020;
    --Color-Foundation-gray-100-2: #232323;
    --Color-Foundation-gray-100-3: #1E1E1E;
    --Color-Foundation-gray-200: #232323;
    --Color-Foundation-gray-200-2: #2D2D2D;
    --Color-Foundation-gray-200-3: #404040;
    --Color-Foundation-gray-300: #282828;
    --Color-Foundation-gray-400: #2D2D2D;
    --Color-Foundation-gray-500: #404040;
    --Color-Foundation-gray-600: #919191;
    --Color-Foundation-gray-700: #B7B7B7;
    --Color-Foundation-gray-700-2: #2D2D2D;
    --Color-Foundation-gray-800: #CBCBCC;
    --Color-Foundation-gray-900: #E5E6E9;
    --Color-Foundation-orange-100: #F0DCC6;
    --Color-Foundation-orange-200: #F2CA9E;
    --Color-Foundation-orange-300: #F1B573;
    --Color-Foundation-orange-400: #F1A14A;
    --Color-Foundation-orange-500: #F28C1D;
    --Color-Foundation-orange-500-2: #121212;
    --Color-Foundation-orange-500-3: #FFFFFF;
    --Color-Foundation-orange-600: #C76A00;
    --Color-Foundation-orange-700: #984600;
    --Color-Foundation-orange-800: #6B2400;
    --Color-Foundation-orange-900: #410000;
    --Color-Foundation-base-white: #000000;
    --Color-Foundation-base-white-2: #FFFFFF;
    --Color-Foundation-base-white-3: #E5E6E9;
    --Color-Foundation-base-white-4: #121212;
    --Color-Foundation-base-white-5: #232323;
    --Color-Foundation-base-black: #FFFFFF;
    --Color-Foundation-base-black-2: #E5E6E9;
    --Color-Foundation-Tint-orange: #F28C1D40;

    --Color-Main-Active: #FFEAD3;

    --Color-Accent-like: #F86627;
  }
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
