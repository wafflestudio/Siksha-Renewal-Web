import { styled } from "styled-components";
import { KeywordReviewScore } from "types";

interface KeywordReviewProps {
  data: KeywordReviewScore;
}

export default function KeywordReviewChart({ data }: KeywordReviewProps) {
  const feedbacks: FeedbackItem[] = [
    {
      emoji: "😊",
      text: data.taste_keyword,
      count: data.taste_cnt,
      gauge: 70, // TODO: gauge 계산 로직 필요
    },
    {
      emoji: "👛",
      text: data.price_keyword,
      count: data.price_cnt,
      gauge: 40,
    },
    {
      emoji: "🍱",
      text: data.food_composition_keyword,
      count: data.food_composition_cnt,
      gauge: 55,
    },
  ];

  return (
    <Container>
      {feedbacks.map((item, idx) => (
        <FeedbackRow key={idx}>
          <Gauge gauge={item.gauge} />
          <Left>
            <Emoji>{item.emoji}</Emoji>
            <Text>{item.text}</Text>
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
`;

type FeedbackItem = {
  emoji: string;
  text: string;
  count: number;
  gauge: number; // 0 ~ 100 (%)
};

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
  gap: 3px;
  z-index: 1; /* 게이지 위로 */
`;

const Emoji = styled.span`
  font-size: 16px;
  padding: 4px;
  position: relative;
  top: -2px;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Count = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #f97316;
  z-index: 1;
`;
