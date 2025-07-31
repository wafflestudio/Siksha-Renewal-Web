import styled from "styled-components";
import StarIcon from "assets/icons/star-filled.svg";

export default function Stars({ score }: { score: number }) {
  return (
    <StarContainer>
      {Array.from(Array(5).keys()).map((i) => {
        if (score >= i + 1) {
          return <StyledStarIcon $isfilled={true} key={i} alt="별점 채워짐" />;
        } else if (score >= i + 0.5) {
          return <StyledStarIcon $isfilled={true} key={i} alt="별점 채워짐" />;
        } else {
          return <StyledStarIcon $isfilled={false} key={i} alt="별점 비워짐" />;
        }
      })}
    </StarContainer>
  );
}

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 73.18px;
  gap: 1px;
`;

const StyledStarIcon = styled(StarIcon)<{ $isfilled: boolean }>`
  width: 14.18px;
  height: 14.18px;
  color: ${(props) => (props.$isfilled ? "var(--Color-Foundation-orange-500)" : "var(--SemanticColor-Icon-Like)")};
`;

