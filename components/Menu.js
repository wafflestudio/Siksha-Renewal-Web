import styled from "styled-components";

const Container = styled.div`
  background: white;
  border: solid 1px #E8E8E8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 785px;
`

const RestInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 23px;
`

const Name = styled.div`
  font-family: NanumSquare, sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 27px;
  color: #242424;
  white-space: nowrap;
  padding-left: 35.53px;
`

const Location = styled.div`
  display: flex;
  padding-top: 3px;
  padding-right: 34.85px;
`

const LocationIcon = styled.img`
  width: 14.4px;
  height: 20.21px;
`

const LocationText = styled.div`
  font-family: NanumSquare;
  font-weight: 100;
  font-size: 15px;
  line-height: 17px;
  padding-top: 1px;
  padding-left: 10px;
`

const HLine = styled.div`
  width: 715.03px;
  height: 2px;
  background: #FE8C59;
  margin: 10px auto 10px auto;
`

const MenuInfo = styled.div`
  display: flex;
`

const RestTime = styled.div`
  display: flex;
  flex-direction: column;
`

const VLine = styled.div`
  width: 1px;
  background: #DCDCDC;
  padding-left: 10px;
  padding-right: 26px;
`

const Menus = styled.div`

`

export default function Menu(props) {
    return (
        <Container>
            <RestInfo>
                <Name>{props.restaurant.name_kr}</Name>
                <Location>
                    <LocationIcon src={"/img/location.svg"} />
                    <LocationText>{props.restaurant.addr.slice(19)}</LocationText>
                </Location>
            </RestInfo>
            <HLine />
            <MenuInfo>
                <RestTime />
                <VLine />
                <Menus />
            </MenuInfo>
        </Container>
    )
}
