import { ReactNode } from "react";
import styled from "styled-components";
import { layoutStyle } from "./layout.types";

type LayoutProps = { children: ReactNode } & layoutStyle;

const TwoColumnLayout = styled.div<LayoutProps>`
  box-sizing: border-box;
  display: flex;
  margin: ${(props) => props.margin || "0 auto"};
  padding: ${(props) => props.padding || "0 24px"};
  max-width: 1242px;
  gap: 30px;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};

  @media (max-width: 900px) {
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    display: none; /* 데스크톱 전용 layout */
  }
`;

const Left = styled.div`
  flex: 0 0 378px;

  @media (max-width: 900px) {
    flex: 0 0 360px;
  }
`;

const Right = styled.div`
  flex: 1;
  max-width: 786px;
  min-width: 0; // flex: 1에 의한 min-width: auto 설정 제거

  @media(max-width: 900px) {
    max-width: 445px;
  }
`;

export { TwoColumnLayout, Left, Right };
