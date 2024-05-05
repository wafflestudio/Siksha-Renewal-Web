//헤더와 영역이 겹치는 기존의 날짜 및 화살표 컴포넌트입니다. 현재 UI 상에서 사용되지 않는 컴포넌트이지만 남겨두도록 하겠습니다.

import styled from "styled-components";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import { useCallback } from "react";
import { formatDate } from "../utils/FormatUtil";

export default function CalendarNavi() {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { date } = state;
  const yesterday = new Date(date.valueOf() - 86400000);
  const tomorrow = new Date(date.valueOf() + 86400000);
  const setDate = useCallback((date) => dispatch({ type: "SET_DATE", date: date }), [dispatch]);

  return (
    <DateNavi>
      <DateNaviSub
        onClick={() => {
          setDate(yesterday);
        }}
      >
        <ArrowLeft src={"/img/left-arrow-white.svg"} width={"10px"} />
        {formatDate(yesterday)}
      </DateNaviSub>
      <DateNaviTitle>{formatDate(date)}</DateNaviTitle>
      <DateNaviSub
        onClick={() => {
          setDate(tomorrow);
        }}
      >
        {formatDate(tomorrow)}
        <ArrowRight src={"/img/right-arrow-white.svg"} width={"10px"} />
      </DateNaviSub>
    </DateNavi>
  );
}

const DateNavi = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 17px;
  color: black;
  max-width: 600px;
  width: 40vw;
  white-space: nowrap;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: relative;
  top: -40px;
  @media (max-width: 768px) {
    color: #fe8c59;
    cursor: pointer;
    top: 4px;
  }
`;
const DateNaviTitle = styled.div`
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  top: 3px;
  cursor: pointer;
`;
const DateNaviSub = styled.div`
  color: #ffffff80;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;
const ArrowLeft = styled.img`
  cursor: pointer;
  position: relative;
  right: 25px;
  top: 4px;
`;
const ArrowRight = styled.img`
  cursor: pointer;
  position: relative;
  left: 25px;
  top: 4px;
`;
