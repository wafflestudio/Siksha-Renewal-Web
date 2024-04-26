import Header from "../components/Header";
import Body from "../components/Body";
import { GlobalStyle } from "../styles/globalstyle";
import LoginModal from "../components/Auth/LoginModal";
import { useStateContext } from "../hooks/ContextProvider";

export default function Home() {
  const state = useStateContext();

  const { isLoginModal } = state;

  return (
    <>
      {isLoginModal && <LoginModal />}
      <GlobalStyle />
      <Header />
      <Body />
    </>
  );
}
