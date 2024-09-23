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
`;

const MealButton = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ active }) => (active ? "right" : "left")};
  cursor: pointer;
  width: 80.206px;
  height: 34.864px;
  border-radius: 17.432px;
  background: ${({ active }) => (active ? "#FF9522" : "#b7b7b7")};

  @media (max-width: 768px) {
    width: 44.573px;
    height: 19.375px;
    border-radius: 9.688px;
  }
`;

const Circle = styled.div<{ active: boolean }>`
  width: 30.59px;
  height: 30.59px;
  background-color: #ffffff;
  filter: drop-shadow(0px 0px 7.198px rgba(0, 0, 0, 0.15));
  border-radius: 50%;
  margin: ${({ active }) => (active ? "0 2.49px 0 0" : "0 0 0 2.88px")};

  @media (max-width: 768px) {
    width: 17px;
    height: 17px;
    margin: ${({ active }) => (active ? "0 1.38px 0 0" : "0 0 0 1.6px")};
  }
`;

const Text = styled.div<{ active: boolean }>`
  margin: ${({ active }) => (active ? "0 6.43px 0 0" : "0 0 0 5.81px")};
  color: #fff;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 9px;
    margin: ${({ active }) => (active ? "0 2.69px 0 0" : "0 0 0 3.23px")};
  }
`;
