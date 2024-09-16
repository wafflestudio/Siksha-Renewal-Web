import styled from "styled-components";
import useFestival from "hooks/useFestival";

export default function Festival() {
  const { isFestival, setIsFestival } = useFestival();

  return (
    <Container>
      <MealButton onClick={() => setIsFestival(!isFestival)}>
        <Star src={isFestival ? "/img/star.svg" : "/img/star-empty.svg"} alt="저녁" />
        <MealText active={isFestival}>축제메뉴 보기</MealText>
      </MealButton>
    </Container>
  );
}

const Container = styled.div`
  width: 110px;
`;

const MealButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0 6%;

  @media (max-width: 768px) {
    padding: 0 13px 0 13px;
  }
`;

const Star = styled.img`
  width: 20px;
  height: 22.21px;
  padding-bottom: 11.5px;

  @media (max-width: 768px) {
    width: 12px;
    padding-bottom: 3px;
  }
`;

const MealText = styled.div`
  font-size: 15px;
  line-height: 17px;
  font-weight: 400;
  color: ${(props: { active: boolean }) => (props.active ? "#FE8C59" : "#919191")};

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 11px;
  }
`;
