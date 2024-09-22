import styled from "styled-components";
import useFestival from "hooks/useFestival";

export default function Festival() {
  const { isFestival, setIsFestival } = useFestival();

  return (
    <Container>
      <MealButton onClick={() => setIsFestival(!isFestival)} active={isFestival}>
        {isFestival ? (
          <>
            <Text active={isFestival}>축제</Text>
            <Circle active={isFestival} />
          </>
        ) : (
          <>
            <Circle active={isFestival} />
            <Text active={isFestival}>축제</Text>
          </>
        )}
      </MealButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    transform: scale(0.5);
  }
`;

const MealButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  width: 89.146px;
  height: 38.75px;
  border-radius: 19.376px;
  background: ${({ active }) => (active ? "#FF9522" : "#b7b7b7")};
`;

const Circle = styled.div<{ active: boolean }>`
  width: 34px;
  height: 34px;
  background-color: #ffffff;
  border-radius: 50%;
  margin: ${({ active }) => (active ? "0 3.2px 0 6.46px" : "0 2.76px 0 0")};
`;

const Text = styled.div<{ active: boolean }>`
  margin: ${({ active }) => (active ? "0 2.69px 0 6.5px" : "0 5.75px 0 0")};
  width: 34px; /* doubled from 17px */
  color: #fff;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-family: NanumSquareOTF;
  font-size: 18px; /* doubled from 9px */
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.3px;
`;
