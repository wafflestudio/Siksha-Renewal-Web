import Header from "../components/Header";
import Body from "../components/Body";
import ContextProvider from "../hooks/ContextProvider";
import { GlobalStyle } from "../styles/globalstyle";

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
