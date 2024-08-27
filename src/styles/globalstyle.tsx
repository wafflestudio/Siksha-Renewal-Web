import { createGlobalStyle, css } from "styled-components";

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

    @media (max-width: 768px) {
      min-width: 0;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
  input, textarea, button {
    font-family: "NanumSquare", "NIXGONFONTS V2.0";
  }

  * {
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 일부 안드로이드 브라우저를 위한 설정 */
    -webkit-focus-ring-color: transparent; /* 일부 최신 버전의 크롬을 위한 설정 */
  }

  /* constants */
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
