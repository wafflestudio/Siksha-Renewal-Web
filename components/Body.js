import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Date from "./Date";
import {useEffect, useState} from "react";
import {formatISODate} from "../utils/hooks/FormatUtil";
import axios from "axios";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";
import Meal from "./Meal";
import MenuList from "./MenuList";
import Calendar from "./Calendar";
import RestaurantInfo from "./RestaurantInfo";

const DesktopContainer = styled.div`
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const MobileCalendar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 113px;
    z-index: 100;
  }
`

const MobileInfo = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
  }
`

export default function Body() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { date, showCal, showInfo } = state;
    const setLoading = (loading) => dispatch({ type: 'SET_LOADING', loading: loading })

    useEffect(() => {
        async function fetchData() {
            const setData = (data) => dispatch({type: 'SET_DATA', data: data});
            const dateString = formatISODate(date);

            setLoading(true);
            try {
                const res = await axios.get(`https://siksha-api.wafflestudio.com/menus/?start_date=${dateString}&end_date=${dateString}&except_empty=true`)
                setData(res.data.result[0]);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }
        fetchData();
    }, [date])

    return (
        <>
            <DesktopContainer>
                <LeftSide/>
                <RightSide/>
            </DesktopContainer>
            <MobileContainer>
                <Date/>
                {
                    showCal &&
                    <MobileCalendar>
                        <Calendar/>
                    </MobileCalendar>
                }
                {
                    showInfo &&
                    <MobileInfo>
                        <RestaurantInfo/>
                    </MobileInfo>
                }
                <Meal/>
                <MenuList/>
            </MobileContainer>
        </>
    );
}
