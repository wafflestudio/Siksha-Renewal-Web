"use client";

import styled from "styled-components";
import OneColumnLayout from "styles/layouts/OneColumnLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>;
}

const Content = styled(OneColumnLayout.Container)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 37px;
  margin-bottom: 80px;
  height: 100%;
  background: white;
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    margin-left: 150px;
    margin-right: 150px;
  }

  @media (max-width: 768px) {
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    max-width: inherit;
    min-height: auto;
    box-sizing: border-box;
    overflow-x: hidden;
  }
`;
