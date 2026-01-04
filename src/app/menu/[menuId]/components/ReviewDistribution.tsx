import React from "react";
import styled from "styled-components";
import Stars from "./Stars";
import Image from "next/image";
import useIsMobile from "hooks/UseIsMobile";
import ThemedWrapper from "components/general/ThemedWrapper";

export default function ReviewDistribution({
  reviewsTotalCount,
  score,
  distribution,
}: {
  reviewsTotalCount: number;
  score: number;
  distribution: number[];
}) {
  const isMobile = useIsMobile();
  
  if (distribution.length !== 5) {
    return null;
  }

  return (
    <Container>
      <ScoreContainer>
        <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "4px",
        }}>
          <Score>{score.toFixed(1)}</Score>
          <MaximumScore>/5</MaximumScore>
        </div>
        <ThemedWrapper theme={{ width: isMobile ? 71.09 : 140 }}>
          <Stars score={score} />
        </ThemedWrapper>
        <ReviewsTotalCount>
          후기 {reviewsTotalCount}개
        </ReviewsTotalCount>
      </ScoreContainer>
      <DistributionChart>
        {distribution.map((count, i) => (
          // 텍스트, 바, 숫자 순
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            alignSelf: "stretch",
          }} key={i}>
            <Label key={i}>
              {i + 1}점
            </Label>
            <Bar>
              <Fill percentage={(reviewsTotalCount > 0 ? count / reviewsTotalCount : 0) * 100} />
            </Bar>
            <Count>{count}</Count>
          </div>
        ))}
      </DistributionChart>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Score = styled.div`
  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;

  /* text-28/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-28, 28px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 39.2px */

  @media (max-width: 768px) {
    color: var(--Color-Foundation-base-black, #000);
    text-align: center;

    /* text-32/Bold */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-32, 32px);
    font-style: normal;
    font-weight: var(--Font-weight-bold, 700);
    line-height: 140%; /* 44.8px */
  }
`;

const MaximumScore = styled.div`
  color: var(--Foundation-grey-500, var(--Color-Foundation-gray-500, #BEC1C8));
  text-align: center;

  /* text-20/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-20, 20px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 140%; /* 28px */

  @media (max-width: 768px) {
    display: none;
  }
`;

const ReviewsTotalCount = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    margin-top: 10px;
    color: var(--Color-Foundation-base-black, #000);
    text-align: center;

    /* text-14/Regular */
    font-family: var(--Font-family-sans, NanumSquare);
    font-size: var(--Font-size-14, 14px);
    font-style: normal;
    font-weight: var(--Font-weight-regular, 400);
    line-height: 150%; /* 21px */
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  @media (max-width: 768px) {
    box-sizing: border-box;
    width: 113px;
    height: 120px;
    padding: 11px 12px;
    justify-content: center;
    align-items: center;
    gap: 0;
    flex-shrink: 0;

    border-radius: 16px;
    border: 1px solid var(--Color-Foundation-gray-200, #E5E6E9);
  }
`;

const DistributionChart = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  flex: 1 0 0;
  @media (max-width: 768px) {
  }
`;

const Label = styled.label`
  width: 36px;
  text-align: center;

  color: var(--Color-Foundation-gray-700, #727478);
  
  /* text-14/Bold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-bold, 700);
  line-height: 150%; /* 21px */
`;

const Bar = styled.div`
  background-color: var(--Color-Foundation-gray-100, #f2f3f4);
  height: 8px;
  flex: 1 0 0;
  border-radius: 4px;
`;

const Fill = styled.div<{ percentage: number }>`
  background-color: var(--Color-Foundation-orange-500, #ff9522);
  height: 8px;
  width: ${(props) => props.percentage}%;
  border-radius: 4px;
`;

const Count = styled.div`
  width: 40px;

  color: var(--Color-Foundation-orange-500, #FF9522);

  /* text-14/ExtraBold */
  font-family: var(--Font-family-sans, NanumSquare);
  font-size: var(--Font-size-14, 14px);
  font-style: normal;
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 150%; /* 21px */
`;