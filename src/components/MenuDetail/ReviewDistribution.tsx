import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Stars from "./Stars";

export default function ReviewDistribution({
  totalReviewCount,
  score,
  distribution,
}: {
  totalReviewCount: number;
  score: number;
  distribution: number[];
}) {
  if (distribution.length !== 5) {
    return null;
  }
  return (
    <Container>
      <ScoreContainer>
        <Score>{score.toFixed(1)}</Score>
        <ThemeProvider theme={{ width: 180 }}>
          <Stars score={score} />
        </ThemeProvider>
      </ScoreContainer>
      <DistributionChart>
        {distribution.map((count, i) => (
          <DistributionBarWithText key={i}>
            <DistributionText key={i}>
              {i + 1}
              <StarImg src={"/img/star-neutral-base.svg"} />
            </DistributionText>
            <DistributionBar percentage={(count / totalReviewCount) * 100} />
          </DistributionBarWithText>
        ))}
        <TotalReviewCountText>
          총<TotalReviewCountContainer> {totalReviewCount}명</TotalReviewCountContainer>이
          평가했어요!
        </TotalReviewCountText>
      </DistributionChart>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 33px 0 33px;
  @media (max-width: 768px) {
    padding: 14px 0 16px 0;
  }
`;

const Score = styled.div`
  text-align: center;
  font-size: 45px;
  font-weight: 700;
  margin-top: 68px;
  margin-bottom: 16px;
  line-height: 51px;
  @media (max-width: 768px) {
    font-size: 32px;
    margin-right: 32px;
    margin-left: 32px;
    margin-top: 30px;
    margin-bottom: 4px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 90px;
  margin-right: 10%;
  @media (max-width: 768px) {
    width: 90px;
    height: fit-content;
    margin-right: 26px;
  }
`;

const DistributionChart = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 5px;
    width: max-content;
  }
`;

const DistributionBarWithText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DistributionBar = styled.div<{ percentage: number }>`
  width: calc(${(props) => props.percentage + 2}% * 0.9 - 41px);
  height: 16px;
  background: #ff9522;
  border-radius: 0 5px 5px 0;
  margin-left: 9px;
  @media (max-width: 768px) {
    width: ${(props) => props.percentage * 2 + 4}px;
    height: 8px;
    border-radius: 0 5px 5px 0;
  }
`;

const DistributionText = styled.div`
  display: flex;
  width: 32px;
  font-size: 12px;
  font-weight: 700;
  color: #919191;
  align-items: end;
  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const StarImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
    margin-left: 4px;
  }
`;

const TotalReviewCountContainer = styled.span`
  font-weight: 800;
  color: #fe8c59;
`;

const TotalReviewCountText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #919191;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
