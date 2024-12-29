"use client"

import styled from "styled-components";

export default function MenuLayout({ children }) {
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
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
