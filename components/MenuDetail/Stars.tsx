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
  width: 60px;
  gap: 1px;
`;

const Star = styled.img`
  width: 12px;
  height: 12px;
  fill: #ffd600;
`;
