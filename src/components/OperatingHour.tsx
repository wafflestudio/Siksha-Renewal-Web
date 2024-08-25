import styled from "styled-components";

export default function OperatingHour({ type, hour }: { type: string; hour: string }) {
  return (
    <Container>
      {type == "BR" ? (
        <Breakfast src={"/img/breakfast.svg"} alt="breakfast" />
      ) : type == "LU" ? (
        <Lunch src={"/img/lunch.svg"} alt="launch" />
      ) : (
        <Dinner src={"/img/dinner.svg"} alt="dinner" />
      )}
      <HourText type={type}>{hour}</HourText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 7px;
`;

const HourText = styled.div<{ type: string }>`
  font-size: 15px;
  font-weight: 400;
  font-family: NanumSquare, sans-serif;
  color: #575757;
  padding-left: ${(props) => (props.type == "BR" ? "8px" : props.type == "LU" ? "7px" : "8px")};
`;

const Breakfast = styled.img`
  width: 14.1px;
`;

const Lunch = styled.img`
  width: 16px;
`;

const Dinner = styled.img`
  width: 12px;
`;
