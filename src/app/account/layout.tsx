"use client"

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
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 100%;
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
