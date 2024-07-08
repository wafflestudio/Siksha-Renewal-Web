import styled from "styled-components";
import { GlobalStyle } from "../../styles/globalstyle";
import Header from "../../components/Header";
import MobileNavigationBar from "components/MobileNavigationBar";

export default function AccountLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Content>{children}</Content>
      <MobileNavigationBar />
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 37px;
  height: 100%;
`;
