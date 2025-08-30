"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import styled from "styled-components";
import OneColumnLayout from "styles/layouts/OneColumnLayout";
import { BackgroundColor } from "styles/styled";

export default function AccountLayout({ children }) {
  const segments = useSelectedLayoutSegments();
  const sub = segments[0] ?? "";
  const colorMap: Record<string, BackgroundColor> = {
    profile: "secondary",
    mypost: "secondary",
    inquiry: "secondary",
    restaurant: "secondary",
    user: "secondary",
  };
  const containerColor = colorMap[sub];

  return (
    <Container color={containerColor}>
      <Content>{children}</Content>
    </Container>
  );
}
const Container = styled(OneColumnLayout.Container)<{ color?: string }>`
  @media (max-width: 768px) {
    background-color: ${({ color }) =>
      color === "secondary" ? "var(--SemanticColor-Background-Secondary)" : ""};
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
