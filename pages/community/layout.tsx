import Header from "../../components/Header";
import { GlobalStyle } from "../../styles/globalstyle";
import styled from "styled-components";
import LoginModal from "../../components/Auth/LoginModal";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Content>{children}</Content>
    </>
  );
}

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(700px, 100%);
  margin: 0 auto;
  margin-top: 37px;
  min-height: 100vh;
  max-height: 100%;
  background: white;
  border-radius: 10px 10px 0 0;
  padding: 20px 19px;
  box-sizing: border-box;
`;
