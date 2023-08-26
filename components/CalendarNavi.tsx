import styled from "styled-components";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "../utils/FormatUtil";

export default function CalendarNavi() {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { date } = state;
  const [yesterday, setYesterday] = useState(new Date(date.valueOf() - 86400000));
  const [tomorrow, setTomorrow] = useState(new Date(date.valueOf() + 86400000));
  const setDate = (date) => dispatch({ type: "SET_DATE", date: date });
  useEffect(() => {
    yesterday.setFullYear(date.getFullYear());
    tomorrow.setFullYear(date.getFullYear());
    yesterday.setDate(1); // date initialize
    tomorrow.setDate(1);
    yesterday.setMonth(date.getMonth());
    tomorrow.setMonth(date.getMonth());
    yesterday.setDate(date.getDate() - 1);
    tomorrow.setDate(date.getDate() + 1);
  }, [date]);

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
  width: 600px;
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
  margin: auto;
  cursor: pointer;
`;
const DateNaviSub = styled.div`
  color: #ffffff80;
  margin: auto;
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
