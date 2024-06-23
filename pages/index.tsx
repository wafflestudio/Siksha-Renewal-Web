import Header from "../components/Header";
import Body from "../components/Body";
import { GlobalStyle } from "../styles/globalstyle";

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Body />
    </>
  );
}
