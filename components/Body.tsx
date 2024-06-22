import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Date from "./Date";
import { useEffect } from "react";
import { formatISODate } from "../utils/FormatUtil";
import axios from "axios";
import { useDispatchContext, useStateContext } from "../hooks/ContextProvider";
import Meal from "./Meal";
import MenuList from "./MenuList";
import Calendar from "./Calendar";
import RestaurantInfo from "./RestaurantInfo";
import APIendpoint from "../constants/constants";

export default function Body() {
  const state = useStateContext();
  const { setLoading, setData } = useDispatchContext();

  const { date, showCal, showInfo, loginStatus, meal } = state;

  useEffect(() => {
    async function fetchData() {
      const dateString = formatISODate(date);

      setLoading(true);

      const orderList = JSON.parse(localStorage.getItem("orderList_nonFavorite") ?? "[]");
      const orderHash = orderList.reduce((map, obj, idx) => {
        map.set(obj.id, { ...obj, order: idx });
        return map;
      }, new Map());

      if (!localStorage.getItem("access_token")) {
        try {
          const {
            data: { result },
          } = await axios.get(
            `${APIendpoint()}/menus/?start_date=${dateString}&end_date=${dateString}&except_empty=true`,
          );

          setData(result[0]);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const {
            data: { result },
          } = await axios.get(
            `${APIendpoint()}/menus/lo?start_date=${dateString}&end_date=${dateString}&except_empty=true`,
            {
              headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
            },
          );

          const { BR, LU, DN } = result[0];

          const sortFunction = (a, b) => {
            const aOrder = orderHash.get(a.id)?.order ?? Infinity;
            const bOrder = orderHash.get(b.id)?.order ?? Infinity;
            if (aOrder === bOrder) return a.name_kr.localeCompare(b.name);
            else return aOrder - bOrder;
          };

          result[0].BR = BR.sort(sortFunction);
          result[0].LU = LU.sort(sortFunction);
          result[0].DN = DN.sort(sortFunction);

          setData(result[0]);
        } catch (e) {
          console.log(e);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [date, loginStatus, meal]);

  return (
    <>
      <DesktopContainer>
        <LeftSide />
        <RightSide />
      </DesktopContainer>
      <MobileContainer>
        <Date />
        {showCal && (
          <MobileCalendar>
            <Calendar />
          </MobileCalendar>
        )}
        <Meal />
        <MenuList />
      </MobileContainer>
      {showInfo && (
        <Info>
          <RestaurantInfo />
        </Info>
      )}
    </>
  );
}

const DesktopContainer = styled.div`
  display: flex;
  justify-content: center;
  height: max(780px, 100vh - min(25vh, 271px));
  width: min(73vw, 1417px);
  margin: 39px auto 0 auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const MobileCalendar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 113px;
    z-index: 100;
  }
`;

const Info = styled.div`
  display: flex;
  z-index: 100;
`;
