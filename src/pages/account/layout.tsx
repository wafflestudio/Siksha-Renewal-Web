import styled from "styled-components";
import { GlobalStyle } from "../../styles/globalstyle";
import Header from "../../components/Header";

export default function AccountLayout({ children }) {
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
  height: 100%;
  border-radius: 10px 10px 0 0;
  padding: 20px 19px;
  box-sizing: border-box;
`;
