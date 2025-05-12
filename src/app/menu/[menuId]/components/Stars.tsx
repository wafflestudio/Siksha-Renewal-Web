import styled from "styled-components";

export default function Stars({ score }: { score: number }) {
  return (
    <StarContainer>
      {Array.from(Array(5).keys()).map((i) => {
        if (score >= i + 1) {
          return <Star src="/img/general/star-on.svg" key={i} alt="별점 채워짐" />;
        } else if (score >= i + 0.5) {
          return <Star src="/img/general/star-on.svg" key={i} alt="별점 채워짐" />;
        } else {
          return <Star src="/img/general/star-off-28.svg" key={i} alt="별점 비워짐" />;
        }
      })}
    </StarContainer>
  );
}

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${(props) => (props.theme.width ? props.theme.width : 73.18)}px;
  gap: 1px;
`;

const Star = styled.img`
  width: ${(props) => (props.theme.width ? props.theme.width / 5 : 14.18)}px;
  height: ${(props) => (props.theme.width ? props.theme.width / 5 : 14.18)}px;
  fill: #ffd600;
`;
