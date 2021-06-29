import styled from "styled-components";
import {formatPrice} from "../utils/hooks/FormatUtil";
import {useEffect, useState} from "react";

const Container = styled.div`
  padding: 8px 0 8px 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const MenuName = styled.div`
  font-weight: 100;
  font-size: 16px;
  color: black;
  width: 300px;
  letter-spacing: -0.3px;
  line-height: 23px;
  display: flex;
  align-items: center;
`

const MenuInfo = styled.div`
  display: flex;
`

const Dots = styled.div`
  font-size: 12px;
  font-weight: 100;
  color: rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  padding-left: 10px;
  padding-right: 7px;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`

const Price = styled.div`
  font-size: 16px;
  font-weight: 100;
  width: 48px;
  display: flex;
  justify-content: ${props => props.hasPrice ? 'flex-end' : 'center'};
  padding-right: 26px;
`

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 20px;
  border-radius: 20px;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: ${props => props.type ? 'white' : 'black'};
  background: ${props => props.type ? props.type == "high" ? '#F47156' : props.type == "middle" ? '#F58625' : '#F5B52C' : 'white'};
`

const NoMeat = styled.img`
  width: 19px;
  padding-left: 8px;
  padding-bottom: 2px;
`

export default function Menu({ menu }) {
    const [hasPrice, setHasPrice] = useState(true);
    const [score, setScore] = useState(null);

    useEffect(() => {
        if(!menu.price) setHasPrice(false);
    }, [menu.price])

    useEffect(() => {
        if(menu.score) {
            if(menu.score >= 4) setScore("high")
            else if(menu.score > 3) setScore("middle")
            else setScore("low")
        }
    }, [menu.score])

    return (
        <Container>
            <MenuName>
                {menu.name_kr}
                {menu.etc && menu.etc.find(e => e == "No meat") && <NoMeat src={"/img/no-meat.svg"}/>}
            </MenuName>
            <MenuInfo>
                <Dots>.........</Dots>
                <Price hasPrice={hasPrice}>{menu.price ? formatPrice(menu.price) : "-"}</Price>
                <Score type={score}>{menu.score ? menu.score.toFixed(1) : "-"}</Score>
            </MenuInfo>
        </Container>
    )
}
