import MenuCard from "./MenuCard";
import styled from "styled-components";
import {useStateContext} from "../utils/hooks/ContextProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 153px);
  overflow-y: scroll;
`

export default function MenuList() {
    const state = useStateContext();

    const { meal, data } = state;

    return (
        <Container>
            {data[meal] ? data[meal].map((restaurant) =>
                <MenuCard data={restaurant} key={restaurant.id+meal} />
            ) : <div>업로드 된 식단이 없습니다.</div>}
        </Container>
    )
}
