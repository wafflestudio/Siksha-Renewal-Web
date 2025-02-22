import styled from "styled-components";

export default function OperatingHour({ type, hour }: { type: string; hour: string }) {
  return (
    <Container>
      {hour && (
        <>
          {type == "BR" ? (
            <Breakfast src={"/img/breakfast.svg"} alt="아침" />
          ) : type == "LU" ? (
            <Lunch src={"/img/lunch.svg"} alt="점심" />
          ) : (
            <Dinner src={"/img/dinner.svg"} alt="저녁" />
          )}
          <HourText>{hour}</HourText>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;

const HourText = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--Color-Foundation-gray-600);
`;

const Breakfast = styled.img`
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    width: 14.1px;
  }
`;

const Lunch = styled.img`
  width: 20px;
  height: 20px;
  @media (max-width: 768px) {
    width: 16px;
  }
`;

const Dinner = styled.img`
  width: 20px;
  height: 20px;
  @media (max-width: 768px) {
    width: 12px;
  }
`;
