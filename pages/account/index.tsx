import axios from "axios";
import Header from "../../components/Header";
import ContextProvider from "../../hooks/ContextProvider";
import { GlobalStyle } from "../../styles/globalstyle";
import APIendpoint from "../../constants/constants";

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
