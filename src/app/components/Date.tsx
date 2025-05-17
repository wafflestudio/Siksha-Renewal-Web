import styled from "styled-components";
import { useDispatchContext, useStateContext } from "../../providers/ContextProvider";
import { formatDate, getTomorrow, getYesterday } from "../../utils/FormatUtil";
import useModals from "hooks/UseModals";
import MobileCalendar from "./MobileCalendar";
import { useContext, useEffect, useState } from "react";
import { ModalsStateContext } from "providers/ModalsProvider";
import LeftArrowMobileIcon from "assets/icons/left-arrow-mobile.svg";
import RightArrowMobileIcon from "assets/icons/right-arrow-mobile.svg";

export default function Date() {
  const state = useStateContext();
  const { date } = state;

  const { setDate } = useDispatchContext();
  const { openModal, closeModal } = useModals();
  const openedModals = useContext(ModalsStateContext);
  const [isCalOpened, setIsCalOpened] = useState(false);

  const onClickDate = () => {
    if (!isCalOpened) {
      openModal(MobileCalendar, { onClose: () => {} });
    } else {
      closeModal(MobileCalendar);
    }
  };

  useEffect(() => {
    setIsCalOpened(openedModals.map((modal) => modal.Component).includes(MobileCalendar));
  }, [openedModals]);

  return (
    <Container>
      <ArrowWrapper
        isActive={!isCalOpened}
        onClick={() => {
          !isCalOpened && setDate(getYesterday(date));
        }}
      >
        <LeftArrowMobileIcon aria-label="전날로 이동" />
      </ArrowWrapper>
      <DateText onClick={onClickDate}>{formatDate(date)}</DateText>
      <ArrowWrapper
        isActive={!isCalOpened}
        onClick={() => {
          !isCalOpened && setDate(getTomorrow(date));
        }}
      >
        <RightArrowMobileIcon aria-label="다음날로 이동" />
      </ArrowWrapper>
    </Container>
  );
}

const Container = styled.div`
  background: var(--Color-Foundation-base-white-5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;

  @media (max-width: 768px) {
    width: 100%;
    height: 53px;
    padding: 0;
  }
`;

const ArrowWrapper = styled.div<{ isActive: boolean }>`
  width: 10px;
  height: 16px;
  cursor: pointer;
  padding: 0 16px 0 16px;
  color: ${({ isActive }) =>
    isActive ? "var(--Color-Foundation-orange-500-3)" : "var(--Color-Foundation-gray-400)"};
`;

const DateText = styled.div`
  color: var(--Color-Foundation-gray-900, #262728);
  text-align: center;

  font-size: var(--Font-size-16, 16px);
  font-weight: var(--Font-weight-extrabold, 800);
  line-height: 140%; /* 22.4px */

  @media (max-width: 768px) {
    font-weight: 700;
    font-size: 15px;
    line-height: 17px;
    color: var(--Color-Foundation-orange-500-3, #ff9522);
    white-space: nowrap;
  }
`;
