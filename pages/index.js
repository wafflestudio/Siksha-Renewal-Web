import { createGlobalStyle } from "styled-components";
import Header from "../components/Header";
import Body from "../components/Body";
import ContextProvider from "../hooks/ContextProvider";

export const GlobalStyle = createGlobalStyle`
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

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <ContextProvider>
        <Header />
        <Body />
      </ContextProvider>
    </>
  );
}
