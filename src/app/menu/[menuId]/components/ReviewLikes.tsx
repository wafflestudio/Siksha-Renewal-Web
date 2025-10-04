import styled from "styled-components";
import LikesIcon from "assets/icons/review-likes.svg";

export default function ReviewLikes({
  count,
  isLiked,
  onClick,
}: {
  count: number;
  isLiked: boolean;
  onClick: () => void;
}) {
  return (
    <Container isLiked={isLiked} onClick={onClick}>
      <LikesIcon
        color={isLiked ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-500)"}
      />
      <CountText isLiked={isLiked}>{count}</CountText>
    </Container>
  );
}

const Container = styled.div<{ isLiked: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 6px;
  border: ${({ isLiked }) =>
    isLiked
      ? "1px solid var(--Color-Foundation-orange-300)"
      : "1px solid var(--SemanticColor-Border-Secondary)"};
  padding: 4px 8px;
  gap: 4px;
  margin-top: 14px;
  cursor: pointer;
`;

const CountText = styled.div<{ isLiked: boolean }>`
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: ${({ isLiked }) =>
    isLiked ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-600)"};
`;
