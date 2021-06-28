import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import {useEffect} from "react";
import {formatISODate} from "../utils/hooks/FormatUtil";
import axios from "axios";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";

const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function Body() {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const { date } = state;

    useEffect(() => {
        async function fetchData() {
            const setData = (data) => dispatch({type: 'SET_DATA', data: data});
            const dateString = formatISODate(date);

            try {
                const res = await axios.get(`https://siksha-api.wafflestudio.com/menus/?start_date=${dateString}&end_date=${dateString}&except_empty=true`)
                setData(res.data.result[0]);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [date, dispatch])

    return (
        <Container>
            <LeftSide />
            <RightSide />
        </Container>
    )
}
