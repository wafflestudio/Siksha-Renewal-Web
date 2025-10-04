import { styled } from "styled-components";
import { KeywordReviewScore } from "types";
import TasteIcon from "assets/icons/keyword-taste.svg";
import PriceIcon from "assets/icons/keyword-price.svg";
import CompositionIcon from "assets/icons/keyword-composition.svg";
import { ReactNode } from "react";

interface KeywordReviewProps {
  data: KeywordReviewScore;
}
type FeedbackItem = {
  emoji: ReactNode;
  text: string;
  count: number;
  gauge: number; // 0 ~ 100 (%)
};
export default function KeywordReviewChart({ data }: KeywordReviewProps) {
  const feedbacks: FeedbackItem[] = [
    {
      emoji: <TasteIcon />,
      text: data.taste_keyword,
      count: data.taste_cnt,
      gauge: 0, // TODO: gauge 계산 로직 필요
    },
    {
      emoji: <PriceIcon />,
      text: data.price_keyword,
      count: data.price_cnt,
      gauge: 0,
    },
    {
      emoji: <CompositionIcon />,
      text: data.food_composition_keyword,
      count: data.food_composition_cnt,
      gauge: 0,
    },
  ];

  return (
    <Container>
      {feedbacks.map((item, idx) => (
        <FeedbackRow key={idx}>
          <Gauge gauge={item.gauge} />
          <Left>
            <Emoji>{item.emoji}</Emoji>
            <Text gauge={item.gauge}>{item.text}</Text>
          </Left>
          <Count>{item.count}</Count>
        </FeedbackRow>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const FeedbackRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--SemanticColor-Background-Tertiary); /* 기본 회색 배경 */
  border-radius: 8px;
  padding: 6px 20px 6px 14px;
  overflow: hidden;
`;

const Gauge = styled.div<{ gauge: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ gauge }) => `${gauge}%`};
  background: var(--Color-Foundation-Tint-orange);
  border-radius: 8px;
  transition: width 0.3s ease;
  z-index: 0;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 1; /* 게이지 위로 */
  height: 24px;
`;

const Emoji = styled.span`
  font-size: 16px;
`;

const Text = styled.span<{ gauge: number }>`
  font-size: 14px;
  font-weight: 700;
  color: ${({ gauge }) =>
    gauge === 0 ? `var(--Color-Foundation-gray-600)` : `var(--Color-Foundation-gray-800)`};
  line-height: 140%;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const Count = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: var(--Color-Foundation-orange-500);
  z-index: 1;
`;
