import { useRouter } from "next/router";
import Header from "../../../components/Header";
import ContextProvider from "../../../hooks/ContextProvider";
import { GlobalStyle } from "../../../styles/globalstyle";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <GlobalStyle />
      <ContextProvider>
        <Header />
      </ContextProvider>
      <div>{id}</div>
    </>
  );
}
