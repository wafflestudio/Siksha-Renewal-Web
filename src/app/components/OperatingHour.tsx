import styled from "styled-components";
import BreakfastIcon from "assets/icons/breakfast.svg";
import LunchIcon from "assets/icons/lunch.svg";
import DinnerIcon from "assets/icons/dinner.svg";

export default function OperatingHour({ type, hour }: { type: string; hour: string }) {
  return (
    <Container>
      {hour && (
        <>
          {type == "BR" ? (
            <IconWrapper mobileWidth={14.1}>
              <BreakfastIcon aria-label="아침" />
            </IconWrapper>
          ) : type == "LU" ? (
            <IconWrapper mobileWidth={16}>
              <LunchIcon aria-label="점심" />
            </IconWrapper>
          ) : (
            <IconWrapper mobileWidth={12}>
              <DinnerIcon aria-label="저녁" />
            </IconWrapper>
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

const IconWrapper = styled.div<{ mobileWidth: number }>`
  width: 20px;
  height: 20px;
  color: var(--Color-Foundation-gray-600);

  @media (max-width: 768px) {
    width: ${(props) => `${props.mobileWidth}px`};
  }
  & > svg {
    width: 100%;
    height: 100%;
  }
`;
