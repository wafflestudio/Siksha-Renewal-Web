import styled from "styled-components";
import RestaurantTime from "./RestaurantTime";
import Menu from "./Menu";

const Container = styled.div`
  background: white;
  border: solid 1px #E8E8E8;
  box-sizing: border-box;
  border-radius: 8px;
  width: 785px;
  margin-bottom: 30px;
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
  padding-bottom: 12px;
`

const VLine = styled.div`
  width: 1px;
  background: #DCDCDC;
  margin-left: 17px;
  margin-right: 26px;
`

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
  padding-bottom: 4px;
`

export default function MenuCard({ data }) {
    return (
        <Container>
            <RestInfo>
                <Name>{data.name_kr}</Name>
                <Location>
                    <LocationIcon src={"/img/location.svg"}/>
                    <LocationText>{data.addr.slice(19)}</LocationText>
                </Location>
            </RestInfo>
            <HLine/>
            <MenuInfo>
                <RestaurantTime hours={data.etc.operating_hours} />
                <VLine/>
                <Menus>
                    {
                        data.menus.map((menu) =>
                            <Menu menu={menu} key={menu.id}/>
                        )
                    }
                </Menus>
            </MenuInfo>
        </Container>
    );
}
