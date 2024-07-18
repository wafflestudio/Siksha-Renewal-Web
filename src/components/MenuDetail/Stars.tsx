import React from "react";
import styled from "styled-components";

export default function Stars({ score }: { score: number }) {
  return (
    <StarContainer>
      {Array.from(Array(5).keys()).map((i) => {
        if (score >= i + 1) {
          return <Star src="/img/star.svg" key={i} />;
        } else if (score >= i + 0.5) {
          return <Star src="/img/star.svg" key={i} />;
        } else {
          return <Star src="/img/star-empty.svg" key={i} />;
        }
      })}
    </StarContainer>
  );
}

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${(props) => (props.theme.width ? props.theme.width : 73.18)}px;
  gap: 1px;
  @media (max-width: 768px) {
    width: 73.18px;
  }
`;

const Star = styled.img`
  width: ${(props) => (props.theme.width ? props.theme.width / 5 : 14.18)}px;
  height: ${(props) => (props.theme.width ? props.theme.width / 5 : 14.18)}px;
  fill: #ffd600;
  @media (max-width: 768px) {
    width: 14.18px;
    height: 14.18px;
  }
`;
