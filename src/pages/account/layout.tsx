import styled from "styled-components";
import { GlobalStyle } from "../../styles/globalstyle";
import Header from "../../components/Header";
import MobileNavigationBar from "components/MobileNavigationBar";

export default function AccountLayout({ children }) {
  return (
    <Container>
      <GlobalStyle />
      <Header />
      <Content>{children}</Content>
      <MobileNavigationBar />
    </Container>
  );
}
const Container = styled.div`
  @media (max-width: 768px) {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 37px;
  height: 100%;

  @media (max-width: 768px) {
    margin-top: 0px;
    height: 100%;
    overflow: scroll;
  }
`;
