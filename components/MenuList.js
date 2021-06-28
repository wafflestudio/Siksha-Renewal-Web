import MenuCard from "./MenuCard";
import styled from "styled-components";
import {useStateContext} from "../utils/hooks/ContextProvider";
import {useEffect, useState} from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 153px);
  overflow-y: scroll;
  
  width: 100%;

  animation: slidein .75s;
  -moz-animation: slidein .75s; /* Firefox */
  -webkit-animation: slidein .75s; /* Safari and Chrome */
  -o-animation: slidein .75s; /* Opera */

  @keyframes slidein {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-moz-keyframes slidein { /* Firefox */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-webkit-keyframes slidein { /* Safari and Chrome */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @-o-keyframes slidein { /* Opera */
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const EmptyText = styled.div`
  color: #919191;
  font-weight: 100;
  padding-top: 25px;
  font-size: 16px;
`

export default function MenuList() {
    const state = useStateContext();

    const { meal, data } = state;

    const [hasData, setHasData] = useState(false)

    useEffect(() => {
        if(!data[meal] || data[meal].length == 0) setHasData(false)
        else setHasData(true)
    }, [data, meal])

    return (
        <Container key={data.date + meal}>
            {hasData ? data[meal].map((restaurant) =>
                <MenuCard data={restaurant} key={restaurant.id + meal}/>
            ) : <EmptyText>업로드 된 식단이 없습니다.</EmptyText>}
        </Container>
    );
}
