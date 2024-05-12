import axios from "axios";
import Header from "../../components/Header";
import ContextProvider from "../../hooks/ContextProvider";
import { GlobalStyle } from "../../styles/globalstyle";
import APIendpoint from "../../constants/constants";

export default function Account() {
  const access_token = localStorage.getItem("access_token");
  console.log(`${APIendpoint()}/auth/me`);
  axios
    .get(`${APIendpoint()}/auth/me`, {
      headers: { "authorization-token": `Bearer ${access_token}` },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
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
