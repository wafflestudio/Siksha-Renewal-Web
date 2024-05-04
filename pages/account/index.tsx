import Header from "../../components/Header";
import ContextProvider from "../../hooks/ContextProvider";
import { GlobalStyle } from "../../styles/globalstyle";

export default function Account() {
  return (
    <>
      <GlobalStyle />
      <ContextProvider>
        <Header />
      </ContextProvider>
      <div>account</div>
    </>
  );
}
