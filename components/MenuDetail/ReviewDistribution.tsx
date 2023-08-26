import React from "react";
import styled from "styled-components";
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
        <Stars score={score} />
      </ScoreContainer>
      <DistributionChart>
        <ReviewTotalCountText>총 {totalReviewCount}명이 평가했어요!</ReviewTotalCountText>
        {distribution.reverse().map((count, i) => (
          <DistributionBarWithText>
            <DistributionText key={i}>
              {5 - i}
              <img
                src="/img/star-neutral-base.svg"
                width="8px"
                height="8px"
                style={{ marginLeft: "4px" }}
              />
            </DistributionText>
            <DistributionBar percentage={(count / totalReviewCount) * 100} />
          </DistributionBarWithText>
        ))}
      </DistributionChart>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-top: 60px;
  margin-left: 26px;
`;

const Score = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  margin-right: 32px;
  margin-left: 32px;
  margin-bottom: 4px;
  margin-top: 30px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  height: 90px;
  margin-right: 26px;
`;

const DistributionChart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const DistributionBarWithText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DistributionBar = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage * 2.3 + 4}px;
  height: 8px;
  background: #ff9522;
  border-radius: 0 5px 5px 0;
  margin-left: 9px;
`;

const DistributionText = styled.div`
  font-size: 8px;
  font-weight: 700;
  color: #919191;
`;

const ReviewTotalCountText = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #919191;
`;
