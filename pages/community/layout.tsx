import { ReactElement } from "react";
import Header from "../../components/Header";
import ContextProvider, { useStateContext } from "../../hooks/ContextProvider";
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
      <ContextProvider>
        <Header />
        <Content>{children}</Content>
      </ContextProvider>
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
  height: max(910px, 100vh);
  background: white;
  border-radius: 10px 10px 0 0;
  padding: 20px 19px;
  box-sizing: border-box;
`;
