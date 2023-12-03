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
  const dispatch = useDispatchContext();

  const { date, showCal, showInfo, loginStatus, meal } = state;
  const setLoading = (loading) => dispatch({ type: "SET_LOADING", loading: loading });

  useEffect(() => {
    async function fetchData() {
      const setData = (data) => dispatch({ type: "SET_DATA", data: data });
      const dateString = formatISODate(date);

      setLoading(true);
      if (!localStorage.getItem("access_token")) {
        try {
          const res = await axios.get(
            `${APIendpoint()}/menus/?start_date=${dateString}&end_date=${dateString}&except_empty=true`,
          );
          setData(res.data.result[0]);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const ress = await axios.get(
            `${APIendpoint()}/menus/lo?start_date=${dateString}&end_date=${dateString}&except_empty=true`,
            {
              headers: { "authorization-token": `Bearer ${localStorage.getItem("access_token")}` },
            },
          );
          setData(ress.data.result[0]);
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
  height: calc(100vh - 100px);

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
