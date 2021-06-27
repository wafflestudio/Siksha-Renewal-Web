import Menu from "./Menu";
import styled from "styled-components";
import {useDispatchContext, useStateContext} from "../utils/hooks/ContextProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default function MenuList() {
    const state = useStateContext();

    const { meal, data } = state;

    return (
        <Container>
            {data[meal] ? data[meal].map((restaurant) =>
                <Menu restaurant={restaurant} key={restaurant.id+meal} />
            ) : <div>업로드 된 식단이 없습니다.</div>}
        </Container>
    )
}
