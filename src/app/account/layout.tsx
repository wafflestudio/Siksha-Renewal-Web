"use client";

import styled from "styled-components";
import OneColumnLayout from "styles/layouts/OneColumnLayout";

export default function AccountLayout({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
const Container = styled(OneColumnLayout.Container)`
  padding: 0;
  margin: 22px auto 0 auto;
  max-width: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-top: 0;
    padding-top: 44px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    padding: 0;
  }
`;
