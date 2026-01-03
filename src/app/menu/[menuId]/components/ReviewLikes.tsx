import styled from "styled-components";
import LikesIcon from "assets/icons/review-likes.svg";
import LikeMobileIcon from "assets/icons/review-likes-mobile.svg";
import LikeMobileOutlinedIcon from "assets/icons/review-likes-mobile-outlined.svg";
import useIsMobile from "hooks/UseIsMobile";

export default function ReviewLikes({
  count,
  isLiked,
  onClick,
}: {
  count: number;
  isLiked: boolean;
  onClick: () => void;
}) {
  const isMobile = useIsMobile();
  return (
    <Container isLiked={isLiked} onClick={onClick}>
      {isMobile ? (
        <>
          {isLiked ? (
            <LikeMobileIcon color="var(--Color-Foundation-orange-500)" />
          ) : (
            <LikeMobileOutlinedIcon color="var(--Color-Foundation-orange-500)" />
          )}
          <CountText>{count}</CountText>
        </>
      ) : (
        <>
          <LikesIcon
            color={
              isLiked ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-500)"
            }
          />
          <CountText isLiked={isLiked}>{count}</CountText>
        </>
      )}
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

  @media (max-width: 768px) {
    border: none;
    background-color: var(--Color-Foundation-gray-50);
    flex-direction: column;

    padding: 7px 11px 3px 11px;
    margin-top: 0;
  }
`;

const CountText = styled.div<{ isLiked?: boolean }>`
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: ${({ isLiked }) =>
    isLiked ? "var(--Color-Foundation-orange-500)" : "var(--Color-Foundation-gray-600)"};

  @media (max-width: 768px) {
    font-weight: 800;
    font-size: 9px;
    color: var(--Color-Foundation-orange-500);
  }
`;
