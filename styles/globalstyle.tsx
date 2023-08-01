import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NIXGONFONTS V2.0';
    src: url('/font/NIXGONFONTS L 2.0.ttf') format('truetype'),
    url('/font/NIXGONFONTS L 2.0.otf') format('opentype');
    
    font-weight: 400;
  }
  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareExtraBold.ttf') format('truetype'),
    url('/font/NanumSquareOTFExtraBold.otf') format('opentype');

    font-weight: 1000;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareBold.ttf') format('truetype'),
    url('/font/NanumSquareOTFBold.otf') format('opentype');

    font-weight: 700;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareRegular.ttf') format('truetype'),
    url('/font/NanumSquareOTFRegular.otf') format('opentype');

    font-weight: 400;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('/font/NanumSquareLight.ttf') format('truetype'),
    url('/font/NanumSquareOTFLight.otf') format('opentype');

    font-weight: 100;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: #F8F8F8;
    -ms-overflow-style: none;
    font-family: NanumSquare, sans-serif;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
