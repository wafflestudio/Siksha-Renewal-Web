import { styled } from "styled-components";

interface KeywordReviewProps {}

const feedbacks: FeedbackItem[] = [
  { emoji: "😊", text: "또 먹고 싶어요", count: 22, gauge: 70 },
  { emoji: "👛", text: "가성비 좋아요", count: 10, gauge: 40 },
  { emoji: "🍱", text: "알찬 편이에요", count: 17, gauge: 55 },
];

export default function KeywordReview({}: KeywordReviewProps) {
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
