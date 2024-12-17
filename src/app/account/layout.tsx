"use client"

import styled from "styled-components";

export default function AccountLayout({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
const Container = styled.div`
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
  padding: 37px 0 31.4px 0;
  height: 100%;

  @media (max-width: 768px) {
    padding: 0;
  }
`;
